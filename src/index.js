
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "./Authentication/auth";
import "./index.scss";
import Loader from "./shade/Loaders/Loaders"
import { Provider } from "react-redux";
import Store from './Store/store';
import { Toaster } from 'react-hot-toast'

const App = React.lazy(() => import("../src/shade/layouts/App"));
const Switcherapp = React.lazy(() => import("../src/shade/layouts/Switcherapp"));

const Error404 = React.lazy(() =>
  import("./components/Pages/Authentication/404Error/404Error")
);
const Error500 = React.lazy(() =>
  import("./components/Pages/Authentication/500Error/500Error")
);
const Error501 = React.lazy(() =>
  import("./components/Pages/Authentication/501Error/501Error")
);



const Dashboard = React.lazy(() => import("./Pages/Dashboard/"));
const SendAmount = React.lazy(() => import("./Pages/SendAmount/"));

const Login = React.lazy(() => import("./Pages/Login/"));
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={Store}>
    <React.Fragment>
      <BrowserRouter>
        <React.Suspense fallback={<Loader />}>
          <Routes>
            <Route path={`/`} element={<Auth />}>
              <Route index element={<Login />} />

              <Route
                path={`/login`}
                element={<Login />}
              />

            </Route>

            <Route path={`/`} element={<App />}>
              <Route
                path={`/dashboard`}
                element={<Dashboard />}
              />
              <Route
                path={`/send-amount`}
                element={<SendAmount />}
              />
              <Route path="*" element={<Error404 />} />
            </Route>

            <Route>
              <Route
                path={`/pages/switcher/switcher-1`}
                element={<Switcherapp />}
              />
            </Route>
            <Route></Route>
          </Routes>
        </React.Suspense>
      </BrowserRouter>
      <Toaster />
    </React.Fragment>
  </Provider>
);

