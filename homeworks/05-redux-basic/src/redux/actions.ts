export enum BalanceActionType {
  DEBIT = 'DEBIT',
  CREDIT = 'CREDIT',
  SUBTRACT_PERCENTAGE = 'SUBTRACT_PERCENTAGE',
  UPDATE_BALANCE = 'UPDATE_BALANCE',
}

export type BalanceAction = { type: BalanceActionType; payload: number }

export function debit(payload: number): BalanceAction {
  return { type: BalanceActionType.DEBIT, payload };
}
export function credit(payload: number): BalanceAction {
  return { type: BalanceActionType.CREDIT, payload };
}
export function substractPercentage(payload: number): BalanceAction {
  return { type: BalanceActionType.SUBTRACT_PERCENTAGE, payload };
}
export function updateBalance(payload: number): BalanceAction {
  return { type: BalanceActionType.UPDATE_BALANCE, payload };
}
