import { StyleSheet } from 'react-native';
import { Colors } from 'theme';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  bgHead: {
    backgroundColor: Colors.white,
  },
  boxDriver: {
    width: 30,
    height: 30,
  },
  row: {
    flexDirection: 'row',
  },
  boxLogo: {
    width: 65,
    height: 65,
  },
  badget: {
    backgroundColor: Colors.error,
    borderRadius: 10,
    top: -7,
    right: 7,
  },
  mr17: { marginRight: 17 },
  centItem: {
    alignItems: 'center',
  },
  cenItemvh: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  endItemvh: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  rowItem: {
    flexDirection: 'row',
  },
  spaceArroundItem: {
    justifyContent: 'space-around',
  },
  w100: {
    width: '100%',
  },
  spaceItem: {
    justifyContent: 'space-between',
  },
  bgStatus: {
    backgroundColor: Colors.statusColor,
  },
});
