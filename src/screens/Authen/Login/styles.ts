import { Platform, StyleSheet } from 'react-native';
import { Colors } from 'theme';
export default StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  wrapper: {
    flexGrow: 1,
  },
  flex04: {
    alignSelf: 'center',
    justifyContent: 'center',
    ...Platform.select({
      android: {
        flex: 0.4,
      },
      ios: {
        flex: 0.4,
      },
    }),
  },
  flex06: {
    flex: 1.2,
  },
  content: {
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
  },
});
