import { IconName } from 'assets';
import { IconApp, TextCus, TouchCus } from 'components';
import { NavigationService } from 'navigation';
import React from 'react';
import { View } from 'react-native';
import { Colors } from 'theme';
import { IHeader } from 'types';
import { HIT_SLOP } from 'utils';
import styles from './styles';

export function Header(props: IHeader) {
  const {
    style,
    title,
    renderLeft,
    renderCenter,
    renderRight,
    onPressLeft,
    notGoBack = false,
    iconColor,
  } = props;

  const renderGoback = () => (
    <IconApp
      name={IconName.ChevronLeft}
      size={16}
      color={iconColor ?? Colors.black3A}
    />
  );
  return (
    <View style={[styles.wrapperHeader, style]}>
      <View style={styles.leftHand}>
        {renderLeft && renderLeft()}
        {!notGoBack && (
          <TouchCus
            hitSlop={HIT_SLOP}
            onPress={
              onPressLeft ? onPressLeft : () => NavigationService.goBack()
            }>
            {renderGoback()}
          </TouchCus>
        )}
      </View>
      <View style={styles.center}>
        {renderCenter && renderCenter()}
        {title && (
          <TextCus useI18n heading5 style={{ color: iconColor }}>
            {title}
          </TextCus>
        )}
      </View>
      <View style={styles.rightHand}>{renderRight && renderRight()}</View>
    </View>
  );
}
