import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { BrowserRouter } from "react-router-dom"
import "./index.css"
import { Provider } from "react-redux"
import { store } from "./store"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
            <ToastContainer/>
        </Provider>
    </BrowserRouter>
)
