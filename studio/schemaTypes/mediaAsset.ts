import { defineField, defineType } from "sanity";

export const mediaAsset = defineType({
  name: "mediaAsset",
  title: "Media Asset",
  type: "object",
  fields: [
    defineField({
      name: "mediaType",
      title: "Tipo di media",
      type: "string",
      options: {
        list: [
          { title: "Immagine", value: "image" },
          { title: "GIF animata", value: "gif" },
          { title: "Video", value: "video" },
        ],
        layout: "radio",
      },
      initialValue: "image",
    }),
    defineField({
      name: "image",
      title: "Immagine / GIF",
      type: "image",
      options: { hotspot: true },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      hidden: ({ parent }: any) => parent?.mediaType === "video",
    }),
    defineField({
      name: "video",
      title: "Video",
      type: "file",
      options: { accept: "video/*" },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      hidden: ({ parent }: any) => parent?.mediaType !== "video",
    }),
    defineField({
      name: "title",
      title: "Titolo",
      type: "string",
    }),
    defineField({
      name: "medium",
      title: "Medium / Tecnica",
      type: "string",
    }),
    defineField({
      name: "alt",
      title: "Alt text",
      type: "string",
    }),
  ],
  preview: {
    select: {
      title: "title",
      mediaType: "mediaType",
      image: "image",
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    prepare({ title, mediaType, image }: any) {
      const typeLabel =
        mediaType === "gif" ? "GIF" : mediaType === "video" ? "Video" : "Img";
      return {
        title: title || `[${typeLabel}]`,
        media: image,
      };
    },
  },
});
