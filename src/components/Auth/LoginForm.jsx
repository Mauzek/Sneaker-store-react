import React from "react";
import { Form, Button } from "antd";
import {FormInput} from "./FormInput";

export const LoginForm = ({ onFinish, validateField, rules }) => (
  <Form onFinish={onFinish} layout="vertical">
    <FormInput name="email" label="Email" rules={[{ validator: (_, value) => validateField(rules.email, value) }]} />
    <FormInput name="password" label="Пароль" type="password" rules={[{ validator: (_, value) => validateField(rules.password, value) }]} />
    <Form.Item>
      <Button type="dashed" htmlType="submit" className="submitButton">
        Войти
      </Button>
    </Form.Item>
  </Form>
);

