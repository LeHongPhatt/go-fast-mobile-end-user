import { Divider, IconApp, TextCus, TouchCus, ViewCus } from 'components';
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { BaseStyle, Colors } from 'theme';

interface IProps {
  icon?: string;
  name: string;
  isLine?: boolean;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  styleLine?: StyleProp<ViewStyle>;
  isHiden?: boolean;
}

const ListItem: React.FC<IProps> = ({
  icon,
  name,
  isLine,
  onPress,
  style,
  styleLine,
  isHiden,
}) => {
  if (!isHiden) {
    return <ViewCus />;
  }
  return (
    <>
      <TouchCus
        onPress={onPress}
        style={[BaseStyle.flexRowSpaceBetwwen, BaseStyle.wrapperMain, style]}
        bg-white>
        <ViewCus style={[BaseStyle.flexRowCenter]}>
          {icon && (
            <IconApp
              name={icon}
              size={22}
              color={Colors.greyAD}
              style={{ marginRight: 14 }}
            />
          )}
          <TextCus useI18n>{name}</TextCus>
        </ViewCus>
      </TouchCus>
      {!isLine && <Divider large style={[styleLine]} />}
    </>
  );
};
export default ListItem;
