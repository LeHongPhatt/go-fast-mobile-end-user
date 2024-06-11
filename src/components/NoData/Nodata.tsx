import Icon from 'assets/svg/Icon';
import { TextCus } from 'components';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { ENodata, ICON_NO_DATA } from 'types';
import styles from './styles';

interface INodata {
  iconName?: string;
  size?: number;
  style?: any;
  title?: string;
}

export default function Nodata(props: INodata) {
  const { iconName = ENodata.NODATA_FOOD, title } = props;
  const { t } = useTranslation();
  const IconApp = Icon?.[`${ICON_NO_DATA[iconName]}`];
  return (
    <View style={styles.padContentBtn}>
      <View style={styles.cenItem}>
        <IconApp />
        <TextCus mt-20>{title ?? t('khong_co_du_lieu')}</TextCus>
      </View>
    </View>
  );
}
