import {
  BottomTabBarButtonProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { IconName, Images } from 'assets';
import { useAuth, useKey, useLocation } from 'hooks';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import * as Screens from 'screens';
import { BaseStyle, Colors } from 'theme';
import { KEY_CONTEXT, isIos } from 'utils';
import ButtonBottomStack from './ButtonBottomStack';
import { navigationRef } from './NavigationService';
import { Routes } from './Routes';
import { RootStackParamList } from './types';
import Geolocation from '@react-native-community/geolocation';
import { BottomSheetAlert, ViewCus } from 'components';
import LottieView from 'lottie-react-native';
import { StatusBar } from 'react-native';

const Tab = createBottomTabNavigator();
const TABAR_SCREEN = [
  {
    screen: Routes.Home,
    component: Screens.Home,
    textLabel: 'bottom.home',
    icon: IconName.Homepage,
  },
  {
    screen: Routes.Activity,
    component: Screens.Activity,
    textLabel: 'bottom.activity',
    icon: IconName.Activity,
  },
  {
    screen: Routes.Promotion,
    component: Screens.Promotion,
    textLabel: 'bottom.promotion',
    icon: IconName.Giftbox,
  },
  {
    screen: Routes.Account,
    component: Screens.Account,
    textLabel: 'bottom.account',
    icon: IconName.Account,
  },
];

const HomeTabs = () => {
  const renderTabButton = useCallback(props => {
    return (
      <ButtonBottomStack
        {...props}
        icon={props.icon}
        route={props.screen}
        label={props.textLabel}
      />
    );
  }, []);
  return (
    <Tab.Navigator
      screenOptions={({}) => ({
        headerShown: false,
        tabBarActiveTintColor: Colors.main,
        tabBarInactiveTintColor: Colors.grey84,
        tabBarStyle: {
          height: isIos ? 98 : 60,
        },
      })}>
      {TABAR_SCREEN?.map((tabItem, index) => (
        <Tab.Screen
          key={index}
          name={tabItem?.screen}
          component={tabItem?.component}
          options={{
            tabBarShowLabel: false,
            tabBarButton: (props: BottomTabBarButtonProps) =>
              renderTabButton({ ...props, ...tabItem }),
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

const Stack = createStackNavigator<RootStackParamList>();
interface IProps {
  inititalRoute: any;
}
const StackNavigator: React.FC<IProps> = ({ inititalRoute }) => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={inititalRoute}>
      <Stack.Screen name={Routes.Intro} component={Screens.Intro} />
      <Stack.Screen name={Routes.InputPhone} component={Screens.InputPhone} />
      <Stack.Screen
        name={Routes.InputPassword}
        component={Screens.InputPassword}
      />
      <Stack.Screen
        name={Routes.ResetPassword}
        component={Screens.ResetPassword}
      />
      <Stack.Screen name={Routes.KYC} component={Screens.KYC} />
      <Stack.Screen name={Routes.OTP} component={Screens.OTP} />
      <Stack.Screen
        name={Routes.HomeTabs}
        component={HomeTabs}
        options={{
          gestureEnabled: false,
        }}
      />

      <Stack.Screen name={Routes.Categories} component={Screens.Categories} />
      <Stack.Screen name={Routes.CartOrder} component={Screens.CartOrder} />
      <Stack.Screen name={Routes.CheckOrder} component={Screens.CheckOrder} />
      <Stack.Screen name={Routes.ExtraFood} component={Screens.ExtraFood} />
      <Stack.Screen name={Routes.Delivery} component={Screens.Delivery} />
      <Stack.Screen name={Routes.FindCar} component={Screens.FindCar} />
      <Stack.Screen
        name={Routes.SuggestForYou}
        component={Screens.SuggestForYou}
      />

      <Stack.Screen
        name={Routes.MethodPayment}
        component={Screens.MethodPayment}
      />
      <Stack.Screen
        name={Routes.RestaurantDetail}
        component={Screens.RestaurantDetail}
      />
      <Stack.Screen
        name={Routes.DeliveryAddress}
        component={Screens.DeliveryAddress}
      />
      <Stack.Screen
        name={Routes.InputAddress}
        component={Screens.InputAddress}
      />
      <Stack.Screen
        name={Routes.HistoryActivity}
        component={Screens.HistoryActivity}
      />
      <Stack.Screen name={Routes.Biker} component={Screens.Biker} />
      <Stack.Screen
        name={Routes.Notification}
        component={Screens.Notification}
      />
      <Stack.Screen
        name={Routes.ChangePassword}
        component={Screens.ChangePassword}
      />
      <Stack.Screen
        name={Routes.ContactSupport}
        component={Screens.ContactSupport}
      />
      <Stack.Screen name={Routes.InfoUser} component={Screens.InfoUser} />
      <Stack.Screen name={Routes.Term} component={Screens.Term} />
      <Stack.Screen
        name={Routes.RequestDelivery}
        component={Screens.RequestDelivery}
      />
      <Stack.Screen name={Routes.Rating} component={Screens.Rating} />
      <Stack.Screen name={Routes.RatingBiker} component={Screens.RatingBiker} />
      <Stack.Screen
        name={Routes.RatingRestaurant}
        component={Screens.RatingRestaurant}
      />
    </Stack.Navigator>
  );
};

export const Navigator = () => {
  const { user } = useAuth();
  const { getKeyStore } = useKey();
  const { saveCurrentLocation } = useLocation();
  const [inititalRoute, setInititalRoute] = useState('');
  const [isWaiting, setIsWaiting] = useState(true);
  const watchPositionRef = useRef<ReturnType<
    typeof Geolocation.watchPosition
  > | null>(null);
  useLayoutEffect(() => {
    (async () => {
      const isCheckIntro = await getKeyStore(KEY_CONTEXT.CHECKINTRO);
      if (isCheckIntro === 'Y') {
        setInititalRoute(
          user?.accessToken ? Routes.HomeTabs : Routes.InputPhone,
        );
        return true;
      }
      setInititalRoute(Routes.Intro);
    })();
  }, [user?.accessToken]);

  const startWatchPosition = useCallback(() => {
    Geolocation.getCurrentPosition(
      //Will give you the current location
      position => {
        const { latitude, longitude } = position.coords;
        saveCurrentLocation({
          lat: latitude,
          long: longitude,
        });
      },
      error => {
        console.log(
          '🚀 ~ file: NavigationStack.tsx:215 ~ startWatchPosition ~ error:',
          error,
        );
      },
      {
        enableHighAccuracy: true,
        maximumAge: 5_000,
        interval: 5000,
      },
    );
    watchPositionRef.current = Geolocation.watchPosition(
      p => {
        const { latitude, longitude } = p.coords;
        saveCurrentLocation({
          lat: latitude,
          long: longitude,
        });
      },
      error => {
        console.log('Error:', error.message);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 5_000,
        interval: 5000,
      },
    );
  }, []);

  const clearWatchPosition = useCallback(() => {
    if (watchPositionRef.current !== null) {
      Geolocation.clearWatch(watchPositionRef.current);
      watchPositionRef.current = null;
    }
  }, []);

  useEffect(() => {
    startWatchPosition();
    return () => {
      clearWatchPosition();
    };
  }, []);
  // const watchPosition = () => {
  //   try {
  //     const watchID = Geolocation.watchPosition(
  //       p => {
  //         setPosition(JSON.stringify(p));
  //         const { latitude, longitude } = p.coords;
  //         saveCurrentLocation({
  //           lat: latitude,
  //           long: longitude,
  //         });
  //       },
  //       error => console.log('WatchPosition Error', JSON.stringify(error)),
  //     );
  //     setSubscriptionId(watchID);
  //   } catch (error) {
  //     console.log('WatchPosition Error', JSON.stringify(error));
  //   }
  // };

  // const clearWatch = () => {
  //   subscriptionId !== null && Geolocation.clearWatch(subscriptionId);
  //   setSubscriptionId(null);
  //   setPosition(null);
  //   saveCurrentLocation({
  //     lat: 0,
  //     long: 0,
  //   });
  // };

  // useEffect(() => {
  //   watchPosition();
  //   return () => {
  //     clearWatch();
  //   };
  // }, []);
  if (isWaiting) {
    return (
      <ViewCus style={[BaseStyle.flex1]}>
        <StatusBar barStyle={'dark-content'} />
        <LottieView
          source={Images.splash}
          autoPlay
          loop={false}
          speed={1}
          duration={2000}
          onAnimationFinish={() => setIsWaiting(false)}
        />
      </ViewCus>
    );
  }
  return (
    <>
      <NavigationContainer ref={navigationRef}>
        <StackNavigator inititalRoute={inititalRoute} />
        <BottomSheetAlert />
      </NavigationContainer>
    </>
  );
};
