import React from "react";
import { useStore } from "../../appStore/store";
import { Profile } from "../../components/Profile/profile";
import { Auth } from "../../components/Auth/authTab";

function ProfilePage() {
  const { isAuthenticated } = useStore();

  if (!isAuthenticated) {
    return <Auth />;
  }

  return <Profile />;
}

export default ProfilePage;
