import Icon from 'assets/svg/Icon';
import React from 'react';
import { Marker } from 'react-native-maps';
import { ILongLocation } from 'types';
interface MarkerIconProps {
  location: ILongLocation;
  iconName?: string;
  customIcon?: React.JSX.Element;
}
const MarkerIcon: React.FC<MarkerIconProps> = props => {
  const iconShow = React.useMemo(() => {
    if (props.customIcon) return props.customIcon;
    if (Object.keys(Icon).includes(props.iconName)) {
      return Icon[props.iconName]({ width: 18, height: 23 });
    }
    return <Icon.IconLocationActive width={18} height={23} />;
  }, [props]);
  return (
    <Marker
      coordinate={{
        latitude: props.location.lat,
        longitude: props.location.long,
      }}>
      {iconShow}
    </Marker>
  );
};
export default MarkerIcon;
