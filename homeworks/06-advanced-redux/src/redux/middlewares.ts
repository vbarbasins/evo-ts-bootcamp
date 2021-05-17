import { AnyAction, Middleware } from 'redux';

import { ShopActionType } from './actions/shop';

import { sendLogs } from '../services/api';

import { LogEvent, ShopState } from '../types';

export const logger: Middleware<{}, ShopState> = ({ getState }) => (nextDispatch) => (
  (action: AnyAction) => {
    let event: LogEvent;
    switch (action.type) {
      case ShopActionType.ItemSelected:
      case ShopActionType.ItemAddedToCart:
      case ShopActionType.ItemRemovedFromCart: {
        const itemId = action.payload;
        const { name, price } = getState().menu.filter((item) => item._id === itemId)[0];
        event = { eventName: action.type, itemName: name, itemPrice: price };
        break;
      }
      default: {
        event = { eventName: action.type };
      }
    }
    sendLogs(event);
    return nextDispatch(action);
  }
);
