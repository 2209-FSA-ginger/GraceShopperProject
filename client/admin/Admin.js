import * as React from "react";
import { Admin } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';

const dataProvider = simpleRestProvider('http://localhost:8080/api');

const AdminApp = () => <Admin dataProvider={dataProvider} />;

export default AdminApp;