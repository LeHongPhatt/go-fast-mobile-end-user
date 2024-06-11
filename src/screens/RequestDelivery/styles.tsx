import { StyleSheet } from 'react-native';
import { Colors } from 'theme';

const styles = StyleSheet.create({
  wrapperContent: {
    paddingHorizontal: 14,
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.greyEE,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
    backgroundColor: Colors.white,
  },
  btnAction: {
    borderRadius: 4,
  },
  wrapperCover: {
    paddingTop: 10,
  },
});

export default styles;
