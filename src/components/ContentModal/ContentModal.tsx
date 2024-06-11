import Icon from 'assets/svg/Icon';
import { TextCus } from 'components/TextCus';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from 'theme';

export interface IContentModal {
  type?: 'success' | 'error' | 'warning';
  title?: string;
  subTitle?: string | React.ReactNode;
  actButton?: React.ReactNode;
  content?: React.ReactNode;
}
export default function ContentModal(props: IContentModal) {
  const { type, title, subTitle, actButton, content } = props;
  const IconType = Icon?.[type];
  return (
    <View style={[styles.p24, styles.flex1]}>
      <View style={[styles.alignCenter, styles.flex1]}>
        {type && (
          <TextCus mb-24>
            <IconType />
          </TextCus>
        )}
        {title && (
          <TextCus
            mb-8
            error={type === 'error'}
            success={type === 'success'}
            heading1
            bold
            textAlign="center"
            color={type === 'warning' && Colors.redEB}
            useI18n>
            {title}
          </TextCus>
        )}
        {subTitle && (
          <TextCus
            textAlign="center"
            style={styles.subTitle}
            subHeadColor
            mb-16>
            {subTitle}
          </TextCus>
        )}
      </View>
      {content}
      {actButton}
    </View>
  );
}

const styles = StyleSheet.create({
  p24: {
    padding: 24,
  },
  alignCenter: {
    alignItems: 'center',
  },
  subTitle: {
    lineHeight: 24,
  },
  flex1: {
    flex: 1,
  },
});
