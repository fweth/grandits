import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { request, gql } from "graphql-request";
import Image from "../../components/image";
import styles from "../../styles/artworks.css";

export const links = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
];

export const meta = ({ data: { page } }) => page?.meta;

export async function loader() {
  const query = gql`
    {
      collection(where: { slug: "artworks" }) {
        meta {
          description
          title
        }
        thumbnails(first: 100) {
          artwork {
            image {
              caption
              file {
                url
              }
            }
            slug
          }
          doubleCol
        }
      }
    }
  `;
  return json(await request(process.env.CONTENT_API, query));
}

export function ErrorBoundary({ error }) {
  console.error(error);
  return <p>Sorry, we couldn't load the artworks!</p>;
}

export default function Artworks() {
  const { collection } = useLoaderData();
  return (
    <main>
      {collection.thumbnails
        .filter((tn) => tn.artwork)
        .map((tn) => (
          <Link
            className={tn.doubleCol ? "double" : "single"}
            aria-label="View artwork"
            to={`${tn.artwork.slug}/1`}
            key={tn.artwork.slug}
          >
            <figure>
              <Image
                data={tn.artwork.image}
                width={tn.doubleCol ? 970 : 540}
                height={tn.doubleCol ? 776 : 675}
              />
              <figcaption>{tn.artwork.image.caption}</figcaption>
            </figure>
          </Link>
        ))}
    </main>
  );
}
