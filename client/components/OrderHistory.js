import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchOrders } from "../store/orders";
import { useParams } from "react-router-dom";

/**
 * COMPONENT
 */
export const OrderHistory = () => {
  const orders = useSelector((state) => state.orders);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userId } = useParams();

  useEffect(() => {
    dispatch(fetchOrders(userId));
  }, []);

  return (
    <div>
      <h2>Order History</h2>
      <div>
        {orders.length !== 0 ? (
          orders[0].orderProducts.map((orderProd, i) => {
            return (
              <div key={i}>
                <ul className="orders">
                  <img id="order-img" src={orderProd.product.imageURL} />
                  <p id="order-price">{`Price: $${orderProd.price}`}</p>
                  <p id="order-quantity">{`Quantity: ${orderProd.quantity}`}</p>
                  <p id="order-artist">{`Artist: ${orderProd.product.artist}`}</p>
                </ul>
              </div>
            );
          })
        ) : (
          <h1>Is Loading...</h1>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
