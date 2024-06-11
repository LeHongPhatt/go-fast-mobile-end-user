import { NavigationService, Routes } from 'navigation';
import { FindCarType } from './enum';
export interface ICategory {
  icon: string;
  queue_number: string;
  type: TTypeCategory;
  name: string;
  id: string;
  defaultIcon?: string;
  onPress?: () => void;
}
export interface IHomeState {
  loading: boolean;
  listCategories: any[];
  listPromotions: IPromotion[];
  listSuggests: any[];
}
export enum ETypeCategory {
  FOOD = 'FOOD',
  DRINK = 'DRINK',
  BOOKING = 'BOOKING',
  PROMOTION = 'PROMOTION',
  MOTORBIKE_BOOKING = 'MOTORBIKE_BOOKING',
  DELIVERY = 'DELIVERY',
  COSMETIC = 'COSMETIC',
  DOMESTIC_WOKER = 'DOMESTIC_WOKER',
}
export type TTypeCategory =
  | ETypeCategory.FOOD
  | ETypeCategory.DRINK
  | ETypeCategory.BOOKING
  | ETypeCategory.PROMOTION
  | ETypeCategory.MOTORBIKE_BOOKING
  | ETypeCategory.DELIVERY
  | ETypeCategory.COSMETIC
  | ETypeCategory.DOMESTIC_WOKER;
interface ITypeCategory {
  icon: string;
  screen?: string;
  onPress?: () => void;
}
export const DATA_CATEGORY: Record<ETypeCategory, ITypeCategory> = {
  [ETypeCategory.FOOD]: {
    icon: 'food1',
  },
  [ETypeCategory.DRINK]: {
    icon: 'drink1',
  },
  [ETypeCategory.BOOKING]: {
    icon: 'booking',
  },
  [ETypeCategory.PROMOTION]: {
    icon: 'promotion',
  },
  [ETypeCategory.MOTORBIKE_BOOKING]: {
    icon: 'bike',
    onPress: () =>
      NavigationService.navigate(Routes.FindCar, {
        type: FindCarType.MOTORBIKE,
      }),
  },
  [ETypeCategory.DELIVERY]: {
    icon: 'deliveryStuff',
    onPress: () => NavigationService.navigate(Routes.RequestDelivery),
  },
  [ETypeCategory.COSMETIC]: {
    icon: 'comestic',
    onPress: () => {},
  },
  [ETypeCategory.DOMESTIC_WOKER]: {
    icon: 'houseHelper',
    onPress: () => {},
  },
};

interface IPromoCondition {
  condition_value: number;
  condition_type: 'MINIMUM_ORDER';
}

interface IPromoOffer {
  offer_type: 'DISCOUNT_ORDER';
  offer_value: number;
  offer_unit: 'AMOUNT';
}

interface IPromoQuantity {
  remaining: number;
  initialized: number;
}

export interface IPromotion {
  condition: IPromoCondition;
  offer: IPromoOffer;
  quantity: IPromoQuantity;
  status: 'ACTIVE';
  apply_payment_methods: ['ALL'];
  _id: string;
  name: string;
  start_date: string;
  end_date: string;
  code: string;
  usable_catalog: 'ALL';
  id: string;
  image_url: string;
  description: string;
  restaurant_id: string;
  createdAt: string;
  updatedAt: string;
  __v: 0;
}
