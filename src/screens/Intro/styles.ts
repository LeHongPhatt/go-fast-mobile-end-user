import { StyleSheet } from 'react-native';
import { Colors } from 'theme';
export default StyleSheet.create({
  textWhite: {
    color: Colors.white,
    fontSize: 15,
  },
  contentDot: {
    flexDirection: 'row',
  },
  dot: {
    backgroundColor: Colors.colorD9,
    width: 8,
    height: 8,
    marginRight: 8,
    borderRadius: 10,
  },
  dotActive: {
    backgroundColor: Colors.main,
    width: 16,
  },
  wrapperIntro: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  image: {
    height: '100%',
    alignSelf: 'center',
    aspectRatio: 1,
  },
  bgLotie: { flex: 1, backgroundColor: Colors.main },
  contentImage: {
    flex: 1,
    marginBottom: 40,
    alignSelf: 'center',
  },
  viewContent: {
    flex: 0.9,
    paddingHorizontal: 30,
  },
  haflFlex: {
    flex: 1 / 2,
  },
  nextButton: {},
  buttonContainer: {},
  pagination: {
    position: 'absolute',
    bottom: 40,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
});
