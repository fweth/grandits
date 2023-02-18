import { redirect } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { request, gql } from "graphql-request";
import Image from "../../components/image";
import MixedContent from "../../components/mixedContent";

export async function loader({ params: { slug, index } }) {
  const query = gql`
    {
      artwork(where: { slug: "${slug}" }) {
        slides(first: 1, skip: ${index - 1}) {
          ... on MixedContent {
            __typename
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
          ... on Visual {
            __typename
            alt
            file {
              height
              mimeType
              url
              width
            }
          }
        }
      }
    }
  `;
  const slide = (await request(process.env.CONTENT_API, query)).artwork
    .slides[0];
  return { slide };
}

export default function Slide() {
  const { slide } = useLoaderData();
  switch (slide.__typename) {
    case "Visual":
      switch (slide.file.mimeType.split("/")[0]) {
        case "image":
          const ls = slide.file.width > slide.file.height;
          return (
            <main className="slide visual">
              <Image data={slide} width={ls ? 1120 : 716} height={896} />
            </main>
          );
        case "video":
          <main className="slide visual">
            return <video />;
          </main>;
      }
    case "MixedContent":
      return (
        <main className="slide blocks">
          <MixedContent data={slide.blocks} />
        </main>
      );
  }
}