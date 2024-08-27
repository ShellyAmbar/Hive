import {useEffect, useRef, useState} from 'react';

import {
  MediaStream,
  RTCIceCandidate,
  RTCPeerConnection,
  RTCSessionDescription,
} from 'react-native-webrtc';

import VideoStreamManager from '@hive/utils/stream-util';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import DeviceInfo from 'react-native-device-info';
import {useDispatch, useSelector} from 'react-redux';

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
  const [listenToNewCalls, setlistenToNewCalls] = useState(true);
  const pc = useRef<RTCPeerConnection>();
  const connecting = useRef(false);
  const [fbRef, setfbRef] = useState(null);
  const {name} = useSelector(state => state.user);
  const dispatch = useDispatch();
  const getFirebaseRef = async () => {
    const myRef = firestore()
      .collection('meet')
      .doc('chatId-' + DeviceInfo.getDeviceId());
    console.log('id -------', DeviceInfo.getDeviceId());

    return myRef;
  };

  useEffect(() => {
    (async () => {
      const videoStreamManager = VideoStreamManager.getInstance();
      try {
        const videoStream = await videoStreamManager.getStream(false, true);

        setLocalStream(videoStream);
      } catch (error) {
        console.error('Failed to get stream:', error);
      }
    })();

    return () => {};
  }, []);

  useEffect(() => {
    if (listenToNewCalls) {
      try {
        //listen to new incoming calls that is not mine
        const unsubscribe = firestore()
          .collection('meet')
          .where('status', '==', 'pending')
          .where('callerId', '!=', DeviceInfo.getDeviceId())
          .onSnapshot(snap => {
            snap.docChanges().forEach(change => {
              console.log('listeningForNewCall -------');
              if (change.type === 'added') {
                console.log('added call ------------');

                //on answer start call
                const newCall = change.doc.data();
                setfbRef(change.doc.ref);
                console.log(
                  'path -------',
                  change.doc.ref.path,
                  'connecting.current',
                  connecting.current,
                );

                //if there is offer for chatid set the getting call flag

                if (newCall && newCall?.offer && !connecting.current) {
                  console.log('data?.offer');
                  setGettingCall(true);
                  dispatch({
                    type: 'SET_INCOMING_USER_NAME',
                    payload: newCall.callerName,
                  });
                }
              }
              //  else if (change.type === 'removed') {
              //   console.log('----------removed', DeviceInfo.getDeviceId());

              //   hangup();
              // }
            });
          });

        return () => {
          console.log('unsubscribe');

          unsubscribe && unsubscribe();
        };
      } catch (e) {
        console.log(e);
      }
    }
  }, [listenToNewCalls]);

  useEffect(() => {
    if (fbRef) {
      //listen to answer call and update remote
      const unSubscribeAnswer = fbRef?.onSnapshot(snap => {
        if (snap.exists) {
          const newCall = snap.data();
          console.log(
            'Call updated:-------------',
            pc.current !== null,
            !pc.current?.remoteDescription,
            newCall.answer !== null,
          );

          // Check if the call has been answered

          if (
            pc.current &&
            !pc.current?.remoteDescription &&
            newCall &&
            newCall.answer
          ) {
            console.log('answer ------------');

            pc.current?.setRemoteDescription(
              new RTCSessionDescription(newCall?.answer),
            );
          }
        }
      });

      //hangup call when other hanguped
      const subscribeDelete = fbRef
        ?.collection('callee')
        .onSnapshot(snapshot => {
          snapshot?.docChanges().forEach(change => {
            console.log("change.type === 'removed'", change.type === 'removed');

            if (change.type === 'removed') {
              hangup();
            }
          });
        });

      const subscribeDeleteCaller = fbRef
        ?.collection('caller')
        .onSnapshot(snapshot => {
          snapshot?.docChanges().forEach(change => {
            console.log("change.type === 'removed'", change.type === 'removed');

            if (change.type === 'removed') {
              hangup();
            }
          });
        });

      return () => {
        subscribeDelete && subscribeDelete();
        unSubscribeAnswer && unSubscribeAnswer();
        subscribeDeleteCaller && subscribeDeleteCaller();
      };
    }
  }, [fbRef]);

  const setupWebRTC = async () => {
    try {
      pc.current = new RTCPeerConnection(peerConstraints);
      //get voice and video stream

      const videoStreamManager = VideoStreamManager.getInstance();

      const stream = await videoStreamManager.getStream(false, true);

      if (stream) {
        setLocalStream(stream);
        stream.getTracks().forEach(track => {
          pc.current?.addTrack(track, stream);
        });
      }

      // get remote stream
      if (pc.current) {
        pc.current.ontrack = event => {
          // Grab the remote track from the connected participant.
          const remoteStream = new MediaStream();
          event.streams[0].getTracks().forEach(track => {
            remoteStream.addTrack(track);
            console.log('remote add track -----------');
          });

          setRemoteStream(remoteStream);
        };
      }
    } catch (e) {
      console.log('error', e);
    }
  };
  const create = async () => {
    try {
      setlistenToNewCalls(false);
      console.log('calling');
      connecting.current = true;
      await setupWebRTC();

      const fbRef = await getFirebaseRef();
      setfbRef(fbRef);
      // exchange the ICE candidates between the caller and the callee
      await collectionIceCandidates(fbRef, 'caller', 'callee');
      if (pc.current) {
        // create the offer for the call
        //store the offer under the document
        const offer = await pc.current?.createOffer();
        pc.current?.setLocalDescription(offer);

        const cWithOffer = {
          offer: {
            type: offer.type,
            sdp: offer.sdp,
          },
          status: 'pending',
          callerId: DeviceInfo.getDeviceId(),
          callerName: name,
        };

        fbRef.set(cWithOffer);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const join = async () => {
    console.log('join');
    setlistenToNewCalls(false);
    connecting.current = true;
    setGettingCall(false);

    try {
      const offer = (await fbRef.get())?.data()?.offer;

      if (offer) {
        await setupWebRTC();
        //exchange the ice candidates
        //chaeck the parameters , its reversed. since the claiing part is callee
        await collectionIceCandidates(fbRef, 'callee', 'caller');
        if (pc.current) {
          pc.current?.setRemoteDescription(new RTCSessionDescription(offer));
          //create answer for the call
          //update doc with answer

          const answer = await pc.current?.createAnswer();
          pc.current?.setLocalDescription(answer);

          const cWithAnswer = {
            answer: {
              type: answer.type,
              sdp: answer.sdp,
            },
            status: 'answered',
          };
          console.log('offer and answer');
          fbRef.update(cWithAnswer);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  //cleanup
  const hangup = async () => {
    console.log('hangup -----------', DeviceInfo.getDeviceId());
    dispatch({
      type: 'SET_INCOMING_USER_NAME',
      payload: '',
    });
    setGettingCall(false);
    connecting.current = false;
    await streamCleanup();

    await firestoreCleanup();
    if (pc.current) {
      await pc.current?.close();
    }
    setlistenToNewCalls(true);
  };

  const hangupAndCallAgain = async () => {
    dispatch({
      type: 'SET_INCOMING_USER_NAME',
      payload: '',
    });
    console.log('hangupAndCallAgain -----------');
    setGettingCall(false);
    connecting.current = false;
    await streamCleanup();

    await firestoreCleanup();
    if (pc.current) {
      await pc.current?.close();
    }
    setlistenToNewCalls(false);
  };

  const declineIncomingCall = () => {
    console.log('declineIncomingCall -----------');
    dispatch({
      type: 'SET_INCOMING_USER_NAME',
      payload: '',
    });
    setGettingCall(false);
    connecting.current = false;
    setlistenToNewCalls(false);

    const time = setTimeout(() => {
      setlistenToNewCalls(true);
      clearTimeout(time);
    }, 500);
  };

  const streamCleanup = async () => {
    // if (localStream) {
    //   localStream.getTracks().forEach(t => t.stop());
    //   // Stop all video tracks
    //   localStream.getVideoTracks().forEach(track => track.stop());
    //   // Stop all audio tracks
    //   localStream.getAudioTracks().forEach(track => track.stop());
    //   localStream.release();
    // }

    // setLocalStream(null);
    setRemoteStream(null);
  };
  const firestoreCleanup = async () => {
    if (fbRef) {
      const calleeCandidate = await fbRef.collection('callee').get();
      calleeCandidate.forEach(async candidate => {
        await candidate.ref.delete();
      });

      const callerCandidate = await fbRef.collection('caller').get();
      callerCandidate.forEach(async candidate => {
        await candidate.ref.delete();
      });
      fbRef.delete();
      setfbRef(null);
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
    hangupAndCallAgain,
    declineIncomingCall,
    connecting,
  };
};

export default useMainScreen;
