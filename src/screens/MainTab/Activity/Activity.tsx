import { HomeLayout, TextCus, ViewCus, Nodata } from 'components';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Colors } from 'theme';
import { ActivityCategories, ActivityItem, ActivityItem2 } from './components';
import {
  DATA,
  EActivityStatus,
  ICategory,
  STATUS_ACTIVITY_NAME,
  OrderStatus,
  IActivityItem,
  EActivityKey,
  getGroupsNameByStatus,
  IListOrderItem,
  ETypeCategory,
  ENodata,
} from 'types';
import { NavigationService, Routes } from 'navigation';
import { groupActivityData } from 'utils';
import { useListOrder } from 'hooks';
import { SectionList } from 'react-native';

const ListScreen = (props: { category: ICategory; status: OrderStatus[] }) => {
  const { listData, fetchData, refreshData, isLoading } = useListOrder({
    customerCatalogId: props.category.id,
    status: props.status,
  });
  const isRefreshing = useMemo(
    () => listData.length === 0 && isLoading,
    [listData, isLoading],
  );
  const timeOutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const groupData = useMemo(() => {
    let rs: { title: string; data: IListOrderItem[] }[] = [];
    if (listData.length > 0) {
      rs = listData.reduce<{ title: string; data: IListOrderItem[] }[]>(
        (prevItem, item) => {
          const titleGroup = getGroupsNameByStatus(item.status);
          const existingGroupIndex = prevItem.findIndex(
            group => group.title === titleGroup,
          );
          if (existingGroupIndex >= 0) {
            prevItem[existingGroupIndex].data.push(item);
          } else {
            prevItem.push({ title: titleGroup, data: [item] });
          }
          return prevItem;
        },
        [],
      );
    }
    return rs;
  }, [listData]);

  const onRefreshing = useCallback(() => {
    refreshData();
    timeOutRef.current = setTimeout(() => {
      fetchData();
    }, 1000);
  }, []);

  const emptyListShow = useCallback(() => {
    switch (props.category.type) {
      case ETypeCategory.BOOKING:
        return <Nodata iconName={ENodata.NODATA_BOOKING} />;
      case ETypeCategory.COSMETIC:
        return <Nodata iconName={ENodata.NODATA_COSMETIC} />;
      case ETypeCategory.DELIVERY:
        return <Nodata iconName={ENodata.NODATA_DELIVERY} />;
      case ETypeCategory.DOMESTIC_WOKER:
        return <Nodata iconName={ENodata.NODATA_DOMESTIC_WOKER} />;
      case ETypeCategory.DRINK:
        return <Nodata iconName={ENodata.NODATA_DRINK} />;
      case ETypeCategory.FOOD:
        return <Nodata iconName={ENodata.NODATA_FOOD} />;
      case ETypeCategory.MOTORBIKE_BOOKING:
        return <Nodata iconName={ENodata.NODATA_MOTORBIKE_BOOKING} />;
      case ETypeCategory.PROMOTION:
        return <Nodata iconName={ENodata.NODATA_PROMOTION} />;

      default:
        return <Nodata iconName={ENodata.NODATA_FOOD} />;
    }
  }, [props.category]);

  useEffect(() => {
    return () => {
      if (timeOutRef.current !== null) clearTimeout(timeOutRef.current);
    };
  }, []);

  useEffect(() => {
    onRefreshing();
  }, [props.category]);

  if (!props.category) return <></>;

  return (
    <SectionList
      refreshing={isRefreshing}
      onRefresh={onRefreshing}
      onEndReached={fetchData}
      keyExtractor={(item, index) => {
        return item.id + index;
      }}
      sections={groupData}
      renderItem={({ item }) => (
        <ActivityItem2
          data={item}
          onPress={() => {
            switch (props.category.type) {
              case ETypeCategory.FOOD:
                switch (item.status) {
                  case OrderStatus.CANCEL:
                    NavigationService.navigate(Routes.HistoryActivity);
                    break;
                  case OrderStatus.DELIVERED:
                    NavigationService.navigate(Routes.Rating);
                    break;
                  default:
                    NavigationService.navigate(Routes.Delivery, {
                      order_code: item.order_code,
                    });
                    break;
                }
                break;

              default:
                break;
            }
          }}
        />
      )}
      ItemSeparatorComponent={() => {
        return <ViewCus h-12></ViewCus>;
      }}
      SectionSeparatorComponent={() => {
        return <ViewCus h-24></ViewCus>;
      }}
      renderSectionHeader={({ section: { title } }) => (
        <TextCus semiBold heading5 color={Colors.black3A}>
          {title}
        </TextCus>
      )}
      ListEmptyComponent={emptyListShow}
    />
  );
};

export default function Activity() {
  const [category, setCategory] = useState<ICategory | null>(null);

  return (
    <HomeLayout
      bgColor={Colors.main}
      header={{
        notGoBack: true,
        title: 'bottom.activity',
        iconColor: Colors.white,
      }}>
      <ActivityCategories onActiveSelected={setCategory} />
      <ViewCus px-16 f-1>
        {category && (
          <ListScreen
            key={category.id}
            category={category}
            status={[
              OrderStatus.DRIVER_DELIVERING,
              OrderStatus.DRIVER_PICKING,
              OrderStatus.WAITTING_DRIVER_ACCEPT,
              OrderStatus.CANCEL,
              OrderStatus.DELIVERED,
            ]}
          />
        )}
      </ViewCus>
    </HomeLayout>
  );
}
