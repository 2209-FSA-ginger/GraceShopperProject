import React from "react";

import {
  Datagrid,
  DateField,
  SimpleFormIterator,
  List,
  TextField,
  EmailField,
  NumberField,
  ArrayField,
  EditButton,
  DeleteButton,
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  ArrayInput,
  DateInput,
  Edit,
} from "react-admin";

export const OrderList = () => (
  <List>
    <Datagrid>
      <NumberField source="id" />
      <NumberField source="userId" />
      <TextField source="firstName" />
      <TextField source="lastName" />
      <TextField source="addressLine1" />
      <TextField source="addressLine2" />
      <TextField source="city" />
      <TextField source="state" />
      <TextField source="country" />
      <NumberField source="zipcode" />
      <NumberField source="phone" />
      <EmailField source="email" />
      <NumberField source="creditCard" />
      <DateField source="createdAt" />
      <DateField source="updatedAt" />
      <ArrayField source="orderProducts">
        <Datagrid>
          <NumberField source="productId" label="productId" />
          <TextField source="product.title" label="Album Title" />
          <NumberField source="quantity" />
          <NumberField source="price" />
        </Datagrid>
      </ArrayField>
      <EditButton basepath="/orders" />
      <DeleteButton basepath="/orders" />
    </Datagrid>
  </List>
);

export const OrderCreate = (props) => {
  return (
    <Create title="Add an order" {...props}>
      <SimpleForm>
        <h2>Add a new order </h2>
        <NumberInput source="userId" />
        <TextInput source="firstName" />
        <TextInput source="lastName" />
        <TextInput source="addressLine1" />
        <TextInput source="addressLine2" />
        <TextInput source="city" />
        <TextInput source="state" />
        <TextInput source="country" />
        <NumberInput source="zipcode" />
        <NumberInput source="phone" />
        <TextInput source="email" />
        <NumberInput source="creditCard" />
        <ArrayInput source="orderProducts">
          <SimpleFormIterator inline>
            <NumberInput source="productId" label="productId" />
            <NumberInput source="quantity" />
            <NumberInput source="price" />
          </SimpleFormIterator>
        </ArrayInput>
      </SimpleForm>
    </Create>
  );
};

export const OrderEdit = (props) => {
  return (
    <Edit title="Edit an order" {...props}>
      <SimpleForm>
        <h2>Edit an order </h2>
        <NumberInput disabled source="id" />
        <NumberInput source="userId" />
        <TextInput source="firstName" />
        <TextInput source="lastName" />
        <TextInput source="addressLine1" />
        <TextInput source="addressLine2" />
        <TextInput source="city" />
        <TextInput source="state" />
        <TextInput source="country" />
        <NumberInput source="zipcode" />
        <NumberInput source="phone" />
        <TextInput source="email" />
        <NumberInput source="creditCard" />
        <ArrayInput source="orderProducts">
          <SimpleFormIterator inline>
            <NumberInput source="productId" label="productId" />
            <NumberInput source="quantity" />
            <NumberInput source="price" />
          </SimpleFormIterator>
        </ArrayInput>
      </SimpleForm>
    </Edit>
  );
};
