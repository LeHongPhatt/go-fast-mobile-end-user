import SvgIconNew from 'assets/IconSVG';
import { Header } from 'components';
import React, { ReactNode } from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { Modal, Portal } from 'react-native-paper';
import { height, width } from 'utils/libs';
import { Colors } from 'theme';

export function ModalCus(props: IModalProps) {
  const { visible, children, showTitle, title, hideModal, style, ...rest } =
    props;
  const isIos = Platform.OS === 'ios';

  return visible ? (
    <Portal>
      <Modal visible={visible} onDismiss={() => hideModal()} {...rest}>
        <View style={isIos ? [styles.containerModal, style] : style}>
          {showTitle && (
            <Header
              title={title}
              renderLeft={() => <SvgIconNew.ArrowLeft />}
              onPressLeft={() => hideModal()}
            />
          )}
          {children}
        </View>
      </Modal>
    </Portal>
  ) : null;
}

const styles = StyleSheet.create({
  container: { height: height - 60 },
  containerModal: {
    width,
    height: height + 65,
    backgroundColor: Colors.white,
  },
});

export interface IModalProps {
  style?: any;
  title?: string;
  children: ReactNode;
  hideModal: () => void;
  visible: boolean;
  showTitle?: boolean;
}
