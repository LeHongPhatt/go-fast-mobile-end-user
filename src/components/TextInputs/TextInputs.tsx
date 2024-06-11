import { IconName } from 'assets';
import { IconApp, TouchCus } from 'components';
import { TextCus } from 'components/TextCus';
import { ViewCus } from 'components/ViewCus';
import React, {
  ComponentType,
  Ref,
  forwardRef,
  useCallback,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import {
  NativeSyntheticEvent,
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  TouchableOpacityProps,
  ViewProps,
  ViewStyle,
} from 'react-native';
import { Colors } from 'theme';
import { BaseStyle, DefaultFont } from 'theme/typography';
import { getComponent } from 'utils';

const TextInputs = forwardRef((props: ITextInputs, ref: Ref<TextInput>) => {
  const { t } = useTranslation();
  const {
    style,
    leftIcon,
    rightIcon,
    styleInput,
    onKeyPress,
    placeholder,
    error,
    label,
    isRequired,
    styleWrapperInput,
    bold,
    disabled,
    editable,
    isPassword,
    isViewTouch,
    onPress,
    type,
    size,
    styleIconRight,
  } = props;
  const [showPassword, setShowPassword] = useState(isPassword);
  const onShowPassword = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);
  const renderRightIcon = useCallback(() => {
    if (isPassword) {
      if (showPassword) {
        return IconName.Hide;
      }
      return IconName.Show;
    }
  }, [isPassword, showPassword]);

  const ViewTouch = getComponent(isViewTouch) as ComponentType<
    ViewProps | TouchableOpacityProps
  >;
  return (
    <ViewCus mb-16 style={[styleWrapperInput]}>
      {label ? (
        <ViewCus mb-5 style={[BaseStyle.flexRow]}>
          <TextCus bold={bold} useI18n>
            {label}
          </TextCus>
          {isRequired && <TextCus error>*</TextCus>}
        </ViewCus>
      ) : null}
      <ViewTouch onPress={onPress}>
        <ViewCus
          style={[
            BaseStyle.textInput,
            { borderColor: error ? Colors.error : Colors.greyEE },
            disabled && { backgroundColor: Colors.greyEE },
            style,
          ]}
          pointerEvents={type}>
          {leftIcon && (
            <IconApp
              name={leftIcon}
              size={22}
              color={Colors.disable}
              style={styles.iconLeft}
            />
          )}
          <TextInput
            ref={ref}
            {...props}
            style={[
              styles.input,
              {
                fontFamily: DefaultFont,
              },
              styleInput,
            ]}
            selectionColor={Colors.black3A}
            placeholderTextColor={Colors.grey84}
            placeholder={t(`${placeholder ?? ''}`) as string}
            onKeyPress={onKeyPress}
            editable={editable}
            secureTextEntry={showPassword}
          />
          {rightIcon && (
            <IconApp
              name={rightIcon}
              size={size ?? 22}
              color={Colors.disable}
              style={[styles.iconRight, styleIconRight]}
            />
          )}
          {isPassword && (
            <TouchCus onPress={onShowPassword}>
              <IconApp
                name={renderRightIcon()}
                size={22}
                color={Colors.disable}
                style={styles.iconRight}
              />
            </TouchCus>
          )}
        </ViewCus>
      </ViewTouch>
      {error ? (
        <TextCus error mt-5>
          {error}
        </TextCus>
      ) : null}
    </ViewCus>
  );
});
export default TextInputs;
const styles = StyleSheet.create({
  input: {
    flex: 1,
  },
  wrapperInput: {},
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
});
export interface ITextInputs extends TextInputProps {
  style?: StyleProp<ViewStyle>;
  leftIcon?: string;
  rightIcon?: string;
  placeholder?: string | undefined;
  value?: string;
  color?: string;
  onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onBlur?: () => void;
  multiline?: boolean;
  numberOfLines?: number;
  styleInput?: any;
  onKeyPress?: any;
  error?: string;
  label?: string;
  isRequired?: boolean;
  styleWrapperInput?: StyleProp<ViewStyle>;
  bold?: boolean;
  disabled?: boolean;
  isPassword?: boolean;
  isViewTouch?: boolean;
  onPress?: () => void;
  type?: 'box-none' | 'none' | 'box-only' | 'auto' | undefined;
  size?: number;
  styleIconRight?: StyleProp<ViewStyle>;
}
