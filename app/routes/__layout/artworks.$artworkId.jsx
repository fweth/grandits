import { Link, useParams } from "@remix-run/react";

export default function ArtoworkId() {
  const { artworkId } = useParams();
  return (
    <>
      <h1>Wecome to {artworkId}</h1>
      <p>Go to the <Link to="1">Slides</Link>...</p>
    </>
  );
}
