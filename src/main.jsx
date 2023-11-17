import React from 'react'
import ReactDOM from 'react-dom/client'
import {TierApp} from './TierApp.jsx'
import './styles.css'
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import { store } from './store'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={ store }>
      <BrowserRouter>
        <TierApp/>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
