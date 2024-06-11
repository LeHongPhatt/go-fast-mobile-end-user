import { HomeLayout, TextCus, ViewCus } from 'components';
import React from 'react';
import { Colors } from 'theme';
import styles from './styles';
export default function RequestDelivery() {
  return (
    <HomeLayout
      bgColor={Colors.main}
      header={{
        title: 'delivery.title',
        iconColor: Colors.white,
      }}
      isForForm
      textBtn="delivery.send_request"
      btnStyle={styles.btnAction}
      styleBtnCover={styles.wrapperCover}>
      <ViewCus p-16>
        <ViewCus style={styles.wrapperContent}>
          <TextCus heading5 mb-4>
            Lưu ý
          </TextCus>
          <TextCus>
            Không hỗ trợ giao nhận các vật phẩm thuộc nhóm chất cấm hoặc trái
            quy định nhà nước. Hàng hóa vận chuyển không vượt quá cân nặng và
            kích thước quy định (tối đa 30kg, 50x40x50cm)
          </TextCus>
        </ViewCus>
      </ViewCus>
    </HomeLayout>
  );
}
