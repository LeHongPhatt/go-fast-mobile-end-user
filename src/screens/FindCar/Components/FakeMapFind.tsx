import React, { useEffect, useMemo, useState } from 'react';
import { Marker, PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
import { useGeo, useLocation } from 'hooks';
import { MapViewCus } from 'components';
import Icon from 'assets/svg/Icon';
import { Platform } from 'react-native';
import { BaseStyle } from 'theme';
import { MarkerBiker, MarkerBikerRandom, MarkerRadar } from '../Components';

export const FakeMapFind = ({
  startFind,
  type,
  fromToData,
  stepView,
}: {
  startFind?: boolean;
  type?: string;
  stepView: string;
  fromToData?: {
    from: {
      lat: number;
      long: number;
    };
    to: {
      lat: number;
      long: number;
    };
  };
}) => {
  const { locationUser } = useLocation();
  const { searchDirection } = useGeo();

  const [directionData, setDirectionData] = useState(null);
  const [polylineData, setPolylineData] = useState([]);
  const renderListBiker = useMemo(() => {
    if (polylineData.length > 0) {
      if (stepView !== 7)
        return (
          <MarkerBiker
            latitude={polylineData[0].latitude}
            longitude={polylineData[0].longitude}
            type={type}
          />
        );
      else {
        return (
          <MarkerBiker
            latitude={polylineData[polylineData.length - 1].latitude}
            longitude={polylineData[polylineData.length - 1].longitude}
            durationAnimation={1000}
            type={type}
          />
        );
      }
    }
    return Array(10)
      .fill(1)
      .map((_, index) => {
        return (
          <MarkerBikerRandom
            key={index}
            latitude={locationUser.lat}
            longitude={locationUser.long}
            durationAnimation={Platform.OS === 'android' ? 5000 : 0}
            type={type}
          />
        );
      });
  }, [locationUser, type, polylineData,stepView]);
  useEffect(() => {
    if (fromToData) {
      searchDirection(
        {
          origin: `${fromToData.from.lat},${fromToData.from.long}`,
          destination: `${fromToData.to.lat},${fromToData.to.long}`,
          vehicle: type as any,
        },
        res => {
          if (res.data) setDirectionData(res.data);
        },
      );
    }
  }, [fromToData, type]);

  const directionView = useMemo(() => {
    if (directionData && stepView === 4) {
      const route = directionData.routes[0];
      const { legs }: { legs: any[] } = route;
      const mapData = [];
      legs[0].steps.map(x => {
        mapData.push({
          latitude: x.start_location.lat,
          longitude: x.start_location.lng,
        });
        mapData.push({
          latitude: x.end_location.lat,
          longitude: x.end_location.lng,
        });
      });
      // var geometry_string = route.overview_polyline.points;
      // var geoJSON = polyline.toGeoJSON(geometry_string);
      setPolylineData(mapData);
      return (
        <Polyline
          coordinates={mapData}
          strokeColor="#4684F4" // fallback for when `strokeColors` is not supported by the map-provider
          // strokeColors={[
          //   '#7F0000',
          //   '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
          //   '#B24112',
          //   '#E5845C',
          //   '#238C23',
          //   '#7F0000',
          // ]}
          strokeWidth={6}
        />
      );
    }
    return <></>;
  }, [directionData, stepView]);

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
      {startFind && (
        <>
          <MarkerRadar
            latitude={locationUser.lat}
            longitude={locationUser.long}
          />
          <MarkerRadar
            latitude={locationUser.lat}
            longitude={locationUser.long}
            useAnimated={false}
          />
        </>
      )}
      {directionView}

      {renderListBiker}
      <Marker
        coordinate={{
          latitude: locationUser.lat,
          longitude: locationUser.long,
        }}>
        <Icon.IconLocationActive width={18} height={23} />
      </Marker>
    </MapViewCus>
  );
};
