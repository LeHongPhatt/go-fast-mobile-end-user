import { StyleSheet } from 'react-native';
import { Colors } from 'theme';

const styles = StyleSheet.create({
  w100: {
    width: '100%',
  },
  posAbsolute: {
    position: 'absolute',
    zIndex: 90,
  },
  bo8: {
    borderRadius: 8,
  },

  selected: {
    backgroundColor: '#FFAFAF',
  },

  divider: {
    borderStyle: 'dashed',
    borderColor: Colors.greyEE,
    borderWidth: 1,
  },
  boxShadow: {
    shadowOpacity: 0.35,
    shadowRadius: 48,
  },
});
export default styles;
