import React, { useEffect, useMemo, useState } from 'react';
import { Marker, PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
import { useGeo, useLocation } from 'hooks';
import { MapViewCus } from 'components';
import Icon from 'assets/svg/Icon';
import { Platform } from 'react-native';
import { BaseStyle, Colors } from 'theme';
import { MarkerBiker, MarkerBikerRandom, MarkerRadar } from '../Components';
import { FindCarScreenStepView } from '../FindCar';

export const FakeMapFind = ({
  startFind,
  type,
  fromToData,
  stepView,
}: {
  type?: 'car' | 'bike' | 'truck' | 'taxi' | 'hd';
  startFind?: boolean;
  // type?: string;
  stepView: FindCarScreenStepView;
  fromToData?: {
    from: {
      address?: string;
      lat: number;
      long: number;
    };
    to: {
      address?: string;
      lat: number;
      long: number;
    };
  };
}) => {
  const locationUser = useMemo(() => {
    if (
      fromToData &&
      fromToData.from &&
      fromToData.from.lat &&
      fromToData.from.long
    ) {
      return fromToData.from;
    }
    return null;
  }, [fromToData]);

  const { locationUser: locationInit } = useLocation();
  const { searchDirection } = useGeo();

  const [directionData, setDirectionData] = useState(null);
  const [polylineData, setPolylineData] = useState([]);
  const renderListBikerRandom = useMemo(() => {
    if (
      ![
        FindCarScreenStepView.ON_PROCESS,
        FindCarScreenStepView.DRIVER_ARE_COMING,
        FindCarScreenStepView.ON_PROCESS,
        FindCarScreenStepView.ORDER_IS_CANCEL,
        FindCarScreenStepView.ORDER_IS_SUCCESS,
      ].includes(stepView)
    ) {
      return Array(10)
        .fill(1)
        .map((_, index) => {
          return (
            <MarkerBikerRandom
              key={index}
              latitude={(locationUser ?? locationInit).lat}
              longitude={(locationUser ?? locationInit).long}
              durationAnimation={Platform.OS === 'android' ? 2000 : 0}
              type={type}
            />
          );
        });
    }
    return <></>;
  }, [locationUser, type, stepView, locationInit]);

  const renderBikerLocation = useMemo(() => {
    if (
      polylineData.length > 0 &&
      ![
        FindCarScreenStepView.QUESTION_CHOOSE_FROM_TO,
        FindCarScreenStepView.CHOOSE_FROM_TO,
        FindCarScreenStepView.CHOOSE_DELIVERY_OPTION,
        FindCarScreenStepView.FIND_DRIVER,
      ].includes(stepView)
    ) {
      if (
        ![
          FindCarScreenStepView.QUESTION_CHOOSE_FROM_TO,
          FindCarScreenStepView.CHOOSE_FROM_TO,
          FindCarScreenStepView.CHOOSE_DELIVERY_OPTION,
          FindCarScreenStepView.FIND_DRIVER,
          FindCarScreenStepView.ORDER_IS_SUCCESS,
        ].includes(stepView)
      )
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
    return <></>;
  }, [locationUser, type, polylineData, stepView, locationInit]);

  useEffect(() => {
    if (fromToData) {
      if (
        fromToData.from.lat &&
        fromToData.from.long &&
        fromToData.to.lat &&
        fromToData.to.long
      ) {
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
    }
  }, [fromToData, type]);

  const directionView = useMemo(() => {
    if (
      directionData &&
      [
        FindCarScreenStepView.CHOOSE_DELIVERY_OPTION,
        FindCarScreenStepView.DRIVER_ARE_COMING,
        FindCarScreenStepView.FIND_DRIVER,
        FindCarScreenStepView.ON_PROCESS,
        FindCarScreenStepView.CHOOSE_FROM_TO,
      ].includes(stepView)
    ) {
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
          strokeColor={Colors.main}
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
      showsUserLocation={true}
      region={{
        latitude:
          stepView !== FindCarScreenStepView.ORDER_IS_SUCCESS && fromToData
            ? (locationUser ?? locationInit).lat
            : fromToData?.to?.lat,
        longitude:
          stepView !== FindCarScreenStepView.ORDER_IS_SUCCESS && fromToData
            ? (locationUser ?? locationInit).long
            : fromToData.to?.long,
        latitudeDelta: 0.0422,
        longitudeDelta: 0.0221,
      }}
      initialRegion={{
        latitude: locationInit.lat,
        longitude: locationInit.long,
        latitudeDelta: 0.0422,
        longitudeDelta: 0.0221,
      }}>
      {startFind && locationUser && (
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

      {renderListBikerRandom}
      {renderBikerLocation}
      {locationUser && (
        <Marker
          title={fromToData?.from?.address}
          description="Điểm đón"
          coordinate={{
            latitude: locationUser.lat,
            longitude: locationUser.long,
          }}>
          <Icon.SpotLight />
        </Marker>
      )}
      {fromToData?.to?.lat &&
        fromToData?.to?.long &&
        fromToData?.to?.address && (
          <Marker
            title={fromToData?.to?.address}
            description="Điểm đến"
            coordinate={{
              latitude: fromToData?.to?.lat,
              longitude: fromToData?.to?.long,
            }}>
            <Icon.SpotLightDestination />
          </Marker>
        )}
    </MapViewCus>
  );
};
