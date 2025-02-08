import { defineField, defineType } from "sanity";

export const instructorType = defineType({
  name: "instructor",
  title: "Ohjaaja",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nimi",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "bio",
      title: "Esittely",
      type: "text",
    }),
    defineField({
      name: "photo",
      title: "Kuva",
      type: "image",
    }),
  ],
});
