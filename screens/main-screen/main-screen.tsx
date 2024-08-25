import {View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import styles from './main-screen.styles';
import GettingCall from '@hive/components/getting-call/getting-call';
import Video from './video/video';
import {
  MediaStream,
  RTCIceCandidate,
  RTCPeerConnection,
  RTCSessionDescription,
} from 'react-native-webrtc';
import FloatingButton from '@hive/components/floating-button/floating-button';
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
const MainScreen = () => {
  const [localStream, setLocalStream] = useState<null | MediaStream>();
  const [remoteStream, setRemoteStream] = useState<null | MediaStream>();
  const [gettingCall, setGettingCall] = useState(false);
  const pc = useRef<RTCPeerConnection>();
  const connecting = useRef(false);

  useEffect(() => {
    const cRef = firestore().collection('meet').doc('chatId');
    const subscribe = cRef.onSnapshot(snapshot => {
      const data = snapshot?.data();

      //on answer start call
      if (pc.current && !pc.current.remoteDescription && data && data?.answer) {
        pc.current.setRemoteDescription(
          new RTCSessionDescription(data?.answer),
        );
      }
      //if there is offer for chatid set the getting call flag

      if (data && data?.offer && !connecting.current) {
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
  }, []);

  const setupWebRTC = async () => {
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
    (pc.current as RTCPeerConnection)?.ontrack(event => {
      // Grab the remote track from the connected participant.
      const [remoteStream] = event.streams;
      setRemoteStream(remoteStream);
    });
  };
  const create = async () => {
    console.log('calling');
    connecting.current = true;
    await setupWebRTC();

    const cRef = firestore().collection('meet').doc('chatId');
    // exchange the ICE candidates between the caller and the callee
    collectionIceCandidates(cRef, 'caller', 'callee');
    if (pc.current) {
      // create the offer for the call
      //store the offer under the document
      const offer = await pc.current.createOffer({});
      pc.current.setLocalDescription(offer);

      const cWithOffer = {
        offer: {
          type: offer.type,
          sdp: offer.sdp,
        },
      };

      cRef.set(cWithOffer);
    }
  };
  const join = async () => {
    console.log('join');
    connecting.current = true;
    setGettingCall(false);
    const cRef = firestore().collection('meet').doc('chatId');
    const offer = (await cRef.get())?.data()?.offer;
    if (offer) {
      await setupWebRTC();
      //exchange the ice candidates
      //chaeck the parameters , its reversed. since the claiing part is callee
      collectionIceCandidates(cRef, 'callee', 'caller');
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

        cRef.update(cWithAnswer);
      }
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
    const candidateCollection = cRef.collection(localName);
    if (pc.current) {
      //on new ice candidate add to firestore
      pc.current.addEventListener('icecandidate', event => {
        if (event.candidate) {
          candidateCollection.add(event.candidate);
        }
      });
    }
    cRef.collection(remoteName).onSnapshot(snap => {
      snap?.docChanges().forEach(change => {
        if (change.type === 'added') {
          const candidate = new RTCIceCandidate(change.doc?.data());
          pc.current?.addIceCandidate(candidate);
        }
      });
    });
  };

  if (gettingCall) {
    return <GettingCall join={join} hangup={hangup} />;
  }
  if (localStream) {
    return (
      <Video
        hangup={hangup}
        localStrem={localStream}
        remoteStrem={remoteStream}
      />
    );
  }
  return (
    <View style={styles.container}>
      <FloatingButton
        containerStyle={styles.callBtn}
        iconName="video"
        onPress={create}
      />
    </View>
  );
};

export default MainScreen;
