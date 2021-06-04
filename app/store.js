import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducer from './redux/index'
import { createLogger } from 'redux-logger'

const logger = createLogger();
export const stores = 
process.env.NODE_ENV === 'production' ? 
(
    createStore(reducer, applyMiddleware(thunk))
) : 
(
    window.__REDUX_DEVTOOLS_EXTENSION__ ? (
        createStore(reducer, compose(applyMiddleware(thunk, logger), window.__REDUX_DEVTOOLS_EXTENSION__()))
    ) : (
        createStore(reducer, applyMiddleware(thunk, logger))
    )
)