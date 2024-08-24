import {
  ScreenCapturePickerView,
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCView,
  MediaStream,
  MediaStreamTrack,
  mediaDevices,
  registerGlobals,
} from 'react-native-webrtc';

const getStream = async (isVoiceOnly: boolean, isFront: boolean) => {
  const sourceInfos = await mediaDevices.enumerateDevices();
  let videoSourceId;
  for (let i = 0; i < sourceInfos.length; i++) {
    const sourceInfo = sourceInfos[i];
    if (
      sourceInfo.kind === 'videoinput' &&
      sourceInfo.facing === (isFront ? 'user' : 'environment')
    ) {
      videoSourceId = sourceInfo.deviceId;
    }
  }

  const mediaStream = await mediaDevices.getUserMedia({
    audio: true,
    video: {
      height: 640,
      width: 480,
      frameRate: 30,
      facingMode: isFront ? 'user' : 'environment',
      deviceId: videoSourceId,
    },
  });

  if (isVoiceOnly) {
    let videoTrack = await mediaStream.getVideoTracks()[0];
    videoTrack.enabled = false;
  }

  if (typeof mediaStream !== 'boolean') return mediaStream;
  return null;
};

export {getStream};
