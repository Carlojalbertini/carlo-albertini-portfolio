import { defineField, defineType } from "sanity";

export const homepage = defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  __experimental_actions: ["update", "publish"],
  fields: [
    defineField({
      name: "skull1",
      title: "Teschio 1 (riga 1)",
      description: "Immagine del teschio nella prima riga — tra 'Omnis' e 'Ars'",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "skull2",
      title: "Teschio 2 (riga 2)",
      description: "Immagine del teschio nella seconda riga — tra 'Ad' e 'Mortem'",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "skull3",
      title: "Teschio 3 (riga 3)",
      description: "Immagine del teschio nella terza riga — prima di 'Pertinet'",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "line1Left",
      title: "Riga 1 — parola sinistra",
      description: "Default: Omnis",
      type: "string",
    }),
    defineField({
      name: "line1Right",
      title: "Riga 1 — parola destra",
      description: "Default: Ars",
      type: "string",
    }),
    defineField({
      name: "line2Left",
      title: "Riga 2 — parola sinistra",
      description: "Default: Ad",
      type: "string",
    }),
    defineField({
      name: "line2Right",
      title: "Riga 2 — parola destra",
      description: "Default: Mortem",
      type: "string",
    }),
    defineField({
      name: "line3Text",
      title: "Riga 3 — parola",
      description: "Default: Pertinet",
      type: "string",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Homepage" };
    },
  },
});
