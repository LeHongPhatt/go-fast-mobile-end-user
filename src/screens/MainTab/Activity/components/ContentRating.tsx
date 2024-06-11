import { ImageCus, StarsRating, TextCus, TouchCus, ViewCus } from 'components';
import React from 'react';
import { StyleSheet } from 'react-native';
import { BaseStyle } from 'theme';
interface IProps {
  onPress: () => void;
  title: string;
  subtitle: string;
}
const ContentRating: React.FC<IProps> = ({ onPress, title, subtitle }) => {
  return (
    <TouchCus style={styles.container} onPress={onPress}>
      <ViewCus style={styles.coverImage}>
        <ImageCus style={styles.image} />
      </ViewCus>
      <TextCus heading4 textAlign="center">
        {title}
      </TextCus>
      <TextCus textAlign="center" mb-10>
        {subtitle}
      </TextCus>
      <StarsRating point={5} size={30} style={styles.mr16} />
    </TouchCus>
  );
};
const styles = StyleSheet.create({
  container: {
    ...BaseStyle.boxShadow,
    paddingHorizontal: 30,
    paddingBottom: 25,
    alignItems: 'center',
    marginTop: 60,
  },
  mr16: {
    marginRight: 16,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  coverImage: {
    width: 68,
    height: 68,
    borderWidth: 1,
    marginTop: -34,
    marginBottom: 15,
    ...BaseStyle.boxShadow,
    borderRadius: 68,
  },
});
export default ContentRating;
