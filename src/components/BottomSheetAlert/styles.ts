import { StyleSheet } from 'react-native';
import { Colors } from 'theme';

const styles = StyleSheet.create({
  container: {},
  bgWhite: { backgroundColor: Colors.white, alignItems: 'center' },
  hidden: {
    display: 'none',
  },
  resetPadding: {
    padding: 0,
  },
  contentModal: {
    flex: 1,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    overflow: 'hidden',
    alignItems: 'center',
    paddingVertical: 30,
  },
  pdHorzi50: {
    paddingHorizontal: 50,
  },
  mgVertzi20: {
    marginVertical: 20,
  },
  mgBot15: {
    marginBottom: 15,
  },
  bottomAction: {
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  mr10: {
    marginRight: 10,
  },
  flex1: {
    flex: 1,
    borderRadius: 6,
  },
});
export default styles;
