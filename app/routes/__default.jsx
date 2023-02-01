import { Outlet } from "@remix-run/react";

export default function Default() {
  return <>
  <header>Hello, I'm header</header>
  <Outlet/>
  <footer>Hello, I'm footer</footer>
  </>
}