import React from "react";
import { List, Icon, Menu } from "semantic-ui-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { logoutUser } from "../../utils/authUser";

function SideMenu({
  user: { unreadNotification, email, unreadMessage, username },
}) {
  const router = useRouter();

  const isActive = (route) => router.pathname === route;

  return (
    <>
      <Menu secondary vertical>
        <Link href="/">
          <a>
            <Menu.Item header active={isActive("/")} color={"black"}>
              <Icon name="home" size="large" color={isActive("/") && "teal"} />
              Home
            </Menu.Item>
          </a>
        </Link>
        <br />
        <Link href="/messages">
          <a>
            <Menu.Item header active={isActive("/messages")} color={"black"}>
              <Icon
                name={unreadMessage ? "hand point right" : "mail outline"}
                size="large"
                color={
                  (isActive("/messages") && "teal") ||
                  (unreadMessage && "orange")
                }
              />
              Messages
            </Menu.Item>
          </a>
        </Link>
        <br />
        <Link href="/notifications">
          <a>
            <Menu.Item
              header
              active={isActive("/notifications")}
              color={"black"}
            >
              <Icon
                name={unreadNotification ? "hand point right" : "bell outline"}
                size="large"
                color={
                  (isActive("/notifications") && "teal") ||
                  (unreadNotification && "orange")
                }
              />
              Notifications
            </Menu.Item>
          </a>
        </Link>
        <br />
        <Link href={`/${username}`}>
          <a>
            <Menu.Item
              header
              active={isActive(`/${router.query.username === username}`)}
              color={"black"}
            >
              <Icon
                name="user"
                size="large"
                color={router.query.username === username && "teal"}
              />
              Account
            </Menu.Item>
          </a>
        </Link>
        <br />
        <Link href="/">
          <Menu.Item header onClick={() => logoutUser(email)}>
            <Icon name="log out" size="large" />
            Logout
          </Menu.Item>
        </Link>
        <br />
      </Menu>
    </>
  );
}

export default SideMenu;
