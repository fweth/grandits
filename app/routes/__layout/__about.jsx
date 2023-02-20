import { NavLink, Outlet, useLoaderData } from "@remix-run/react";
import styles from "../../styles/about.css";

export const links = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
];

export const shouldRevalidate = () => true;

export function loader({ params: { lang } }) {
  return { lang };
}

export default function About() {
  const { lang } = useLoaderData();
  return (
    <>
      <Outlet />
      <nav className="about">
        <NavLink to={`../about/${lang}`} prefetch="intent">
          About
        </NavLink>
        <NavLink to={`../cv/${lang}`} prefetch="intent">
          CV
        </NavLink>
        <NavLink to={`../press/${lang}`} prefetch="intent">
          Press
        </NavLink>
        <div className="lang">
          <NavLink to="../en" relative="path" prefetch="intent">
            EN
          </NavLink>
          <NavLink to="../de" relative="path" prefetch="intent">
            DE
          </NavLink>
        </div>
      </nav>
    </>
  );
}
