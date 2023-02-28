import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { request, gql } from "graphql-request";
import MixedContent from "../../../components/mixedContent";

export const meta = ({ data: { page } }) => page?.meta;

export async function loader({ params: { slug } }) {
  const query = gql`
    {
      page(where: { slug: "${slug}" }) {
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

export default function Slug() {
  const { page } = useLoaderData();
  return (
    <main className="blocks about">
      <MixedContent data={page.content} />
    </main>
  );
}
