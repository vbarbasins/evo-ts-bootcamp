import { AnyAction, Middleware } from 'redux';

import { ShopActionType } from './actions/shop';

import { sendLogs } from '../services/api';

import { LogEvent, ShopState } from '../types';

export const logger: Middleware<{}, ShopState> = ({ getState }) => (nextDispatch) => (
  (action: AnyAction) => {
    let event: LogEvent = { eventName: action.type };
    switch (action.type) {
      case ShopActionType.ItemSelected:
      case ShopActionType.ItemAddedToCart:
      case ShopActionType.ItemRemovedFromCart: {
        const itemId = action.payload;
        const menuItem = getState().menu.find((item) => item._id === itemId);
        if (menuItem) {
          event = {
            ...event,
            itemName: menuItem.name,
            itemPrice: menuItem.price,
          };
        }
        break;
      }
      default: break;
    }
    sendLogs(event);
    return nextDispatch(action);
  }
);
