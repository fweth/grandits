import { json, redirect } from "@remix-run/node";
import { NavLink, Outlet, useLoaderData } from "@remix-run/react";
import { request, gql } from "graphql-request";
import styles from "../../styles/about.css";

function capitalize(str) {
  if (str.length > 2) {
    return str[0].toUpperCase() + str.slice(1);
  }
  return str.toUpperCase();
}

export const links = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
];

export const shouldRevalidate = () => true;

export async function loader({ params: { slug, lang } }) {
  const query = gql`
    {
      page(where: { slug: "${slug}" }) {
        contentDE {
          __typename
        }
      }
      pages {
        slug
      }
    }
  `;
  const { page, pages } = await request(process.env.CONTENT_API, query);
  if (!lang && page.contentDE.length > 0) {
    return redirect(`/${slug}/en`);
  }
  return json({ lang, pages });
}

export default function About() {
  const { lang, pages } = useLoaderData();
  console.log(lang);
  return (
    <>
      <Outlet />
      <nav className="about">
        {pages
          .filter((page) => !["contact", "impressum"].includes(page.slug))
          .map((page) => (
            <NavLink to={`../${page.slug}`} key={page.slug}>
              {capitalize(page.slug)}
            </NavLink>
          ))}
        {lang && (
          <div className="lang">
            <NavLink to="../en" relative="path">
              EN
            </NavLink>
            <NavLink to="../de" relative="path">
              DE
            </NavLink>
          </div>
        )}
      </nav>
    </>
  );
}
