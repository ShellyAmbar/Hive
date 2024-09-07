import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  FlatList,
} from 'react-native';
import React from 'react';
import {CountryCodePickerProps} from './interfaces';
import Style from './country-code-picker.styles';
import useCountryCodePicker from './hooks/useCountryCodePicker';
import {SvgUri} from 'react-native-svg';
import FilterBar from './filter-bar/filter-bar';
import Spacer from '../spacer/spacer';
const CountryCodePicker = ({
  pickerStyle,
  modalStyle,
  textStyle,
  onPickedCode,
  filterBarColor,
  defaultCountryName,
}: CountryCodePickerProps) => {
  const {
    isOpen,
    setIsOpen,
    selectedCountry,
    setSelectedCountry,
    countriesData,
    filteredCountriesData,
    setFilteredCountriesData,
  } = useCountryCodePicker(defaultCountryName);

  const renderItem = item => {
    return (
      <TouchableOpacity
        style={Style.item}
        onPress={() => {
          setSelectedCountry(item), setIsOpen(false);
          onPickedCode('+' + item.callingCodes[0].toString(), item.name);
        }}>
        <SvgUri
          viewBox="0 0 1000 500"
          uri={item.flag}
          width={30}
          height={30}
          style={Style.itemImage}
        />
        <Text style={{...Style.text, ...textStyle}}>{item.name}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          setIsOpen(true);
          setFilteredCountriesData(countriesData);
        }}
        style={{...Style.container, ...pickerStyle}}>
        {isOpen ? (
          <Image
            style={{width: 20, height: 20}}
            source={require('./images/direction-up-white.png')}
          />
        ) : (
          <Image
            style={{width: 20, height: 20}}
            source={require('./images/direction-down-white.png')}
          />
        )}
        <Spacer size={10} isVertical={false} />
        {selectedCountry ? (
          <>
            <SvgUri
              viewBox="0 0 1000 500"
              uri={selectedCountry.flag}
              width={30}
              height={30}
            />
            <Spacer size={10} isVertical={false} />

            <Text style={{...Style.text, ...textStyle}}>
              {selectedCountry.alpha2Code}
            </Text>
          </>
        ) : (
          <>
            <Spacer size={10} isVertical={false} />
            <Text style={{...Style.text, ...textStyle}}>{'Select'}</Text>
          </>
        )}
      </TouchableOpacity>

      <Modal animationType="slide" transparent={true} visible={isOpen}>
        <View style={{...Style.modalBack}}>
          <View style={{...Style.modal, ...modalStyle}}>
            <TouchableOpacity
              style={{padding: 10}}
              onPress={() => setIsOpen(false)}>
              <Image
                style={{width: 20, height: 20}}
                source={require('./images/closeIconWhite.png')}
              />
            </TouchableOpacity>
            <Spacer size={16} />
            <FilterBar
              color={filterBarColor}
              onPressDelete={() => {
                setFilteredCountriesData(countriesData);
              }}
              onUpdateSearchTerm={t => {
                const filteredList = countriesData.filter(item =>
                  item.name.toLowerCase().includes(t.toLowerCase()),
                );
                setFilteredCountriesData(filteredList);
              }}
            />
            <Spacer size={8} />
            <FlatList
              data={filteredCountriesData}
              renderItem={item => renderItem(item.item)}
              keyExtractor={item => item.flag}
              style={Style.list}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

export default CountryCodePicker;
