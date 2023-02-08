import { Link } from "@remix-run/react";

export default function Artworks() {
  return (
    <>
      <h1>Here come the artworks...</h1>
      <p>
        <Link to="foo">Foo</Link>,<Link to="bar">Bar</Link>,
        <Link to="baz">Baz</Link>
      </p>
    </>
  );
}
