import { BalanceAction, BalanceActionType } from './actions';

const initialState = 0;

export function balanceReducer(state = initialState, action: BalanceAction): number {
  switch (action.type) {
    case BalanceActionType.DEBIT:
      return state + action.payload;
    case BalanceActionType.CREDIT:
      return state - action.payload;
    case BalanceActionType.SUBTRACT_PERCENTAGE:
      return state * (1 - action.payload / 100);
    case BalanceActionType.UPDATE_BALANCE:
      return action.payload;
    default:
      return state;
  }
}
