import { combineReducers } from 'redux';
import categories from './categories/Reducer';
import home from './home/Reducer';
import location from './location/Reducer';
import notify from './notify/Reducer';
import user from './user/Reducer';
import orders from './orders/Reducer';
// import { persistReducer } from 'redux-persist';
// const categoriesPersistConfig = {
//   key: 'categories',
//   storage: AsyncStorage,
//   blacklist: ['listRestaurants'],
// };
export default combineReducers({
  user,
  notify,
  location,
  home,
  categories,
  orders,
});
