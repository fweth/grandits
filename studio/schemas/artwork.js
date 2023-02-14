import {image, meta} from './utils'

export default {
  name: 'artwork',
  title: 'Artwork',
  type: 'document',
  fields: [
    meta,
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'meta.title'
      }
    },
    image(),
    {
      name: 'caption',
      title: 'Caption',
      type: 'text',
    },
    {
      name: 'double',
      title: 'Double',
      type: 'boolean',
      initialValue: false
    },
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
      media: 'image'
    }
  }
}
