import {useCallback, useEffect, useMemo, useState} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
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
      icon: () => <Material name="party-popper" size={20} color="#FFFF" />,

      onClick: () => {
        selectAnimation(EAnimation.CONFETTI);
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
      icon: () => <Ionicons name="flower-outline" size={20} color="#FFFF" />,
      onClick: () => {
        selectAnimation(EAnimation.FLOWERS);
      },
      style: {backgroundColor: GlobalColors.Brand.secondary},
    },
  ];

  const getMyAnimationSourceFromType = useCallback(() => {
    switch (mySelectedAnimation) {
      case EAnimation.ROCKET:
        return require('@hive/assets/lotties/animations/missile.json');
      case EAnimation.CONFETTI:
        return require('@hive/assets/lotties/animations/cofetti.json');
      case EAnimation.FLAMES:
        return require('@hive/assets/lotties/animations/flames.json');
      case EAnimation.FLOWERS:
        return require('@hive/assets/lotties/animations/flowers.json');
      case EAnimation.HEARTS:
        return require('@hive/assets/lotties/animations/hearts.json');
      case EAnimation.LIKES:
        return require('@hive/assets/lotties/animations/likes.json');
      case EAnimation.UNICORN:
        return require('@hive/assets/lotties/animations/unicorn.json');
      default:
        return null;
    }
  }, [mySelectedAnimation]);
  const getOtherUserAnimationSourceFromType = useCallback(() => {
    switch (otherUserSelectedAnimation) {
      case EAnimation.ROCKET:
        return require('@hive/assets/lotties/animations/missile.json');
      case EAnimation.CONFETTI:
        return require('@hive/assets/lotties/animations/cofetti.json');
      case EAnimation.FLAMES:
        return require('@hive/assets/lotties/animations/flames.json');
      case EAnimation.FLOWERS:
        return require('@hive/assets/lotties/animations/flowers.json');
      case EAnimation.HEARTS:
        return require('@hive/assets/lotties/animations/hearts.json');
      case EAnimation.LIKES:
        return require('@hive/assets/lotties/animations/likes.json');
      case EAnimation.UNICORN:
        return require('@hive/assets/lotties/animations/unicorn.json');
      default:
        return null;
    }
  }, [otherUserSelectedAnimation]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      unSelectMyAnimation();
      clearTimeout(timeout);
    }, 5000);
  }, [mySelectedAnimation, isShowMyAnimation, unSelectMyAnimation]);

  return {
    actionButtons,
    incomingUserName,
    incomingUserImage,
    incomingUserAge,
    incomingUserCountry,
    isShowOtherUserAnimation,
    isShowMyAnimation,
    getOtherUserAnimationSourceFromType,
    getMyAnimationSourceFromType,
  };
};

export default useVideo;
