import React, { useEffect, useMemo, useState } from 'react';
import { PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
import { useGeo } from 'hooks';
import { MapViewCus } from 'components';
import { Platform } from 'react-native';
import { BaseStyle } from 'theme';
import { MarkerBiker, MarkerBikerRandom } from '../Components';
import { ILongLocation } from 'types';
import { MarkerIcon, MarkerRadar } from 'components/MapViewCus';
import { ScreenStepView } from '../Delivery';

interface DeliveryMapViewProps {
  destination: ILongLocation;
  defaultNumberDriver: number;
  drivers: ILongLocation[];
  driverLocation?: ILongLocation;
  startFind?: boolean;
  stepView: ScreenStepView;
}
export const DeliveryMapView = (props: DeliveryMapViewProps) => {
  const [directionData, setDirectionData] = useState(null);
  /** Draw direction line */
  const [polylineData, setPolylineData] = useState([]);
  const { searchDirection } = useGeo();

  const renderListBiker = useMemo(() => {
    if (props.stepView < ScreenStepView.ON_PROCESS) {
      let fakeDriver: React.JSX.Element[] = [];
      const realDriver = props.drivers.map((driver, index) => {
        return (
          <MarkerBiker
            key={index}
            latitude={driver.lat}
            longitude={driver.long}
            durationAnimation={Platform.OS === 'android' ? 5000 : 0}
          />
        );
      });
      if (realDriver.length < props.defaultNumberDriver) {
        fakeDriver = Array(props.defaultNumberDriver - realDriver.length)
          .fill(1)
          .map((_, index) => {
            return (
              <MarkerBikerRandom
                key={index}
                latitude={props.destination.lat}
                longitude={props.destination.long}
                durationAnimation={Platform.OS === 'android' ? 5000 : 0}
              />
            );
          });
      }

      return (
        <>
          {realDriver}
          {fakeDriver}
        </>
      );
    }

    return <></>;
  }, [props.drivers, props.drivers, polylineData, props.stepView]);

  const renderChooseDriver = useMemo(() => {
    if (
      props.driverLocation &&
      [
        ScreenStepView.DRIVER_ARE_COMING,
        ScreenStepView.ON_PROCESS,
        ScreenStepView.ORDER_IS_SUCCESS,
      ].includes(props.stepView)
    ) {
      return (
        <MarkerBiker
          latitude={props.driverLocation.lat}
          longitude={props.driverLocation.long}
          durationAnimation={1000}
        />
      );
    }
    return <></>;
  }, [props.stepView, props.driverLocation]);

  useEffect(() => {
    switch (props.stepView) {
      case ScreenStepView.DRIVER_ARE_COMING:
      case ScreenStepView.ON_PROCESS:
        if (props.driverLocation && props.destination) {
          searchDirection(
            {
              origin: `${props.driverLocation.lat},${props.driverLocation.long}`,
              destination: `${props.destination.lat},${props.destination.long}`,
              vehicle: 'bike',
            },
            res => {
              if (res.data) setDirectionData(res.data);
            },
          );
        }
        break;

      default:
        break;
    }
  }, [props.driverLocation, props.destination, props.stepView]);

  const directionView = useMemo(() => {
    if (
      directionData !== null &&
      [ScreenStepView.DRIVER_ARE_COMING, ScreenStepView.ON_PROCESS].includes(
        props.stepView,
      )
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
  }, [directionData, props.stepView]);

  if (!props.destination) return <></>;
  return (
    <MapViewCus
      style={[BaseStyle.flex1]}
      provider={PROVIDER_GOOGLE}
      showsUserLocation={false}
      initialRegion={{
        latitude: props.destination.lat,
        longitude: props.destination.long,
        latitudeDelta: 0.0422,
        longitudeDelta: 0.0221,
      }}
      region={{
        latitude: props.destination.lat,
        longitude: props.destination.long,
        latitudeDelta: 0.0422,
        longitudeDelta: 0.0221,
      }}>
      {props.startFind && (
        <>
          <MarkerRadar
            latitude={props.destination.lat}
            longitude={props.destination.long}
          />
          <MarkerRadar
            latitude={props.destination.lat}
            longitude={props.destination.long}
            useAnimated={false}
          />
        </>
      )}
      {directionView}

      {renderListBiker}
      {renderChooseDriver}
      <MarkerIcon location={props.destination} />
    </MapViewCus>
  );
};
