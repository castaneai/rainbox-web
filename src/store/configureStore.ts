import { createStore, compose } from 'redux'
import rootReducer from '../reducers';

const configureStore = (preloadedState?: any) => {
    const store = createStore(
        rootReducer,
        preloadedState,
    )
    return store
}

export default configureStore