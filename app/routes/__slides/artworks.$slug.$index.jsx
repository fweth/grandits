import { useLoaderData } from "@remix-run/react";
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
                    height
                    url
                    width
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
  const data = await request(process.env.CONTENT_API, query);
  return { slide: data.artwork.slides[0] };
}

export default function Slide() {
  const { slide } = useLoaderData();
  switch (slide.__typename) {
    case "Visual":
      switch (slide.file.mimeType.split("/")[0]) {
        case "image":
          const ls = slide.file.width > slide.file.height;
          return (
            <main className="visual">
              <Image data={slide} />
            </main>
          );
        case "video":
          return (
            <main className="visual">
              <video src={slide.file.url} controls playsInline />
            </main>
          );
      }
    case "MixedContent":
      return (
        <main className="blocks">
          <MixedContent data={slide.blocks} />
        </main>
      );
  }
}
