import { json } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { useEffect, useRef } from "react";
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
          caption
        }
        meta {
          description
          title
        }
        slides {
          __typename
          ... on Visual {
            caption
          }
          ... on MixedContent {
            caption
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
  return json({ artwork, i, n });
}

export default function Slides() {
  const nextRef = useRef();
  const prevRef = useRef();
  const closeRef = useRef();
  const { artwork, i, n } = useLoaderData();
  useEffect(function () {
    window.onkeydown = function (e) {
      switch (e.key) {
        case "ArrowLeft":
          prevRef.current.click();
          return;
        case "ArrowRight":
          nextRef.current.click();
          return;
        case "Escape":
          closeRef.current.click();
      }
    };
    return function () {
      window.onkeydown = null;
    };
  }, []);
  const prev = `../${((i + n - 2) % n) + 1}`;
  const next = `../${(i % n) + 1}`
  return (
    <>
      <Outlet context={{ next }} />
      <div className="caption">
        {artwork.slides[i - 1]?.caption || artwork.image.caption}
      </div>
      <div className="icon-nav bc">
        <Link
          className="prev"
          aria-label="Previous"
          to={prev}
          relative="path"
          ref={prevRef}
        >
          &larr;
        </Link>
        <div className="indicator">{`${i}/${n}`}</div>
        <Link
          className="next"
          aria-label="Next"
          to={next}
          relative="path"
          ref={nextRef}
        >
          &rarr;
        </Link>
      </div>
      <Link
        className="icon-nav tr"
        aria-label="Close"
        to="/artworks"
        ref={closeRef}
      >
        <div className="t" />
        <div className="b" />
      </Link>
    </>
  );
}
