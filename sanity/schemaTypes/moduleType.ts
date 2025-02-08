import { defineField, defineType } from "sanity";

export const moduleType = defineType({
  name: "module",
  title: "Moduuli",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Moduulin Otsikko",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "lessons",
      title: "Oppitunnit",
      type: "array",
      of: [{ type: "reference", to: { type: "lesson" } }],
    }),
  ],
});