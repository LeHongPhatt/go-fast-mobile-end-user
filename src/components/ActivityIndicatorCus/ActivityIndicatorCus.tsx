import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Modal } from 'react-native-paper';
import { Colors } from 'theme';
import { IActivityProps } from 'types';

export function ActivityIndicatorCus(props: IActivityProps) {
  const {
    animating,
    size = 'small',
    color = Colors.main,
    loading = false,
    backdropColor = 'white',
    ...rest
  } = props;

  return (
    <Modal
      visible={loading}
      style={styles.modalView}
      contentContainerStyle={styles.container}
      theme={{
        colors: {
          backdrop: backdropColor,
        },
      }}>
      <View style={styles.container}>
        <ActivityIndicator
          animating={animating}
          color={color}
          {...rest}
          size={size}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalView: {
    backgroundColor: 'transparent',
  },
});
