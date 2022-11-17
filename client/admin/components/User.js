import React from "react";

import {
  Datagrid,
  DateField,
  List,
  TextField,
  BooleanField,
  EmailField,
  NumberField,
  EditButton,
  DeleteButton,
  Create,
  SimpleForm,
  TextInput,
  BooleanInput,
  PasswordInput,
  NumberInput,
  Edit,
} from "react-admin";

export const UserList = () => (
  <List>
    <Datagrid>
      <NumberField source="id" />
      <TextField source="firstName" />
      <TextField source="lastName" />
      <TextField source="username" />
      <EmailField source="email" />
      <BooleanField source="isAdmin" />
      <NumberField source="phone" />
      <TextField source="addressLine1" />
      <TextField source="addressLine2" />
      <TextField source="city" />
      <TextField source="state" />
      <TextField source="country" />
      <NumberField source="zip" />
      <DateField source="createdAt" />
      <DateField source="updatedAt" />
      <EditButton basepath="/users" />
      <DeleteButton basepath="/users" />
    </Datagrid>
  </List>
);

export const UserCreate = (props) => {
  return (
    <Create title="Add a new user" {...props}>
      <SimpleForm>
        <h2>Add a new user </h2>
        <TextInput source="firstName" />
        <TextInput source="lastName" />
        <TextInput source="username" />
        <PasswordInput source="password" />
        <TextInput source="email" />
        <BooleanInput source="isAdmin" />
      </SimpleForm>
    </Create>
  );
};

export const UserEdit = (props) => {
  return (
    <Edit title="Edit a user" {...props}>
      <SimpleForm>
        <h2>Edit a user </h2>
        <TextInput source="firstName" />
        <TextInput source="lastName" />
        <TextInput source="username" />
        <PasswordInput source="password" />
        <TextInput source="email" />
        <BooleanInput source="isAdmin" />
        <NumberInput source="phone" />
        <TextInput source="addressLine1" />
        <TextInput source="addressLine2" />
        <TextInput source="city" />
        <TextInput source="state" />
        <TextInput source="country" />
        <NumberInput source="zip" />
      </SimpleForm>
    </Edit>
  );
};
