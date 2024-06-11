import { IconName } from 'assets';
import {
  BottomSheetModalContainer,
  Divider,
  IconApp,
  TextCus,
  TouchCus,
  ViewCus,
} from 'components';
import React, { forwardRef } from 'react';
import PromotionItem from './PromotionItem';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { StyleSheet } from 'react-native';
import { BaseStyle, Colors } from 'theme';
import { width } from 'utils';
import { IPromotion } from 'types';
import moment from 'moment';
import WebView from 'react-native-webview';
interface PageProps {
  onCloseModal: () => void;
  promotion?: IPromotion;
}
const PromotionDetail = ({ onCloseModal, promotion }: PageProps, ref) => {
  return (
    <BottomSheetModalContainer
      ref={ref}
      hideBackdrop={false}
      snapPoints={['88%']}>
      <ViewCus flex-row justify-space-between px-16 mb-12>
        <TextCus semiBold heading5 mb-12 f-1 textAlign="center">
          Chi tiết ưu đãi
        </TextCus>
        <TouchCus onPress={onCloseModal}>
          <IconApp name={IconName.Remove} size={20} />
        </TouchCus>
      </ViewCus>
      <PromotionItem item={promotion} />
      <BottomSheetScrollView contentContainerStyle={styles.container}>
        <ViewCus style={[BaseStyle.flexRowSpaceBetwwen]} mb-8>
          <TextCus color-grey85>Mã</TextCus>
          <TextCus bold>{promotion?.code}</TextCus>
        </ViewCus>
        <ViewCus style={[BaseStyle.flexRowSpaceBetwwen]}>
          <TextCus color-grey85>Hạn sử dụng</TextCus>
          <TextCus bold>
            {moment(Number(promotion?.end_date ?? 0) * 1000).format(
              'DD/MM/yyyy',
            )}
          </TextCus>
        </ViewCus>
        <Divider small style={styles.line} />
        {promotion?.description && (
          <WebView source={{ html: promotion.description }} />
        )}
      </BottomSheetScrollView>
    </BottomSheetModalContainer>
  );
};
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    width,
    paddingHorizontal: 16,
  },
  line: {
    marginVertical: 16,
    backgroundColor: Colors.greyD1,
  },
  circle: {
    width: 3,
    height: 3,
    borderRadius: 3,
    backgroundColor: Colors.black,
    marginTop: 8,
  },
});
export default forwardRef(PromotionDetail);
