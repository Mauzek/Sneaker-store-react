import React from "react";
import { Header } from "../Header/header";
import { Outlet } from "react-router-dom";
import { Footer } from "../Footer/footer";

export const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
