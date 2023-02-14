import { Link, useLoaderData } from "@remix-run/react";
import { request, gql } from "graphql-request";
import Image from "../../components/image";
import styles from "../../styles/artworks.css";

export async function loader() {
  const query = gql`
    query {
      pages(first: 1) {
        artworksMeta {
          description
          title
        }
        artworksContent {
          caption
          image {
            url
          }
          portrait
          slug
        }
      }
    }
  `;
  return (await request(process.env.CONTENT_API, query)).pages[0];
}

export const meta = ({ data }) => data.artworksMeta;

export const links = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
];

export default function Artworks() {
  const { artworksContent: data } = useLoaderData();
  return (
    <main className="artworks">
      {data.map((aw) => (
        <Link
          className={aw.portrait ? "portrait" : "landscape"}
          to={`${aw.slug}/1`}
          key={aw.slug}
        >
          <figure>
            <Image
              baseUrl={aw.image.url}
              alt={aw.image.alt}
              width={aw.portrait ? 540 : 970}
              height={aw.portrait ? 675 : 776}
            />
            <figcaption>{aw.caption}</figcaption>
          </figure>
        </Link>
      ))}
    </main>
  );
}
