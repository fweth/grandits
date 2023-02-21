import { useEffect, useRef } from "react";
import io from "../utils/intersectionObserver.client";
const sizes = [60, 120, 240, 360, 720, 840, 1260, 1680];
export default function Image({ className = "", data, width, height }) {
  const imgRef = useRef();
  useEffect(function () {
    const img = imgRef.current;
    io.observe(img);
    return function(){
      io.unobserve(img);
    }
  }, []);
  const url = (sz) =>
    data.file.url.replace(
      "media.graphassets.com",
      `media.graphassets.com/resize=fit:max,width:${sz}`
    );
  const jsx = (
    <img
      className={className.length ? `${className} loading` : "loading"}
      src={url(50)}
      srcSet={sizes.map((sz) => `${url(sz)} ${sz}w`).join(",")}
      sizes="50px"
      alt={data.alt}
      width={width || data.file.width}
      height={height || data.file.height}
      loading="lazy"
      onLoad={function(e){
        e.target.classList.add("loaded")
      }}
      ref={imgRef}
    />
  );
  return width && height ? (
    <div
      className="wrapper"
      style={{ paddingBottom: `${(100 * height) / width}%` }}
    >
      {jsx}
    </div>
  ) : (
    jsx
  );
}
