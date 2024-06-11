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
  FindCarType,
  IOrderDetail,
  IOrderItem,
  IOrderRequest,
  IRefBottom,
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
import { useAuth, useCategories, useLocation, useSocket } from 'hooks';
import { useOrders } from 'hooks/useOrders';
import { useDispatch } from 'react-redux';
import { FakeMapFind } from './Components/FakeMapFind';
import CannotFoundDriver from './Components/CannotFoundDriver';
import { IP_HOST } from '@env';
import OrderIsSuccess from './Components/OrderIsSuccess';
import OrderIsCancel from './Components/OrderIsCancel';
import { RouteProp, useRoute } from '@react-navigation/native';
import { getRandomFloat } from 'utils';

enum ScreenStepView {
  CHOOSE_DELIVERY_OPTION = 1,
  FIND_DRIVER = 2,
  ON_PROCESS = 3,
  DRIVER_ARE_COMING = 4,
  CANNOT_FOUND_DRIVER = 5,
  ORDER_IS_CANCEL = 6,
  ORDER_IS_SUCCESS = 7,
}

const FindCar = () => {
  //#region Static
  const route = useRoute<RouteProp<RootStackParamList, 'FindCar'>>();

  const deliveryDriverOptions = useMemo(() => {
    const rs = [
      {
        id: 1,
        title: 'TasCar Plus',
        subTitle: 'Thoải mái với 4 chỗ ngồi',
        price: 88000,
        type: FindCarType.CAR,
        distance: 5.5,
      },
      {
        id: 2,
        title: 'TasBike Plus',
        subTitle: '',
        type: FindCarType.MOTORBIKE,
        price: 88000,
        distance: 5.5,
      },
      {
        id: 3,
        title: 'Ô tô',
        subTitle: 'Thoải mái với 7 chỗ ngồi',
        type: FindCarType.CAR,
        price: 68000,
        distance: 5.5,
      },
      {
        id: 4,
        title: 'TasBike',
        subTitle: '',
        type: FindCarType.MOTORBIKE,
        price: 50000,
        distance: 5.5,
      },
    ];

    return route?.params?.type === FindCarType.CAR
      ? rs.filter(x => x.type === FindCarType.CAR)
      : route?.params?.type === FindCarType.MOTORBIKE
      ? rs.filter(x => x.type === FindCarType.MOTORBIKE)
      : rs.slice(0, 2);
  }, [route?.params?.type]);

  const {
    onConnect,
    onConnectError,
    socket: customerSocket,
  } = useSocket({
    uri: `ws://${IP_HOST}/customer`,
    opts: {
      autoConnect: true,
      reconnection: true,
    },
  });

  const dispatch = useDispatch();

  const { orderItems: carts, selectedRestaurant } = useCart();
  const { userInfo } = useAuth();
  const { locationUser } = useLocation();
  const { loading: isOrderLoading, getOrderDetailByCode } = useOrders();
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

  const { selectedPromos } = useCategories();

  const setCurrentOrderCode = (code: string) => {
    currentOrderCodeRef.current = code;
  };

  const getCurrentOrderCode = () => {
    return currentOrderCodeRef.current;
  };

  const [stepView, setStepView] = useState(
    ScreenStepView.CHOOSE_DELIVERY_OPTION,
  );
  const [deliveryDriverSelected, setDeliveryDriverSelected] = useState(
    deliveryDriverOptions[0],
  );

  const snapPointModal = useMemo(() => {
    let rs = ['25%', '25%'];
    switch (stepView) {
      case ScreenStepView.CHOOSE_DELIVERY_OPTION:
        rs = ['35%', '50%'];
        break;

      case ScreenStepView.FIND_DRIVER:
        rs = ['32%', '32%'];
        break;

      case ScreenStepView.ON_PROCESS:
        rs = ['100%'];
        break;

      case ScreenStepView.DRIVER_ARE_COMING:
        rs = ['32%', '32%'];
        break;
      case ScreenStepView.CANNOT_FOUND_DRIVER:
        rs = ['30%'];
        break;
      case ScreenStepView.ORDER_IS_CANCEL:
        rs = ['35%'];
        break;

      case ScreenStepView.ORDER_IS_SUCCESS:
        rs = ['35%', '35%'];
        break;

      default:
        break;
    }
    return rs;
  }, [stepView]);

  const [fromToData] = useState({
    from: {
      lat: locationUser.lat - getRandomFloat(-0.005, 0.005, 6),
      long: locationUser.long - getRandomFloat(-0.005, 0.005, 6),
    },
    to: {
      lat: locationUser.lat,
      long: locationUser.long,
    },
  });
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
                round={false}
                style={[styles.bo8]}
                onPress={() => {
                  onFindDriverClick();
                }}>
                <TextCus useI18n bold semiBold color={Colors.white}>
                  Đặt TasCar
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
                  refContentBottom.current?.close();
                  NavigationService.goBack();
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
                  setStepView(ScreenStepView.CHOOSE_DELIVERY_OPTION);
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
                  refContentBottom.current?.close();
                  NavigationService.resetTo(
                    [
                      {
                        name: Routes.HomeTabs,
                      },
                      {
                        name: Routes.Rating,
                        params: {
                          type: 'car',
                        },
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
  }, [stepView, deliveryDriverSelected, isOrderLoading, carts]);

  const renderContentModal = (step: ScreenStepView) => {
    switch (step) {
      case ScreenStepView.CHOOSE_DELIVERY_OPTION:
        return (
          <ChooseWayToDelivery
            initialValue={deliveryDriverSelected}
            options={deliveryDriverOptions}
            onCancel={() => {
              refContentBottom.current?.close();
              handleBackOrCancel();
            }}
            onSubmit={data => {
              setDeliveryDriverSelected(data);
            }}
          />
        );

      case ScreenStepView.FIND_DRIVER:
        return (
          <FindDriver
            onCancel={() => {
              setStepView(ScreenStepView.CHOOSE_DELIVERY_OPTION);
            }}
            onSubmit={() => {
              setStepView(ScreenStepView.DRIVER_ARE_COMING);
            }}
            type={setDeliveryDriverSelected.type}
            fromToData={fromToData}
          />
        );

      case ScreenStepView.ON_PROCESS:
        return (
          <OrderOnProcess
            orderDetailData={orderDetailData}
            onCancel={() => {
              setStepView(ScreenStepView.CHOOSE_DELIVERY_OPTION);
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
            type={deliveryDriverSelected.type}
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
    refContentBottom.current?.show();
  }, [JSON.stringify(refContentBottom.current)]);

  useEffect(() => {
    let funcRun: (() => void) | null = null;
    let timeOut = 5000;
    if (stepView === ScreenStepView.CHOOSE_DELIVERY_OPTION) {
      timeOut = 1000;
      funcRun = () => refContentBottom.current?.show();
    }

    if (stepView === ScreenStepView.FIND_DRIVER) {
      funcRun = () => {
        setStepView(ScreenStepView.DRIVER_ARE_COMING);
      };
    }

    // if (stepView === ScreenStepView.ON_PROCESS) {
    //   timeOut = 2000;
    //   funcRun = () => {
    //     setStepView(ScreenStepView.DRIVER_ARE_COMING);
    //   };
    // }

    if (stepView === ScreenStepView.DRIVER_ARE_COMING) {
      funcRun = () => {
        setStepView(ScreenStepView.ORDER_IS_SUCCESS);
      };
    }

    refTimeOutCacheRunningFunction.current = setTimeout(() => {
      funcRun?.();
    }, timeOut);

    return () => {
      if (refTimeOutCacheRunningFunction.current !== null) {
        clearTimeout(refTimeOutCacheRunningFunction.current);
      }
    };
  }, [stepView]);

  useEffect(() => {
    return () => {
      if (refTimeOutCacheRunningFunction.current !== null) {
        clearTimeout(refTimeOutCacheRunningFunction.current);
      }
    };
  }, []);
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
  const onSocketCustomerConnected = useCallback(() => {
    console.log('onSocketCustomerConnected');
    setStepView(ScreenStepView.CHOOSE_DELIVERY_OPTION);
    customerSocket.removeAllListeners();
    customerSocket.on('customer:found-driver', handleCustomerSocketFoundDriver);
    customerSocket.on(
      'customer:order-delivered',
      handleCustomerSocketOrderDelivered,
    );
    customerSocket.on(
      'customer:order-delivering',
      handleCustomerSocketOrderDelivering,
    );
  }, [customerSocket]);

  const onSocketCustomerConnectionError = useCallback(
    err => {
      console.log('onSocketCustomerConnectionError', err);
    },
    [customerSocket],
  );

  useEffect(() => {
    onConnect(onSocketCustomerConnected);
    onConnectError(onSocketCustomerConnectionError);
  }, []);
  //#endregion

  //#region Handle event
  const onFindDriverClick = () => {
    // const orderRequest: IOrderRequest = {
    //   customer: {
    //     // TODO : REMOVE BEFORE PROD
    //     // address: userInfo.address,
    //     address: 'Ho Chi Minh',
    //     fullName: userInfo.full_name,
    //     lat: locationUser.lat.toString(),
    //     long: locationUser.long.toString(),
    //     userPhone: userInfo.phone_number,
    //   },
    //   note: 'Sample Note',
    //   paymentMethod: 'COD',
    //   currencyType: 'VND',
    //   promotionCode: selectedPromos?.[0]?.code,
    //   restaurantId: selectedRestaurant,
    //   orderItems: carts.map(x => {
    //     const rs: IOrderItem = {
    //       itemId: x.itemId,
    //       itemName: x.itemName,
    //       quantity: x.quantity,
    //       extraOptions: x.extraOptions.map(y => ({
    //         id: y.id,
    //         itemName: y.food_name,
    //       })),
    //     };
    //     return rs;
    //   }),
    // };
    setStepView(ScreenStepView.FIND_DRIVER);

    // createOrder(orderRequest, rs => {
    //   switch (rs.status) {
    //     case 201:
    //       {
    //         const { orderCode } = rs.data.result[0];
    //         dispatch(addOrderCode(orderCode));
    //         setCurrentOrderCode(orderCode);
    //         setStepView(ScreenStepView.FIND_DRIVER);
    //         reFetchOrderDetailData();
    //       }
    //       break;

    //     default:
    //       setStepView(ScreenStepView.CANNOT_FOUND_DRIVER);
    //       break;
    //   }
    // });
  };

  const handleBackOrCancel = () => {
    refContentBottom.current?.close();
    NavigationService.replace(Routes.HomeTabs);
  };
  //#endregion

  return (
    <>
      <ViewCus l-16 t-90 style={styles.posAbsolute}>
        <TouchCus
          onPress={() => {
            handleBackOrCancel();
          }}>
          <ViewCus bg-white br-12 w-32 h-32 items-center justify-center>
            <IconCus name={IconName.ChevronLeft} color={Colors.main} />
          </ViewCus>
        </TouchCus>
      </ViewCus>
      <ViewCus f-1>
        <FakeMapFind
          type={deliveryDriverSelected.type}
          startFind={ScreenStepView.CHOOSE_DELIVERY_OPTION !== stepView}
          fromToData={fromToData}
          stepView={stepView}
        />
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

export default FindCar;
