import { Link, NavLink, Outlet, useLocation } from "@remix-run/react";
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
      <nav className={active ? "active" : undefined} aria-expanded={active}>
        <NavLink to="/artworks">Artworks</NavLink>
        <NavLink to="/about">About</NavLink>
        <a href="https://martin-grandits.myshopify.com/collections/shopping">Shop</a>
        <NavLink to="/contact">Contact</NavLink>
      </nav>
      <button
        className={`show-nav${active ? " active" : ""}`}
        aria-label="Toggle menu"
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

export function ErrorBoundary({ error }) {
  console.error(error);
  return (
    <main className="blocks">
      <h3>Sorry, something went wrong!</h3>
      <p>
        Go back to <Link to="/artworks">Home...</Link>
      </p>
    </main>
  );
}

export default function Layout() {
  const { pathname } = useLocation();
  return (
    <>
      <Header />
      <Outlet />
      {pathname !== "/contact" && (
        <button
          className="icon-nav bl"
          aria-label="Scroll to top"
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
      )}
    </>
  );
}
