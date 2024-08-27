import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const chooseImageFromGallery = (
  onResult: (uri: string) => void,
  onErr: (err: string) => void,
) => {
  const options = {
    mediaType: 'photo',
    quality: 1,
  };

  launchImageLibrary(options, response => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
      onErr('User cancelled image picker');
    } else if (response.errorCode) {
      console.log('ImagePicker Error: ', response.errorMessage);
      onErr('ImagePicker Error: ' + response.errorMessage);
    } else {
      onResult(response.assets[0].uri);
    }
  });
};

const takePicture = (
  onResult: (uri: string) => void,
  onErr: (err: string) => void,
) => {
  const options = {
    mediaType: 'photo',
    quality: 1,
  };

  launchCamera(options, response => {
    if (response.didCancel) {
      console.log('User cancelled camera picker');
      onErr('User cancelled camera picker');
    } else if (response.errorCode) {
      console.log('Camera Error: ', response.errorMessage);
      onErr('Camera Error: ' + response.errorMessage);
    } else {
      onResult(response.assets[0].uri);
    }
  });
};

export {chooseImageFromGallery, takePicture};
