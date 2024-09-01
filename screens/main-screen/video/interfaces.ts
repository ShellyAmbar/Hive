import {MediaStream} from 'react-native-webrtc';

interface IVideoProps {
  hangup: () => void;

  localStrem: MediaStream | null;
  remoteStrem?: MediaStream | null;
  switchCamera: () => void;
  isFront: boolean;
  setIsHideMe: (isHide: boolean) => void;
  isHideMe: boolean;
  isHideUser: boolean;
}

export default IVideoProps;
