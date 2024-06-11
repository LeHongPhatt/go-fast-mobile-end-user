import React from 'react';
import { StyleProp, StyleSheet } from 'react-native';
import FastImage, {
  FastImageProps,
  ResizeMode,
  ImageStyle,
} from 'react-native-fast-image';

export default function ImageCus(props: IImage) {
  const {
    style,
    resizeMode,
    source,
    size,
    width,
    height,
    borderRadius,
    ...rest
  } = props;

  const styles = StyleSheet.create({
    avatar: {
      width: width || size,
      height: height || size,
      borderRadius: Math.round((borderRadius ?? 0) * 0.5),
    },
  });

  let resize: ResizeMode = FastImage.resizeMode.cover;
  switch (resizeMode) {
    case 'contain':
      resize = FastImage.resizeMode.contain;
      break;
    case 'stretch':
      resize = FastImage.resizeMode.stretch;
      break;
    case 'center':
      resize = FastImage.resizeMode.center;
      break;
  }
  return (
    <FastImage
      style={[style, size ? styles.avatar : {}]}
      {...rest}
      source={source}
      resizeMode={resize}
    />
  );
}
export interface IImage {
  style?: StyleProp<ImageStyle>;
  size?: number;
  width?: number;
  height?: number;
  borderRadius?: number;
  source?: FastImageProps['source'];
  resizeMode?: ResizeMode;
}
