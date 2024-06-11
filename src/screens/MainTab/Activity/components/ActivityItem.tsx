import React, { useMemo } from 'react';
import { TextCus, TouchCus, ViewCus } from 'components';
import { StyleSheet } from 'react-native';
import { BaseStyle, Colors } from 'theme';
import { formatMoney, formatTimeDMY } from 'utils';
import { STATUS, IActivityItem, ACTIVITY_TYPE } from 'types';
import Icon from 'assets/svg/Icon';

interface IProps extends IActivityItem {
  onPress: () => void;
}

const ActivityItem: React.FC<IProps> = ({
  name,
  createdAt,
  status,
  price,
  type,
  onPress,
}) => {
  const { statusName, color } = useMemo(() => {
    return {
      statusName: STATUS[status]?.name,
      color: STATUS[status]?.color,
    };
  }, [status]);
  const { TypeIcon, iconColor } = useMemo(() => {
    return {
      TypeIcon:
        Icon[
          `${
            ACTIVITY_TYPE[type]
              ? ACTIVITY_TYPE[type].icon
              : ACTIVITY_TYPE.drink.icon
          }`
        ],
      iconColor: ACTIVITY_TYPE[type]
        ? ACTIVITY_TYPE[type].color
        : ACTIVITY_TYPE.drink.color,
    };
  }, [type]);
  return (
    <TouchCus style={styles.container} onPress={onPress}>
      <ViewCus flex-row>
        <ViewCus
          h-44
          w-44
          br-22
          style={[{ backgroundColor: iconColor }, styles.wrapperIcon]}>
          <TypeIcon />
        </ViewCus>
        <ViewCus style={[BaseStyle.flexShrink1]}>
          <TextCus bold color-black3A>
            {name}
          </TextCus>
          <TextCus color-grey85>{formatTimeDMY(createdAt)}</TextCus>
        </ViewCus>
      </ViewCus>
      <ViewCus style={styles.line} />
      <ViewCus flex-row justify-space-between items-center>
        <TextCus color={color} medium>
          {statusName}
        </TextCus>
        <TextCus medium>{formatMoney(price)}</TextCus>
      </ViewCus>
    </TouchCus>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.greyF8,
    borderRadius: 8,
    marginBottom: 12,
    padding: 12,
  },
  line: {
    marginTop: 8,
    marginBottom: 12,
    borderWidth: 0.5,
    borderColor: Colors.greyAD,
    borderStyle: 'dashed',
  },
  wrapperIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
});
export default ActivityItem;
