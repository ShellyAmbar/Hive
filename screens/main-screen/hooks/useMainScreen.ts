import {useEffect, useRef, useState} from 'react';

import {
  MediaStream,
  RTCIceCandidate,
  RTCPeerConnection,
  RTCSessionDescription,
} from 'react-native-webrtc';

import {getStream} from '@hive/utils/stream-util';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

const peerConstraints = {
  iceServers: [
    {
      urls: 'stun:stun.l.google.com:19302',
    },
  ],
};
const useMainScreen = () => {
  const [localStream, setLocalStream] = useState<null | MediaStream>();
  const [remoteStream, setRemoteStream] = useState<null | MediaStream>();
  const [gettingCall, setGettingCall] = useState(false);
  const pc = useRef<RTCPeerConnection>();
  const connecting = useRef(false);

  useEffect(() => {
    try {
      const cRef = firestore().collection('meet').doc('chatId');

      const subscribe = cRef.onSnapshot(snapshot => {
        const data = snapshot?.data();

        //on answer start call
        if (
          pc.current &&
          !pc.current.remoteDescription &&
          data &&
          data.answer !== undefined
        ) {
          pc.current.setRemoteDescription(
            new RTCSessionDescription(data?.answer),
          );
        }
        //if there is offer for chatid set the getting call flag

        if (data && data?.offer && !connecting.current) {
          console.log('data?.offer');
          setGettingCall(true);
        }
      });

      //On delete of collection call hangup
      //The other side has clicked on hangup
      const subscribeDelete = cRef.collection('callee').onSnapshot(snapshot => {
        snapshot?.docChanges().forEach(change => {
          if (change.type === 'removed') {
            hangup();
          }
        });
      });

      return () => {
        subscribe();
        subscribeDelete();
      };
    } catch (e) {
      console.log(e);
    }
  }, []);

  const setupWebRTC = async () => {
    try {
      pc.current = new RTCPeerConnection(peerConstraints);
      //get voice and video stream
      const stream = await getStream(false, true);
      if (stream) {
        setLocalStream(stream);
        stream.getTracks().forEach(track => {
          pc.current?.addTrack(track, stream);
        });
      }

      // get remote stream
      pc.current.ontrack = event => {
        // Grab the remote track from the connected participant.
        const remoteStream = new MediaStream();
        event.streams[0].getTracks().forEach(track => {
          remoteStream.addTrack(track);
        });
        // const [remoteStream] = event.streams;
        // console.log('remote', remoteStream.id);
        setRemoteStream(remoteStream);
      };
    } catch (e) {
      console.log('error', e);
    }
  };
  const create = async () => {
    try {
      console.log('calling');
      connecting.current = true;
      await setupWebRTC();

      const cRef = firestore().collection('meet').doc('chatId');

      // exchange the ICE candidates between the caller and the callee
      await collectionIceCandidates(cRef, 'caller', 'callee');
      if (pc.current) {
        // create the offer for the call
        //store the offer under the document
        const offer = await pc.current.createOffer();
        pc.current.setLocalDescription(offer);

        const cWithOffer = {
          offer: {
            type: offer.type,
            sdp: offer.sdp,
          },
        };

        cRef.set(cWithOffer);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const join = async () => {
    console.log('join');
    connecting.current = true;
    setGettingCall(false);
    try {
      const cRef = firestore().collection('meet').doc('chatId');

      const offer = (await cRef.get())?.data()?.offer;

      if (offer) {
        await setupWebRTC();
        //exchange the ice candidates
        //chaeck the parameters , its reversed. since the claiing part is callee
        await collectionIceCandidates(cRef, 'callee', 'caller');
        if (pc.current) {
          pc.current.setRemoteDescription(new RTCSessionDescription(offer));
          //create answer for the call
          //update doc with answer

          const answer = await pc.current.createAnswer();
          pc.current.setLocalDescription(answer);

          const cWithAnswer = {
            answer: {
              type: answer.type,
              sdp: answer.sdp,
            },
          };
          console.log('offer and answer');
          cRef.update(cWithAnswer);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  //cleanup
  const hangup = async () => {
    setGettingCall(false);
    connecting.current = false;
    streamCleanup();
    firestoreCleanup();
    if (pc.current) {
      pc.current.close();
    }
  };
  const streamCleanup = async () => {
    if (localStream) {
      localStream.getTracks().forEach(t => t.stop());
      localStream.release();
    }
    setLocalStream(null);
    setRemoteStream(null);
  };
  const firestoreCleanup = async () => {
    const cRef = firestore().collection('meet').doc('chatId');
    if (cRef) {
      const calleeCandidate = await cRef.collection('callee').get();
      calleeCandidate.forEach(async candidate => {
        await candidate.ref.delete();
      });

      const callerCandidate = await cRef.collection('caller').get();
      callerCandidate.forEach(async candidate => {
        await candidate.ref.delete();
      });
      cRef.delete();
    }
  };

  //halper
  const collectionIceCandidates = async (
    cRef: FirebaseFirestoreTypes.DocumentReference<FirebaseFirestoreTypes.DocumentData>,
    localName: string,
    remoteName: string,
  ) => {
    try {
      const candidateCollection = cRef.collection(localName);
      if (pc.current) {
        //on new ice candidate add to firestore
        pc.current.onicecandidate = event => {
          console.log('onicecandidate', event.candidate);

          if (event.candidate !== null) {
            candidateCollection.add(event.candidate);
          }
        };
      }
      cRef.collection(remoteName).onSnapshot(snap => {
        snap?.docChanges().forEach(change => {
          if (change.type === 'added') {
            const candidate = new RTCIceCandidate(change.doc?.data());
            pc.current?.addIceCandidate(candidate);
          }
        });
      });
    } catch (e) {
      console.log(e);
    }
  };

  return {
    gettingCall,
    join,
    hangup,
    localStream,
    remoteStream,
    create,
  };
};

export default useMainScreen;
