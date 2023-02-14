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
export const meta = {
  name: 'meta',
  title: 'Meta',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'string',
    },
  ],
}
