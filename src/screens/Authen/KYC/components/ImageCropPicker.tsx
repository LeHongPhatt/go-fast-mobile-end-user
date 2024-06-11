import { IconCus, ImageCus, TouchCus, ViewCus, TextCus } from 'components';
import React, { ComponentType, useCallback, useRef, useState } from 'react';
import { Control, useWatch } from 'react-hook-form';
import {
  InteractionManager,
  StyleSheet,
  TouchableOpacityProps,
  ViewProps,
} from 'react-native';
import ImagePicker, { Image, Options } from 'react-native-image-crop-picker';
import { Colors } from 'theme';
import { dimensions, getComponent, uploadImage } from 'utils';
import { BottomSheetCommon } from 'components/BottomSheetModals';
import { IFormKYC, IRefBottom } from 'types';
const { width } = dimensions;
const UploadImageConfig: Options = {
  width: width,
  height: width,
  cropping: false,
  includeBase64: false,
  multiple: false,
};
interface IProps {
  onChangePicture: (image: any) => void;
  control: Control<IFormKYC>;
  isViewTouch?: boolean;
}
const ImageCropPicker: React.FC<IProps> = ({
  control,
  onChangePicture,
  isViewTouch,
}) => {
  const imageUser = useWatch({
    control,
    name: 'avatar',
  });
  const [picture, setPicture] = useState<Image>({} as Image);
  const refModal = useRef<IRefBottom>(null);

  const onOpenCamera = useCallback(() => {
    refModal.current?.close();
    InteractionManager.runAfterInteractions(() => {
      ImagePicker.openCamera({
        ...UploadImageConfig,
        mediaType: 'photo',
      }).then(image => {
        const infoImage = uploadImage(image as Image);
        setPicture(image as Image);
        onChangePicture(infoImage);
      });
    });
  }, [onChangePicture]);
  const onOpenLibary = useCallback(() => {
    refModal.current?.close();
    InteractionManager.runAfterInteractions(() => {
      ImagePicker.openPicker(UploadImageConfig).then(image => {
        const infoImage = uploadImage(image as Image);
        setPicture(image as Image);
        onChangePicture(infoImage);
      });
    });
  }, [onChangePicture]);
  const ViewTouch = getComponent(isViewTouch) as ComponentType<
    ViewProps | TouchableOpacityProps
  >;
  return (
    <>
      <ViewCus style={styles.wrapLogo}>
        <ViewTouch
          onPress={() => refModal.current?.show()}
          style={[styles.wrapTitle]}>
          {picture?.path || imageUser ? (
            <ImageCus
              source={{ uri: picture?.path || imageUser }}
              style={[styles.wrapTitle]}
            />
          ) : (
            <IconCus name={'camera'} size={18} color={Colors.white} />
          )}

          <ViewCus style={[styles.posBtnTitle, styles.cenItemvh]}>
            <IconCus name={'camera'} size={8} color={Colors.white} />
          </ViewCus>
        </ViewTouch>
      </ViewCus>
      <BottomSheetCommon
        ref={refModal}
        pressBehavior={'close'}
        hideBackdrop={false}>
        <ViewCus style={[styles.contaner]}>
          <TextCus textAlign="center" heading4>
            Chọn loại upload hình ảnh
          </TextCus>
          <ViewCus style={styles.content}>
            <TouchCus
              style={styles.btnImagePicker}
              onPress={onOpenCamera}
              activeOpacity={0.8}>
              <TextCus bold>Chụp ảnh</TextCus>
            </TouchCus>
            <TouchCus
              style={styles.btnImagePicker}
              onPress={onOpenLibary}
              activeOpacity={0.8}>
              <TextCus bold>Thư viện</TextCus>
            </TouchCus>
          </ViewCus>
        </ViewCus>
      </BottomSheetCommon>
    </>
  );
};
const styles = StyleSheet.create({
  wrapTitle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.disable,
  },
  cenItemvh: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapLogo: {
    alignItems: 'center',
    marginVertical: 20,
  },
  posBtnTitle: {
    bottom: 5,
    right: 5,
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.main,
    borderWidth: 1,
    borderColor: Colors.white,
  },
  contaner: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  content: {
    paddingHorizontal: 16,
  },
  btnImagePicker: {
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: Colors.white,
  },
});
export default ImageCropPicker;
