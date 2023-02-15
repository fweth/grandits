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

export async function loader({ params: { index } }) {
  const query = gql`
    query {
      artwork(where: { slug: "adilette-carinthia-ry-hypo" }) {
        image {
          alt
        }
        meta {
          description
          title
        }
        slides {
          __typename
        }
      }
    }
  `;
  const { artwork } = await request(process.env.CONTENT_API, query);
  const i = parseInt(index);
  const n = artwork.slides.length;
  if (i < 1 || i > n) {
    redirect("/404");
  }
  return { artwork, i, n };
}

export function ErrorBoundary({ error }) {
  console.error(error);
  return (
    <p>
      Sorry, something went wrong!
    </p>
  );
}

export default function Slides() {
  const { artwork, i, n } = useLoaderData();
  return (
    <>
      <Outlet />
      <div className="caption">{artwork.image.alt}</div>
      <nav className="slideNav">
        {i > 1 && (
          <Link className="prev" to={`../${i - 1}`} relative="path">
            <svg>
              <use href="/icons.svg#leftArrow" />
            </svg>
          </Link>
        )}
        <div className="indicator">{`${i}/${n}`}</div>
        {i < n && (
          <Link className="next" to={`../${i + 1}`} relative="path">
            <svg>
              <use href="/icons.svg#rightArrow" />
            </svg>
          </Link>
        )}
      </nav>
      <Link className="close" to="/artworks">
        <svg>
          <use href="/icons.svg#close" />
        </svg>
      </Link>
    </>
  );
}
