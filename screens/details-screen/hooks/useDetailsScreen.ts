import { useDispatch, useSelector } from 'react-redux';

import {
  setMyAge,
  setMyCountry,
  setMyLimitedCountry,
  //setMyImage,
  setMyName,
  setIsMyLimitedCountry,
  setIsMyLimitedAges,
  setMyLimitedAges,
  Gender,
  setMyGender,
  setMyOtherGender,
  setIsMyLimitedUserGender,
} from '@hive/store/reducers/user';
import { useCallback, useEffect, useMemo, useState } from 'react';
const useDetailsScreen = props => {
  const dispatch = useDispatch();
  const {
    myName,
    myImage,
    myAge,
    myCountry,
    isMyLimitedCountry,
    myLimitedCountry,
    isMyLimitedAges,
    myLimitedAges,
    myGender,
    myOtherGender,
    isMyLimitedUserGender,
  } = useSelector(state => state.user);
  const [name, setName] = useState(myName);
  const [age, setAge] = useState(myAge ? myAge : 0);
  const [isErrorAge, setisErrorAge] = useState(false);
  const [country, setCountry] = useState(myCountry ?? '');
  const [limitedCountry, setLImitedCountry] = useState(myLimitedCountry);
  const [isLimitCountry, setisLimitCountry] = useState(isMyLimitedCountry);

  const [limitedAges, setLImitedAges] = useState(myLimitedAges);
  const [isLimitAges, setisLimitAges] = useState(isMyLimitedAges);
  const [gender, setGender] = useState(myGender);
  const [otherGender, setOtherGender] = useState(myOtherGender);
  const [isLimitUserGender, setIsLimitUserGender] = useState(
    isMyLimitedUserGender,
  );
  const [defaultSelectedMyGenderIndex, setDefaultSelectedMyGenderIndex] =
    useState(0);
  const [defaultSelectedOtherGenderIndex, setDefaultSelectedOtherGenderIndex] =
    useState(0);

  const myGenderitemList = useMemo(
    () => [
      {
        id: 0,
        text: Gender.WOMEN,
        onClick: () => {
          setGender(Gender.WOMEN);
        },
      },
      {
        id: 1,
        text: Gender.MEN,
        onClick: () => {
          setGender(Gender.MEN);
        },
      },
      {
        id: 2,
        text: Gender.TRANS,
        onClick: () => {
          setGender(Gender.TRANS);
        },
      },
      {
        id: 3,
        text: Gender.OTHER,
        onClick: () => {
          setGender(Gender.OTHER);
        },
      },
    ],
    [],
  );
  const otherGenderItemList = useMemo(
    () => [
      {
        id: 0,
        text: 'All',
        onClick: () => {
          setIsLimitUserGender(false);
        },
      },
      {
        id: 1,
        text: Gender.WOMEN,
        onClick: () => {
          setOtherGender(Gender.WOMEN);
          setIsLimitUserGender(true);
        },
      },
      {
        id: 2,
        text: Gender.MEN,
        onClick: () => {
          setOtherGender(Gender.MEN);
          setIsLimitUserGender(true);
        },
      },
      {
        id: 3,
        text: Gender.TRANS,
        onClick: () => {
          setOtherGender(Gender.TRANS);
          setIsLimitUserGender(true);
        },
      },
      {
        id: 4,
        text: Gender.OTHER,
        onClick: () => {
          setOtherGender(Gender.OTHER);
          setIsLimitUserGender(true);
        },
      },
    ],
    [],
  );

  const updateDefaultIndexes = useCallback(() => {
    let otherGenderIndex = 0;
    const myGenderIndex = myGenderitemList.findIndex(
      item => item.text === myGender,
    );
    if (isMyLimitedUserGender) {
      otherGenderIndex = otherGenderItemList.findIndex(
        item => item.text.toString() === myOtherGender,
      );
    }

    setDefaultSelectedMyGenderIndex(myGenderIndex);
    setDefaultSelectedOtherGenderIndex(otherGenderIndex);
  }, [
    myGender,
    myOtherGender,
    myGenderitemList,
    otherGenderItemList,
    isMyLimitedUserGender,
  ]);

  useEffect(() => {
    updateDefaultIndexes();
  }, []);

  const isMissingData = useMemo(() => {
    return (
      name?.length === 0 ||
      age.length === 0 ||
      age === 0 ||
      isErrorAge ||
      country?.length === 0 ||
      (isLimitCountry && limitedCountry.length === 0)
    );
  }, [name, country, isErrorAge, age, limitedCountry, isLimitCountry]);

  const onStart = useCallback(async () => {
    dispatch(setMyName(name));
    dispatch(setMyAge(age));
    dispatch(setMyCountry(country));
    dispatch(setIsMyLimitedCountry(isLimitCountry));
    dispatch(setMyLimitedCountry(limitedCountry));
    dispatch(setIsMyLimitedAges(isLimitAges));
    dispatch(setMyGender(gender));
    dispatch(setMyOtherGender(otherGender));
    dispatch(setIsMyLimitedUserGender(isLimitUserGender));
    dispatch(setMyLimitedAges(limitedAges));

    props.navigation.replace('Home');
  }, [
    name,
    age,
    country,
    isLimitAges,
    isLimitCountry,
    limitedAges,
    limitedCountry,
    dispatch,
    gender,
    otherGender,
    isLimitUserGender,
    props.navigation,
  ]);

  return {
    // setshowPopupChoose,
    // updateImageUri,
    //  showPopupChoose,

    name,
    setName,
    age,
    setAge,
    setisErrorAge,
    isErrorAge,
    defaultSelectedMyGenderIndex,
    defaultSelectedOtherGenderIndex,
    myGenderitemList,
    otherGenderItemList,
    country,
    setCountry,
    setisLimitCountry,
    isLimitCountry,
    setLImitedCountry,
    limitedCountry,
    isLimitAges,
    setisLimitAges,
    setLImitedAges,
    limitedAges,
    onStart,
    isMissingData,
  };
};

export default useDetailsScreen;
