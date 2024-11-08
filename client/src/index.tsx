import MainRouter from "./MainRouter";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import { persistor, store } from "./app/store";
import { PersistGate } from "redux-persist/integration/react";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <MainRouter />
    </PersistGate>
  </Provider>
);

//

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
