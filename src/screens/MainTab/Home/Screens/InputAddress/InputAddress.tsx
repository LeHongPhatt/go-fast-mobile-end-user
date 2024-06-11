import Geolocation from '@react-native-community/geolocation';
import { RouteProp, useRoute } from '@react-navigation/native';
import { IconName } from 'assets';
import Icon from 'assets/svg/Icon';
import {
  HomeLayout,
  RNFlatList,
  TextCus,
  TextInputs,
  TouchCus,
  ViewCus,
} from 'components';
import { useGeo, useLocation } from 'hooks';
import { NavigationService, RootStackParamList } from 'navigation';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { BaseStyle, Colors } from 'theme';
import { IRefBottom } from 'types';
import styles from './styles';

const InputAddress = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'InputAddress'>>();
  const { onNameByLatLng, searchAutoComplete } = useGeo();
  const refContentBottom = useRef<IRefBottom>(null);
  const [address, setAddress] = useState([]);
  const { locationUser } = useLocation();
  const getNameLocation = ({ coords: { latitude, longitude } }) => {
    onNameByLatLng(
      { latitude, longitude },
      from => console.log(from),
      // setAddress({ ...address }),
    );
  };

  // const onCurrentLocation = () => {
  //   Geolocation.getCurrentPosition(getNameLocation);
  // };

  const onChangeText = input => {
    searchAutoComplete(
      {
        input,
        location: `${locationUser?.lat},${locationUser?.long}`,
        limit: 20,
      },
      res => setAddress(res),
    );
  };

  useEffect(() => {
    refContentBottom.current?.show();
    Geolocation.getCurrentPosition(getNameLocation);
  }, [JSON.stringify(refContentBottom.current)]);

  const renderItem = useCallback(
    ({ item, index }: { item: any; index: number }) => {
      return (
        <TouchCus
          onPress={() => {
            route.params?.callback(item);
            NavigationService.goBack();
          }}
          key={index}
          style={[BaseStyle.flexRowCenter, styles.addressItem]}>
          <Icon.IconLocation />
          <ViewCus style={styles.lineBottom} ml-8 f-1>
            <TextCus color={Colors.black3A}>
              {item?.structured_formatting?.main_text}
            </TextCus>
            <TextCus subhead color={Colors.grey85}>
              {item?.structured_formatting?.secondary_text}
            </TextCus>
          </ViewCus>
        </TouchCus>
      );
    },
    [],
  );

  return (
    <HomeLayout
      bgColor={Colors.main}
      header={{
        title: 'category.delivery_address',
        iconColor: Colors.white,
      }}>
      <ViewCus p-16 f-1>
        <TextInputs
          onChangeText={onChangeText}
          placeholder="enter_address"
          leftIcon={IconName.Search}
          style={styles.contentInput}
        />
        <RNFlatList data={address} renderItem={renderItem} />
      </ViewCus>
    </HomeLayout>
  );
};

export default InputAddress;
