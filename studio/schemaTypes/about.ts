import { defineField, defineType } from "sanity";

export const about = defineType({
  name: "about",
  title: "About Page",
  type: "document",
  __experimental_actions: ["update", "publish"],
  fields: [
    defineField({
      name: "bioText",
      title: "Bio Text",
      description: "Il testo descrittivo che appare al centro della pagina",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "images",
      title: "Immagini (max 9)",
      description: "Carica fino a 9 immagini. Verranno disposte automaticamente nella pagina.",
      type: "array",
      validation: (Rule) => Rule.max(9),
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "image",
              title: "Immagine",
              type: "image",
              options: { hotspot: true },
            }),
            defineField({
              name: "alt",
              title: "Descrizione (alt text)",
              type: "string",
            }),
          ],
          preview: {
            select: { title: "alt", media: "image" },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "About Page" };
    },
  },
});
