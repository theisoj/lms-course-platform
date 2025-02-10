import getCourseById from "@/sanity/lib/courses/getCourseById"
import { Metadata } from "next"
import { redirect } from "next/navigation"

interface CoursePageProps {
  params: Promise<{
    courseId: string
  }>
}

export const generateMetadata = async ({
  params,
}: CoursePageProps): Promise<Metadata> => {
  const { courseId } = await params

  const course = await getCourseById(courseId)

  if (!course) return redirect(`/dashboard/courses/${courseId}`)

  const title = `${course.title} - JM Kurssit`
  const description = `Liity kurssille ${course.title} nyt!`
  const url = `https://kurssit.jesunmaailma.fi/courses/${course.slug}`
  const image =
    course && course.instructors
      ? `https://kurssit.jesunmaailma.fi/api/og-image?course=${encodeURIComponent(course.title as string)}&instructors=${encodeURIComponent(
          course.instructors.map((i) => i.name).join(", ")
        )}`
      : "-"

  return {
    title,
    description,
    icons: {
      icon: "https://images.jesunmaailma.fi/uploads/icons/JM_kurssit_icon_color.png",
      apple:
        "https://images.jesunmaailma.fi/uploads/icons/JM_kurssit_icon_color.png",
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Kurssit",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt:
            course && course.instructors
              ? `${course.title} - ${course.instructors.map((i) => i.name).join(", ")}`
              : "-",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image!],
    },
  }
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { courseId } = await params
  const course = await getCourseById(courseId)

  if (!course) {
    return redirect("/")
  }

  // Redirect to the first lesson of the first module if available
  if (course.modules?.[0]?.lessons?.[0]?._id) {
    return redirect(
      `/dashboard/courses/${courseId}/lessons/${course.modules[0].lessons[0]._id}`
    )
  }

  return (
    <div className="h-full flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold">
          Tervetuloa kurssille {course.title}
        </h2>
        <p className="text-muted-foreground">
          Tällä kurssilla ei ole vielä sisältöä. Tarkista myöhemmin uudelleen.
        </p>
      </div>
    </div>
  )
}
