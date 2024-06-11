import { ViewCus } from 'components';
import React from 'react';
import MapView, { MapViewProps, PROVIDER_GOOGLE } from 'react-native-maps';
import styles from './styles';

const MapViewCus: React.FC<React.PropsWithChildren & MapViewProps> = ({
  children,
  showsUserLocation = true,
  ...props
}) => {
  return (
    <ViewCus f-1>
      <MapView
        style={styles.container}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={showsUserLocation}
        {...props}>
        {children}
      </MapView>
    </ViewCus>
  );
};

export default MapViewCus;
