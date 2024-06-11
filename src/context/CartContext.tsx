import React, {
  FC,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { IExtraFood, ILongLocation, IOrderRequest } from 'types';
interface IOrderItem {
  itemId: string;
  quantity: number;
  itemName: string;
  price: string;
  image: string;
  index: number;
  extraOptions: IExtraFood[];
}
interface IStateItem {
  orderItems: IOrderItem;
  extraOptions: IExtraFood[];
}
interface IContext {
  addItemToOrder: (item: any) => void;
  updateOrderItems: (item: any) => void;
  removeItem: (item: IOrderItem) => void;
  removeAll: () => void;
  updateLocationOrder: (loc: ILongLocation) => void;
  setNote: React.Dispatch<React.SetStateAction<String>>;
  setOrderRequest: React.Dispatch<
    React.SetStateAction<IOrderRequest | undefined>
  >;

  orderRequest?: IOrderRequest;
  note: string;
  orderItems: IOrderItem[];
  location?: ILongLocation;
  price: number;
  selectedRestaurant: string;
  setSelectedRestaurant: React.Dispatch<React.SetStateAction<string>>;
}
const CartContext = createContext<IContext>({
  addItemToOrder: () => {},
  updateOrderItems: () => {},
  removeItem: () => {},
  removeAll: () => {},
  updateLocationOrder: () => {},
  setSelectedRestaurant: () => {},
  setNote: () => {},
  setOrderRequest: () => {},

  orderRequest: undefined,
  note: '',
  price: 0,
  orderItems: [],
  location: undefined,
  selectedRestaurant: '',
});

let count = 0;

const CartProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orderItems, setOrderItems] = useState<IOrderItem[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<string>('');
  const [location, setLocation] = useState<ILongLocation | undefined>(
    undefined,
  );
  const [note, setNote] = useState<string>('');
  const [orderRequest, setOrderRequest] = useState<IOrderRequest | undefined>(
    undefined,
  );

  const removeAll = useCallback(() => {
    setOrderItems([]);
    setLocation(undefined);
  }, []);

  const removeItem = useCallback(
    (item: IOrderItem) => {
      setOrderItems(prev => {
        const existedItem = orderItems.find(
          order => order.itemId === item.itemId,
        );
        if (!existedItem) {
          return prev;
        }
        let newOrderList = prev.filter(order => order.itemId !== item.itemId);
        const newQuantity = existedItem.quantity - 1;

        return {
          ...prev,
          orderItems: newQuantity
            ? [...newOrderList, { ...existedItem, quantity: newQuantity }]
            : newOrderList,
        };
      });
    },
    [orderItems],
  );

  const addItemToOrder = useCallback(
    (item: IStateItem) => {
      setOrderItems(prev => {
        return [
          ...prev,
          {
            ...item?.orderItems,
            index: count++,
            extraOptions: item.extraOptions,
          },
        ];
      });
    },
    [orderItems],
  );

  const updateOrderItems = useCallback(
    (item: IStateItem) => {
      setOrderItems(prev => {
        const existedItem = orderItems.find(
          order => order.index === item?.orderItems.index,
        );
        if (!existedItem) {
          return prev;
        } else {
          const index = prev.findIndex(el => existedItem.index === el.index);
          if (index > -1) {
            prev.splice(index, 1);
          }
          if (item?.orderItems.quantity === 0) {
            return [...prev];
          }
          prev.push({ ...item.orderItems, extraOptions: item?.extraOptions });
          return [...prev];
        }
      });
    },
    [orderItems],
  );

  const updateLocation = useCallback((loc: ILongLocation) => {
    setLocation(loc);
  }, []);

  const price = useMemo(() => {
    return orderItems?.reduce((prev, curr: IOrderItem) => {
      const extraPrice =
        curr.extraOptions?.reduce((_prev, _curr) => _curr.price + _prev, 0) ??
        0;
      return prev + (Number(curr?.price) + extraPrice) * curr.quantity;
    }, 0);
  }, [orderItems]);

  const value = useMemo<IContext>(() => {
    return {
      location,
      orderItems: orderItems,
      addItemToOrder: addItemToOrder,
      updateOrderItems: updateOrderItems,
      price,
      removeAll: removeAll,
      removeItem: removeItem,
      selectedRestaurant,
      setSelectedRestaurant,
      updateLocationOrder: updateLocation,
      note,
      setNote,
      orderRequest,
      setOrderRequest,
    };
  }, [
    location,
    orderItems,
    addItemToOrder,
    updateOrderItems,
    price,
    removeAll,
    removeItem,
    selectedRestaurant,
    setSelectedRestaurant,
    updateLocation,
    note,
    setNote,
    orderRequest,
    setOrderRequest,
  ]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartProvider;
