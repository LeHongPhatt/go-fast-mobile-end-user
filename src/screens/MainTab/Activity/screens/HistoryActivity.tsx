import React, { useCallback } from 'react';
import {
  Divider,
  HomeLayout,
  IconApp,
  ImageCus,
  TextCus,
  TouchCus,
  ViewCus,
  ScrollViewCus,
  Routine,
} from 'components';
import { BaseStyle, Colors } from 'theme';
import { formatMoney } from 'utils';
import { StyleSheet } from 'react-native';
import { IconName } from 'assets';
import { NavigationService, Routes } from 'navigation';
import { showCallPhone } from 'components/CallPhone/CallPhone';

export default function HistoryActivity() {
  const onHandleSupport = useCallback(() => {
    showCallPhone({ phone: '19008079' });
  }, []);
  return (
    <HomeLayout
      bgColor={Colors.main}
      header={{
        iconColor: Colors.white,
        title: 'activity.history',
        renderRight: () => (
          <TouchCus onPress={onHandleSupport}>
            <TextCus heading5 useI18n color-white>
              activity.support
            </TextCus>
          </TouchCus>
        ),
      }}>
      <ScrollViewCus>
        <TouchCus
          style={[BaseStyle.wrapperMain, styles.btnAddress]}
          onPress={() => {
            // NavigationService.navigate(Routes.Delivery);
          }}>
          <ImageCus style={styles.image} />
          <ViewCus flex-row f-1 justify-space-between ml-12>
            <ViewCus>
              <TextCus bold>Cơm Gà Xối Mỡ 142 - Đinh Tiên Hoàng</TextCus>
              <TextCus subhead color-grey85>
                Đã hủy
              </TextCus>
            </ViewCus>
          </ViewCus>
          <IconApp name={IconName.ChevronRight} size={14} />
        </TouchCus>
        <Divider medium />
        <Routine
          from="36 Đinh Tiên Hoàng, Phường 6, Quận Bình Thạnh"
          to="58 Trần Văn Danh, Phường 13, Quận Tân Bình"
          titleNote="Ghi chú cho tài xế"
          note="Bấm chuông giúp tôi, đừng gọi điện nhà có em bé"
        />
        <ViewCus
          style={[BaseStyle.wrapperDisable, BaseStyle.flexRowSpaceBetwwen]}>
          <TextCus heading5>Đơn hàng</TextCus>
          <TextCus bold>#50880901</TextCus>
        </ViewCus>
        <ViewCus style={[BaseStyle.wrapperMain]}>
          <ViewCus style={[BaseStyle.flexRowSpaceBetwwen]}>
            <ViewCus style={[BaseStyle.flexRowCenter]}>
              <TextCus bold mr-5>
                1x
              </TextCus>
              <TextCus>Cơm gà chiên mắm tỏi</TextCus>
            </ViewCus>
            <TextCus>{formatMoney(100000)}</TextCus>
          </ViewCus>
          <Divider small color={Colors.greyEE} style={styles.divider} />
          <ViewCus style={[BaseStyle.flexRowSpaceBetwwen]}>
            <ViewCus style={[BaseStyle.flexRowCenter]}>
              <TextCus bold mr-5>
                1x
              </TextCus>
              <TextCus>Cơm gà xối mỡ</TextCus>
            </ViewCus>
            <TextCus>{formatMoney(100000)}</TextCus>
          </ViewCus>
          <Divider small color={Colors.greyEE} style={styles.divider} />
          <ViewCus style={[BaseStyle.flexRowSpaceBetwwen]}>
            <ViewCus style={[BaseStyle.flexRowCenter]}>
              <TextCus bold mr-5>
                1x
              </TextCus>
              <TextCus>Cơm gà hấp muối</TextCus>
            </ViewCus>
            <TextCus>{formatMoney(100000)}</TextCus>
          </ViewCus>
        </ViewCus>
        <Divider medium />
        <ViewCus style={[BaseStyle.wrapperMain]}>
          <TextCus heading5 mb-16>
            Thanh toán
          </TextCus>
          <ViewCus style={[BaseStyle.flexRowSpaceBetwwen]} mb-5>
            <TextCus>Ước tính</TextCus>
            <TextCus>{formatMoney(500000)}</TextCus>
          </ViewCus>
          <ViewCus style={[BaseStyle.flexRowSpaceBetwwen]} mb-5>
            <TextCus>Phí vận chuyển (3.6 km)</TextCus>
            <TextCus>{formatMoney(500000)}</TextCus>
          </ViewCus>
          <ViewCus style={[BaseStyle.flexRowSpaceBetwwen]} mb-5>
            <TextCus>Ưu đãi</TextCus>
            <TextCus>{formatMoney(500000)}</TextCus>
          </ViewCus>
          <Divider small color={Colors.greyEE} style={styles.divider} />
          <ViewCus style={[BaseStyle.flexRowSpaceBetwwen]} mb-5>
            <TextCus bold>Thanh toán tiền mặt</TextCus>
            <TextCus bold>{formatMoney(500000)}</TextCus>
          </ViewCus>
        </ViewCus>
      </ScrollViewCus>
    </HomeLayout>
  );
}
const styles = StyleSheet.create({
  active: {
    width: 16,
    height: 16,
    borderWidth: 8,
    borderColor: Colors.main,
    borderRadius: 8,
    marginRight: 8,
  },
  nonActive: {
    width: 16,
    height: 16,
    borderWidth: 1,
    borderColor: Colors.main,
    borderRadius: 8,
    marginRight: 8,
  },
  line: {
    height: 20,
    borderLeftWidth: 1,
    borderLeftColor: Colors.main,
  },
  divider: {
    marginVertical: 12,
  },
  image: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
  },
  btnAddress: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
