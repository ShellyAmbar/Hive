import {useCallback, useEffect, useState} from 'react';
import VideoStreamManager from '@hive/utils/stream-util';
import {AppState} from 'react-native';
import {MediaStream} from 'react-native-webrtc';
import {persistor} from '@hive/store';

const useStream = ({
  onBackground,
  onFront,
  isListenToAppState = false,
}: {
  onBackground?: () => void;
  onFront?: () => void;
  isListenToAppState?: boolean;
}) => {
  const [localStream, setLocalStream] = useState<null | MediaStream>(null);

  const loadVideo = useCallback(async (isFront: boolean) => {
    try {
      const videoStreamManager = VideoStreamManager.getInstance();
      const videoStream = await videoStreamManager.getStream(false, isFront);

      setLocalStream(videoStream);
      return videoStream;
    } catch (e) {
      // console.log(e);
    }
  }, []);

  useEffect(() => {
    loadVideo(true);
    if (isListenToAppState) {
      const subscription = AppState.addEventListener(
        'change',
        async nextAppState => {
          if (nextAppState === 'background') {
            // console.log('background');

            persistor.persist();
            persistor.flush();
            const videoStreamManager = VideoStreamManager.getInstance();
            videoStreamManager.stopStream();
            onBackground && onBackground();
          } else if (nextAppState === 'active') {
            // console.log('active');

            loadVideo(true);
            onFront && onFront();
          }
        },
      );

      return () => {
        subscription.remove();
      };
    }
  }, []);

  return {
    localStream,
    loadVideo,
  };
};

export default useStream;
