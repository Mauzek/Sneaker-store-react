import React from "react";
import { Form } from "antd";
import { TextField } from "@mui/material";

export const FormInput = ({ name, label, rules, type = "text" }) => (
  <Form.Item name={name} rules={rules}>
    <TextField fullWidth variant="outlined" label={label} type={type} color="error" />
  </Form.Item>
);


