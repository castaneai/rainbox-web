export enum ActionType {
  FETCH_ITEMS = 'FETCH_ITEMS',
}

export interface FetchItemsAction {
    type: ActionType.FETCH_ITEMS
    keyword: string
}