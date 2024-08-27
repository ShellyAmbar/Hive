import {MediaStream} from 'react-native-webrtc';

interface IGettingCall {
  hangup: () => void;
  join: () => void;
  localStream?: MediaStream | null;
}

export default IGettingCall;
