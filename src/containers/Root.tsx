import React from 'react'
import { Provider } from 'react-redux'
import { Route } from 'react-router-dom'
import { Store } from 'redux';
import App from './App'

interface Props {
    store: Store
}

const Root: React.SFC<Props> = (props: Props) => (
    <Provider store={props.store}>
        <div>
            <Route path="/" component={App} />
        </div>
    </Provider>
)

export default Root

