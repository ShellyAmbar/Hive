type MuliSliderProps = {
  min: number;
  max: number;
  step: number;
  initialMinValue: number;
  initialMaxValue: number;
  sliderWidth: number;
  onValueChange: ({min, max}: {min: number; max: number}) => void;
  primaryColor?: string;
  seconderyColor?: string;
};

export default MuliSliderProps;
