import { IconName } from 'assets';
import { IconApp, TouchCus, ViewCus } from 'components';
import { TextCus } from 'components/TextCus';
import React, {
  Ref,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useLayoutEffect,
  useState,
} from 'react';
import { Modal, StyleSheet } from 'react-native';
import { Colors } from 'theme';
import { openLink, width } from 'utils';
interface IProps {}
interface IModalState {
  visible?: boolean;
  phone?: string;
}
interface IModalCallPhoneRef {
  showModal: ({ ...rest }: IModalState) => void;
  closeModal: () => void;
}

let refGlobal: React.Ref<IModalCallPhoneRef> = null;
export const showCallPhone = ({ ...rest }: IModalState) => {
  if (refGlobal && 'current' in refGlobal && refGlobal.current) {
    refGlobal.current?.showModal({ ...rest });
  }
};
const CallPhone = ({}: IProps, ref: Ref<IModalCallPhoneRef>) => {
  const [state, setState] = useState<IModalState>({
    phone: '',
    visible: false,
  });
  useLayoutEffect(() => {
    refGlobal = ref;
  }, [ref]);

  useImperativeHandle(ref, () => {
    return {
      closeModal,
      showModal,
    };
  });

  const closeModal = useCallback(() => {
    setState(prev => ({ ...prev, visible: false }));
  }, []);
  const showModal = useCallback(({ ...rest }: IModalState) => {
    setState({
      ...rest,
      visible: true,
    });
  }, []);
  const onCallPhone = useCallback(() => {
    openLink('telephone', `${state.phone}`);
  }, [state.phone]);
  return (
    <Modal visible={state.visible} transparent={true} animationType="fade">
      <ViewCus style={styles.container}>
        <TouchCus style={styles.wrapperContent} flex-row onPress={onCallPhone}>
          <IconApp name={IconName.Phone} size={20} color={Colors.grey6A} />
          <TextCus
            ml-10
            heading5
            useI18n
            paramI18n={{ phone: state?.phone }}
            color={Colors.blue47}
            regular>
            call
          </TextCus>
        </TouchCus>
        <TouchCus style={styles.wrapperContent} onPress={closeModal}>
          <TextCus heading5 useI18n color={Colors.blue47} textAlign="center">
            action.cancel
          </TextCus>
        </TouchCus>
      </ViewCus>
    </Modal>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0, 0.4)',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 20,
  },
  wrapperContent: {
    width: width - 24,
    borderRadius: 12,
    backgroundColor: Colors.white,
    paddingVertical: 14,
    paddingHorizontal: 24,
    marginBottom: 10,
  },
});
export default forwardRef(CallPhone);
