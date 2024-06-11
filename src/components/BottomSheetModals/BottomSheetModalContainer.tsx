import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFooter,
} from '@gorhom/bottom-sheet';
import { TextCus } from 'components';
import React, {
  ReactNode,
  Ref,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import {
  BackHandler,
  Keyboard,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';
import { Divider } from 'react-native-paper';
import { getHeight, styleSpacing } from 'utils';
import styles from './styles';
import { IRefBottom } from 'types';
import { Portal } from '@gorhom/portal';

const BottomSheetModalContainer = (
  props: IBottomSheetModalContainer,
  ref: Ref<IRefBottom>,
) => {
  const {
    children,
    title,
    // onClose,
    snapPoints = ['1%', '50%'],
    showIndicator = false,
    hideBackdrop = false,
    bottomInset,
    footerComponent,
    styleContent,
    ...rest
  } = props;
  const bottomSheetRef = useRef<BottomSheet>(null);
  // variables
  const snapPoint = useMemo(() => snapPoints, [snapPoints]);
  // const [index, setIndex] = useState(1);
  // callbacks

  // renders
  const renderFooter = useCallback(
    prop => (
      <BottomSheetFooter {...prop} bottomInset={bottomInset}>
        {footerComponent && footerComponent}
      </BottomSheetFooter>
    ),
    [footerComponent],
  );

  useImperativeHandle(ref, () => {
    return {
      close: () => bottomSheetRef.current?.close(),
      show: () => bottomSheetRef.current?.snapToIndex(0),
    };
  });

  useEffect(() => {
    const backAction = () => {
      bottomSheetRef.current?.close();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const renderBackdrop = useCallback(
    (prop: any) => (
      <BottomSheetBackdrop
        {...prop}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        onPress={Keyboard.dismiss()}
      />
    ),
    [],
  );
  return (
    <Portal>
      <BottomSheet
        footerComponent={renderFooter}
        backdropComponent={!hideBackdrop ? renderBackdrop : null}
        ref={bottomSheetRef}
        index={-1}
        onChange={index => {
          if (index === -1) {
            bottomSheetRef.current?.close();
          }
        }}
        handleIndicatorStyle={showIndicator ? styles.show : styles.hidden}
        snapPoints={snapPoint}
        {...rest}>
        <View style={[styles.contentContainer, styleContent]}>
          {title && (
            <View style={styles.cenItemvh}>
              <TextCus semiBold heading5 mb-12>
                {title}
              </TextCus>
              <Divider
                style={[getHeight(2), styles.bgDivider, styleSpacing('mb-16')]}
              />
            </View>
          )}
          {children && children}
        </View>
      </BottomSheet>
    </Portal>
  );
};

export interface IBottomSheetModalContainer {
  style?: any;
  top?: string;
  showIndicator?: boolean;
  title?: string;
  titleBtn?: string;
  subtitle?: string;
  children?: ReactNode;
  onClose?: () => void;
  onOk?: () => void;
  bottomInset?: number;
  footerComponent?: any;
  snapPoints?: string[];
  hideBackdrop: boolean;
  styleContent?: StyleProp<ViewStyle>;
}

export default forwardRef(BottomSheetModalContainer);
