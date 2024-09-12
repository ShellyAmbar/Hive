import {useCallback, useEffect, useMemo, useState} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';

import {GlobalColors} from '@hive/styles/colors';
import {useDispatch, useSelector} from 'react-redux';
import {EAnimation} from '@hive/store/reducers/user';
import {
  setIsShowMyAnimation,
  setMySelectedAnimation,
  setIsShowOtherUserAnimation,
  setOtherUserSelectedAnimation,
} from '@hive/store/reducers/user';

const useVideo = () => {
  const dispatch = useDispatch();
  const {
    incomingUserName,
    incomingUserImage,
    incomingUserAge,
    incomingUserCountry,
    otherUserSelectedAnimation,
    isShowOtherUserAnimation,
    mySelectedAnimation,
    isShowMyAnimation,
  } = useSelector(state => state.user);

  const unSelectOtherAnimation = useCallback(() => {
    dispatch(setIsShowOtherUserAnimation(false));
    dispatch(setOtherUserSelectedAnimation(EAnimation.NONE));
  }, [dispatch]);
  const unSelectMyAnimation = useCallback(() => {
    dispatch(setIsShowMyAnimation(false));
    dispatch(setMySelectedAnimation(EAnimation.NONE));
  }, [dispatch]);

  const selectAnimation = useCallback(
    (animationType: EAnimation) => {
      console.log('selectAnimation', animationType);

      dispatch(setIsShowOtherUserAnimation(true));
      dispatch(setOtherUserSelectedAnimation(animationType));

      const timeout = setTimeout(() => {
        unSelectOtherAnimation();
        clearTimeout(timeout);
      }, 5000);
    },
    [dispatch, unSelectOtherAnimation],
  );

  const actionButtons = [
    {
      id: 1,
      icon: () => <Entypo name="rocket" size={20} color="#FFFF" />,
      onClick: () => {
        selectAnimation(EAnimation.ROCKET);
      },
      style: {backgroundColor: GlobalColors.Brand.secondary},
    },
    {
      id: 2,
      icon: () => <Entypo name="heart-outlined" size={20} color="#FFFF" />,

      onClick: () => {
        selectAnimation(EAnimation.HEARTS);
      },
      style: {backgroundColor: GlobalColors.Brand.secondary},
    },
    {
      id: 3,
      icon: () => <Ionicons name="flame-sharp" size={20} color="#FFFF" />,
      onClick: () => {
        selectAnimation(EAnimation.FLAMES);
      },
      style: {backgroundColor: GlobalColors.Brand.secondary},
    },
    {
      id: 4,
      icon: () => <AntDesign name="like2" size={20} color="#FFFF" />,
      onClick: () => {
        selectAnimation(EAnimation.LIKES);
      },
      style: {backgroundColor: GlobalColors.Brand.secondary},
    },
    {
      id: 5,
      icon: () => <Material name="hand-wave-outline" size={20} color="#FFFF" />,

      onClick: () => {
        selectAnimation(EAnimation.HEY);
      },
      style: {backgroundColor: GlobalColors.Brand.secondary},
    },
    {
      id: 6,
      icon: () => <Material name="unicorn" size={20} color="#FFFF" />,
      onClick: () => {
        selectAnimation(EAnimation.UNICORN);
      },
      style: {backgroundColor: GlobalColors.Brand.secondary},
    },
    {
      id: 7,
      icon: () => <FontAwesome name="money" size={20} color="#FFFF" />,
      onClick: () => {
        selectAnimation(EAnimation.MONEY);
      },
      style: {backgroundColor: GlobalColors.Brand.secondary},
    },
    {
      id: 8,
      icon: () => (
        <FontAwesome5 name="kiss-wink-heart" size={20} color="#FFFF" />
      ),
      onClick: () => {
        selectAnimation(EAnimation.KISS);
      },
      style: {backgroundColor: GlobalColors.Brand.secondary},
    },
  ];

  const getAnimationSourceFromType = useCallback(
    (animationType: EAnimation) => {
      switch (animationType) {
        case EAnimation.ROCKET:
          return require('@hive/assets/lotties/animations/missile.json');
        case EAnimation.HEY:
          return require('@hive/assets/lotties/animations/hey.json');
        case EAnimation.FLAMES:
          return require('@hive/assets/lotties/animations/flames.json');
        case EAnimation.MONEY:
          return require('@hive/assets/lotties/animations/money.json');
        case EAnimation.KISS:
          return require('@hive/assets/lotties/animations/kiss.json');
        case EAnimation.HEARTS:
          return require('@hive/assets/lotties/animations/hearts.json');
        case EAnimation.LIKES:
          return require('@hive/assets/lotties/animations/likes.json');
        case EAnimation.UNICORN:
          return require('@hive/assets/lotties/animations/unicorn.json');
        default:
          return null;
      }
    },
    [],
  );

  useEffect(() => {
    if (isShowMyAnimation) {
      const timeout = setTimeout(() => {
        unSelectMyAnimation();
        clearTimeout(timeout);
      }, 5000);
    }
  }, [mySelectedAnimation, isShowMyAnimation, unSelectMyAnimation]);

  return {
    actionButtons,
    incomingUserName,
    incomingUserImage,
    incomingUserAge,
    incomingUserCountry,
    isShowOtherUserAnimation,
    isShowMyAnimation,
    getAnimationSourceFromType,
    otherUserSelectedAnimation,
    mySelectedAnimation,
  };
};

export default useVideo;
