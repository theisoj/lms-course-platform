import Image from "next/image";
import { defineField, defineType } from "sanity";

export const enrollmentType = defineType({
  name: "enrollment",
  title: "Ilmoittautuminen",
  type: "document",
  fields: [
    defineField({
      name: "student",
      title: "Opiskelija",
      type: "reference",
      to: [{ type: "student" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "course",
      title: "Kurssi",
      type: "reference",
      to: [{ type: "course" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "amount",
      title: "Summa",
      type: "number",
      validation: (rule) => rule.required().min(0),
      description: "Kurssin ilmoittautumismaksu sentteinä",
    }),
    defineField({
      name: "paymentId",
      title: "Maksutunnus",
      type: "string",
      validation: (rule) => rule.required(),
      description: "Stripe-maksu-/kassasession tunnus",
    }),
    defineField({
      name: "enrolledAt",
      title: "Ilmoittautumispäivämäärä",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      courseTitle: "course.title",
      studentFirstName: "student.firstName",
      studentLastName: "student.lastName",
      studentImage: "student.imageUrl",
    },
    prepare({ courseTitle, studentFirstName, studentLastName, studentImage }) {
      return {
        title: `${studentFirstName} ${studentLastName}`,
        subtitle: courseTitle,
        media: (
          <Image
            src={studentImage}
            alt={`${studentFirstName} ${studentLastName}`}
            width={100}
            height={100}
          />
        ),
      };
    },
  },
});