import Icon from 'assets/svg/Icon';
import { TextCus, ViewCus } from 'components';
import styles from './styles';
import { Colors } from 'theme';
const OrderIsSuccess: React.FC = () => {
  return (
    <>
      <Icon.ICON_SUCCESS />
      <ViewCus p-16 style={[styles.w100]}>
        <ViewCus items-center>
          <TextCus useI18n heading1 bold color={Colors.success}>
            Hoàn thành chuyến xe
          </TextCus>
          <TextCus useI18n color={Colors.grey84} textAlign="center">
            {'Chuyến xe đã thành công!\nHãy để lại đánh giá của bạn nhé!'}
          </TextCus>
        </ViewCus>
      </ViewCus>
    </>
  );
};

export default OrderIsSuccess;
