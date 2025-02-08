import { defineField, defineType } from "sanity";

export const categoryType = defineType({
  name: "category",
  title: "Kategoria",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nimi",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Osoitepolku",
      type: "slug",
      options: {
        source: "name",
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
      name: "icon",
      title: "Ikoni",
      type: "string",
      description: "Ikonin tunniste (esim. käytettäväksi ikonikirjastojen kanssa)",
    }),
    defineField({
      name: "color",
      title: "Väri",
      type: "string",
      description: "Kategorian värikoodi (esim. #FF0000)",
    }),
  ],
});
