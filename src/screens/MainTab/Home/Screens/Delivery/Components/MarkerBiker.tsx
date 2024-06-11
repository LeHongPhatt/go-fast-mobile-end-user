import Icon from 'assets/svg/Icon';
import React, {
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Platform } from 'react-native';
import {
  MapMarker,
  LatLng,
  AnimatedRegion,
  MarkerAnimated,
} from 'react-native-maps';

function getRandomFloat(min, max, decimals) {
  const str = (Math.random() * (max - min) + min).toFixed(decimals);

  return parseFloat(str);
}

interface MarkerBikerProps extends LatLng {
  durationAnimation?: number;
}

export const MarkerBikerRandom: React.FC<MarkerBikerProps> = ({
  durationAnimation = 5000,
  ...props
}) => {
  const [location, setLocation] = useState({
    lat: props.latitude - getRandomFloat(-0.003, 0.003, 6),
    long: props.longitude - getRandomFloat(-0.003, 0.003, 6),
  });
  const intervalRef = useRef<ReturnType<typeof setInterval>>(null);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      const newLoc = {
        lat: props.latitude - getRandomFloat(-0.003, 0.003, 6),
        long: props.longitude - getRandomFloat(-0.003, 0.003, 6),
      };
      setLocation(newLoc);
    }, 7000);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [props.longitude, props.latitude]);

  return (
    <MarkerBiker
      longitude={location.long}
      latitude={location.lat}
      durationAnimation={durationAnimation}
    />
  );
};

const MarkerBiker = React.forwardRef<any, MarkerBikerProps>(
  ({ durationAnimation = 5000, ...props }, ref) => {
    const duration = useMemo(() => durationAnimation, [durationAnimation]);
    const markerRef = useRef<MapMarker>(null);
    const timeOutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [coords] = useState<AnimatedRegion>(
      new AnimatedRegion({
        latitude: props.latitude,
        longitude: props.longitude,
        latitudeDelta: 0,
        longitudeDelta: 0,
      }),
    );

    useImperativeHandle(ref, () => markerRef.current);

    useEffect(() => {
      if (timeOutRef.current) {
        clearTimeout(timeOutRef.current);
      }
      try {
        timeOutRef.current = setTimeout(() => {
          if (coords) {
            const newLoc = {
              latitude: props.latitude,
              longitude: props.longitude,
            };
            if (Platform.OS === 'android') {
              markerRef?.current?.animateMarkerToCoordinate?.(newLoc, duration);
            } else {
              coords
                .timing?.({
                  latitude: newLoc.latitude,
                  longitude: newLoc.longitude,
                  duration: duration,
                })
                .start();
            }
          }
        }, 300);
      } catch {}

      return () => {
        if (timeOutRef.current) {
          clearTimeout(timeOutRef.current);
        }
      };
    }, [props]);

    return (
      <MarkerAnimated
        ref={markerRef}
        coordinate={coords}
        anchor={{ x: 0.5, y: 0.5 }}
        title={'My Marker'}
        description={'My Marker'}>
        <Icon.DriverMaker />
      </MarkerAnimated>
    );
  },
);

export default MarkerBiker;
