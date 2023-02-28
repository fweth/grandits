import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { request, gql } from "graphql-request";
import MixedContent from "../../../components/mixedContent";

export const meta = ({ data: { page } }) => page?.meta;

export async function loader({ params: { slug, lang = "en" } }) {
  const query = gql`
    {
      page(where: { slug: "${slug}" }) {
        meta {
          description
          title
        }
        content: content${lang.toUpperCase()} {
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
  return json(...request(process.env.CONTENT_API, query));
}

export function ErrorBoundary({ error }) {
  console.error(error);
  return <p>Sorry, something went wrong!</p>;
}

export default function SlugLang() {
  const { page } = useLoaderData();
  return (
    <main className="blocks about">
      <MixedContent data={page.content} />
    </main>
  );
}