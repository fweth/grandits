import { json } from "@remix-run/node";
import { Link, useLoaderData, useOutletContext } from "@remix-run/react";
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
                  caption
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
            caption
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
  return json({ slide: data.artwork.slides[0] });
}

export default function Slide() {
  const { slide } = useLoaderData();
  const {next} = useOutletContext();
  switch (slide.__typename) {
    case "Visual":
      switch (slide.file.mimeType.split("/")[0]) {
        case "image":
          const ls = slide.file.width > slide.file.height;
          return (
            <Link className="visual" to={next} relative="path">
              <Image data={slide} />
            </Link>
          );
        case "video":
          return (
            <Link className="visual" to={next} relative="path">
              <video src={slide.file.url} controls playsInline />
            </Link>
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
