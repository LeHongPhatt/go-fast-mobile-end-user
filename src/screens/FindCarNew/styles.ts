import { StyleSheet } from 'react-native';
import { Colors } from 'theme';
import { width } from 'utils';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapShadow: {
    shadowColor: Colors.black,
    shadowOffset: { width: 1.5, height: 1.5 },
    shadowOpacity: 0.1,
  },
  fullWidth: {
    width,
  },
  itemThree: {
    width: width * 0.3,
  },
  posAbsolute: {
    position: 'absolute',
    zIndex: 90,
  },
  bo8: {
    borderRadius: 8,
  },
});
