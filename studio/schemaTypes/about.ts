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
      title: "Media (max 9 — immagini, GIF, video)",
      description: "Carica fino a 9 elementi: immagini statiche, GIF animate o video. Verranno disposti automaticamente nella pagina.",
      type: "array",
      validation: (Rule) => Rule.max(9),
      of: [{ type: "mediaAsset" }],
    }),
  ],
  preview: {
    prepare() {
      return { title: "About Page" };
    },
  },
});
