import { Colors } from '../theme';

export enum EActivityStatus {
  DELIVERY = 'delivery',
  CANCEL = 'cancel',
  SUCCESS = 'success',
  FEEDBACK = 'feedback',
}
export const enum EAcitivyType {
  FOOD = 'food',
  DRINK = 'drink',
}
export const enum EActivityKey {
  DELIVERING = 'delivering',
  DELIVERED = 'delivered',
}
export type TActivityStatus =
  | EActivityStatus.DELIVERY
  | EActivityStatus.CANCEL
  | EActivityStatus.SUCCESS
  | EActivityStatus.FEEDBACK;
export type TAcitivyType = EAcitivyType.FOOD | EAcitivyType.DRINK;
export type TActivityKey = EActivityKey.DELIVERING | EActivityKey.DELIVERED;
export interface IActivityItem {
  id: number;
  name: string;
  price: number;
  status: TActivityStatus;
  createdAt: string;
  type: TAcitivyType;
  key: TActivityKey;
}
export const DATA: IActivityItem[] = [
  {
    id: 1,
    name: 'Cơm Gà Xối Mỡ 142 - Đinh Tiên Hoàng',
    status: EActivityStatus.DELIVERY,
    price: 2050000,
    createdAt: '2023-05-17T09:52:28.441Z',
    type: EAcitivyType.FOOD,
    key: EActivityKey.DELIVERED,
  },
  {
    id: 2,
    name: 'Trà Sữa Gong Cha - 貢茶 - Lê Đại Hành',
    status: EActivityStatus.FEEDBACK,
    price: 2050000,
    createdAt: '2023-05-16T09:52:28.441Z',
    type: EAcitivyType.DRINK,
    key: EActivityKey.DELIVERING,
  },
  {
    id: 3,
    name: 'Bánh tráng Hai Ù - 715 Nguyễn Văn Quá',
    status: EActivityStatus.FEEDBACK,
    price: 2050000,
    createdAt: '2023-05-17T09:52:28.441Z',
    type: EAcitivyType.DRINK,
    key: EActivityKey.DELIVERING,
  },
  {
    id: 4,
    name: 'Cơm Gà Xối Mỡ 142 - Đinh Tiên Hoàng',
    status: EActivityStatus.CANCEL,
    price: 2050000,
    createdAt: '2023-05-17T09:52:28.441Z',
    type: EAcitivyType.FOOD,
    key: EActivityKey.DELIVERED,
  },
];
interface IStatus {
  color: string;
  name: string;
  icon?: string;
}
export const STATUS: Record<TActivityStatus, IStatus> = {
  delivery: {
    color: Colors.blue47,
    name: 'Đang giao',
  },
  feedback: {
    color: Colors.blue47,
    name: 'Đánh giá',
  },
  success: {
    color: Colors.success,
    name: 'Thành công',
  },
  cancel: {
    color: Colors.redBF,
    name: 'Đã hủy',
  },
};
interface IType {
  icon: string;
  color: string;
}
export const ACTIVITY_TYPE: Record<TAcitivyType, IType> = {
  food: {
    icon: 'TYPE_FOOD',
    color: Colors.blue47,
  },
  drink: {
    icon: 'TYPE_DRINK',
    color: Colors.purpleB1,
  },
};

export const STATUS_ACTIVITY_NAME: Record<TActivityKey, string> = {
  [EActivityKey.DELIVERING]: 'Đang giao',
  [EActivityKey.DELIVERED]: 'Lịch sử',
};
