import React from "react";
import { Avatar, Menu } from "@mantine/core";

const ProfileMenu = ({ user, logout }) => {
  return (
    <Menu>
      <Menu.Target>
        <Avatar src={user?.picture} alt="user image" radius={"xl"} />
      </Menu.Target>
      <Menu.Dropdown>
<<<<<<< HEAD
        <Menu.Item onClick={console.log("Favorite")}>Favourites</Menu.Item>
        <Menu.Item>test</Menu.Item>
        <Menu.Item>test</Menu.Item>
        <Menu.Item>test</Menu.Item>
        <Menu.Item>test</Menu.Item>
        <Menu.Item>test</Menu.Item>
=======
        <Menu.Item>Favourites</Menu.Item>
>>>>>>> 1e45fb9b9b7844029fdf8bae690cf4c9dc1ac7ae
      </Menu.Dropdown>
    </Menu>
  );
};

export default ProfileMenu;
