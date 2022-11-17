import * as React from "react";
import { Admin, Resource, fetchUtils } from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";
import authProvider from "./authProvider";
import { UserList, UserEdit, UserCreate } from "./components/User";
import { ProductList, ProductEdit, ProductCreate } from "./components/Product";
import { OrderList, OrderEdit, OrderCreate } from "./components/Order";

const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
  }
  const token = window.localStorage.getItem("adminToken");
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
  }
  options.headers.set("authorization", `${token}`);
  return fetchUtils.fetchJson(url, options);
};

const dataProvider = simpleRestProvider(
  "http://localhost:8080/api",
  httpClient
);

const AdminApp = () => (
  <Admin
    basename="/admin"
    dataProvider={dataProvider}
    authProvider={authProvider}
  >
    <Resource
      name="products"
      list={ProductList}
      edit={ProductEdit}
      create={ProductCreate}
    />
    <Resource
      name="users"
      list={UserList}
      edit={UserEdit}
      create={UserCreate}
    />
    <Resource
      name="orders"
      list={OrderList}
      edit={OrderEdit}
      create={OrderCreate}
      recordRepresentation="title"
    />
  </Admin>
);

export default AdminApp;
