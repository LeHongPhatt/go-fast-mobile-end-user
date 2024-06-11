import { IPromotion } from './home';

export interface ICategoriesState {
  loading: boolean;
  listRestaurants: IRestaurantDetail[];
  listExtraFood: IExtraFood;
  listFoods: IFood[];
  detailRestaurant: IRestaurantDetail;
  listFoodCatalog: IFoodCatalog[];
  selectedPromos: IPromotion[];
}

export interface IRestaurant {
  distance: number;
  roundedDistance: number;
  distance_unit: string;
  id: string;
  restaurant_name: string;
  restaurant_address: string;
  restaurant_avatar: string;
  average_rating: number;
  total_reviews: number;
  address: string;
  avatar: string;
  name: string;
  status: boolean;
}

export interface IRestaurantDetail {
  distance: any;
  open_time: OpenTime;
  contact: Contact;
  status: boolean;
  stop_time: any;
  avatar: string;
  address: string;
  name: string;
  location: Location;
  id: string;
  createdAt: string;
  updatedAt: string;
  bank_information: BankInformation;
  average_rating: number;
  total_reviews: number;
}

export interface OpenTime {
  day: string;
  time: string;
}

export interface Contact {
  phone: string;
  email: string;
}

export interface Location {
  long: string;
  lat: string;
}

export interface BankInformation {
  account_name: string;
  account_number: string;
  bank_name: string;
}

export interface IListFoodCatalogParams {
  restaurantId: string;
}
export interface IListFoodParams {
  page: number;
  limit: number;
  foodCatalogId?: string;
  restaurantId: string;
}

export interface IExtraFood {
  desc: string;
  extra_option_group_id: any;
  base_price: number;
  status: string;
  order_count: number;
  images: string[];
  currency_type: string;
  food_catalog_id: string;
  food_name: string;
  price: number;
  image: string;
  id: string;
  createdAt: string;
  updatedAt: string;
  restaurant_id: string;
  extra_options_group: ExtraOptionsGroup[];
}

export interface ExtraOptionsGroup {
  food_id: string;
  desc: any;
  status: boolean;
  restaurant_id: string;
  group_name: string;
  id: string;
  createdAt: string;
  updatedAt: string;
  extraOptions: ExtraOption[];
}

export interface ExtraOption {
  price: number;
  desc: string;
  status: boolean;
  extra_option_group_id: string;
  extra_option_name: string;
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface IFood {
  desc: string;
  extra_option_group_id: string;
  base_price: number;
  status: string;
  order_count: number;
  currency_type: string;
  food_catalog_id: string;
  food_name: string;
  price: number;
  images?: string[];
  id: string;
  createdAt: string;
  updatedAt: string;
}
export interface IFoodCatalog {
  desc: string;
  status: boolean;
  restaurant_id: string;
  food_catalog_name: string;
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface ISuggestRestaurant {
  location_v2: LocationV2;
  open_time: OpenTime;
  contact: Contact;
  status: boolean | string;
  stop_time: null | string;
  avatar: null | string;
  address: string;
  name: string;
  location: Location;
  id: string;
  createdAt: string;
  updatedAt: string;
  bank_information: BankInformation;
  customer_catalog_ids?: string[];
  average_rating: number;
  total_reviews: number;
  total_orders: number;
  distance: number;
}

export interface LocationV2 {
  type: string;
  coordinates: number[];
}
