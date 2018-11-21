import { combineReducers, AnyAction } from 'redux'

interface Item {
    id: string
    name: string
}

interface AppState {
    items: Item[]
}

const items = (state: AppState = {items: []}, action: AnyAction): AppState => {
    if (action.response.items) {
        return {items: action.response.items}
    }
    return state
}

const rootReducer = combineReducers({
    items,
})

export default rootReducer