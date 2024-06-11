import React, {
  forwardRef,
  useImperativeHandle,
  useLayoutEffect,
  useState,
  Ref,
} from 'react';
import Icon from 'assets/svg/Icon';
import { BottomSheetCommon, Buttons, TextCus, ViewCus } from 'components';
import { useRef } from 'react';
import { Colors } from 'theme';
import { IAlertProps, IRefBottom, TOAST, ToastInfo } from 'types';
import styles from './styles';

export interface BottomSheetRef {
  handleClosePress: () => void;
  handleOpenPress: (value: IAlertProps) => void;
}
const STATUS: Record<TOAST, ToastInfo> = {
  errors: {
    icon: Icon.ICON_ERROR,
    color: Colors.main,
  },
  success: {
    icon: Icon.ICON_SUCCESS,
    color: Colors.success,
  },
  warning: {
    icon: Icon.ICON_WARNING,
    color: Colors.blue47,
  },
};
let refGlobal: Ref<BottomSheetRef> = null;

export const onShowModal = (data: IAlertProps) => {
  if (refGlobal && 'current' in refGlobal && refGlobal.current) {
    refGlobal.current.handleOpenPress({ ...data });
  }
};
export const onCloseModal = () => {
  if (refGlobal && 'current' in refGlobal && refGlobal.current) {
    refGlobal.current.handleClosePress();
  }
};

const BottomSheetAlert = (props, ref: Ref<BottomSheetRef>) => {
  const refBottom = useRef<IRefBottom>(null);
  const [data, setData] = useState<IAlertProps | any>({});
  useLayoutEffect(() => {
    refGlobal = ref;
  }, [ref]);

  useImperativeHandle(ref, () => {
    return {
      handleClosePress: () => {
        refBottom.current?.close();
      },
      handleOpenPress: (value: IAlertProps) => {
        refBottom.current?.show();
        setData((prev: IAlertProps) => ({ ...prev, ...value }));
      },
    };
  });

  const IconLogo = STATUS[data?.type]?.icon;
  const color = STATUS[data?.type]?.color;
  return (
    <BottomSheetCommon
      ref={refBottom}
      hideBackdrop={false}
      onChange={props.onChange}
      pressBehavior={props.pressBehavior ?? 'close'}>
      <ViewCus style={styles.bgWhite} pb-10>
        {IconLogo && <IconLogo />}
        <ViewCus style={[styles.pdHorzi50, styles.mgVertzi20]}>
          {data?.title ? (
            <TextCus
              useI18n
              mb-8
              heading1
              style={[{ color }]}
              textAlign="center">
              {data?.title}
            </TextCus>
          ) : null}
          {data?.subtitle ? (
            <TextCus useI18n textAlign="center" color={Colors.grey85}>
              {data?.subtitle}
            </TextCus>
          ) : null}
        </ViewCus>
        <ViewCus style={styles.bottomAction}>
          {typeof data?.onCancel === 'function' && (
            <Buttons
              style={[styles.flex1, styles.mr10, data?.styleCancel]}
              onPress={() => data?.onCancel?.()}
              disabled={false}>
              <TextCus useI18n heading5 style={[data?.styleTextCancel]}>
                {data?.textCancel}
              </TextCus>
            </Buttons>
          )}
          {typeof data?.onOk === 'function' && (
            <Buttons
              style={[styles.flex1, { backgroundColor: color }, data?.styleOk]}
              onPress={() => data?.onOk?.()}
              disabled={false}>
              <TextCus
                heading5
                useI18n
                color={Colors.white}
                style={[data?.styleTextOk]}>
                {data?.textOk}
              </TextCus>
            </Buttons>
          )}
        </ViewCus>
      </ViewCus>
    </BottomSheetCommon>
  );
};

export default forwardRef(BottomSheetAlert);
