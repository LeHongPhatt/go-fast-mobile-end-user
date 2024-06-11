import { TextCus, ViewCus } from 'components';
import React from 'react';
import { StyleSheet } from 'react-native';
import { BaseStyle } from 'theme';
import { Colors } from 'theme';
interface IProps {
  onPress?: () => void;
  title?: string;
  content?: string;
  createdAt?: string;
}

const NotificationItem: React.FC<IProps> = ({}) => {
  return (
    <ViewCus style={styles.container}>
      <ViewCus style={[BaseStyle.flexRowSpaceBetwwen]} mb-6>
        <TextCus color={Colors.orangeFF} bold>
          Đã tìm được tài xế cho đơn hàng #50880901
        </TextCus>
        <ViewCus style={styles.coverRead}>
          <ViewCus style={styles.circleRead} />
        </ViewCus>
      </ViewCus>
      <ViewCus px-10>
        <TextCus>
          Tài xế đang trên đường lấy món và sẽ giao cho bạn trong thời gian sớm
          nhất
        </TextCus>
        <TextCus subhead color={Colors.grey85}>
          1h trước
        </TextCus>
      </ViewCus>
    </ViewCus>
  );
};
const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    ...BaseStyle.boxShadow,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  coverRead: {
    height: 14,
    width: 14,
    backgroundColor: Colors.redShadow02,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleRead: {
    height: 8,
    width: 8,
    backgroundColor: Colors.main,
    borderRadius: 4,
  },
});
export default NotificationItem;
