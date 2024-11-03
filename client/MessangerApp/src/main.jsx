
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { legacy_createStore as createStore } from 'redux'
import messangerReducer from './redux/rootReducer.jsx'

const appStore = createStore(messangerReducer);

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
    <Provider store={appStore}>
    <App/>
    </Provider>
    </BrowserRouter>
)
