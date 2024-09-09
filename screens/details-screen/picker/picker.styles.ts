import {GlobalColors} from '@hive/styles/colors';
import {StyleSheet} from 'react-native';
export default StyleSheet.create({
  vertical: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    flex: 1,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 200,
  },
  saperator: {
    height: 1,
    width: '80%',
    backgroundColor: GlobalColors.Border,
    marginVertical: 10,
  },
  itemImage: {
    height: 30,
    width: 30,
    marginRight: 10,
  },
  textItem: {
    fontSize: 14,
    color: GlobalColors.Brand.secondary,
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  textSelected: {
    fontSize: 14,
    color: GlobalColors.TextColors.white,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  list: {
    position: 'absolute',
    top: 0,
    zIndex: 4,
    width: '100%',
    paddingHorizontal: 10,
    maxHeight: 150,
    backgroundColor: GlobalColors.BgColors.Bg1,
    borderRadius: 20,
    paddingVertical: 15,
  },
});
