import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { request, gql } from "graphql-request";
import MixedContent from "../../../components/mixedContent";

export const meta = ({ data: { page } }) => page?.meta;

export async function loader({ params: { slug, lang } }) {
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

export default function SlugLang() {
  const { page } = useLoaderData();
  return (
    <main className="blocks about">
      <MixedContent data={page.content} />
    </main>
  );
}
