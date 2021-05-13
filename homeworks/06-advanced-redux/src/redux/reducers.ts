import { ShopAction, ShopActionType } from './actions/shop';
import { MenuAction, MenuActionType } from './actions/menu';

import { CartItem, ShopState } from '../types';

const initialState: ShopState = { menu: [], cart: [] };

export function shopReducer(
  state = initialState,
  action: ShopAction | MenuAction,
): ShopState {
  switch (action.type) {
    case MenuActionType.MenuLoaded: {
      const newMenu = action.payload;
      const newState: ShopState = {
        ...state,
        menu: [...newMenu],
      };
      return newState;
    }
    case ShopActionType.ItemSelected: {
      return state;
    }
    case ShopActionType.ItemAddedToCart: {
      const itemId = action.payload;
      let newCart: CartItem[] = [];
      const selectedItemInCart = state.cart.filter((item) => item._id === itemId)[0];
      if (selectedItemInCart) {
        const { count, ...itemInfo } = selectedItemInCart;
        newCart = [
          ...state.cart.filter((item) => item._id !== itemId),
          { ...itemInfo, count: count + 1 },
        ];
      } else {
        const menuItem = state.menu.filter((item) => item._id === itemId)[0];
        newCart = [...state.cart, { ...menuItem, count: 1 }];
      }
      const newState: ShopState = {
        ...state,
        cart: [...newCart],
      };
      return newState;
    }
    case ShopActionType.ItemRemovedFromCart: {
      const itemId = action.payload;
      let newCart: CartItem[] = [];
      const selectedItemInCart = state.cart.filter((item) => item._id === itemId)[0];
      if (selectedItemInCart) {
        const { count, ...itemInfo } = selectedItemInCart;
        newCart = [
          ...state.cart.filter((item) => item._id !== itemId),
        ];
        if (count !== 1) {
          newCart = [
            ...newCart,
            { ...itemInfo, count: count - 1 },
          ];
        }
      }
      const newState: ShopState = {
        ...state,
        cart: [...newCart],
      };
      return newState;
    }
    default:
      return state;
  }
}
