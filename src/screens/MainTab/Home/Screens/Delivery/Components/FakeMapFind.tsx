import React, { useMemo } from 'react';
import { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useLocation } from 'hooks';
import { MapViewCus } from 'components';
import Icon from 'assets/svg/Icon';
import { Platform } from 'react-native';
import { BaseStyle } from 'theme';
import { MarkerBikerRandom } from '../Components';
import { MarkerIcon, MarkerRadar } from 'components/MapViewCus';

export const FakeMapFind = () => {
  const { locationUser } = useLocation();
  const renderListBiker = useMemo(() => {
    return Array(10)
      .fill(1)
      .map((_, index) => {
        return (
          <MarkerBikerRandom
            key={index}
            latitude={locationUser.lat}
            longitude={locationUser.long}
            durationAnimation={Platform.OS === 'android' ? 5000 : 0}
          />
        );
      });
  }, [locationUser]);

  return (
    <MapViewCus
      style={[BaseStyle.flex1]}
      provider={PROVIDER_GOOGLE}
      showsUserLocation={false}
      region={{
        latitude: locationUser.lat,
        longitude: locationUser.long,
        latitudeDelta: 0.0422,
        longitudeDelta: 0.0221,
      }}
      initialRegion={{
        latitude: locationUser.lat,
        longitude: locationUser.long,
        latitudeDelta: 0.0422,
        longitudeDelta: 0.0221,
      }}>
      <MarkerRadar latitude={locationUser.lat} longitude={locationUser.long} />
      <MarkerRadar
        latitude={locationUser.lat}
        longitude={locationUser.long}
        useAnimated={false}
      />

      {renderListBiker}
      <MarkerIcon location={locationUser} />
    </MapViewCus>
  );
};
