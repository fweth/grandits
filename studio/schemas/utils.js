export function image({alt = true, caption = false} = {}) {
  return {
    name: 'image',
    title: 'Image',
    type: 'image',
    fields: [
      alt
        ? [
            {
              name: 'alt',
              title: 'Alt',
              type: 'string',
            },
          ]
        : [],
      caption
        ? [
            {
              name: 'caption',
              title: 'Caption',
              type: 'string',
            },
          ]
        : [],
    ].flat(),
  }
}
