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
  const pc = useRef<RTCPeerConnection>();
  const connecting = useRef(false);
  const fireBaseRef = useRef(null);
  const [fbRef, setfbRef] = useState(null);
  const {name, image} = useSelector(state => state.user);
  const [deviceId, setDeviceId] = useState('');
  const [startListenToPending, setstartListenToPending] = useState(true);
  const dispatch = useDispatch();
  const getFirebaseRef = async () => {
    const myRef = firestore()
      .collection('meet')
      .doc('chatId-' + deviceId);
    console.log('my    id -------', deviceId);

    return myRef;
  };

  const loadData = useCallback(async () => {
    const videoStreamManager = VideoStreamManager.getInstance();
    try {
      console.log('loading data');

      const videoStream = await videoStreamManager.getStream(false, true);

      setLocalStream(videoStream);
      const id = await DeviceInfo.getUniqueId();
      setDeviceId(id);
    } catch (error) {
      console.error('Failed to get stream:', error);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

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
              console.log(
                'listen to new incoming calls that is not mine',
                change.type,
              );
              if (change.type === 'added') {
                console.log(
                  'added call ------------',
                  'myId--------------',
                  deviceId,
                  'islistening',
                  startListenToPending,
                );

                //on answer start call
                if (startListenToPending) {
                  console.log(
                    'incoming calll ------------',
                    'listenToNewCalls',
                    deviceId,
                    startListenToPending,
                    'connecting',
                    connecting.current,
                    name,
                  );

                  const newCall = change.doc.data();

                  fireBaseRef.current = change.doc.ref;
                  setfbRef(change.doc.ref);

                  //if there is offer for chatid set the getting call flag

                  if (newCall && newCall?.offer && !connecting.current) {
                    console.log('data?.offer');
                    listenToNewCallsRef.current = false;
                    setGettingCall(true);
                    dispatch({
                      type: 'SET_INCOMING_USER_NAME',
                      payload: newCall.callerName,
                    });
                    dispatch({
                      type: 'SET_INCOMING_USER_IMAGE',
                      payload: newCall.image,
                    });
                  }
                }
              }
            });
          });

        return () => {
          console.log('unsubscribe');

          unsubscribe && unsubscribe();
        };
      } catch (e) {
        console.log('error---', e);
      }
    }
  }, [deviceId, startListenToPending]);

  useEffect(() => {
    if (fbRef !== null) {
      console.log('listen to answer call and update remote');

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
            console.log('call has been answered by :  ', newCall.callerId);

            declineIncomingCall();
          }

          // Check if the call has been answered

          if (
            pc.current &&
            !pc.current?.remoteDescription &&
            newCall &&
            newCall.answer &&
            newCall.callerId === deviceId
          ) {
            //listenToNewCallsRef.current = false;
            console.log(
              deviceId + 'someone answered to my call  ------------',
              deviceId,
              newCall.calleeId,
            );

            pc.current?.setRemoteDescription(
              new RTCSessionDescription(newCall?.answer),
            );
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
      setstartListenToPending(false);
      listenToNewCallsRef.current = false;
      connecting.current = true;
      console.log('calling--------');

      await setupWebRTC();

      const myRef = await getFirebaseRef();
      fireBaseRef.current = myRef;
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
          image: image ? image : '',
        };

        myRef.set(cWithOffer);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const join = async () => {
    console.log('join');
    setstartListenToPending(false);
    listenToNewCallsRef.current = false;
    connecting.current = true;
    setGettingCall(false);

    try {
      const offer = (await fireBaseRef.current.get())?.data()?.offer;

      if (offer) {
        await setupWebRTC();
        //exchange the ice candidates
        //chaeck the parameters , its reversed. since the claiing part is callee
        await collectionIceCandidates(fireBaseRef.current, 'callee', 'caller');
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
          };
          console.log('offer and answer');
          fireBaseRef.current.update(cWithAnswer);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  //cleanup
  const hangup = async () => {
    if (connecting.current) {
      listenToNewCallsRef.current = true;
      connecting.current = false;

      console.log('hangup--------------');

      dispatch({
        type: 'SET_INCOMING_USER_NAME',
        payload: '',
      });
      dispatch({
        type: 'SET_INCOMING_USER_IMAGE',
        payload: '',
      });
      setGettingCall(false);

      await streamCleanup();

      await firestoreCleanup();
      if (pc.current) {
        await pc.current?.close();
      }
      setstartListenToPending(true);
    }
  };

  const declineIncomingCall = () => {
    if (!listenToNewCallsRef.current) {
      console.log('declineIncomingCall -----------');

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

      setGettingCall(false);

      fireBaseRef.current = null;
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
    if (fireBaseRef.current) {
      const calleeCandidate = await fireBaseRef.current
        .collection('callee')
        .get();
      calleeCandidate.forEach(async candidate => {
        await candidate.ref.delete();
      });

      const callerCandidate = await fireBaseRef.current
        .collection('caller')
        .get();
      callerCandidate.forEach(async candidate => {
        await candidate.ref.delete();
      });
      fireBaseRef.current.delete();
      fireBaseRef.current = null;
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
  };
};

export default useMainScreen;
