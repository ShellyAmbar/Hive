import {useCallback, useEffect, useRef, useState} from 'react';

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
  const listenToNewCallsRef = useRef(true);
  const isInCallRef = useRef(false);
  const lastCallerIdRef = useRef(null);
  const pc = useRef<RTCPeerConnection>();
  const connecting = useRef(false);
  const [fbRef, setfbRef] = useState(null);
  const {name, image, myAge} = useSelector(state => state.user);
  const [deviceId, setDeviceId] = useState('');
  const [startListenToPending, setstartListenToPending] = useState(true);
  const dispatch = useDispatch();
  const [isFront, setisFront] = useState(true);
  const [isHideMe, setIsHideMe] = useState(true);
  const [isHideUser, setIsHideUser] = useState(true);

  useEffect(() => {
    updateHide(isHideMe);
  }, [isHideMe]);

  const loadVideo = useCallback(
    async (isFront: boolean) => {
      try {
        const videoStreamManager = VideoStreamManager.getInstance();
        const videoStream = await videoStreamManager.getStream(false, isFront);

        setLocalStream(videoStream);
        return videoStream;
      } catch (e) {
        console.log(e);
      }
    },
    [setLocalStream],
  );

  const switchCamera = useCallback(async () => {
    const newStream = await loadVideo(isFront ? false : true);
    // Replace the existing video track with the new one
    const videoTrack = newStream.getVideoTracks()[0];
    const sender = pc.current.getSenders().find(s => s.track.kind === 'video');
    if (sender) {
      sender.replaceTrack(videoTrack);
    }
    pc.current.ontrack = event => {
      // Update the remote stream when a new track is received
      const remoteStream = event.streams[0];
      setRemoteStream(remoteStream); // Update your state or UI as needed
    };

    setisFront(prev => {
      return !prev;
    });
  }, [isFront]);

  const getFirebaseRef = async () => {
    const myRef = firestore()
      .collection('meet')
      .doc('chatId-' + deviceId);

    return myRef;
  };

  useEffect(() => {
    (async () => {
      loadVideo(true);

      const id = await DeviceInfo.getUniqueId();
      setDeviceId(id);
    })();

    return () => {
      hangup();
    };
  }, []);

  useEffect(() => {
    if (deviceId?.length > 0) {
      try {
        //listen to new incoming calls that is not mine

        const unsubscribe = firestore()
          .collection('meet')
          .where('status', '==', 'pending')
          .where('callerId', '!=', deviceId)
          .onSnapshot(snap => {
            snap.docChanges().forEach(change => {
              if (change.type === 'added') {
                //on answer start call
                const newCall = change.doc.data();
                console.log(
                  'new call added -----',
                  name,
                  newCall.callerName,
                  newCall.callerId,
                  lastCallerIdRef.current,
                );
                if (
                  listenToNewCallsRef.current &&
                  (!lastCallerIdRef.current ||
                    lastCallerIdRef.current === undefined ||
                    newCall.callerId !== lastCallerIdRef.current) &&
                  newCall &&
                  newCall?.offer &&
                  !connecting.current
                ) {
                  console.log(
                    'new call',
                    name,
                    newCall.callerName,
                    newCall.callerId,
                    lastCallerIdRef.current,
                  );

                  setfbRef(change.doc.ref);
                  lastCallerIdRef.current = newCall.callerId;
                  //if there is offer for chatid set the getting call flag

                  //   if (newCall && newCall?.offer && !connecting.current) {
                  setstartListenToPending(false);
                  listenToNewCallsRef.current = false;
                  setGettingCall(true);

                  dispatch({
                    type: 'SET_INCOMING_USER_NAME',
                    payload: newCall.callerName,
                  });
                  dispatch({
                    type: 'SET_INCOMING_USER_IMAGE',
                    payload: newCall.callerImage,
                  });
                  dispatch({
                    type: 'SET_INCOMING_USER_AGE',
                    payload: newCall.callerAge,
                  });
                  //   }
                }
              }
            });
          });

        return () => {
          unsubscribe && unsubscribe();
        };
      } catch (e) {
        console.log('error---', e);
      }
    }
  }, [deviceId, startListenToPending]);

  useEffect(() => {
    if (fbRef !== null) {
      //listen to answer call and update remote
      const unSubscribeAnswer = fbRef?.onSnapshot(snap => {
        if (snap.exists) {
          const newCall = snap.data();
          //if call has been answered by someone else
          if (
            newCall.status === 'answered' &&
            newCall.callerId !== deviceId &&
            newCall.calleeId !== null &&
            newCall.calleeId !== deviceId
          ) {
            declineIncomingCall();
          }

          // Check if the call has been answered

          if (
            pc.current &&
            !pc.current?.remoteDescription &&
            newCall &&
            newCall.answer &&
            newCall.callerId === deviceId &&
            !isInCallRef.current
          ) {
            console.log('updating answer ------', name);

            //listenToNewCallsRef.current = false;
            isInCallRef.current = true;
            pc.current?.setRemoteDescription(
              new RTCSessionDescription(newCall?.answer),
            );

            dispatch({
              type: 'SET_INCOMING_USER_NAME',
              payload: newCall?.calleeName ?? '',
            });
            dispatch({
              type: 'SET_INCOMING_USER_IMAGE',
              payload: newCall?.calleeImage ?? '',
            });
            dispatch({
              type: 'SET_INCOMING_USER_AGE',
              payload: newCall?.calleeAge ?? '',
            });
          }

          const callerId = newCall.callerId;
          const calleeId = newCall.calleeId;
          if (newCall && deviceId === callerId) {
            setIsHideUser(newCall.isHideCallee);
          } else {
            setIsHideUser(newCall.isHideCaller);
          }
        }
      });

      //hangup call when other hanguped and i'm the caller
      const subscribeDelete = fbRef
        ?.collection('callee')
        .onSnapshot(snapshot => {
          snapshot?.docChanges().forEach(change => {
            if (change.type === 'removed') {
              hangup();
            }
          });
        });
      // hangup call when other hanguped and he is the caller

      const subscribeDeleteCaller = fbRef
        ?.collection('caller')
        .onSnapshot(snapshot => {
          snapshot?.docChanges().forEach(change => {
            if (change.type === 'removed' && snapshot.size === 0) {
              declineIncomingCall();
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
      setstartListenToPending(false);
      listenToNewCallsRef.current = false;
      connecting.current = true;

      await setupWebRTC();

      const myRef = await getFirebaseRef();

      setfbRef(myRef);

      // exchange the ICE candidates between the caller and the callee
      await collectionIceCandidates(myRef, 'caller', 'callee');
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
          callerId: deviceId,
          callerName: name,
          callerImage: image ? image : '',
          isHideCaller: true,
          callerAge: myAge,
        };

        myRef.set(cWithOffer);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const join = async () => {
    setstartListenToPending(false);
    listenToNewCallsRef.current = false;
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
            calleeId: deviceId,
            isHideCallee: true,
            calleeName: name,
            calleeImage: image ? image : '',
            calleeAge: myAge,
          };

          fbRef.update(cWithAnswer);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const updateHide = async (isHide: boolean) => {
    const callerId = (await fbRef?.get())?.data().callerId;
    const calleeId = (await fbRef?.get())?.data().calleeId;
    if (deviceId === callerId || deviceId === calleeId) {
      const key = deviceId === callerId ? 'isHideCaller' : 'isHideCallee';
      const updateObject = {
        [key]: isHide,
      };
      fbRef?.update(updateObject);
    }
  };

  //cleanup
  const hangup = async () => {
    if (connecting.current) {
      console.log('hangup ------------', name);
      listenToNewCallsRef.current = true;
      connecting.current = false;
      isInCallRef.current = false;
      dispatch({
        type: 'SET_INCOMING_USER_NAME',
        payload: '',
      });
      dispatch({
        type: 'SET_INCOMING_USER_IMAGE',
        payload: '',
      });
      dispatch({
        type: 'SET_INCOMING_USER_AGE',
        payload: 0,
      });
      setGettingCall(false);

      await streamCleanup();
      await firestoreCleanup();
      if (pc.current) {
        await pc.current?.close();
      }
      setstartListenToPending(true);
      setIsHideMe(true);
      if (!isFront) {
        setisFront(true);
        loadVideo(true);
      }
    }
  };

  const declineIncomingCall = async () => {
    console.log('declineIncomingCall ------------', name);

    if (!listenToNewCallsRef.current) {
      listenToNewCallsRef.current = true;
      connecting.current = false;
      dispatch({
        type: 'SET_INCOMING_USER_NAME',
        payload: '',
      });
      dispatch({
        type: 'SET_INCOMING_USER_IMAGE',
        payload: '',
      });

      if (pc.current) {
        pc.current?.close();
      }
      streamCleanup();
      setGettingCall(false);

      setfbRef(null);
      setstartListenToPending(true);
    }
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
    declineIncomingCall,
    connecting,
    startListenToPending,
    switchCamera,
    isFront,
    setIsHideMe,
    isHideMe,
    isHideUser,
  };
};

export default useMainScreen;
