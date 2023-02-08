import { Link, useParams } from "@remix-run/react";

export default function Slide() {
  const { slideId } = useParams();
  const next = <Link to={`../${+slideId + 1}`} path="relative">next</Link>;
  const prev = <Link to={`../${+slideId + 1}`} path="relative">previous</Link>;
  const back = <Link to=".." path="relative">back</Link>;
  return (
    <>
      <h1>The current slide is {slideId}.</h1>
      <p>
        Go to the {next} or {prev} slide.
      </p>
      <p>
        Go {back} to the artwork.
      </p>
    </>
  );
}
