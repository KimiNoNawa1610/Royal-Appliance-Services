import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { showMessage } from "react-native-flash-message";
import {
  Button,
  Input,
  Layout,
  Text,
  Divider,
  Toggle,
} from "@ui-kitten/components";
import axios from "axios";
import { BASE_URL } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const InvoiceCreation = () => {
  return (
    <Layout>
      <Input />
      <Input />
      <Input />
      <Input />
      <Input />
      <Input />
    </Layout>
  );
};

export default InvoiceCreation;
