import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"
import { Provider } from "react-redux"
import { persistor, store } from "./store"
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer } from "react-toastify"
import { PersistGate } from "redux-persist/integration/react"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <App />
        </PersistGate>
        <ToastContainer position="bottom-right" />
    </Provider>,
)
