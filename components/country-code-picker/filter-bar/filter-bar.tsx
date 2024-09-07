import React, {useEffect, useRef} from 'react';
import createStyle from './filter-bar.styles';
import {TextInput, TouchableOpacity, View, Image, Keyboard} from 'react-native';
import FilterBarProps from './interfaces';
import useSearchBar from './hooks/useSearchBar';
const FilterBar = ({
  onUpdateSearchTerm,
  onPressDelete,
  color,
}: FilterBarProps) => {
  const {searchTerm, setSearchTerm} = useSearchBar();
  const style = createStyle({color});
  const ref = useRef();
  // useEffect(() => {
  //   const time = setTimeout(() => ref.current?.focus(), 100);

  //   return () => {
  //     clearTimeout(time);
  //   };
  // }, [ref?.current]);

  return (
    <View style={style.container}>
      <View style={style.searchbar}>
        {searchTerm?.length > 0 && (
          <TouchableOpacity
            onPress={() => {
              onPressDelete();
              onUpdateSearchTerm('');
              setSearchTerm('');
            }}
            style={style.delete_icon}>
            <Image
              style={{width: 24, height: 24}}
              source={require('../images/closeIconWhite.png')}
            />
          </TouchableOpacity>
        )}
        <TextInput
          ref={ref}
          focusable
          cursorColor={'#FFF'}
          style={style.input}
          value={searchTerm}
          onEndEditing={v => {
            setSearchTerm(v.nativeEvent.text);
            onUpdateSearchTerm(v.nativeEvent.text);
          }}
          onChangeText={v => {
            setSearchTerm(v);
            onUpdateSearchTerm(v);
          }}
        />
      </View>
    </View>
  );
};

export default FilterBar;
