export default function Image({ className, data, width, height }) {
  return (
    <img
      className={className}
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
      loading="lazy"
    />
  );
}
