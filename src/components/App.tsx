import React, {
  lazy,
  Suspense,
  useEffect,
  useState,
  useTransition,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigate, useLocation } from "react-router";
import LoaderComponent from "ui/LoaderComponent";
import { AuthActions, AuthSelectors } from "../store/auth";
import { MainPage } from "./UI/MainPage";
import { AdminPanel } from "./AdminPanel";
import AuthCallback from "./Auth/AuthCallback";
import { Cart } from "./Cart";
import { AboutUs } from "./UI/AboutUs";
import { PastaRecipe } from "./Recipes/PastaRecipe";
import { RisottoRecipe } from "./Recipes/RisottoRecipe";
import { ToastRecipe } from "./Recipes/ToastRecipe";
import { Goods } from "./UI/Goods";

const AppWrapper = styled.div`
  margin: 0 auto;
  height: 100vh;
`;

const NotFound = lazy(() => import("./NotFound"));
const Auth = lazy(() => import("./Auth/Auth"));
const AuthRoute = lazy(() => import("./Auth/AuthRoute"));

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(AuthActions.checkSessionStart());
  }, []);
  const isSessionLoading = useSelector(AuthSelectors.isSessionLoading);

  if (isSessionLoading) {
    return (
      <LoaderComponent
        loading
        backgroundColor="#ffffff"
        loadingColor="#7367F0"
      />
    );
  }

  return (
    <Router>
      <Suspense
        fallback={
          <LoaderComponent
            loading
            backgroundColor="#ffffff"
            loadingColor="#7367F0"
          />
        }
      >
        <AppWrapper>
          <AppRoutes />
        </AppWrapper>
      </Suspense>
    </Router>
  );
};

const AppRoutes = () => {
  const location = useConcurrentTransition();

  return (
    <Routes location={location}>
      <Route path={"/auth"} element={<Auth />} />
      <Route path={"/auth-callback"} element={<AuthCallback />} />
      <Route
        path={"/adminPanel"}
        element={
          // <AuthRoute>
          <AdminPanel />
          // </AuthRoute>
        }
      />
      <Route path={"/cart"} element={<Cart />} />
      <Route path={"/goods"} element={<Goods />} />
      <Route path={"/aboutUs"} element={<AboutUs />} />
      <Route path={"/pastaRecipe"} element={<PastaRecipe />} />
      <Route path={"/risottoRecipe"} element={<RisottoRecipe />} />
      <Route path={"/toastRecipe"} element={<ToastRecipe />} />

      <Route path={"/"} element={<MainPage />} />

      <Route path={"/errors"} element={<NotFound />} />

      <Route path="*" element={<Navigate to="/errors/?status=404" replace />} />
    </Routes>
  );
};

const useConcurrentTransition = () => {
  const location = useLocation();
  const [oldLocation, setOldLocation] = useState(location);
  const [, startTransition] = useTransition();

  useEffect(() => {
    setOldLocation((oldLocation) =>
      oldLocation.pathname !== location.pathname ||
      oldLocation.search !== location.search
        ? location
        : oldLocation,
    );
  }, [location]);

  useEffect(() => {
    startTransition(() => {});
  }, [oldLocation]);

  return oldLocation;
};

export default App;
