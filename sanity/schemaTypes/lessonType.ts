import { defineField, defineType } from "sanity";

export const lessonType = defineType({
  name: "lesson",
  title: "Oppitunti",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Otsikko",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Kuvaus",
      type: "text",
    }),
    defineField({
      name: "videoUrl",
      title: "Videon URL",
      type: "url",
      description: "URL videotoistimelle (esim. YouTube, Vimeo)",
    }),
    defineField({
      name: "loomUrl",
      title: "Loom-jako-URL",
      type: "url",
      description:
        "Täydellinen Loom-jako-URL (esim. https://www.loom.com/share/...)",
      validation: (rule) =>
        rule.custom((value) => {
          if (!value) return true; // Sallitaan tyhjä arvo
          try {
            const url = new URL(value);
            if (!url.hostname.endsWith("loom.com")) {
              return "URL:n on oltava loom.com-sivustolta";
            }
            if (!url.pathname.startsWith("/share/")) {
              return "Täytyy olla Loom-jako-URL";
            }
            const videoId = url.pathname.split("/share/")[1];
            if (!/^[a-f0-9-]{32,36}/.test(videoId)) {
              return "Virheellinen Loom-video-ID URL:ssa";
            }
            return true;
          } catch {
            return "Syötä kelvollinen URL";
          }
        }),
    }),
    defineField({
      name: "content",
      title: "Sisältö",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
});