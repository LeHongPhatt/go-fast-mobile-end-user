import { withStyle } from 'HOC';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text } from 'react-native';
import { Colors, DefaultFont, Typography } from 'theme';
import { IText } from 'types';

const Roboto = {
  100: 'Thin',
  200: 'Thin',
  300: 'Light',
  400: 'Regular',
  500: 'Medium',
  600: 'Medium',
  700: 'Bold',
  800: 'Bold',
  900: 'Black',
  normal: 'Regular',
  bold: 'Bold',
};

function TextCus(props: IText) {
  const { t } = useTranslation();
  const {
    heading1,
    heading2,
    heading3,
    heading4,
    heading5,
    subhead,
    caption,
    semiBold,
    medium,
    bold,
    regular,
    color,
    paramI18n,
    numberOfLines,
    textAlign = 'left',
    main,
    error,
    success,
    subHeadColor,
    headingColor,
    //custom style
    style,
    //children
    children,
    useI18n = false,
    ...rest
  } = props;

  let textStyle = StyleSheet.flatten([
    { fontFamily: DefaultFont, textAlign, ...Typography.mainSize },
    color && { color: color ?? Colors.black3A },
    heading1 && Typography.heading1,
    heading2 && Typography.heading2,
    heading3 && Typography.heading3,
    heading4 && Typography.heading4,
    heading5 && Typography.heading5,
    subhead && Typography.subhead,
    caption && Typography.caption,
    main && { color: Colors.main },
    error && { color: Colors.error },
    success && { color: Colors.success },
    subHeadColor && { color: Colors.grey85 },
    headingColor && { color: Colors.black3A },
    semiBold && Typography.semiBold,
    bold && Typography.bold,
    regular && Typography.regular,
    medium && Typography.medium,
    style,
  ]);

  if (textStyle.fontFamily) {
    const fontStyle = textStyle.fontStyle === 'italic' ? 'Italic' : '';
    const fontWeight = textStyle.fontWeight ?? 400;
    switch (textStyle.fontFamily) {
      case 'Roboto':
        textStyle.fontFamily = `${textStyle.fontFamily}-${
          Roboto[fontWeight] === 'Regular'
            ? Roboto[fontWeight]
            : Roboto[fontWeight] + fontStyle
        }`;
        break;
      default:
        break;
    }
  }

  return (
    <Text {...rest} style={textStyle} numberOfLines={numberOfLines}>
      {useI18n ? t(`${children}`, paramI18n) : children}
    </Text>
  );
}

export default memo(withStyle(TextCus));
