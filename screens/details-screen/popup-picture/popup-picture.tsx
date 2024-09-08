import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Popup from 'rn-sliding-popup';
import styles from './popup-picture.styles';
import Spacer from '@hive/components/spacer/spacer';
import {chooseImageFromGallery, takePicture} from '@hive/utils/image-util';
const PopupPicture = ({
  onPressTakePicture,
  onPressUploadFromGalery,
  onPressClose,
  isVisible,
  onError,
  setVisible,
}: {
  onPressTakePicture: (uri: string) => void;
  onPressUploadFromGalery: (uri: string) => void;
  onPressClose: () => void;
  isVisible: boolean;
  onError: (e) => void;
  setVisible: (visible: boolean) => void;
}) => {
  return (
    <Popup
      durationEnter={500}
      durationExit={500}
      isCancelable={true}
      isVisible={isVisible}
      onClickClose={() => onPressClose()}>
      <View>
        <TouchableOpacity
          style={styles.btnChoose}
          onPress={() => {
            setVisible(false);
            chooseImageFromGallery(
              uri => {
                onPressUploadFromGalery(uri);
              },
              err => {
                onError(err);
              },
            );
          }}>
          <Text style={styles.textChoose}>{'Upload from library'}</Text>
        </TouchableOpacity>
        <Spacer size={12} />
        <TouchableOpacity
          style={styles.btnChoose}
          onPress={() => {
            setVisible(false);
            takePicture(
              uri => {
                onPressTakePicture(uri);
              },
              err => {
                onError(err);
              },
            );
          }}>
          <Text style={styles.textChoose}>{'Take new image'}</Text>
        </TouchableOpacity>
      </View>
    </Popup>
  );
};

export default PopupPicture;
