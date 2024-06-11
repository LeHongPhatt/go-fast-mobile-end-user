import { Colors } from 'theme';
import { IFood, Location } from './categories';
import { ILongLocation } from './location';

export enum EStatus {
  RECEIVE = 'receive',
  SUCCESS = 'success',
  CANCEL = 'cancel',
}
export type TStatus = EStatus.RECEIVE | EStatus.SUCCESS | EStatus.CANCEL;

export interface IOrdersState {
  loading: boolean;
  orderCodes: string[];
}

export interface IOrderRequest {
  customer: ICustomer;
  note: string;
  paymentMethod: string;
  currencyType: string;
  restaurantId: string;
  orderItems: IOrderItem[];
  promotionCode?: string;
  shippingTypeId?: string;
}

export interface ICustomer extends Location {
  fullName: string;
  userPhone: string;
  address: string;
}

export interface IOrderItem {
  itemId: string;
  quantity: number;
  itemName: string;
  extraOptions: IExtraOption[];
}

export interface IExtraOption {
  id: string;
  itemName: string;
}

export enum OrderStatus {
  WAITTING_DRIVER_ACCEPT = 'WAITTING_DRIVER_ACCEPT',
  DRIVER_PICKING = 'DRIVER_PICKING',
  DRIVER_DELIVERING = 'DRIVER_DELIVERING', // Đang giao
  DELIVERED = 'DELIVERED',
  CANCEL = 'CANCEL',
}
export interface IOrderDetail {
  _id: string;
  driver?: IDriver_OrderDetail;
  note: string;
  discount_id: null;
  discount_order: number;
  discount_shipping: number;
  payment_method: string;
  payment_status: string;
  status: OrderStatus;
  cancel_reason: null;
  currency_type: string;
  order_code: string;
  customer: ICustomerOrderDetail;
  customer_catalog_id: string;
  restaurant_id: string;
  shipping_fee: number;
  total_price: number;
  order_price: number;
  id: string;
  createdAt: string;
  updatedAt: string;
  order_items: IOrderItem_OrderDetail[];
  restaurant: IRestaurant_OrderDetail;
}

export interface IDriver_OrderDetail {
  user_id: string;
  full_name?: string;
  avatar?: string;
  phone_number?: string;
  number_plate?: string;
}

export interface ICustomerOrderDetail {
  user_id: string;
  address: string;
  full_name: string;
  lat: string;
  long: string;
  user_phone: string;
}

export interface IOrderItem_OrderDetail {
  _id: string;
  currency_type: string;
  extra_options: IExtraOption_OrderDetail[];
  order_code: string;
  item_id: string;
  price: number;
  quantity: number;
  item_name: string;
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface IExtraOption_OrderDetail {
  price: number;
  desc: string;
  status: boolean;
  _id: string;
  extra_option_group_id: string;
  extra_option_name: string;
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface IRestaurant_OrderDetail {
  _id: string;
  location_v2: ILocationV2_OrderDetail;
  open_time: IOpenTime_OrderDetail;
  contact: IContact_OrderDetail;
  status: string;
  stop_time: string;
  balance_amount: number;
  avatar: string;
  address: string;
  name: string;
  location: Location | ILongLocation;
  id: string;
  createdAt: string;
  updatedAt: string;
  bank_information: IBankInformation_OrderDetail;
  customer_catalog_ids: string[];
}

export interface IBankInformation_OrderDetail {
  account_name: string;
  account_number: string;
  bank_name: string;
}

export interface IContact_OrderDetail {
  phone: string;
  email: string;
}

export interface ILocationV2_OrderDetail {
  type: string;
  coordinates: number[];
}

export interface IOpenTime_OrderDetail {
  day: string;
  time: string;
}

export interface IListOrderItem {
  _id: string;
  driver: null;
  note: string;
  discount_id: null;
  discount_order: number;
  discount_shipping: number;
  payment_method: string;
  payment_status: string;
  status: OrderStatus;
  cancel_reason: null;
  currency_type: string;
  order_code: string;
  customer: ICustomer;
  customer_catalog_id: string;
  restaurant_id: string;
  shipping_fee: number;
  total_price: number;
  order_price: number;
  id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  order_items: {
    _id: string;
    currency_type: string;
    extra_options: IExtraOption[];
    order_code: string;
    item_id: string;
    price: number;
    quantity: number;
    item_name: string;
    id: string;
    __v: number;
    createdAt: string;
    updatedAt: string;
  }[];
  foods: IFood[];
  restaurant: IRestaurant_OrderDetail;
}

export interface IBookTaxiRequest {
  pickupLocation: {
    address: string;
    long: string;
    lat: string;
  };
  dropoffLocation: {
    address: string;
    long: string;
    lat: string;
  };
  vehicle: string;
}

export const getStatusName = (status: OrderStatus) => {
  let rs = '';
  switch (status) {
    case OrderStatus.DRIVER_DELIVERING:
      rs = 'Đang giao';
      break;
    case OrderStatus.DRIVER_PICKING:
      rs = 'Đang lấy hàng';
      break;
    case OrderStatus.WAITTING_DRIVER_ACCEPT:
      rs = 'Đang tìm tài xế';
      break;
    case OrderStatus.CANCEL:
      rs = 'Đã huỷ';
      break;
    case OrderStatus.DELIVERED:
      rs = 'Đã giao';
      break;

    default:
      rs = 'Không xác định';
      break;
  }
  return rs;
};
export const getStatusColor = (status: OrderStatus) => {
  let rs = Colors.blue47;
  switch (status) {
    case OrderStatus.CANCEL:
      rs = Colors.main;
      break;
    default:
      break;
  }
  return rs;
};

export const getGroupsNameByStatus = (status: OrderStatus) => {
  let rs = '';
  switch (status) {
    case OrderStatus.DRIVER_DELIVERING:
      rs = 'Đang di chuyển';
      break;
    case OrderStatus.DRIVER_PICKING:
      rs = 'Đang giao';
      break;

    case OrderStatus.WAITTING_DRIVER_ACCEPT:
      rs = 'Đang tìm tài xế';
      break;

    default:
      rs = 'Lịch sử';
      break;
  }
  return rs;
};
