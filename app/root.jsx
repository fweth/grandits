import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import styles from "./styles/root.css";

export const headers = () => ({
  "Cache-Control": "max-age=300,public",
});

export const links = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
  {
    rel: "icon",
    type: "image/svg+xml",
    href: "/favicon.svg",
  },
];

export const meta = () => ({
  charset: "utf-8",
  title: "Martin Grandits",
  viewport: "width=device-width,initial-scale=1",
  generator: "Remix v1.13.0",
  "apple-mobile-web-app-capable": "yes",
});

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration
          getKey={(location) =>
            location.pathname === "/artworks" ? location.pathname : location.key
          }
        />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
