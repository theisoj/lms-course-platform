import { sanityFetch } from "../live";
import { defineQuery } from "groq";

export async function getCourses() {
  const getCoursesQuery = defineQuery(`*[_type == "course"] {
    ...,
    "slug": slug.current,
    "category": category->{...},
    "instructors": instructors[]->{...}
  }`);

  const courses = await sanityFetch({ query: getCoursesQuery });
  return courses.data;
}
