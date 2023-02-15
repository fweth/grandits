import { useLoaderData } from "@remix-run/react";
import { request, gql } from "graphql-request";
import MixedContent from "../../../components/mixedContent";

export const meta = ({ data: { page } }) => page?.meta;

export async function loader({params: {slug, lang}}) {
  const query = gql`
    query {
      page(where: { slug: "${slug}" }) {
        meta {
          description
          title
        }
        content: content${lang.toUpperCase()} {
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

export function ErrorBoundary({ error }) {
  console.error(error);
  return (
    <p>
      Sorry, something went wrong!
    </p>
  );
}

export default function SlugLang() {
  const { page } = useLoaderData();
  return (
    <main className="blocks">
      <MixedContent data={page.content.blocks}/>
    </main>
  );
}
