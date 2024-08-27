import React from 'react';

import {createStyle} from './spacer.styles';
import {SpacerProps} from './interfaces';
import {View} from 'react-native';

const Spacer = ({size = 8, isVertical = true}: SpacerProps) => {
  const style = createStyle(size, isVertical);
  return <View style={style.container} />;
};

export default Spacer;
