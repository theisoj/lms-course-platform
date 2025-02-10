import { urlFor } from "@/sanity/lib/image"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, BookOpen } from "lucide-react"
import EnrollButton from "@/components/EnrollButton"
import getCourseBySlug from "@/sanity/lib/courses/getCourseBySlug"
import { isEnrolledInCourse } from "@/sanity/lib/student/isEnrolledInCourse"
import { auth } from "@clerk/nextjs/server"
import { Metadata } from "next"
import { redirect } from "next/navigation"

interface CoursePageProps {
  params: Promise<{
    slug: string
  }>
}

type Props = {
  params: { slug: string } & CoursePageProps["params"]
}

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { slug } = await params

  const course = await getCourseBySlug(slug)

  if (!course) return redirect(`/dashboard/courses/${slug}`)

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
          url: image!,
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
  const { slug } = await params
  const course = await getCourseBySlug(slug)
  const { userId } = await auth()

  const isEnrolled =
    userId && course?._id ? await isEnrolledInCourse(userId, course._id) : false

  if (!course) {
    return (
      <div className="container mx-auto px-4 py-8 mt-16">
        <h1 className="text-4xl font-bold">Kurssia ei löytynyt</h1>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-screen w-full">
        {course.image && (
          <Image
            src={urlFor(course.image).url() || ""}
            alt={course.title || "Course Title"}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black to-black/60" />
        <div className="absolute inset-0 container mx-auto px-4 flex flex-col justify-end pb-12">
          <Link
            href="/"
            prefetch={false}
            className="text-white mb-8 flex items-center hover:text-primary transition-colors w-fit"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Takaisin kursseihin
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-white/10 text-white rounded-full text-sm font-medium backdrop-blur-sm">
                  {course.category?.name || "Luokittelematon"}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {course.title}
              </h1>
              <p className="text-lg text-white/90 max-w-2xl whitespace-pre-wrap">
                {course.description}
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 md:min-w-[300px] flex flex-col items-center md:items-start gap-4">
              {"price" in course && typeof course.price === "number" && (
                <div className="text-3xl font-bold text-white">
                  {course.price === 0
                    ? "Ilmainen"
                    : `${course.price.toLocaleString("fi", {
                        minimumFractionDigits: 2,
                      })} €`}
                </div>
              )}
              <EnrollButton courseId={course._id} isEnrolled={isEnrolled} />
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-lg p-6 mb-8 border border-border">
              <h2 className="text-2xl font-bold mb-4">Kurssin sisältö</h2>
              <div className="space-y-4">
                {course.modules === null && (
                  <h3 className="font-medium">Ei moduuleita.</h3>
                )}
                {course.modules &&
                  course.modules.map((module, index) => (
                    <div
                      key={module._id}
                      className="border border-border rounded-lg"
                    >
                      <div className="p-4 border-b border-border">
                        <h3 className="font-medium">
                          Moduuli {index + 1}: {module.title}
                        </h3>
                      </div>
                      <div className="divide-y divide-border">
                        {module.lessons === null ? (
                          <div className="p-4">
                            <h3 className="font-medium text-sm">
                              Ei oppitunteja.
                            </h3>
                          </div>
                        ) : (
                          module.lessons &&
                          module.lessons.map((lesson, lessonIndex) => (
                            <div
                              key={lesson._id}
                              className="p-4 hover:bg-muted/50 transition-colors"
                            >
                              <div className="flex items-center gap-4">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-medium">
                                  {lessonIndex + 1}
                                </div>
                                <div className="flex items-center gap-3 text-foreground">
                                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                                  <span className="font-medium">
                                    {lesson.title}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <div className="bg-card rounded-lg p-6 sticky top-4 border border-border">
              {course.instructors && (
                <h2 className="text-xl font-bold mb-4">
                  {course.instructors.length} opettaja
                  {course.instructors.length > 1 ? "a" : ""}
                </h2>
              )}
              {course.instructors &&
                course.instructors.map((instructor) => (
                  <div key={instructor._id}>
                    <div
                      className={`flex items-center gap-3 ${course.instructors && course.instructors.length > 1 ? "mb-4" : "mb-0"}`}
                    >
                      {instructor.photo && (
                        <div className="relative h-12 w-12">
                          <Image
                            src={urlFor(instructor.photo).url() || ""}
                            alt={instructor.name || "Course Instructor"}
                            fill
                            className="rounded-full object-cover"
                          />
                        </div>
                      )}
                      <div>
                        <div className="font-medium">{instructor.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {instructor.title}
                        </div>
                      </div>
                    </div>
                    {instructor.bio && (
                      <p className="text-muted-foreground">{instructor.bio}</p>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
