import {
  Header,
  IconCus,
  SafeAreaStatusBar,
  SafeAreaViewCus,
  TextInputs,
  TouchCus,
  ViewCus,
} from 'components';
import { KeyboardScrollView } from 'components/KeyboardScrollView';
import React, { useCallback, useMemo } from 'react';
import { Colors } from 'theme';
import { EAction, IMainLayoutProps, TmodeContent } from 'types';
import styles from './styles';
import { Platform } from 'react-native';

const HomeLayout = (props: IMainLayoutProps) => {
  const {
    children,
    bgColor,
    header,
    setAction,
    action,
    isForForm,
    textBtn,
    isDark,
    ...rest
  } = props;

  const headerCustom = useCallback(() => {
    switch (action) {
      case EAction.SEARCH:
        return (
          <Header
            onPressLeft={
              header?.onPressLeft ? header.onPressLeft : () => setAction?.(null)
            }
            showCenter={false}
            renderLeft={() => (
              <IconCus name={'chevron-left'} size={18} color={Colors.white} />
            )}
            renderRight={() => (
              <TextInputs
                style={styles.inputSearch}
                placeholder={'Tìm kiếm'}
                rightIcon={
                  <TouchCus onPress={() => {}}>
                    {/* {Icon.Search({ color: Colors.border })} */}
                  </TouchCus>
                }
                success
              />
            )}
          />
        );
      default:
        return <Header {...header} />;
    }
  }, [action, header]);
  const { modeContent } = useMemo(() => {
    return {
      modeContent:
        Platform.OS === 'android'
          ? 'dark-content'
          : isDark
          ? 'dark-content'
          : 'light-content',
    };
  }, [isDark]);
  return (
    <SafeAreaViewCus bgColor={bgColor ?? Colors.white}>
      <SafeAreaStatusBar modeContent={modeContent as TmodeContent} />
      {headerCustom()}
      {isForForm ? (
        <KeyboardScrollView textBtn={textBtn} {...rest}>
          {children}
        </KeyboardScrollView>
      ) : (
        <ViewCus f-1 bg-white>
          {children}
        </ViewCus>
      )}
    </SafeAreaViewCus>
  );
};

export default HomeLayout;
