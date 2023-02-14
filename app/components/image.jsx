export default function Image({ data, width, height }) {
  return (
    <img
      src={
        width && height
          ? data.file.url.replace(
              "media.graphassets.com",
              `media.graphassets.com/resize=fit:crop,width:${width},height:${height}`
            )
          : width
          ? data.file.url.replace(
              "media.graphassets.com",
              `media.graphassets.com/resize=width:${width}`
            )
          : height
          ? data.file.url.replace(
              "media.graphassets.com",
              `media.graphassets.com/resize=height:${height}`
            )
          : data.file.url
      }
      alt={data.alt}
      {...(width && { width })}
      {...(height && { height })}
    />
  );
}
