import { StyleSheet } from 'react-native';
import { Colors } from 'theme';

export default StyleSheet.create({
  default: {
    height: 48,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  textDefault: {
    color: Colors.white,
  },
  outline: {
    borderWidth: 1,
  },
  shadow: { shadowColor: Colors.black, shadowOpacity: 0.9 },
  full: {
    width: '100%',
    alignSelf: 'auto',
  },
  round: {
    borderRadius: 28,
  },
  padLeft5: { paddingLeft: 5 },
});
