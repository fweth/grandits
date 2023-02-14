import { redirect } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { request, gql } from "graphql-request";
import Image from "../components/image";
import styles from "../styles/artworkSlide.css";

export async function loader({ params: {slug, index}}) {
  const query = gql`
    query {
      artwork(where: { slug: "${slug}" }) {
        slides(first: 1, skip: ${index - 1}) {
          ... on SlideMixed {
            id
            blocks {
              ... on BlockMixed {
                id
                columns {
                  alt
                  description
                  id
                  image {
                    url
                  }
                }
              }
              ... on BlockText {
                id
              }
            }
          }
          ... on SlideVisual {
            id
            file {
              url
            }
            alt
          }
        }
      }
    }
  `;
  const slide = (await request(process.env.CONTENT_API, query))?.artwork?.slides?.[0];
  if(!slide){
    return redirect("/404")
  }
  console.log('foobar', slide)
  return null;
}

// export const meta = ({ data }) => data.artworksMeta;

// export const links = () => [
//   {
//     rel: "stylesheet",
//     href: styles,
//   },
// ];

export default function Artworks() {
  return <h1>This is the artwork</h1>;
}
