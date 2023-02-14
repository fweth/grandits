import { NavLink, Outlet } from "@remix-run/react";

import styles from "../styles/layout.css";

export const links = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
];

export default function Layout() {
  return (
    <>
      <header>
        <img className="logo" src="/logo.svg" />
        <nav>
          <NavLink to="/artworks">Artworks</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/shop">Shop</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>
      </header>
      <Outlet />
      <footer>Hello, I'm footer</footer>
    </>
  );
}
