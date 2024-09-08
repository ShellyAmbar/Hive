import {deleteObject, getDownloadURL, uploadBytes} from 'firebase/storage';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {storage, ref as storegeRef} from '@hive/firebase-config';
const chooseImageFromGallery = (
  onResult: (uri: string) => void,
  onEror: (err: string) => void,
) => {
  const options = {
    mediaType: 'photo',
    quality: 1,
  };

  launchImageLibrary(options, response => {
    if (response.didCancel) {
      onEror('User cancelled image picker');
    } else if (response.errorCode) {
      onEror('ImagePicker Error: ' + response.errorMessage);
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
      onErr('User cancelled camera picker');
    } else if (response.errorCode) {
      onErr('Camera Error: ' + response.errorMessage);
    } else {
      onResult(response.assets[0].uri);
    }
  });
};

const getImagePathOnCloude = (itemId: string, userId: string) => {
  return `images/${userId}/${itemId}.jpg`;
};

const deleteImagePath = async (imageId: string, userId: string) => {
  try {
    const imagePath = getImagePathOnCloude(imageId, userId);
    // Create a reference to the file to delete
    const storageRef = storegeRef(storage, imagePath);
    const uri = await getDownloadURL(storageRef);
    //check if file exist
    if (uri) {
      await deleteObject(storageRef);
    }
  } catch (error) {
    console.error('Error deleting image: ', error);
  }
};
const uploadImageToCloude = async (
  imageId: string,
  userId: string,
  fileUri: any,
) => {
  const metadata = {
    contentType: 'image/jpeg',
  };
  const imagePath = getImagePathOnCloude(imageId, userId);

  try {
    const response = await fetch(fileUri);
    const blob = await response.blob();

    const storageRef = storegeRef(storage, imagePath);
    await uploadBytes(storageRef, blob, metadata);
  } catch (error) {
    console.error('Error uploading file:', error);
  }
};

const dounloadImageFromStorage = async (imageId: string, userId: string) => {
  const storageRef = storegeRef(storage, getImagePathOnCloude(imageId, userId));
  const uri = await getDownloadURL(storageRef);

  return uri;
};

export {
  chooseImageFromGallery,
  takePicture,
  dounloadImageFromStorage,
  uploadImageToCloude,
  deleteImagePath,
};
