import {mediaDevices} from 'react-native-webrtc';

class VideoStreamManager {
  static instance = null;
  stream = null;
  constructor() {
    if (VideoStreamManager.instance) {
      return VideoStreamManager.instance;
    }
    VideoStreamManager.instance = this;
  }

  static getInstance() {
    if (!VideoStreamManager.instance) {
      VideoStreamManager.instance = new VideoStreamManager();
    }
    return VideoStreamManager.instance;
  }

  async getStream(isVoiceOnly: boolean, isFront: boolean) {
    if (!this.stream) {
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
          width: 640, // Adjust resolution
          height: 480,
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
      // if (mediaStream && mediaStream.getVideoTracks().length > 0) {
      //   return mediaStream;
      // }

      return null;
    }
    return this.stream;
  }
  stopStream() {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
  }
}

export default VideoStreamManager;
