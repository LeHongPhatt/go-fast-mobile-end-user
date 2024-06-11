import { StyleSheet } from 'react-native';
import { Colors } from './colors';
import { width } from 'utils/libs';

/**
 * Fontweight setting
 * - This font weight will be used for style of screens where needed
 * - Check more how to use font weight with url below
 * @url https://passionui.com/docs/listar-pro/theme
 */
type FontWeight =
  | 'normal'
  | 'bold'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900';
type TypeWeight =
  | 'thin'
  | 'ultraLight'
  | 'light'
  | 'regular'
  | 'medium'
  | 'bold'
  | 'semibold'
  | 'heavy'
  | 'black';
export const FontWeight: Record<TypeWeight, FontWeight> = {
  thin: '100',
  ultraLight: '200',
  light: '300',
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  heavy: '800',
  black: '900',
};

/**
 * Define list font use for whole application
 */
export const FontSupport = ['Roboto', 'Merriweather', 'Inter'];

/**
 * Define font default use for whole application
 */
export const DefaultFont = 'Roboto';

export const BaseStyle = StyleSheet.create({
  textInput: {
    height: 48,
    borderRadius: 12,
    paddingHorizontal: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Colors.greyEE,
    backgroundColor: Colors.white,
  },
  safeAreaView: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  wrapperContent: {
    paddingHorizontal: 16,
  },
  flexRow: {
    flexDirection: 'row',
  },
  wrapperContentBr: {
    backgroundColor: Colors.white,
    borderRadius: 16,
  },
  flexRowSpaceBetwwen: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flexRowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flex1: {
    flex: 1,
  },
  flexGrow1: {
    flexGrow: 1,
  },
  flexShrink1: {
    flexShrink: 1,
  },
  boxShadow: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 5, // This is only used on Android
  },
  wrapperContentAuth: {
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
  },
  resetMargin: {
    marginLeft: 0,
  },
  textLineThrough: {
    textDecorationLine: 'line-through',
  },
  wrapperMain: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    flex: 1,
  },
  wrapperDisable: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: Colors.greyF7,
  },
  pd16: {
    padding: 16,
  },
  toast: {
    backgroundColor: 'rgba(245, 245, 245, 0.95)',
    padding: 16,
    alignItems: 'center',
    width: width - 16,
    borderRadius: 10,
    flexDirection: 'row',
  },
  'w100%': {
    width: '100%',
  },
  'h100%': {
    height: '100%',
  },
});

/**
 * Typography setting
 * - This font weight will be used for all template
 * - Check more how to use typography in url below
 * @url https://passionui.com/docs/listar-pro/theme
 */
export const Typography = StyleSheet.create({
  semiBold: {
    fontWeight: FontWeight.semibold,
  },
  bold: {
    fontWeight: FontWeight.bold,
  },
  medium: {
    fontWeight: FontWeight.medium,
  },
  regular: {
    fontWeight: FontWeight.regular,
  },
  mainSize: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: FontWeight.regular,
    color: Colors.black3A,
  },
  heading1: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: FontWeight.bold,
  },
  heading2: {
    fontSize: 22,
    lineHeight: 30,
    fontWeight: FontWeight.bold,
  },
  heading3: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: FontWeight.bold,
  },
  heading4: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: FontWeight.bold,
  },
  heading5: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: FontWeight.bold,
  },
  subhead: {
    fontSize: 12,
    lineHeight: 22,
  },
  caption: {
    fontSize: 10,
    lineHeight: 20,
  },
});
