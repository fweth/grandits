import {defineField, defineType} from 'sanity'

const imageAlt = defineField({
  name: 'imageAlt',
  title: 'Image',
  type: 'image',
  fields: [
    {
      type: 'text',
      name: 'alt',
      title: 'Alternative text',
    },
  ],
})

export default defineType({
  name: 'artwork',
  title: 'Artwork',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
    }),
    imageAlt,
    defineField({
      name: 'slides',
      title: 'Slides',
      type: 'object',
      fields: [
        defineField({
          name: 'images',
          title: 'Images',
          type: 'array',
          of: [imageAlt],
        }),
        defineField({
          name: 'about',
          title: 'About',
          type: 'array',
          of: [
            {
              type: 'block',
            },
            imageAlt,
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
  },
})
