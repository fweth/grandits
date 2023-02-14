export default function Image({ baseUrl, alt, width, height }) {
  return (
    <img
      src={baseUrl.replace(
        "media.graphassets.com",
        `media.graphassets.com/resize=fit:crop,width:${width},height:${height}`
      )}
      alt={alt}
      width={width}
      height={height}
    />
  );
}
