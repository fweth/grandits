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

export const meta = ({ data: { page } }) => page.meta;

export async function loader() {
  const query = gql`
    query {
      page(where: { slug: "artworks" }) {
        meta {
          description
          title
        }
        collection {
          image {
            alt
            file {
              url
            }
          }
          singleCol
          slug
        }
      }
    }
  `;
  return request(process.env.CONTENT_API, query);
}

export default function Artworks() {
  console.log(page)
  return (
    <main className="artworks">
      {page.collection.map((aw) => (
        <Link
          className={aw.singleCol ? "portrait" : "landscape"}
          to={`${aw.slug}/1`}
          key={aw.slug}
        >
          <figure>
            <Image
              data={aw.image}
              width={aw.singleCol ? 540 : 970}
              height={aw.singleCol ? 675 : 776}
            />
            <figcaption>{aw.image.alt}</figcaption>
          </figure>
        </Link>
      ))}
    </main>
  );
}
