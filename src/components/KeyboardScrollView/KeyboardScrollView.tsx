import { Buttons, TextCus, ViewCus } from 'components';
import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { Colors } from 'theme';
interface Props {
  children: React.ReactNode;
  onPress?: () => void;
  loading?: boolean;
  textBtn?: string;
  btnBottomCus?: React.ReactNode;
  disabled?: boolean;
  styleContent?: StyleProp<ViewStyle>;
  btnStyle?: StyleProp<ViewStyle>;
  styleBtnCover?: StyleProp<ViewStyle>;
}
const behavior = Platform.OS === 'ios' ? 'padding' : undefined;
const KeyboardScrollView: React.FC<Props> = ({
  children,
  onPress,
  loading,
  textBtn,
  disabled,
  styleContent,
  btnStyle,
  styleBtnCover,
}) => {
  return (
    <KeyboardAvoidingView behavior={behavior} enabled style={styles.flex1}>
      <ScrollView
        style={[styles.content, styleContent]}
        contentInsetAdjustmentBehavior="never"
        showsVerticalScrollIndicator={false}>
        {children}
      </ScrollView>
      {textBtn && (
        <ViewCus px-16 style={[styles.spacingBottom, styleBtnCover]}>
          <Buttons
            onPress={onPress}
            disabled={disabled}
            loading={loading}
            style={[btnStyle]}>
            <TextCus useI18n bold heading5 color={Colors.white}>
              {textBtn}
            </TextCus>
          </Buttons>
        </ViewCus>
      )}
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: Colors.greyF7,
  },
  flex1: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  spacingBottom: {
    ...Platform.select({
      android: {
        paddingBottom: 30,
      },
      ios: {
        paddingBottom: 30,
      },
    }),
    paddingTop: 10,
  },
});
export default KeyboardScrollView;
