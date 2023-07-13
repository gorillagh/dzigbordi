import React, { useEffect, useState, useRef, lazy, Suspense } from "react";
import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material/styles";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { currentUser } from "./serverFunctions/auth";
import AlertSnackbar from "./components/Feedbacks/AlertSnackbar";
import { Helmet } from "react-helmet";
import LoadingBackdrop from "./components/Feedbacks/LoadingBackdrop";
import restaurantDetails from "./restaurantDetails";
import UserRoute from "./components/Routes/UserRoute";
import PhoneNumber from "./components/PopUps/PhoneNumber";
import AdminRoute from "./components/Routes/AdminRoute";
import Orders from "./pages/Admin/Orders";
import Menu from "./pages/Admin/Menu";
import Users from "./pages/Admin/Users";
import Reports from "./pages/Admin/Reports";
import Bank from "./pages/Admin/Bank";
const Footer = lazy(() => import("./components/Footers/Footer"));
const Home = lazy(() => import("./pages/Home"));
const Dashboard = lazy(() => import("./pages/Admin"));
const NotFound = lazy(() => import("./pages/NotFound"));

let theme = createTheme({
  ...restaurantDetails.theme,
});
theme = responsiveFontSizes(theme);

const App = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [loadUser, setLoadUser] = useState(false);
  const [openPhoneNumber, setOpenPhoneNumber] = useState(false);
  const [alertSnackbar, setAlertSnackbar] = useState({ open: false });

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("Logged In user", user);
        const idTokenResult = await user.getIdTokenResult();
        currentUser(idTokenResult.token)
          .then((res) => {
            console.log(res);
            let userInfo = null;
            if (res.data) {
              userInfo = {
                _id: res.data._id,
                phoneNumber: res.data.phoneNumber,
                name: res.data.name,
                department: res.data.department,
                branch: res.data.branch,
                email: res.data.email ? res.data.email : "",
                image: res.data.image ? res.data.image : "",
                role: res.data.role,
                token: idTokenResult.token,
                favorites: res.data.favorites ? res.data.favorites : [],
              };
            }

            setUser(userInfo);
            dispatch({
              type: "LOGGED_IN_USER",
              payload: userInfo,
            });
            window.localStorage.setItem("dzUser", JSON.stringify(userInfo));
            setLoading(false);
          })
          .catch((error) => {
            setLoading(false);
            console.log("Error----->", error);
            // if (window.localStorage.getItem("wdUser")) {
            //   setUser(JSON.parse(window.localStorage.getItem("wdUser")));
            //   dispatch({
            //     type: "LOGGED_IN_USER",
            //     payload: JSON.parse(window.localStorage.getItem("wdUser")),
            //   });
            // }
          });
      }
      // else if (window.localStorage.getItem("wdUser")) {
      //   const data = JSON.parse(window.localStorage.getItem("wdUser"));
      //   const response = await getUser(data._id);
      //   if (response.data) {
      //     setUser(JSON.parse(window.localStorage.getItem("wdUser")));
      //     dispatch({
      //       type: "LOGGED_IN_USER",
      //       payload: JSON.parse(window.localStorage.getItem("wdUser")),
      //     });
      //     setLoading(false);
      //   } else {
      //     window.localStorage.removeItem("wdUser");
      //   }
      // }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [dispatch, loadUser]);

  return (
    <ThemeProvider theme={theme}>
      <Helmet>
        <title>{restaurantDetails.name}</title>
      </Helmet>

      <Suspense fallback={LoadingBackdrop}>
        <PhoneNumber
          setAlertSnackbar={setAlertSnackbar}
          open={openPhoneNumber}
          onClose={() => setOpenPhoneNumber(false)}
          setUser={setUser}
          user={user}
        />
      </Suspense>

      <Routes>
        <Route
          exact
          path="/"
          element={
            <Suspense fallback={LoadingBackdrop}>
              {loading ? (
                ""
              ) : (
                <UserRoute
                  loading={loading}
                  setOpenPhoneNumber={setOpenPhoneNumber}
                  user={user}
                >
                  <Home setAlertSnackbar={setAlertSnackbar} user={user} />
                </UserRoute>
              )}
            </Suspense>
          }
        />
        <Route
          exact
          path="/admin"
          element={
            <Suspense fallback={<LoadingBackdrop open={true} />}>
              {loading ? (
                ""
              ) : (
                <AdminRoute
                  loading={loading}
                  setOpenPhoneNumber={setOpenPhoneNumber}
                  user={user}
                >
                  <Dashboard setAlertSnackbar={setAlertSnackbar} user={user} />
                </AdminRoute>
              )}
            </Suspense>
          }
        />
        <Route
          exact
          path="/admin/orders"
          element={
            <Suspense fallback={<LoadingBackdrop open={true} />}>
              {loading ? (
                ""
              ) : (
                <AdminRoute
                  loading={loading}
                  setOpenPhoneNumber={setOpenPhoneNumber}
                  user={user}
                >
                  <Orders setAlertSnackbar={setAlertSnackbar} user={user} />
                </AdminRoute>
              )}
            </Suspense>
          }
        />
        <Route
          exact
          path="/admin/menu"
          element={
            <Suspense fallback={<LoadingBackdrop open={true} />}>
              {loading ? (
                ""
              ) : (
                <AdminRoute
                  loading={loading}
                  setOpenPhoneNumber={setOpenPhoneNumber}
                  user={user}
                >
                  <Menu setAlertSnackbar={setAlertSnackbar} user={user} />
                </AdminRoute>
              )}
            </Suspense>
          }
        />
        <Route
          exact
          path="/admin/users"
          element={
            <Suspense fallback={<LoadingBackdrop open={true} />}>
              {loading ? (
                ""
              ) : (
                <AdminRoute
                  loading={loading}
                  setOpenPhoneNumber={setOpenPhoneNumber}
                  user={user}
                >
                  <Users setAlertSnackbar={setAlertSnackbar} user={user} />
                </AdminRoute>
              )}
            </Suspense>
          }
        />
        <Route
          exact
          path="/admin/reports"
          element={
            <Suspense fallback={<LoadingBackdrop open={true} />}>
              {loading ? (
                ""
              ) : (
                <AdminRoute
                  loading={loading}
                  setOpenPhoneNumber={setOpenPhoneNumber}
                  user={user}
                >
                  <Reports user={user} />
                </AdminRoute>
              )}
            </Suspense>
          }
        />
        <Route
          exact
          path="/admin/bank"
          element={
            <Suspense fallback={<LoadingBackdrop open={true} />}>
              {loading ? (
                ""
              ) : (
                <AdminRoute
                  loading={loading}
                  setOpenPhoneNumber={setOpenPhoneNumber}
                  user={user}
                >
                  <Bank setAlertSnackbar={setAlertSnackbar} user={user} />
                </AdminRoute>
              )}
            </Suspense>
          }
        />
        <Route
          exact
          path="*"
          element={
            <Suspense fallback={LoadingBackdrop}>
              <NotFound />
            </Suspense>
          }
        />
      </Routes>
      <Suspense fallback={LoadingBackdrop}>
        <Footer />
      </Suspense>
      <AlertSnackbar
        open={alertSnackbar.open}
        onClose={() =>
          setAlertSnackbar((prevState) => ({ ...prevState, open: false }))
        }
        text={alertSnackbar.text}
        severity={alertSnackbar.severity}
        variant={alertSnackbar.variant}
        autoHideDuration={alertSnackbar.autoHideDuration}
      />
      <LoadingBackdrop open={loading} />
    </ThemeProvider>
  );
};

export default App;
