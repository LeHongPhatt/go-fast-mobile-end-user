import { Platform, StyleSheet } from 'react-native';
import { Colors } from 'theme';
import { Typography } from 'theme/typography';
import { width } from 'utils';

const isIos = Platform.OS === 'ios';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.main,
  },
  bgColorDA: {
    backgroundColor: Colors.colorDA,
  },
  wrapLogo: {
    alignItems: 'center',
    marginTop: 8,
  },
  main: { padding: 24, flex: 1 },
  rowItem: {
    flexDirection: 'row',
  },
  spaceItem: {
    justifyContent: 'space-between',
  },
  cenItem: {
    alignItems: 'center',
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
  btlogi: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.white,
    height: 56,
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
  inputSearch: {
    width: width - 70,
    marginRight: 17,
    height: 34,
    borderRadius: 16,
    backgroundColor: Colors.bgBlocAdv,
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
  form: {
    marginBottom: isIos ? 70 : 40,
    alignItems: 'flex-start',
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
  contact: {
    // height: 34,
    // marginBottom: isIos ? 20 : 40,
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
  underline: {
    textDecorationLine: 'underline',
  },
  // header
  contain: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.main,
  },
  txtWhiteUp: {
    color: Colors.white,
    textTransform: 'uppercase',
  },
  txtDark: {
    color: Colors.dark,
  },
  contentLeft: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
    width: 60,
    marginLeft: 14,
  },
  contentCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentRight: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingLeft: 10,
    paddingRight: 20,
    height: '100%',
  },
  contentRightSecond: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingLeft: 10,
    paddingRight: 10,
    height: '100%',
  },
  right: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  headLine: {
    ...Typography.title2,
  },
  bgStatus: {
    backgroundColor: Colors.statusColor,
  },
  row: {
    flexDirection: 'row',
  },
  centItem: {
    alignItems: 'center',
  },
  spaceArroundItem: {
    justifyContent: 'space-around',
  },
});
