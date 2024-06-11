import { StyleSheet } from 'react-native';
import { Colors } from 'theme';
import { width } from 'utils';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  fullwidth: { width },
  row: { flexDirection: 'row' },
  cenItem: {
    alignItems: 'center',
  },
  cenItemvh: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  bgWhite: { backgroundColor: Colors.white },
  spaceItem: {
    justifyContent: 'space-between',
  },
  radius4: {
    borderRadius: 4,
  },
  radius37: {
    borderRadius: 37,
  },
  borderWhisper: {
    borderWidth: 1,
  },
  wrapShadow: {
    shadowOffset: { width: 1.5, height: 1.5 },
    shadowOpacity: 0.3,
    elevation: 5,
  },
  flex1: {
    flex: 1,
  },
  fullscreen: {
    width,
    // height,
  },
  shrinkTxt: { flexShrink: 1 },
  wrapCard: {
    backgroundColor: Colors.white,
    borderRadius: 4,
  },
  pending: {
    backgroundColor: Colors.main,
  },
  received: {
    backgroundColor: Colors.main,
  },
  tabSelected: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.main,
  },
  tabUnselected: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.transparent,
  },
});
