import { AnyAction, Middleware } from 'redux';

import { ShopActionType } from './actions/shop';

import { sendLogs } from '../services/api';

import { LogEvent, ShopState } from '../types';

export const logger: Middleware<{}, ShopState> = ({ getState }) => (nextDispatch) => (
  (action: AnyAction) => {
    let event: LogEvent = { eventName: action.type };
    const shopActionTypes = [
      ShopActionType.ItemSelected,
      ShopActionType.ItemAddedToCart,
      ShopActionType.ItemRemovedFromCart,
    ];
    if (shopActionTypes.includes(action.type)) {
      const itemId = action.payload;
      const { name, price } = getState().menu.filter((item) => item._id === itemId)[0];
      event = { ...event, itemName: name, itemPrice: price };
    }
    sendLogs(event);
    return nextDispatch(action);
  }
);
