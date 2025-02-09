import { defineField, defineType } from "sanity";

export const courseType = defineType({
  name: "course",
  title: "Kurssi",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Otsikko",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    {
      name: "price",
      title: "Hinta (EUR)",
      type: "number",
      description: "Hinta euroina",
      validation: (Rule) => Rule.min(0),
    },
    defineField({
      name: "slug",
      title: "Osoitepolku",
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
      name: "image",
      title: "Kurssikuva",
      type: "image",
    }),
    defineField({
      name: "category",
      title: "Kategoria",
      type: "reference",
      to: [{ type: "category" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "modules",
      title: "Moduulit",
      type: "array",
      of: [{ type: "reference", to: { type: "module" } }],
    }),
    defineField({
      name: "instructors",
      title: "Ohjaajat",
      type: "array",
      of: [{ type: "reference", to: { "type": "instructor" } }]
    }),
  ],
});
