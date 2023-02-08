import {image} from './utils'

const Row = {
  name: 'row',
  title: 'Row',
  type: 'array',
  of: [image],
}

const Column = {
  name: 'column',
  title: 'Column',
  type: 'array',
  of: [Row],
}

export default {
  name: 'artwork',
  title: 'Artwork',
  type: 'document',
  fields: [
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
    },
    image(),
    {
      name: 'slides',
      title: 'Slides',
      type: 'array',
      of: [
        image(),
        {
          name: 'video',
          title: 'Video',
          type: 'file',
        },
        {
          name: 'info',
          title: 'Info',
          type: 'object',
          fields: [
            {
              name: 'richtext',
              title: 'Richtext',
              type: 'array',
              of: [
                {
                  type: 'block',
                },
                {
                  name: 'row',
                  title: 'Row',
                  type: 'object',
                  fields: [
                    {
                      name: 'columns',
                      title: 'Columns',
                      type: 'array',
                      of: [image({caption: true})],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'slug.current',
      media: 'image',
    },
    // prepare: (slug) => {
    //   title: slug.current
    // },
  },
}
