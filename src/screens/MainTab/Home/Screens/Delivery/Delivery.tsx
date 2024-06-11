import { Buttons, IconCus, TextCus, TouchCus, ViewCus } from 'components';
import { BottomSheetModalContainer } from 'components/BottomSheetModals';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  ILongLocation,
  IOrderDetail,
  IOrderItem,
  IOrderRequest,
  IRefBottom,
  OrderStatus,
} from 'types';
import styles from './styles';
import { IconName } from 'assets';
import { Colors } from 'theme';
import { NavigationService, RootStackParamList, Routes } from 'navigation';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import {
  ChooseWayToDelivery,
  DriverAreComing,
  FindDriver,
  OrderOnProcess,
} from './Components';
import { useCart } from 'context/CartContext';
import { useCustomerSocket, useGeo, useNotify, useShippingType } from 'hooks';
import { useOrders } from 'hooks/useOrders';
import { useDispatch } from 'react-redux';
import { addOrderCode } from 'store/orders';
import CannotFoundDriver from './Components/CannotFoundDriver';
import OrderIsSuccess from './Components/OrderIsSuccess';
import OrderIsCancel from './Components/OrderIsCancel';
import { RouteProp, useRoute } from '@react-navigation/native';
import { DeliveryMapView } from './Components/DeliveryMapView';
import { getRandomFloat } from 'utils';
import { useTranslation } from 'react-i18next';
import { BackHandler } from 'react-native';

export enum ScreenStepView {
  NOT_READY = 0,
  CHOOSE_DELIVERY_OPTION = 1,
  FIND_DRIVER = 2,
  ON_PROCESS = 3,
  DRIVER_ARE_COMING = 4,
  CANNOT_FOUND_DRIVER = 5,
  ORDER_IS_CANCEL = 6,
  ORDER_IS_SUCCESS = 7,
}

const Delivery = () => {
  //#region Static
  const { danger } = useNotify();
  const { t } = useTranslation();
  const timeOutNotFoundDriver = 60_000;
  const { listData: listShippingType } = useShippingType();

  const deliveryDriverOptions = useMemo(() => {
    return listShippingType.map((item, i) => {
      return {
        ...item,
        fast: item.name === 'Giao nhanh',
        price: item.pricePerKm,
        time: 10,
        distance: 3.5,
      };
    });
  }, [listShippingType]);

  const route = useRoute<RouteProp<RootStackParamList, 'Delivery'>>();

  const {
    onConnect,
    onConnectError,
    onFoundDriver,
    onNotFoundDriver,
    onOrderDelivered,
    onOrderDelivering,
    socket: customerSocket,
  } = useCustomerSocket();

  const dispatch = useDispatch();

  const {
    orderItems: carts,
    selectedRestaurant,
    location: cartLocation,
    removeAll: onRemoveAll,
    orderRequest,
  } = useCart();

  const {
    createOrder,
    loading: isOrderLoading,
    getOrderDetailByCode,
    onCancelOrderByCode,
    keepFindDriverForOrderByCode,
  } = useOrders();

  //#endregion

  //#region Ref control
  const refContentBottom = useRef<IRefBottom>(null);
  //#endregion

  //#region State screen
  /** Current orderCode working with (useRef because this will use in socket handle , cannot useState function handle socket cannot find correct data) */
  const currentOrderCodeRef = useRef<string | null>(null);
  /** This is the orderHasCreated */
  const [orderDetailData, setOrderDetailData] = useState<IOrderDetail | null>(
    null,
  );

  const [location, setLocation] = useState<ILongLocation | undefined>(
    cartLocation,
  );

  // const { selectedPromos } = useCategories();

  const setCurrentOrderCode = (code: string) => {
    currentOrderCodeRef.current = code;
  };

  const getCurrentOrderCode = () => {
    return currentOrderCodeRef.current;
  };

  const [stepView, setStepView] = useState(ScreenStepView.NOT_READY);
  const [deliveryDriverSelected, setDeliveryDriverSelected] = useState(null);

  const snapPointModal = useMemo(() => {
    let rs = ['25%', '25%'];
    switch (stepView) {
      case ScreenStepView.CHOOSE_DELIVERY_OPTION:
        rs = [230, '50%'];
        break;

      case ScreenStepView.FIND_DRIVER:
        rs = [322, '80%'];
        break;

      case ScreenStepView.ON_PROCESS:
        rs = ['50%', '100%'];
        break;

      case ScreenStepView.DRIVER_ARE_COMING:
        rs = [222, '80%'];
        break;
      case ScreenStepView.CANNOT_FOUND_DRIVER:
        rs = [310, '30%'];
        break;
      case ScreenStepView.ORDER_IS_CANCEL:
        rs = [310, '35%'];
        break;

      case ScreenStepView.ORDER_IS_SUCCESS:
        rs = [334, '35%'];
        break;

      default:
        break;
    }
    return rs;
  }, [stepView]);

  //#endregion

  //#region Ref value
  const refTimeOutCacheRunningFunction = useRef<ReturnType<
    typeof setTimeout
  > | null>(null);
  //#endregion

  //#region Screen function
  const reFetchOrderDetailData = () => {
    if (currentOrderCodeRef.current) {
      getOrderDetailByCode(currentOrderCodeRef.current, response => {
        const orderDetail: IOrderDetail = response.data?.result?.[0];
        setOrderDetailData(orderDetail);
      });
    }
  };
  //#endregion

  //#region Render function
  const renderFooterModal = useCallback(() => {
    switch (stepView) {
      case ScreenStepView.CHOOSE_DELIVERY_OPTION:
        return (
          <ViewCus flex-row p-16>
            <ViewCus f-1>
              <Buttons
                disabled={isOrderLoading}
                h-48
                mr-12
                round={false}
                style={[
                  {
                    backgroundColor: Colors.greyAD,
                  },
                  styles.bo8,
                ]}
                onPress={() => {
                  refContentBottom.current?.close();
                  NavigationService.goBack();
                }}>
                <TextCus useI18n bold semiBold color={Colors.white}>
                  delivery.cancelOrder
                </TextCus>
              </Buttons>
            </ViewCus>
            <ViewCus f-1>
              <Buttons
                disabled={isOrderLoading || carts.length === 0}
                h-48
                round={false}
                style={[styles.bo8]}
                onPress={
                  isOrderLoading || carts.length === 0
                    ? () => {}
                    : () => {
                        if (deliveryDriverSelected !== null) {
                          onFindDriverClick();
                        } else {
                          Toast.show({
                            text1: 'Vui lòng chọn phương thức giao hàng',
                            position: 'bottom',
                            type: 'error',
                          });
                        }
                      }
                }>
                <TextCus useI18n bold semiBold color={Colors.white}>
                  delivery.findADriver
                </TextCus>
              </Buttons>
            </ViewCus>
          </ViewCus>
        );

      case ScreenStepView.CANNOT_FOUND_DRIVER:
        return (
          <ViewCus flex-row p-16>
            <ViewCus f-1>
              <Buttons
                h-48
                mr-12
                round={false}
                style={[
                  {
                    backgroundColor: Colors.greyAD,
                  },
                  styles.bo8,
                ]}
                onPress={() => {
                  if (currentOrderCodeRef.current) {
                    onCancelOrderByCode(currentOrderCodeRef.current, rs => {
                      refContentBottom.current?.close();
                      NavigationService.goBack();
                    });
                  }
                }}>
                <TextCus useI18n bold semiBold color={Colors.white}>
                  delivery.cancelFind
                </TextCus>
              </Buttons>
            </ViewCus>
            <ViewCus f-1>
              <Buttons
                h-48
                round={false}
                style={[styles.bo8]}
                onPress={() => {
                  if (currentOrderCodeRef.current) {
                    keepFindDriverForOrderByCode(
                      currentOrderCodeRef.current,
                      rs => {
                        switch (rs.status) {
                          case 200:
                            setStepView(ScreenStepView.FIND_DRIVER);
                            break;

                          default:
                            danger(t('error'), `Tìm lại thất bại`);
                            break;
                        }
                      },
                    );
                  }
                }}>
                <TextCus useI18n bold semiBold color={Colors.white}>
                  delivery.continueFind
                </TextCus>
              </Buttons>
            </ViewCus>
          </ViewCus>
        );

      case ScreenStepView.ORDER_IS_CANCEL:
        return (
          <ViewCus flex-row p-16>
            <ViewCus f-1>
              <Buttons
                h-48
                mr-12
                round={false}
                style={[
                  {
                    backgroundColor: Colors.greyAD,
                  },
                  styles.bo8,
                ]}
                onPress={() => {
                  refContentBottom.current?.close();
                  NavigationService.replace(Routes.Categories);
                }}>
                <TextCus useI18n bold semiBold color={Colors.white}>
                  cancel
                </TextCus>
              </Buttons>
            </ViewCus>
            <ViewCus f-1>
              <Buttons
                h-48
                round={false}
                style={[styles.bo8]}
                onPress={() => {
                  refContentBottom.current?.close();
                  NavigationService.resetTo(
                    [
                      {
                        name: Routes.HomeTabs,
                      },
                      {
                        name: Routes.Categories,
                      },
                      {
                        name: Routes.RestaurantDetail,
                        params: {
                          restaurantId: selectedRestaurant,
                        },
                      },
                    ],
                    2,
                  );
                }}>
                <TextCus useI18n bold semiBold color={Colors.white}>
                  delivery.createNewOrder
                </TextCus>
              </Buttons>
            </ViewCus>
          </ViewCus>
        );

      case ScreenStepView.ORDER_IS_SUCCESS:
        return (
          <ViewCus flex-row p-16>
            <ViewCus f-1>
              <Buttons
                h-48
                mr-12
                round={false}
                style={[
                  {
                    backgroundColor: Colors.greyAD,
                  },
                  styles.bo8,
                ]}
                onPress={() => {
                  onRemoveAll();
                  refContentBottom.current?.close();
                  NavigationService.reset(Routes.Home);
                  NavigationService.navigate(Routes.Home);
                }}>
                <TextCus useI18n bold semiBold color={Colors.white}>
                  exit
                </TextCus>
              </Buttons>
            </ViewCus>
            <ViewCus f-1>
              <Buttons
                h-48
                round={false}
                style={[
                  styles.bo8,
                  {
                    backgroundColor: Colors.success,
                  },
                ]}
                onPress={() => {
                  onRemoveAll();
                  refContentBottom.current?.close();
                  NavigationService.resetTo(
                    [
                      {
                        name: Routes.HomeTabs,
                      },
                      {
                        name: Routes.Rating,
                      },
                    ],
                    1,
                  );
                }}>
                <TextCus useI18n bold semiBold color={Colors.white}>
                  activity.rating
                </TextCus>
              </Buttons>
            </ViewCus>
          </ViewCus>
        );

      default:
        return <></>;
    }
  }, [stepView, deliveryDriverSelected, isOrderLoading, carts, orderRequest]);

  const renderContentModal = (step: ScreenStepView) => {
    switch (step) {
      case ScreenStepView.CHOOSE_DELIVERY_OPTION:
        return (
          <ChooseWayToDelivery
            initialValue={deliveryDriverSelected}
            options={deliveryDriverOptions}
            onCancel={() => {
              refContentBottom.current?.close();
              NavigationService.replace(Routes.Categories);
            }}
            onSubmit={data => {
              setDeliveryDriverSelected(data);
            }}
          />
        );

      case ScreenStepView.FIND_DRIVER:
        return (
          <FindDriver
            orderDetailData={orderDetailData}
            onCancel={() => {
              if (orderDetailData?.order_code) {
                onCancelOrderByCode(orderDetailData?.order_code, rs => {
                  if (Array.isArray(rs.data.result)) {
                    if (
                      rs.data.result[0]?.order?.order_code ===
                      currentOrderCodeRef.current
                    ) {
                      setStepView(ScreenStepView.CHOOSE_DELIVERY_OPTION);
                    } else {
                      danger(t('error'), `Huỷ thất bại`);
                    }
                  }
                });
              }
            }}
            onSubmit={() => {
              setStepView(ScreenStepView.DRIVER_ARE_COMING);
            }}
          />
        );

      case ScreenStepView.ON_PROCESS:
        return (
          <OrderOnProcess
            orderDetailData={orderDetailData}
            onCancel={() => {
              if (orderDetailData?.order_code) {
                onCancelOrderByCode(orderDetailData?.order_code, rs => {
                  if (Array.isArray(rs.data.result)) {
                    if (
                      rs.data.result[0]?.order?.order_code ===
                      currentOrderCodeRef.current
                    ) {
                      setStepView(ScreenStepView.CHOOSE_DELIVERY_OPTION);
                    } else {
                      danger(t('error'), `Huỷ thất bại`);
                    }
                  }
                });
              }
            }}
          />
        );

      case ScreenStepView.DRIVER_ARE_COMING:
        return (
          <DriverAreComing
            orderDetailData={orderDetailData}
            onCancel={() => {
              setStepView(ScreenStepView.CHOOSE_DELIVERY_OPTION);
            }}
          />
        );

      case ScreenStepView.ORDER_IS_CANCEL:
        return <OrderIsCancel />;

      case ScreenStepView.CANNOT_FOUND_DRIVER:
        return <CannotFoundDriver />;

      case ScreenStepView.ORDER_IS_SUCCESS:
        return <OrderIsSuccess />;

      default:
        return <></>;
    }
  };

  //#endregion

  //#region Watch change
  useEffect(() => {
    let funcRun: (() => void) | null = null;
    let timeOut = 3000;
    if (stepView === ScreenStepView.CHOOSE_DELIVERY_OPTION) {
      timeOut = 2000;

      funcRun = () => refContentBottom.current?.show();
    }

    if (stepView === ScreenStepView.ON_PROCESS) {
      timeOut = 5000;
      funcRun = () => {
        setStepView(ScreenStepView.DRIVER_ARE_COMING);
      };
    }

    if (stepView === ScreenStepView.DRIVER_ARE_COMING) {
      timeOut = 5000;
      funcRun = () => {
        setStepView(ScreenStepView.ORDER_IS_SUCCESS);
      };
    }

    if (refTimeOutCacheRunningFunction.current) {
      clearTimeout(refTimeOutCacheRunningFunction.current);
    }

    if (funcRun) {
      refTimeOutCacheRunningFunction.current = setTimeout(() => {
        funcRun?.();
      }, timeOut);
    }

    return () => {
      if (refTimeOutCacheRunningFunction.current !== null) {
        clearTimeout(refTimeOutCacheRunningFunction.current);
      }
    };
  }, [stepView]);

  useEffect(() => {
    const handle = BackHandler.addEventListener('hardwareBackPress', () => {
      return true;
    });
    return () => {
      if (refTimeOutCacheRunningFunction.current !== null) {
        clearTimeout(refTimeOutCacheRunningFunction.current);
      }
      handle.remove();
    };
  }, []);

  useEffect(() => {
    if (route.params?.order_code) {
      setCurrentOrderCode(route.params?.order_code);
      reFetchOrderDetailData();
    } else {
      if (carts?.length > 0) {
        setStepView(ScreenStepView.CHOOSE_DELIVERY_OPTION);
        refContentBottom.current?.show();
      }
    }
  }, [route, carts]);

  useEffect(() => {
    if (cartLocation) setLocation(cartLocation);
  }, [cartLocation]);

  useEffect(() => {
    if (orderDetailData) {
      if (orderDetailData.customer) {
        setLocation({
          lat: Number(orderDetailData.customer.lat),
          long: Number(orderDetailData.customer.long),
        });
      }
      setStepView(ScreenStepView.FIND_DRIVER);
      if (orderDetailData.status === OrderStatus.DRIVER_PICKING) {
        setStepView(ScreenStepView.ON_PROCESS);
      }
      refContentBottom.current?.show();
    }
  }, [orderDetailData]);
  //#endregion

  //#region Handle socket
  const handleCustomerSocketFoundDriver = args => {
    if (args.result) {
      const code = args.result[0]?.order?.order_code;
      if (code === getCurrentOrderCode()) {
        reFetchOrderDetailData();
        setStepView(ScreenStepView.DRIVER_ARE_COMING);
      }
    }
  };
  const handleCustomerSocketOrderDelivered = useCallback(
    args => {
      console.log('customer:order-delivered:', args);
    },
    [customerSocket],
  );

  const handleCustomerSocketOrderDelivering = useCallback(
    args => {
      console.log('customer:order-delivering:', args);
    },
    [customerSocket],
  );
  const onSocketCustomerConnectionError = useCallback(
    err => {
      console.log('onSocketCustomerConnectionError', err);
    },
    [customerSocket],
  );

  useEffect(() => {
    onFoundDriver(handleCustomerSocketFoundDriver);
    onNotFoundDriver(data => {
      console.log('🚀 ~ file: Delivery.tsx:630 ~ useEffect ~ data:', data);
      // {"result": [{"__v": 0, "_id": "64aeb6d79dc053002bd088ed", "cancel_reason": null, "createdAt": "2023-07-12T14:21:11.763Z", "currency_type": "VND", "customer": [Object], "customer_catalog_id": "42299bc2-633c-49bd-a53d-939c832dbc7c", "discount_id": null, "discount_order": 0, "discount_shipping": 0, "driver": null, "id": "58a3fbe9-b93c-4202-ad90-0994a3b740fd", "note": null, "order_code": "1689171671", "order_price": 180000, "payment_method": "COD", "payment_status": "PENDING", "restaurant_id": "fb31caca-ef4e-4541-b35d-12ef4095933b", "shipping_fee": 0, "status": "WAITTING_DRIVER_ACCEPT", "total_price": 180000, "updatedAt": "2023-07-12T14:21:11.763Z"}]}
      // reFetchOrderDetailData();
      setStepView(ScreenStepView.CANNOT_FOUND_DRIVER);
    });
    onConnect(() => {
      console.log('onSocketCustomerConnected');
    });
    onOrderDelivered(handleCustomerSocketOrderDelivered);
    onOrderDelivering(handleCustomerSocketOrderDelivering);
    onConnectError(onSocketCustomerConnectionError);
  }, []);
  //#endregion

  //#region Handle event
  const onFindDriverClick = useCallback(() => {
    if (orderRequest) {
      createOrder(
        { ...orderRequest, shippingTypeId: deliveryDriverSelected?.id },
        rs => {
          switch (rs.status) {
            case 201:
              {
                const { orderCode } = rs.data.result[0];
                dispatch(addOrderCode(orderCode));
                setCurrentOrderCode(orderCode);
                setStepView(ScreenStepView.FIND_DRIVER);
                reFetchOrderDetailData();
              }
              break;

            default:
              setStepView(ScreenStepView.CANNOT_FOUND_DRIVER);
              break;
          }
        },
      );
    }
  }, [orderRequest, createOrder, deliveryDriverSelected]);
  //#endregion

  const driverLocationTEmp = useMemo(() => {
    if (location) {
      if (
        [ScreenStepView.DRIVER_ARE_COMING, ScreenStepView.ON_PROCESS].includes(
          stepView,
        )
      ) {
        return {
          lat: location.lat - getRandomFloat(-0.003, 0.003, 6),
          long: location.long - getRandomFloat(-0.003, 0.003, 6),
        };
      }

      if (ScreenStepView.ORDER_IS_SUCCESS) {
        return location;
      }
    }
    return undefined;
  }, [location, stepView]);

  return (
    <>
      {![ScreenStepView.FIND_DRIVER, ScreenStepView.ON_PROCESS].includes(
        stepView,
      ) && (
        <ViewCus l-16 t-90 style={styles.posAbsolute}>
          <TouchCus
            onPress={() => {
              NavigationService.goBack();
            }}>
            <ViewCus bg-white br-12 w-32 h-32 items-center justify-center>
              <IconCus name={IconName.ChevronLeft} color={Colors.main} />
            </ViewCus>
          </TouchCus>
        </ViewCus>
      )}
      <ViewCus f-1>
        {location && (
          <DeliveryMapView
            defaultNumberDriver={10}
            drivers={[]}
            destination={location}
            startFind={stepView === ScreenStepView.FIND_DRIVER}
            stepView={stepView}
            driverLocation={driverLocationTEmp}
          />
        )}

        <BottomSheetModalContainer
          footerComponent={renderFooterModal}
          hideBackdrop={true}
          ref={refContentBottom}
          showIndicator={true}
          snapPoints={snapPointModal}>
          {renderContentModal(stepView)}
        </BottomSheetModalContainer>
      </ViewCus>
    </>
  );
};

export default Delivery;
