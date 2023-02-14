import Image from "./image";

export default function MixedContent({ data }) {
  return data.map(function (block) {
    switch (block.__typename) {
      case "TextBlock":
        return (
          <div
            className="text-block"
            dangerouslySetInnerHTML={{ __html: block.richtext.html }}
            key={block.id}
          />
        );
      case "VisualBlock":
        return (
          <div className="visual-block" key={block.id}>
            {block.columns.map((col) => (
              <figure key={col.id}>
                <Image data={col} height={300} />
                <figcaption>{col.alt}</figcaption>
              </figure>
            ))}
          </div>
        );
    }
  });
}
