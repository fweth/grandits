import { Link, NavLink, Outlet } from "@remix-run/react";
import { useState } from "react";

import styles from "../styles/layout.css";

export const links = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
];

function Header() {
  const [active, setActive] = useState(false);
  return (
    <header
      onClick={function () {
        setActive(false);
      }}
    >
      <Link to="/artworks">
        <img className="logo" src="/logo.svg" />
      </Link>
      <nav className={active ? "active" : undefined}>
        <NavLink to="/artworks">
          Artworks
        </NavLink>
        <NavLink to="/about/en">
          About
        </NavLink>
        <NavLink to="/shop">
          Shop
        </NavLink>
        <NavLink to="/contact">
          Contact
        </NavLink>
      </nav>
      <button
        className={`show-nav${active ? " active" : ""}`}
        onClick={function (e) {
          e.stopPropagation();
          setActive(!active);
        }}
      >
        <div className="t" />
        <div className="c" />
        <div className="b" />
      </button>
    </header>
  );
}

export default function Layout() {
  return (
    <>
      <Header />
      <button
        className="icon-nav bl"
        onClick={function () {
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
        }}
      >
        &uarr;
      </button>
      <Outlet />
      <footer />
    </>
  );
}
