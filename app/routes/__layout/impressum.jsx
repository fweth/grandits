import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { request, gql } from "graphql-request";
import MixedContent from "../../components/mixedContent";
import styles from "../../styles/about.css";

export const meta = ({ data: { page } }) => page?.meta;

export const links = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
];

export async function loader() {
  const query = gql`
    {
      page(where: { slug: "impressum" }) {
        meta {
          description
          title
        }
        content: contentEN {
          ... on TextBlock {
            __typename
            id
            richtext {
              html
            }
          }
          ... on VisualBlock {
            __typename
            captionAside
            columns {
              caption
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
  `;
  return json(await request(process.env.CONTENT_API, query));
}

export default function Impressum() {
  const { page } = useLoaderData();
  return (
    <main className="blocks about">
      <MixedContent data={page.content} />
    </main>
  );
}
