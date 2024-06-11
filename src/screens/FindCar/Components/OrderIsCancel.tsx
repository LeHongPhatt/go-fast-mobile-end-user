import Icon from 'assets/svg/Icon';
import { TextCus, ViewCus } from 'components';
import styles from './styles';
import { Colors } from 'theme';
const OrderIsCancel: React.FC = () => {
  return (
    <>
      <Icon.ICON_ERROR />
      <ViewCus p-16 style={[styles.w100]}>
        <ViewCus items-center>
          <TextCus useI18n heading1 bold color={Colors.redBF}>
            delivery.orderIsCancel
          </TextCus>
          <TextCus useI18n>delivery.orderIsCancelPleaseCreateNew</TextCus>
        </ViewCus>
      </ViewCus>
    </>
  );
};

export default OrderIsCancel;
