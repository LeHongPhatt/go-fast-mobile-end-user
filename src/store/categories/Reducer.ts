import { createSlice } from '@reduxjs/toolkit';
import { ICategoriesState, IPromotion } from 'types';

const initialState: ICategoriesState = {
  loading: false,
  selectedPromos: [],
  listRestaurants: [],
  listExtraFood: {
    desc: '',
    extra_option_group_id: undefined,
    base_price: 0,
    status: '',
    order_count: 0,
    images: [],
    currency_type: '',
    food_catalog_id: '',
    food_name: '',
    price: 0,
    image: '',
    id: '',
    createdAt: '',
    updatedAt: '',
    restaurant_id: '',
    extra_options_group: [],
  },
  listFoods: [],
  listFoodCatalog: [],
  detailRestaurant: {
    open_time: {
      day: '',
      time: '',
    },
    contact: {
      phone: '',
      email: '',
    },
    status: false,
    stop_time: undefined,
    avatar: '',
    address: '',
    name: '',
    location: {
      long: '',
      lat: '',
    },
    id: '',
    createdAt: '',
    updatedAt: '',
    bank_information: {
      account_name: '',
      account_number: '',
      bank_name: '',
    },
    average_rating: 0,
    total_reviews: 0,
  },
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    actionRequest: state => {
      return {
        ...state,
        loading: true,
      };
    },
    getDataSuccess: (state, { payload }: { payload: any }) => {
      return {
        ...state,
        loading: false,
        ...payload,
      };
    },
    setSelectedPromos: (
      state,
      { payload }: { payload: { selectedPromos: IPromotion[] } },
    ) => {
      return {
        ...state,
        ...payload,
      };
    },
  },
});
export const { actionRequest, getDataSuccess, setSelectedPromos } =
  categoriesSlice.actions;
export default categoriesSlice.reducer;
