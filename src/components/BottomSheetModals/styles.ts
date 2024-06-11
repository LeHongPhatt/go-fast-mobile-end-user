import { StyleSheet } from 'react-native';
import { Colors } from 'theme';
import { dimensions } from 'utils';
const { width, height } = dimensions;
export default StyleSheet.create({
  container: {
    width,
    height,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0 ,0 , 0.5)',
    zIndex: 9999,
    elevation: 999,
    position: 'absolute',
    flex: 1,
  },
  bgDivider: { backgroundColor: Colors.whisper, width },
  hidden: { display: 'none' },
  show: {
    display: 'flex',
    marginTop: -18,
    width: 80,
    height: 4,
    borderRadius: 24,
    backgroundColor: Colors.white,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  boxLogo: { width: 90, height: 85 },
  bgColorDA: {
    backgroundColor: Colors.colorDA,
  },
  pr5: {
    paddingRight: 5,
  },
  wrapLogo: {
    alignItems: 'center',
    marginTop: 8,
  },
  flexWrap: {
    flexWrap: 'wrap',
  },
  main: { padding: 24, flex: 1 },
  rowItem: {
    flexDirection: 'row',
  },
  spaceItem: {
    justifyContent: 'space-between',
  },
  topU10: {
    top: -15,
  },
  cenItem: {
    alignItems: 'center',
  },
  endItem: {
    justifyContent: 'flex-end',
  },
  cenItemvh: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textCondition: {
    alignContent: 'center',
    marginTop: 25,
    marginBottom: 25,
  },
  btnActive: {
    backgroundColor: Colors.mainLight,
  },
  btnErr: {
    backgroundColor: Colors.error,
  },
  btlogi: {
    backgroundColor: Colors.border,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.transparent,
    height: 56,
    minWidth: 343,
    position: 'absolute',
    bottom: 30,
  },
  btlog: {
    marginTop: 30,
    backgroundColor: Colors.info,
    borderRadius: 8,
    width: '100%',
    justifyContent: 'center',
  },
  txtdn: {
    fontSize: 16,
    textTransform: 'uppercase',
  },
  input: {
    height: 56,
    borderRadius: 5,
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    marginBottom: 24,
    borderColor: Colors.borderBottom,
    color: Colors.borderBottom,
    backgroundColor: Colors.white,
  },
  fieldTextRequired: {
    color: Colors.error,
    textAlign: 'left',
  },
  bgWhite: {
    backgroundColor: Colors.white,
  },
  mr10: {
    marginRight: 10,
  },
  mr24: {
    marginRight: 24,
  },
  fontRoboto: {
    fontFamily: 'Roboto',
  },
  fw400: {
    fontWeight: '400',
  },
  fw500: {
    fontWeight: '500',
  },
  fs24: {
    fontSize: 24,
  },
  lh34: {
    lineHeight: 34,
  },
  fs10: {
    fontSize: 10,
  },
  fs14: {
    fontSize: 14,
  },
  fs16: {
    fontSize: 16,
  },
  lh13: {
    lineHeight: 13,
  },
  lh18: {
    lineHeight: 18,
  },
  lh22: {
    lineHeight: 22,
  },
  lh24: {
    lineHeight: 24,
  },
  text74: {
    color: Colors.text74,
  },
  flex1: {
    flex: 1,
  },
  alignRight: {
    alignSelf: 'flex-end',
  },
  mt24: {
    marginTop: 24,
  },
  mt1: {
    paddingTop: 1,
  },
  ml24: {
    marginLeft: 24,
  },
  upperCase: {
    textTransform: 'uppercase',
  },
  centerItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  m24: {
    margin: 24,
  },
  ml8: {
    marginLeft: 8,
  },
  textHotline: {
    color: Colors.colorDc,
  },
  w100: {
    width: '100%',
  },
  mr8: {
    marginRight: 8,
  },
  mr2: {
    marginRight: 2,
  },
  textWhite: {
    color: Colors.white,
  },
  textRed: {
    color: Colors.colorDA,
  },
  fw600: {
    fontWeight: '600',
  },
  fw700: {
    fontWeight: '700',
  },
  p5: {
    padding: 5,
  },
  p24: {
    padding: 24,
  },
  underline: {
    textDecorationLine: 'underline',
  },
  ratingContainer: {
    width,
    height,
    padding: 8,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0 ,0 , 0.5)',
    zIndex: 99,
    position: 'absolute',
  },
  indicatorStype: {
    backgroundColor: Colors.border,
  },
  btnCancel: {
    backgroundColor: Colors.border,
    height: 44,
    flex: 1,
    borderRadius: 4,
  },
  btnRate: {
    backgroundColor: Colors.mainLight,
    height: 44,
    flex: 1,
    borderRadius: 4,
  },
  row: { flexDirection: 'row' },
  btnGroup: {
    position: 'absolute',
  },
  wrapAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  mt12: { marginTop: 12 },
  mt32: { marginTop: 32 },

  indicator: {
    backgroundColor: Colors.white,
    marginTop: -20,
    width: 32,
    height: 4,
  },
});
