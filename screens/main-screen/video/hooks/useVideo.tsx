import {useMemo, useState} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import {GlobalColors} from '@hive/styles/colors';
import {useSelector} from 'react-redux';
import {EAnimation} from '@hive/store/reducers/user';

const useVideo = () => {
  const {
    incomingUserName,
    incomingUserImage,
    incomingUserAge,
    incomingUserCountry,
  } = useSelector(state => state.user);
  const actionButtons = useMemo(
    () => [
      {
        id: 0,
        icon: () => <Entypo name="rocket" size={20} color="#FFFF" />,
        onClick: () => {
          () => {
            setSelectedAnimation(EAnimation.ROCKET);
            setisShowAnimation(true);
          };
        },
        style: {backgroundColor: GlobalColors.Brand.secondary},
      },
      {
        id: 1,
        icon: () => <Entypo name="heart-outlined" size={20} color="#FFFF" />,

        onClick: () => {
          () => {
            setSelectedAnimation(EAnimation.HEARTS);
            setisShowAnimation(true);
          };
        },
        style: {backgroundColor: GlobalColors.Brand.secondary},
      },
      {
        id: 2,
        icon: () => <Ionicons name="flame-sharp" size={20} color="#FFFF" />,
        onClick: () => {
          () => {
            setSelectedAnimation(EAnimation.FLAMES);
            setisShowAnimation(true);
          };
        },
        style: {backgroundColor: GlobalColors.Brand.secondary},
      },
      {
        id: 3,
        icon: () => <AntDesign name="like2" size={20} color="#FFFF" />,
        onClick: () => {
          () => {
            setSelectedAnimation(EAnimation.LIKES);
            setisShowAnimation(true);
          };
        },
        style: {backgroundColor: GlobalColors.Brand.secondary},
      },
      {
        id: 4,
        icon: () => <Material name="party-popper" size={20} color="#FFFF" />,

        onClick: () => {
          () => {
            setSelectedAnimation(EAnimation.CONFETTI);
            setisShowAnimation(true);
          };
        },
        style: {backgroundColor: GlobalColors.Brand.secondary},
      },
      {
        id: 5,
        icon: () => <Material name="unicorn" size={20} color="#FFFF" />,
        onClick: () => {
          () => {
            setSelectedAnimation(EAnimation.UNICORN);
            setisShowAnimation(true);
          };
        },
        style: {backgroundColor: GlobalColors.Brand.secondary},
      },
      {
        id: 6,
        icon: () => <Ionicons name="flower-outline" size={20} color="#FFFF" />,
        onClick: () => {
          () => {
            setSelectedAnimation(EAnimation.FLOWERS);
            setisShowAnimation(true);
          };
        },
        style: {backgroundColor: GlobalColors.Brand.secondary},
      },
    ],
    [],
  );

  const [isShowAnimation, setisShowAnimation] = useState(false);
  const [selectedAnimation, setSelectedAnimation] = useState(EAnimation.NONE);

  return {
    actionButtons,
    incomingUserName,
    incomingUserImage,
    incomingUserAge,
    incomingUserCountry,
  };
};

export default useVideo;
