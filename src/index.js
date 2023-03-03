
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "./Authentication/auth";
import "./index.scss";
import Loader from "./shade/Loaders/Loaders"
import { Provider } from "react-redux";
import Store from './Store/store';
import { Toaster } from 'react-hot-toast'
import CustomerReport from "./Pages/CustomerReport";
import LiveTxn from "./Pages/LiveVcipTxn";
import Gleap from "gleap";
import axios from "axios";


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
const AuthLogin = React.lazy(() => import("./Authentication/Login"));
const AuthSignup = React.lazy(() => import("./Authentication/Signup"));
//Form



const Dashboard = React.lazy(() => import("./Pages/Dashboard/"));


const Login = React.lazy(() => import("./Pages/Login/"));

const root = ReactDOM.createRoot(document.getElementById("root"));
// const accountValue = sessionStorage.getItem("account");
// axios.defaults.baseURL = accountValue ? process.env.REACT_APP_BE_URL : "test";

Gleap.initialize('xjCBpKMrVMXqwq8Nj8zF6sEOmTHXjSKx')

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
                path={`/customerreport`}
                element={<CustomerReport />}
              />
              <Route
                path={`/livevcipidtxn`}
                element={<LiveTxn />}
              />

              <Route
                path={`/pages/Authentication/404error`}
                element={<Error404 />}
              />
              <Route
                path={`/pages/Authentication/500error`}
                element={<Error500 />}
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

