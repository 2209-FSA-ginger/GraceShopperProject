import React from "react";

import {
  Datagrid,
  DateField,
  List,
  TextField,
  ImageField,
  NumberField,
  EditButton,
  DeleteButton,
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  BooleanInput,
  DateInput,
  Edit,
} from "react-admin";

export const ProductList = () => (
  <List>
    <Datagrid>
      <ImageField source="imageURL" label="Album Cover" />
      <NumberField source="id" />
      <TextField source="albumId" />
      <TextField source="title" />
      <TextField source="artist" />
      <TextField source="genre" />
      <TextField source="style" />
      <DateField source="releaseDate" />
      <NumberField source="rating" />
      <NumberField source="ratingCount" />
      {/* <TextField source="notes" />
      <TextField source="tracklist" /> */}
      <NumberField source="price" />
      <NumberField source="discount" />
      <NumberField source="displayPrice" />
      <NumberField source="inventory" />
      <DateField source="createdAt" />
      <DateField source="updatedAt" />
      <EditButton basepath="/products" />
      <DeleteButton basepath="/products" />
    </Datagrid>
  </List>
);

export const ProductCreate = (props) => {
  return (
    <Create title="Add an album" {...props}>
      <SimpleForm>
        <h2>Add an album from Discog </h2>
        <TextInput source="albumId" label="Discog Album ID" />
        <BooleanInput disabled source="custom" defaultValue={false} />
      </SimpleForm>
      {/* <SimpleForm>
        <h2>Add a custom album </h2>
        <TextInput source="imageURL" label="Album Cover URL" type="url" />
        <TextInput source="albumId" />
        <TextInput source="title" />
        <TextInput source="artist" />
        <TextInput source="genre" />
        <TextInput source="style" />
        <DateInput source="releaseDate" />
        <NumberInput source="rating" />
        <NumberInput source="ratingCount" />
        <TextInput multiline source="notes" fullWidth />
        <TextInput multiline source="tracklist" fullWidth />
        <NumberInput source="price" />
        <NumberInput source="discount" />
        <NumberInput disabled source="displayPrice" defaultValue={0} />
        <NumberInput source="inventory" />
        <BooleanInput disabled source="custom" defaultValue={true} />
      </SimpleForm> */}
    </Create>
  );
};

export const ProductEdit = (props) => {
  return (
    <Edit title="Edit an album" {...props}>
      <SimpleForm>
        <TextInput source="imageURL" label="Album Cover URL" type="url" />
        <TextInput source="albumId" />
        <TextInput source="title" />
        <TextInput source="artist" />
        <TextInput source="genre" />
        <TextInput source="style" />
        <DateInput source="releaseDate" />
        <NumberInput source="rating" />
        <NumberInput source="ratingCount" />
        <TextInput multiline fullWidth source="notes" />
        <TextInput multiline fullWidth source="tracklist" />
        <NumberInput source="price" />
        <NumberInput source="discount" />
        <NumberInput disabled source="displayPrice" defaultValue={0} />
        <NumberInput source="inventory" />
      </SimpleForm>
    </Edit>
  );
};
