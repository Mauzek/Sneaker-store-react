import React from "react";
import { Form, Button } from "antd";
import {FormInput} from "./FormInput";

export const RegisterForm = ({ onFinish, validateField, rules }) => (
  <Form onFinish={onFinish} layout="vertical">
    <div className="formColumns">
      <div className="formColumn">
        <FormInput name="firstName" label="Имя" rules={[{ validator: (_, value) => validateField(rules.textField, value) }]} />
        <FormInput name="addressStreet" label="Адрес" rules={[{ validator: (_, value) => validateField(rules.textField, value) }]} />
      </div>
      <div className="formColumn">
        <FormInput name="lastName" label="Фамилия" rules={[{ validator: (_, value) => validateField(rules.textField, value) }]} />
        <FormInput name="addressCity" label="Город" rules={[{ validator: (_, value) => validateField(rules.textField, value) }]} />
      </div>
      <div className="formColumn">
        <FormInput name="phone" label="Телефон" rules={[{ validator: (_, value) => validateField(rules.phone, value) }]} />
      </div>
    </div>
    <FormInput name="email" label="Email" rules={[{ validator: (_, value) => validateField(rules.email, value) }]} />
    <FormInput name="password" label="Пароль" type="password" rules={[{ validator: (_, value) => validateField(rules.password, value) }]} />
    <FormInput
      name="confirmPassword"
      label="Повторите пароль"
      type="password"
      rules={[
        { required: true, message: "Пожалуйста подтвердите пароль!" },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value || getFieldValue("password") === value) {
              return Promise.resolve();
            }
            return Promise.reject(new Error("Пароли должны совпадать!"));
          },
        }),
      ]}
    />
    <Form.Item>
      <Button type="dashed" htmlType="submit" className="submitButton">
        Зарегистрироваться
      </Button>
    </Form.Item>
  </Form>
);

