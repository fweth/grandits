import { useLoaderData } from "@remix-run/react";
import { request, gql } from "graphql-request";
import styles from "../../styles/artworks.css";

export const links = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
];

export const meta = ({ data: { page } }) => page.meta;

export async function loader() {
  const query = gql`
    {
      page(where: { slug: "about" }) {
        meta {
          description
          title
        }
        conntent {
          blocks
        }
        content {
          blocks {
            ... on TextBlock {
              __typename
              id
              richtext {
                html
              }
            }
            ... on VisualBlock {
              __typename
              columns {
                alt
                file {
                  url
                }
                id
              }
              id
            }
          }
        }
      }
    }
  `;
  return request(process.env.CONTENT_API, query);
}

export default function Artworks() {
  const { page } = useLoaderData();
  console.log(page)
  return (
    <main className="artworks">
      {/* <MixedContent data={page.MixedContent}/> */}
    </main>
  );
}
