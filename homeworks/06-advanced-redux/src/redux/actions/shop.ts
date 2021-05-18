export enum ShopActionType {
  ItemSelected = 'ITEM_SELECTED',
  ItemAddedToCart = 'ITEM_ADDED_TO_CART',
  ItemRemovedFromCart = 'ITEM_REMOVED_FROM_CART'
}

export type ShopAction = { type: ShopActionType; payload: string }

export const selectItem = (payload: string): ShopAction => (
  { type: ShopActionType.ItemSelected, payload }
);

export const addToCart = (payload: string): ShopAction => (
  { type: ShopActionType.ItemAddedToCart, payload }
);

export const removeFromCart = (payload: string): ShopAction => (
  { type: ShopActionType.ItemRemovedFromCart, payload }
);
