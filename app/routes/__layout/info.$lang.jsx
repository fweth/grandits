import { NavLink, useLoaderData } from "@remix-run/react";
import { useEffect, useRef } from "react";
import { request, gql } from "graphql-request";
import MixedContent from "../../components/mixedContent";
import styles from "../../styles/about.css";

const Nav = ({ articles, navRef }) => (
  <nav className="about" ref={navRef}>
    {articles.map(({ title }) => (
      <a href="#" data-id={title} key={title}>
        {title}
      </a>
    ))}
    <div className="lang">
      <NavLink to="../en" relative="path" prefetch="intent">
        EN
      </NavLink>
      <NavLink to="../de" relative="path" prefetch="intent">
        DE
      </NavLink>
    </div>
  </nav>
);

export const links = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
];

export const meta = ({ data: { about } }) => about?.meta;

export async function loader({ params: { lang } }) {
  const query = gql`
    {
      about(where: { slug: "about" }) {
        meta {
          title
          description
        }
        articles {
          ... on MixedContent {
            alt
            blocks {
              __typename
              ... on TextBlock {
                id
                richtext {
                  html
                }
              }
              ... on VisualBlock {
                id
                columns {
                  alt
                  file {
                    url
                    width
                    height
                  }
                }
              }
            }
          }
        }
      }
    }
  `;
  return { ...(await request(process.env.CONTENT_API, query)), lang };
}

export function ErrorBoundary({ error }) {
  console.error(error);
  return <p>Sorry, something went wrong!</p>;
}

export default function Info() {
  const navRef = useRef();
  const mainRef = useRef();
  let {
    about: { articles: artclData },
    lang: compareLang,
  } = useLoaderData();
  artclData = artclData.filter(function (article) {
    const [title, lang] = article.alt.split(".");
    if (lang && lang !== compareLang) {
      return false;
    }
    article.title = title;
    return true;
  });
  const n = artclData.length;
  useEffect(function () {
    const artcls = mainRef.current.querySelectorAll("article");
    const hrefs = navRef.current.querySelectorAll("a[data-id]");
    for(let i = 0; i < n; i++) {
      hrefs[i].onclick=function(e){
        e.preventDefault();
        console.log('scroll to', artcls[i])
        artcls[i].scrollIntoView({behavior: "smooth", block: "center"})
      }
    }
    // let active = null;
    function handler() {
      let [min, minArg] = [Infinity, null];
      for (let el of artcls) {
        const bcr = el.getBoundingClientRect();
        const diff = Math.abs(2 * bcr.y + bcr.height - window.innerHeight);
        if(diff < min) {
          min = diff;
          minArg = el.dataset.id
        }
      }
      console.log(minArg)
      for(let el of hrefs) {
        if(el.dataset.id === minArg) {
          el.classList.add("active")
        } else {
          el.classList.remove("active")
        }
        // active = minArg
      }
    }
    (window.onscroll=window.onresize=handler)();
    return function () {
      for(let i = 0; i < n; i++) {
        hrefs[i].onclick=null;
      }
      window.onscroll=window.onresize=null;
    };
  }, []);
  return (
    <>
      <Nav articles={artclData} navRef={navRef} />
      <main className="blocks about" ref={mainRef}>
        {artclData.map((article) => (
          <article
            className="blocks"
            data-id={article.title}
            key={article.title}
          >
            <MixedContent data={article.blocks} />
          </article>
        ))}
      </main>
    </>
  );
}
