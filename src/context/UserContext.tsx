/** @format */
import { useKey } from 'hooks';
import React, { createContext, useEffect } from 'react';
import { EnumStatusLog, KEY_CONTEXT, RESTAURANT_KEY } from 'utils';

const UserStateContext = createContext<any>(null);
const UserDispatchContext = createContext<any>(null);

function userReducer(state: any, action: any) {
  switch (action.type) {
    case EnumStatusLog.LOGIN:
      return { ...state, isAuth: true, user: action?.payload };
    case EnumStatusLog.LOGOUT:
      return { ...state, isAuth: false, user: {} };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }: any) {
  const { getKeyStore } = useKey();

  const [state, dispatch] = React.useReducer(userReducer, {
    isAuth: false,
    user: {},
  });

  useEffect(() => {
    const checkLogin = async () => {
      const status = await getKeyStore(RESTAURANT_KEY.STATUS_USER);
      console.log('status', status);
      const userLog = await getKeyStore(KEY_CONTEXT.USER);
      console.log('userLog', userLog);
      if (userLog) {
        let userParse = JSON.parse(userLog);
        dispatch({
          type: EnumStatusLog.LOGIN,
          payload: userParse,
        });
        return;
      }

      dispatch({
        type: status ?? EnumStatusLog.LOGOUT,
      });
    };
    checkLogin();
  }, []);

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  const context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error('useUserState must be used within a UserProvider');
  }
  return context;
}

function useUserDispatch() {
  const context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error('useUserDispatch must be used within a UserProvider');
  }
  return context;
}

export { UserProvider, useUserState, useUserDispatch, dispatchActions };

// ###########################################################
function dispatchActions({ type, payload }, dispatch) {
  return dispatch({
    type,
    payload,
  });
}
