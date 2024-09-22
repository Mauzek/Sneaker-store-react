import React, { useState } from "react";
import styles from "./auth.module.css";
import { Button, Form, message } from "antd";
import { TextField } from "@mui/material";
import { useStore } from "../../appStore/store";
import {
  userAuthorization,
  userRegistration,
  checkEmailExists,
} from "../../api/api-utils";

export const Auth = () => {
  const { setUserData, setIsAuthenticated } = useStore();
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = async (values) => {
    const action = isLogin ? handleLogin : handleRegister;
    await action(values);
  };

  const handleLogin = async (values) => {
    const { email, password } = values;
    try {
      const response = await userAuthorization(email, password);
      if (response && response.length > 0) {
        const data = response[0];
        setIsAuthenticated(true);
        setUserData(data);
        message.success("Вход успешен!");
      } else {
        throw new Error("Неверный email или пароль!");
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const handleRegister = async (values) => {
    try {
      const emailExists = await checkEmailExists(values.email);
      if (emailExists) {
        throw new Error("Email уже зарегистрирован!");
      }

      const response = await userRegistration(values);
      if (response && response.success) {
        const data = response.data;
        setIsAuthenticated(true);
        setUserData(data);
        message.success("Регистрация прошла успешно!");
      } else {
        throw new Error("Ошибка регистрации!");
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const rules = {
    email: [
      { required: true, message: "Пожалуйста введите email!" },
      { type: "email", message: "Неверный формат email!" },
      { max: 50, message: "Email не должен превышать 50 символов!" },
      {
        pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: "Неверный формат email!",
      },
    ],
    textField: [
      { required: true, message: "Это поле обязательно!" },
      { max: 50, message: "Не более 50 символов!" },
      { pattern: /^[a-zA-Zа-яА-ЯёЁ0-9\s]+$/, message: "Только буквы и цифры!" },
    ],
    phone: [
      { required: true, message: "Пожалуйста введите телефон!" },
      { max: 15, message: "Телефон не должен превышать 15 символов!" },
      { pattern: /^[0-9]+$/, message: "Только цифры!" },
    ],
    password: [
      { required: true, message: "Пожалуйста введите пароль!" },
      { min: 6, message: "Пароль должен содержать минимум 6 символов!" },
      {
        pattern: /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+$/,
        message: "Неверный формат пароля!",
      },
    ],
  };

  const validateField = (ruleList, value) => {
    for (let rule of ruleList) {
      if (rule.required && !value) {
        return Promise.reject(new Error(rule.message));
      }
      if (rule.type === "email" && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
        return Promise.reject(new Error(rule.message));
      }
      if (rule.max && value.length > rule.max) {
        return Promise.reject(new Error(rule.message));
      }
      if (rule.pattern && !rule.pattern.test(value)) {
        return Promise.reject(new Error(rule.message));
      }
    }
    return Promise.resolve();
  };

  return (
    <div className={styles.profilePage}>
      <h2>{isLogin ? "Вход" : "Регистрация"}</h2>
      <Form
        onFinish={handleSubmit}
        layout="vertical"
        initialValues={{
          email: "",
          password: "",
          confirmPassword: "",
          firstName: "",
          lastName: "",
          addressStreet: "",
          addressCity: "",
          phone: "",
        }}
      >
        {!isLogin && (
          <div className={styles.formColumns}>
            {[
              { name: "firstName", label: "Имя" },
              { name: "addressStreet", label: "Адрес" },
              { name: "lastName", label: "Фамилия" },
              { name: "addressCity", label: "Город" },
              { name: "phone", label: "Телефон", rules: rules.phone }
            ].map(({ name, label, rules: fieldRules = rules.textField }) => (
              <Form.Item key={name} name={name} rules={[{ validator: (_, value) => validateField(fieldRules, value) }]}>
                <TextField fullWidth variant="outlined" label={label} color="error" />
              </Form.Item>
            ))}
          </div>
        )}
        <Form.Item name="email" rules={[{ validator: (_, value) => validateField(rules.email, value) }]}>
          <TextField fullWidth variant="outlined" label="Email" color="error" />
        </Form.Item>
        <Form.Item name="password" rules={[{ validator: (_, value) => validateField(rules.password, value) }]}>
          <TextField fullWidth variant="outlined" type="password" label="Пароль" color="error" />
        </Form.Item>
        {!isLogin && (
          <Form.Item
            name="confirmPassword"
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
          >
            <TextField fullWidth variant="outlined" type="password" label="Повторите пароль" color="error" />
          </Form.Item>
        )}
        <Form.Item>
          <Button type="none" htmlType="submit" className={styles.submitButton}>
            {isLogin ? "Войти" : "Зарегистрироваться"}
          </Button>
        </Form.Item>
      </Form>
      <p>
        {isLogin ? "Ещё нет аккаунта?" : "Уже зарегистрированы?"}
        <Button type="link" onClick={toggleForm} className={styles.toggleButton}>
          {isLogin ? "Зарегистрироваться" : "Войти"}
        </Button>
      </p>
    </div>
  );
};
