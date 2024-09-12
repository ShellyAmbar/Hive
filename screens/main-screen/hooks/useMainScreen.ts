import {useCallback, useEffect, useRef, useState} from 'react';

import {
  MediaStream,
  RTCIceCandidate,
  RTCPeerConnection,
  RTCSessionDescription,
} from 'react-native-webrtc';

import firestore, {
  doc,
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import DeviceInfo from 'react-native-device-info';
import {useDispatch, useSelector} from 'react-redux';
import useStream from '@hive/hooks/useStream';
import {
  setIncomingUserAge,
  setIncomingUserCountry,
  setIncomingUserImage,
  setIncomingUserName,
  setIncomingUserGender,
  setMyUserId,
  setIsShowMyAnimation,
  setMySelectedAnimation,
} from '@hive/store/reducers/user';
import {getData, storeData} from '@hive/utils/asyncstorage';

const peerConstraints = {
  iceServers: [
    {
      urls: 'stun:stun.l.google.com:19302',
    },
  ],
};
const useMainScreen = () => {
  const [remoteStream, setRemoteStream] = useState<null | MediaStream>();
  const [gettingCall, setGettingCall] = useState(false);
  const isGettingCall = useRef(false);
  const listenToNewCallsRef = useRef(true);
  const isInCallRef = useRef(false);
  const lastCallerIdRef = useRef(null);
  const pc = useRef<RTCPeerConnection>();
  const connecting = useRef(false);
  const [fbRef, setfbRef] = useState(null);
  const firebaseRef = useRef(null);
  const {
    myName: name,
    myImage: image,
    myAge,
    myCountry,
    isMyLimitedCountry: isLimitedCountry,
    myLimitedCountry: limitedCountry,
    myLimitedAges: limitedAges,
    myUserId,
    myGender,
    myOtherGender,
    isMyLimitedUserGender,
    otherUserSelectedAnimation,
    isShowOtherUserAnimation,
  } = useSelector(state => state.user);
  const [deviceId, setDeviceId] = useState('');
  const [startListenToPending, setstartListenToPending] = useState(true);
  const dispatch = useDispatch();
  const [isFront, setisFront] = useState(true);
  const [isHideMe, setIsHideMe] = useState(true);
  const [isHideUser, setIsHideUser] = useState(true);

  useEffect(() => {
    const updateWithAnimationObj = {
      selectedAnimation: otherUserSelectedAnimation,
      isShowAnimation: isShowOtherUserAnimation,
      animationSenderId: deviceId,
    };
    fbRef?.update(updateWithAnimationObj);
  }, [otherUserSelectedAnimation, isShowOtherUserAnimation, fbRef, deviceId]);

  useEffect(() => {
    updateHide(isHideMe);
  }, [isHideMe]);

  const {localStream, loadVideo} = useStream({
    onBackground: async () => {
      // Persist manually when app goes to background

      if (isInCallRef.current) {
        hangup();
      } else {
        if (isGettingCall.current) {
          declineIncomingCall();
        } else {
          hangup();
        }
      }
    },
    onFront: () => {},
  });

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
      const id = await DeviceInfo.getUniqueId();
      setDeviceId(id);
      dispatch(setMyUserId(id));
    })();
  }, []);

  useEffect(() => {
    if (deviceId?.length > 0) {
      try {
        //listen to new incoming calls that is not mine

        const query = firestore()
          .collection('meet')
          .orderBy('date', 'asc')
          .where('status', '==', 'pending')
          .where('callerId', '!=', deviceId)
          .where('callerAge', '<=', limitedAges[1])
          .where('callerAge', '>=', limitedAges[0]);

        const filterCountry = isLimitedCountry
          ? query.where('callerCountry', '==', limitedCountry)
          : query;

        // callerGender: myGender,
        // callerOtherUserGender: myOtherGender,
        // callerIsLimitedUserGender: isMyLimitedUserGender,

        const filterGender = isMyLimitedUserGender
          ? filterCountry.where('callerGender', '==', myOtherGender)
          : filterCountry;

        const unsubscribe = filterGender.onSnapshot(snap => {
          snap?.docChanges().forEach(change => {
            if (change.type === 'added') {
              //on answer start call
              const newCall = change.doc.data();

              if (
                listenToNewCallsRef.current &&
                // (!lastCallerIdRef.current ||
                //   lastCallerIdRef.current === undefined ||
                //   newCall.callerId !== lastCallerIdRef.current) &&
                newCall &&
                newCall?.offer &&
                !connecting.current &&
                (newCall.callerIsLimitedCountry
                  ? newCall.callerLimitedCountry === myCountry
                  : true) &&
                (newCall.callerIsLimitedUserGender
                  ? newCall.callerOtherUserGender === myGender
                  : true) &&
                myAge <= newCall.callerLimitedAges[1] &&
                myAge >= newCall.callerLimitedAges[0]
              ) {
                setfbRef(change.doc.ref);
                firebaseRef.current = change.doc.ref;
                lastCallerIdRef.current = newCall.callerId;
                //if there is offer for chatid set the getting call flag

                //   if (newCall && newCall?.offer && !connecting.current) {
                setstartListenToPending(false);
                listenToNewCallsRef.current = false;
                setGettingCall(true);
                isGettingCall.current = true;
                dispatch(setIncomingUserName(newCall.callerName));
                dispatch(setIncomingUserImage(newCall.callerImage));
                dispatch(setIncomingUserAge(newCall.callerAge));
                dispatch(setIncomingUserCountry(newCall.callerCountry));
                dispatch(setIncomingUserGender(newCall.callerGender));

                storeData('incomingUserId', newCall.callerId);

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
            !isInCallRef.current &&
            newCall?.calleeAge <= limitedAges[1] &&
            newCall?.calleeAge >= limitedAges[0] &&
            (isLimitedCountry
              ? limitedCountry === newCall?.calleeCountry
              : true)
          ) {
            //listenToNewCallsRef.current = false;
            isInCallRef.current = true;
            pc.current?.setRemoteDescription(
              new RTCSessionDescription(newCall?.answer),
            );

            dispatch(setIncomingUserName(newCall?.calleeName ?? ''));
            dispatch(setIncomingUserImage(newCall?.calleeImage ?? ''));
            dispatch(setIncomingUserAge(newCall?.calleeAge));
            dispatch(setIncomingUserCountry(newCall?.calleeCountry));
          }
          // hide users
          const callerId = newCall.callerId;

          if (newCall && deviceId === callerId) {
            setIsHideUser(newCall.isHideCallee);
          } else {
            setIsHideUser(newCall.isHideCaller);
          }

          //add animation

          if (newCall.isShowAnimation && newCall.selectedAnimation) {
            if (newCall.animationSenderId !== deviceId) {
              dispatch(setIsShowMyAnimation(true));
              dispatch(setMySelectedAnimation(newCall.selectedAnimation));
            }
          }
        } else {
          if (isInCallRef.current) {
            hangup();
          } else {
            if (isGettingCall.current) {
              declineIncomingCall();
            }
          }
        }
      });

      return () => {
        unSubscribeAnswer && unSubscribeAnswer();
      };
    }
  }, [fbRef]);

  const setupWebRTC = async () => {
    try {
      pc.current = new RTCPeerConnection(peerConstraints);
      //get voice and video stream

      const stream = await loadVideo(true);

      if (stream) {
        stream.getTracks().forEach(track => {
          pc.current?.addTrack(track, stream);
        });
      }

      // get remote stream
      if (pc.current) {
        pc.current.ontrack = event => {
          // Grab the remote track from the connected participant.
          const remoteStream = new MediaStream();
          event.streams[0].getTracks().forEach(async track => {
            await remoteStream.addTrack(track);
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

      storeData('incomingUserId', null);
      await setupWebRTC();

      const myRef = await getFirebaseRef();

      setfbRef(myRef);
      firebaseRef.current = myRef;

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
          callerCountry: myCountry,
          callerIsLimitedCountry: isLimitedCountry,
          callerLimitedCountry: limitedCountry,
          callerLimitedAges: limitedAges,
          date: Date.now(),
          callerGender: myGender,
          callerOtherUserGender: myOtherGender,
          callerIsLimitedUserGender: isMyLimitedUserGender,
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
    isGettingCall.current = false;
    isInCallRef.current = true;

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
            calleeCountry: myCountry,
            calleeGender: myGender,
            calleeOtherUserGender: myOtherGender,
            calleeIsLimitedUserGender: isMyLimitedUserGender,
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
      listenToNewCallsRef.current = true;
      connecting.current = false;
      isInCallRef.current = false;
      dispatch(setIncomingUserName(''));
      dispatch(setIncomingUserImage(''));
      dispatch(setIncomingUserAge(0));
      dispatch(setIncomingUserCountry(''));

      setGettingCall(false);
      isGettingCall.current = false;

      streamCleanup();
      firestoreCleanup();
      if (pc.current) {
        pc.current?.close();
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
    if (!listenToNewCallsRef.current) {
      listenToNewCallsRef.current = true;
      connecting.current = false;

      dispatch(setIncomingUserName(''));
      dispatch(setIncomingUserImage(''));
      dispatch(setIncomingUserAge(0));
      dispatch(setIncomingUserCountry(''));

      storeData('incomingUserId', null);

      if (pc.current) {
        pc.current?.close();
      }
      streamCleanup();
      setGettingCall(false);
      isGettingCall.current = false;

      setfbRef(null);
      firebaseRef.current = null;
      setstartListenToPending(true);
    }
  };

  const streamCleanup = async () => {
    setRemoteStream(null);
  };
  const firestoreCleanup = async () => {
    if (firebaseRef.current) {
      try {
        const incomingUserIdFromStorage = await getData('incomingUserId');
        console.log(
          'incomingUserId hangup',
          incomingUserIdFromStorage,
          myUserId,
        );

        if (incomingUserIdFromStorage) {
          await doc(
            firestore(),
            'meet',
            `chatId-${incomingUserIdFromStorage}`,
          ).delete();

          storeData('incomingUserId', null);
        } else {
          await doc(firestore(), 'meet', `chatId-${myUserId}`).delete();
        }

        setfbRef(null);
        firebaseRef.current = null;
      } catch (e) {
        console.log(e);
      }
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
