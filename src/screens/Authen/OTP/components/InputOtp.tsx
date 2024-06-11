import Clipboard from '@react-native-clipboard/clipboard';
import { ViewCus } from 'components';
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import {
  EmitterSubscription,
  I18nManager,
  Keyboard,
  Platform,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import { Colors, FontWeight } from 'theme';
import { codeToArray, isIos, width } from 'utils';

type OTPInputProps = {
  pinCount: number;
  onCodeFilled?: (code: string) => void;
  autoFocusOnLoad?: boolean;
  code?: string;
  error?: string | undefined;
  onChange: (code: string) => void;
};

const InputOtp: FC<OTPInputProps> = ({
  code = undefined,
  autoFocusOnLoad = true,
  pinCount = 6,
  onCodeFilled = undefined,
  error,
  onChange,
}) => {
  const fields = useRef<TextInput[] | null[]>([]);
  const keyboardDidHideListener = useRef<null | EmitterSubscription>(null);
  const timer = useRef<null | ReturnType<typeof setTimeout>>(null);
  const hasCheckedClipBoard = useRef(false);
  const clipBoardCode = useRef('');
  const [digits, setDigits] = useState(codeToArray(code));
  const [selectedIndex, setSelectedIndex] = useState(autoFocusOnLoad ? 0 : -1);
  useEffect(() => {
    copyCodeFromClipBoardOnAndroid();
    bringUpKeyBoardIfNeeded();
    keyboardDidHideListener.current = Keyboard.addListener(
      'keyboardDidHide',
      handleKeyboardDidHide,
    );
    return () => {
      if (timer.current) {
        clearInterval(timer.current);
      }
      keyboardDidHideListener.current?.remove();
    };
  }, []);

  const getDigits = useCallback(
    () => (code === undefined ? digits : code.split('')),
    [code, digits],
  );

  const focusField = useCallback((index: number) => {
    if (
      fields.current !== null &&
      fields.current[index] !== null &&
      fields.current[index] !== undefined &&
      index < fields.current.length
    ) {
      fields.current?.[index]?.focus();
      setSelectedIndex(index);
    }
  }, []);

  const blurAllFields = useCallback(() => {
    // if (fields.current !== null) {
    //   fields.current.forEach(field => {
    //     if (field !== null) {
    //       field?.blur();
    //     }
    //   });
    //   setSelectedIndex(-1);
    // }
  }, []);

  const checkPinCodeFromClipBoard = useCallback(() => {
    const regexp = new RegExp(`^\\d{${pinCount}}$`);
    Clipboard.getString()
      .then(codeFromClipboard => {
        if (
          hasCheckedClipBoard.current &&
          regexp.test(codeFromClipboard) &&
          clipBoardCode.current !== codeFromClipboard
        ) {
          setDigits(codeToArray(codeFromClipboard));
          blurAllFields();
          onCodeFilled && onCodeFilled(codeFromClipboard);
        }
        clipBoardCode.current = codeFromClipboard;
        hasCheckedClipBoard.current = true;
      })
      .catch(() => {});
  }, [blurAllFields, onCodeFilled, pinCount]);

  const copyCodeFromClipBoardOnAndroid = useCallback(() => {
    if (Platform.OS === 'android') {
      checkPinCodeFromClipBoard();
      timer.current = setInterval(checkPinCodeFromClipBoard, 400);
    }
  }, [checkPinCodeFromClipBoard]);

  const bringUpKeyBoardIfNeeded = useCallback(() => {
    const currentDigits = getDigits();
    const focusIndex = currentDigits.length ? currentDigits.length - 1 : 0;
    if (focusIndex < pinCount && autoFocusOnLoad) {
      focusField(focusIndex);
    }
  }, [autoFocusOnLoad, focusField, getDigits, pinCount]);

  const handleKeyboardDidHide = useCallback(() => {
    blurAllFields();
  }, [blurAllFields]);

  const onChangeText = useCallback(
    (currentIndex: number, text: string) => {
      let index = currentIndex;
      const currentDigits = getDigits();

      let newDigits = currentDigits.slice();
      const oldTextLength =
        newDigits?.[index] !== undefined ? newDigits?.[index]?.length ?? 0 : 0;
      const newTextLength = text.length;
      if (newTextLength - oldTextLength === pinCount) {
        // user pasted text in.
        newDigits = text.split('').slice(oldTextLength, newTextLength);
        setDigits(newDigits);
      } else {
        if (text.length === 0) {
          if (newDigits.length > 0) {
            newDigits = newDigits.slice(0, newDigits.length - 1);
          }
        } else {
          text.split('').forEach(value => {
            if (index < pinCount) {
              newDigits[index] = value;
              index += 1;
            }
          });
          index -= 1;
        }

        setDigits(newDigits);
      }

      const result = newDigits.join('');
      onChange(result);
      if (result.length >= pinCount) {
        onCodeFilled && onCodeFilled(result);
        focusField(pinCount - 1);
        blurAllFields();
      } else if (text.length > 0 && index < pinCount - 1) {
        focusField(index + 1);
      }
    },
    [getDigits, pinCount, onCodeFilled, focusField, blurAllFields],
  );

  const onKeyPress = useCallback(
    (index: number, key: string) => {
      const currentDigits = getDigits();
      if (key === 'Backspace') {
        if (currentDigits[index] !== undefined && index >= 0) {
          onChangeText(index - 1, '');
          if (index > 0) {
            focusField(index - 1);
          }
          return;
        }
        if (currentDigits[index] === undefined && index >= 0) {
          focusField(index - 1);
        }
      }
    },
    [getDigits, focusField, onChangeText],
  );

  return (
    <ViewCus testID="OTPInput">
      <TouchableWithoutFeedback
        onPress={() => {
          const filledPinCount = digits.filter(
            digit => digit !== null && digit !== undefined,
          ).length;
          focusField(Math.min(filledPinCount, pinCount - 1));
        }}>
        <ViewCus style={styles.wrapperRenderTextFields}>
          {Array(pinCount)
            .fill(null)
            .map((__, index) => (
              <ViewCus
                pointerEvents="none"
                key={`${index}view`}
                testID="inputSlotView">
                <TextInput
                  testID="textInput"
                  underlineColorAndroid={Colors.shadow00}
                  style={[
                    styles.textInputStyle,
                    {
                      borderColor: error ? Colors.main : Colors.black3A,
                      color: Colors.main,
                    },
                  ]}
                  ref={ref => {
                    fields.current[index] = ref;
                  }}
                  onChangeText={text => {
                    if (text) {
                      onChangeText(index, text);
                    }
                  }}
                  onKeyPress={({ nativeEvent: { key } }) => {
                    onKeyPress(index, key);
                  }}
                  value={digits[index]}
                  keyboardType="number-pad"
                  textContentType="oneTimeCode"
                  selectionColor={Colors.main}
                  secureTextEntry={false}
                  numberOfLines={1}
                  autoComplete={'sms-otp'}
                  autoFocus={selectedIndex === index}
                />
              </ViewCus>
            ))}
        </ViewCus>
      </TouchableWithoutFeedback>
    </ViewCus>
  );
};

const styles = StyleSheet.create({
  wrapperRenderTextFields: {
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: width,
    overflow: 'hidden',
    paddingHorizontal: 25,
  },
  textInputStyle: {
    fontSize: 30,
    fontWeight: FontWeight.bold,
    textAlign: 'center',
    color: Colors.main,
    borderBottomWidth: 2,
    width: 40,
    maxWidth: 40,
    overflow: 'hidden',
    height: isIos ? 32 : 48,
    borderColor: Colors.black3A,
    paddingBottom: 5,
  },
});

export default InputOtp;
