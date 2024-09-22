import React, { useState } from "react";
import { Avatar, Button, Input, Tabs, message } from "antd";
import { EditOutlined, SaveOutlined, LogoutOutlined } from "@ant-design/icons";
import styles from "./profile.module.css";
import { useStore } from "../../appStore/store";
import { editUserData } from "../../api/api-utils";

export const Profile = () => {
  const { userData, setIsAuthenticated, setUserData } = useStore();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("activeOrders");

  const handleEditProfile = () => {
    if (isEditing) {
      handleSaveProfile();
    } else {
      setIsEditing(true);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.clear();
    setUserData({});
    message.success("Вы успешно вышли из аккаунта!");
  };

  const handleSaveProfile = async () => {
    const success = await editUserData(userData);
    if (success) {
      setUserData(userData);
      message.success("Данные профиля успешно обновлены!");
    } else {
      message.error("Ошибка при обновлении данных профиля!");
    }
    setIsEditing(false);
  };

  const tabsItems = [
    {
      key: "activeOrders",
      label: "Активные заказы",
      children: (
        <div className={styles.tabContent}>
          <h3>Активные заказы</h3>
          <p>Здесь ты сможешь увидеть активные заказы.</p>
        </div>
      ),
    },
    {
      key: "purchaseHistory",
      label: "История заказов",
      children: (
        <div className={styles.tabContent}>
          <h3>История заказов</h3>
          <p>Здесь ты сможешь увидеть историю заказов.</p>
        </div>
      ),
    },
  ];

  return (
    <div className={styles.profilePage}>
      <div className={styles.profileContainer}>
        <div className={styles.profilePicture}>
          <Avatar size={150} src={userData.avatar} />
        </div>
        <div className={styles.profileDetails}>
          {isEditing ? (
            <>
              <Input
                type="text"
                name="firstName"
                value={userData.firstName}
                onChange={handleInputChange}
                className={styles.profileInput}
                placeholder="First Name"
              />
              <Input
                type="text"
                name="lastName"
                value={userData.lastName}
                onChange={handleInputChange}
                className={styles.profileInput}
                placeholder="Last Name"
              />
              <Input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                className={styles.profileInput}
                placeholder="Email"
              />
              <Input
                type="text"
                name="phone"
                value={userData.phone}
                onChange={handleInputChange}
                className={styles.profileInput}
                placeholder="Phone"
              />
              <Input
                type="text"
                name="addressStreet"
                value={userData.addressStreet}
                onChange={handleInputChange}
                className={styles.profileInput}
                placeholder="Address"
              />
              <Input
                type="text"
                name="addressCity"
                value={userData.addressCity}
                onChange={handleInputChange}
                className={styles.profileInput}
                placeholder="City"
              />
            </>
          ) : (
            <>
              <h2 className={styles.profileName}>{`${userData.firstName} ${userData.lastName}`}</h2>
              <p className={styles.profileEmail}>Email: {userData.email}</p>
              <p className={styles.profilePhone}>Phone: {userData.phone}</p>
              <p className={styles.profileAddress}>
                Address: {userData.addressStreet}, {userData.addressCity}
              </p>
            </>
          )}
        </div>
      </div>
      <div className={styles.profileActions}>
        <Button
          type="dashes"
          icon={isEditing ? <SaveOutlined /> : <EditOutlined />}
          onClick={handleEditProfile}
          className={`${isEditing ? styles.editButtonSave : styles.editButton}`}
        >
          {isEditing ? "Сохранить" : "Редактировать"}
        </Button>
        <Button
          type="danger"
          icon={<LogoutOutlined />}
          onClick={handleLogout}
          className={styles.logoutButton}
        >
          Выход
        </Button>
      </div>
      <Tabs activeKey={activeTab} onChange={handleTabChange} className={styles.tabs} items={tabsItems} />
    </div>
  );
};
