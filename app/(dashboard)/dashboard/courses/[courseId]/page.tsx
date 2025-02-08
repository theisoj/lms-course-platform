import getCourseById from "@/sanity/lib/courses/getCourseById"
import { redirect } from "next/navigation"

interface CoursePageProps {
  params: Promise<{
    courseId: string
  }>
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
