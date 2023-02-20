import { redirect } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { request, gql } from "graphql-request";

import styles from "../styles/slides.css";

export const links = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
];

export const meta = ({ data: { artwork } }) => artwork?.meta;

export const shouldRevalidate = () => true;

export async function loader({ params: { slug, index } }) {
  const query = gql`
    {
      artwork(where: { slug: "${slug}" }) {
        image {
          alt
        }
        meta {
          description
          title
        }
        slides {
          __typename
          ... on Visual {
            alt
          }
          ... on MixedContent {
            alt
          }
        }
      }
    }
  `;
  const { artwork } = await request(process.env.CONTENT_API, query);
  const i = parseInt(index);
  const n = artwork.slides.length;
  if (i < 1 || i > n) {
    return redirect("/artworks");
  }
  return { artwork, i, n };
}

export function ErrorBoundary({ error }) {
  console.error(error);
  return <p>Sorry, something went wrong!</p>;
}

export default function Slides() {
  const { artwork, i, n } = useLoaderData();
  return (
    <>
      <Outlet />
      <div className="caption">
        {artwork.slides[i - 1]?.alt || artwork.image.alt}
      </div>
      <nav className="icon-nav bc">
        <Link
          className="prev"
          to={`../${((i + n - 2) % n) + 1}`}
          relative="path"
          prefetch="render"
        >
          &larr;
        </Link>
        <div className="indicator">{`${i}/${n}`}</div>
        <Link
          className="next"
          to={`../${(i % n) + 1}`}
          relative="path"
          prefetch="render"
        >
          &rarr;
        </Link>
      </nav>
      <Link
        className="icon-nav tr"
        to="/artworks"
        prefetch="intent"
      >
        <div className="t" />
        <div className="b" />
      </Link>
    </>
  );
}
