import { NavLink, Outlet, useLoaderData } from "@remix-run/react";
import styles from "../../styles/about.css"

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
    <Outlet/>
    <nav className="about">
      <NavLink to={`../about/${lang}`}>About</NavLink>
      <NavLink to={`../cv/${lang}`}>CV</NavLink>
      <NavLink to={`../press/${lang}`}>Press</NavLink>
      <div className="lang">
        <NavLink to="../en" relative="path">EN</NavLink>
        <NavLink to="../de" relative="path">DE</NavLink>
      </div>
    </nav>
    </>
  );
}
