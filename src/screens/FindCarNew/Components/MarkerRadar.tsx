import { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import { LatLng, MapCircle, MapCircleProps } from 'react-native-maps';

const AnimatedMapCircle = Animated.createAnimatedComponent(MapCircle);
const MarkerRadar = ({
  radius = 500,
  strokeWidth = 0.1,
  strokeColor = '#77FD7C',
  fillColor = 'rgba(119, 253, 124, 0.15)',
  useAnimated = true,
  ...props
}: LatLng &
  Pick<MapCircleProps, 'strokeColor' | 'strokeWidth' | 'fillColor'> & {
    radius?: Number;
    useAnimated?: Boolean;
  }) => {
  const radiusRef = useRef(
    new Animated.Value(useAnimated ? 0 : radius),
  ).current;

  useEffect(() => {
    if (useAnimated) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(radiusRef, {
            toValue: radius,
            duration: 2000,
            useNativeDriver: true,
            easing: Easing.linear,
          }),
        ]),
      ).start();
    }
  }, [radiusRef, radius, useAnimated]);

  return (
    <AnimatedMapCircle
      center={{
        latitude: props.latitude,
        longitude: props.longitude,
      }}
      radius={radiusRef}
      strokeWidth={strokeWidth}
      strokeColor={strokeColor}
      fillColor={fillColor}
    />
  );
};

export default MarkerRadar;
