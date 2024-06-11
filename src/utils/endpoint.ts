export const API_ENDPOINT = {
  AUTH: {
    REQUEST_OTP: 'authen/request-otp',
    VERIFY_OTP: 'authen/verify-otp',
    CREATE_USER: 'authen/create-user',
    LOGIN: 'authen/login',
    LOGOUT: 'authen/logout',
    GET_PROFILE: 'authen/profile',
    GET_SESSION: 'authen/get-session',
    FORGOT_PASSWORD_OTP: 'authen/forgot-password-otp',
    FORGOT_PASSWORD: 'authen/forgot-password',
    KYC_USER: 'authen/create-update-user',
    CHANGE_PASSWORD: 'authen/change-password',
  },
  GOONG: {
    GEO_CODE: 'Geocode',
    PLACE_DETAIL: 'Place/Detail',
    PLACE_AUTO: 'Place/AutoComplete',
    DIRECTION: 'Direction',
    DISTANCE_MATRIX: 'DistanceMatrix',
  },
  HOME: {
    CATELOG: 'customer/customer-catalog/get-all',
    PROMOTION: 'customer/promotion/list-promotion',
    SUGGEST_RESTAURANTS: 'customer/restaurant/suggest-restaurants',
  },
  CATEGORY: {
    RESTAURANT: 'customer/restaurant/list-restaurants',
    DETAIL_RESTAURANT: 'customer/restaurant/get-detail',
    EXTRA_FOOD: 'customer/food/get-detail',
    LIST_FOOD_CATALOG: 'customer/food-catalog/list-food-catalog',
    LIST_FOOD: 'customer/food/list-food',
    CALCULATE_PRICE: 'customer/order/calculate',
  },

  ORDER: {
    CREATE: 'customer/order/create',
    DETAIL: 'customer/order/get-detail',
    CANCEL: 'customer/order',
    KEEP_FIND_DRIVER: 'customer/order',
    GET_FOOD_DETAIL: 'customer/food/get-detail',
    GET_ORDER_LIST: 'customer/order/list-orders',
  },

  MOTORCYCLE_TAXI: {
    CREATE: 'customer/motorcycle-taxi/create',
    PRE_CREATE: 'customer/motorcycle-taxi/pre-create',
    CANCEL: 'customer/motorcycle-taxi',
  },

  SHIPPING_TYPES: {
    GET_ALL: 'customer/shipping-types',
  },
};
