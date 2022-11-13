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

const App = () => {
  const { cartItems, isLoading } = useSelector((store) => store.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calcTotals());
    dispatch(saveCartLocal());
  }, [cartItems]);

  useEffect(() => {
    dispatch(fetchCartUser());
    dispatch(setCartLocal());
  }, []);

  return (
    <div>
      <Navbar />
      <FilterColumn />
      <AllRoutes />
    </div>
  );
};

export default App;
