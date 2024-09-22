import React from "react";
import Styles from "./preloader.module.css";
import { Flex, Spin } from "antd";

export const Preloader = () => {
  return (
    <div className={Styles["preloader__container"]}>
      <Flex align="center">
        <Spin size="lage" tip="Loading" fullscreen="true" />
      </Flex>
    </div>
  );
};
