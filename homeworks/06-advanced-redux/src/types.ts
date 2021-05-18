import { MenuActionType } from './redux/actions/menu';
import { ShopActionType } from './redux/actions/shop';

export type Pizza = {
    name: string;
    price: number;
    _id: string;
}

export type CartItem = Pizza & {count: number};

export type ShopState = {
    menu: Pizza[];
    cart: Array<CartItem>;
}

export interface LogEvent {
    eventName: MenuActionType | ShopActionType,
    itemName?: string,
    itemPrice?: number,
}
