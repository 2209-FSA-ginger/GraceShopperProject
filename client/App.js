import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCartUser,
  calcTotals,
  saveCartLocal,
  setCartLocal,
} from "./store/cart";
import Navbar from "./components/Navbar";
import AllRoutes from "./Routes";
import FilterColumn from "./components/FilterColumn";
import { getMe } from "./store/auth";


const App = () => {
  const { cartItems } = useSelector((store) => store.cart);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMe());
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchCartUser());
    } else {
      dispatch(setCartLocal());
    }
  }, []);

  useEffect(() => {
    dispatch(calcTotals());
    if (!isLoggedIn) dispatch(saveCartLocal());
  }, [cartItems]);

  return (
    <div>
      <Navbar />
      <AllRoutes />
    </div>
  );
};

export default App;
