import { IconName } from 'assets';
import Icon from 'assets/svg/Icon';
import {
  HomeLayout,
  IconApp,
  ScrollViewCus,
  TextCus,
  TouchCus,
  ViewCus,
} from 'components';
import React, { useEffect, useMemo } from 'react';
import { Colors } from 'theme';
import {
  AttractiveOffers,
  ListCategories,
  InputSearch,
  SuggestionForYou,
} from './Components';
import { NavigationService, Routes } from 'navigation';
import { isIos } from 'utils';
import { useAuth, useHome } from 'hooks';
import { DATA_CATEGORY } from 'types';

const Home: React.FC = () => {
  const {
    getListCategories,
    listCategories,
    getListPromotions,
    listPromotions,
  } = useHome();
  const { userInfo } = useAuth();
  useEffect(() => {
    getListCategories();
  }, [getListCategories]);
  useEffect(() => {
    getListPromotions();
  }, [getListPromotions]);

  const { categories } = useMemo(() => {
    // return {
    //   categories: [
    //     {
    //       name: 'Giao đồ ăn',
    //       defaultIcon: 'food1',
    //     },
    //     {
    //       name: 'Thức uống',
    //       defaultIcon: 'drink1',
    //     },
    //     {
    //       name: 'Ôtô 4 chỗ',
    //       defaultIcon: 'car4Seat',
    //       onPress: () =>
    //         NavigationService.navigate(Routes.FindCar, {
    //           type: 'car',
    //         }),
    //     },
    //     {
    //       name: 'Xe máy',
    //       defaultIcon: 'bike',
    //       onPress: () =>
    //         NavigationService.navigate(Routes.FindCar, {
    //           type: 'bike',
    //         }),
    //     },
    //     {
    //       name: 'Đi chợ',
    //       defaultIcon: 'goMarket',
    //       onPress: () =>
    //         NavigationService.navigate(Routes.FindCar, {
    //           type: 'both',
    //         }),
    //     },
    //     {
    //       name: 'Xe du lịch',
    //       defaultIcon: 'travelCar',
    //       onPress: () =>
    //         NavigationService.navigate(Routes.FindCar, {
    //           type: 'car',
    //         }),
    //     },
    //     {
    //       name: 'Giao hàng',
    //       defaultIcon: 'deliveryStuff',
    //       onPress: () => NavigationService.navigate(Routes.Biker),
    //     },
    //     {
    //       name: 'Giúp việc',
    //       defaultIcon: 'houseHelper',
    //     },
    //   ],
    // };
    return {
      categories: listCategories.map(item => {
        return {
          ...item,
          defaultIcon: DATA_CATEGORY[item.type]?.icon,
          onPress: DATA_CATEGORY[item.type]?.onPress,
        };
      }),
    };
  }, [listCategories]);
  return (
    <HomeLayout
      bgColor={isIos ? Colors.main : Colors.white}
      header={{
        notGoBack: true,
      }}>
      <ViewCus f-1 bg-white>
        <ViewCus flex-row justify-space-between px-16 py-12 items-center>
          <ViewCus f-1>
            <TextCus useI18n subhead color-grey85>
              hi
            </TextCus>
            <TextCus subhead bold>
              {userInfo?.full_name}
            </TextCus>
          </ViewCus>
          <ViewCus f-1 items-center>
            <Icon.Logo width={87} height={55} />
          </ViewCus>
          <ViewCus f-1 items-flex-end>
            <TouchCus
              onPress={() => {
                NavigationService.navigate(Routes.Notification);
              }}>
              <IconApp name={IconName.Bell} size={32} color={Colors.main} />
            </TouchCus>
          </ViewCus>
        </ViewCus>
        <InputSearch />
        <ScrollViewCus>
          {categories.length > 0 && <ListCategories categories={categories} />}

          <AttractiveOffers promotions={Array(3).fill(1)} />
          <SuggestionForYou />
        </ScrollViewCus>
      </ViewCus>
    </HomeLayout>
  );
};
export default Home;
