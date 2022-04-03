import React from "react";
import { Menu, Container, Icon } from "semantic-ui-react";
import { useRouter } from "next/router";
import Link from "next/link";

function Navbar() {
  const router = useRouter();

  const isActive = (route) => router.pathname === route;

  return (
    <Menu fluid borderless>
      <Container text>
        <Link href="/login">
          <a>
            <Menu.Item header active={isActive("/login")} color={"black"}>
              <Icon size="large" name="sign in" />
              Login
            </Menu.Item>
          </a>
        </Link>

        <Link href="/signup">
          <a>
            <Menu.Item header active={isActive("/signup")} color={"black"}>
              <Icon size="large" name="signup" />
              Signup
            </Menu.Item>
          </a>
        </Link>
      </Container>
    </Menu>
  );
}

export default Navbar;
