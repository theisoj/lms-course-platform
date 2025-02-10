import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs/server"
import { getLessonById } from "@/sanity/lib/lessons/getLessonById"
import { PortableText } from "@portabletext/react"
import { LoomEmbed } from "@/components/LoomEmbed"
import { VideoPlayer } from "@/components/VideoPlayer"
import { LessonCompleteButton } from "@/components/LessonCompleteButton"
import { Metadata } from "next"
import getCourseById from "@/sanity/lib/courses/getCourseById"

interface LessonPageProps {
  params: Promise<{
    courseId: string
    lessonId: string
  }>
}

export const generateMetadata = async ({
  params,
}: LessonPageProps): Promise<Metadata> => {
  // Haetaan kurssitiedot courseId:n perusteella
  const { courseId, lessonId } = await params
  const course = await getCourseById(courseId)
  const lesson = await getLessonById(lessonId)

  // Jos kurssia ei löydy, ohjataan takaisin dashboardiin
  if (!course) return redirect(`/dashboard/courses/${courseId}`)

  // Haetaan oppitunti ensimmäisestä moduulista ja kurssista
  const title = `${lesson?.title} - ${course.title}` // Otsikko päivitetään oppitunnin mukaan
  const description = `Liity kurssille ${lesson?.title} nyt!` // Kuvaukseen lisätään oppitunnin nimi

  // URL ja Open Graph -kuva
  const url = `https://kurssit.jesunmaailma.fi/courses/${course.slug}`
  const image = `https://kurssit.jesunmaailma.fi/api/og-image?course=${encodeURIComponent(lesson?.title!)}&instructors=${encodeURIComponent(
    course.instructors?.map((i) => i.name).join(", ")!
  )}`

  // Metadata palautetaan
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
          alt: `${course.title} - ${course?.instructors?.length! > 0 ? course.instructors?.map((i) => i.name).join(", ") : course.instructors?.[0]?.name}`,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  }
}

export default async function LessonPage({ params }: LessonPageProps) {
  const user = await currentUser()
  const { courseId, lessonId } = await params

  const lesson = await getLessonById(lessonId)

  if (!lesson) {
    return redirect(`/dashboard/courses/${courseId}`)
  }

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto pt-12 pb-20 px-4">
          <h1 className="text-2xl font-bold mb-4">{lesson.title}</h1>

          {lesson.description && (
            <p className="text-muted-foreground mb-8">{lesson.description}</p>
          )}

          <div className="space-y-8">
            {/* Video Section */}
            {lesson.videoUrl && <VideoPlayer url={lesson.videoUrl} />}

            {/* Loom Embed Video if loomUrl is provided */}
            {lesson.loomUrl && <LoomEmbed shareUrl={lesson.loomUrl} />}

            {/* Lesson Content */}
            {lesson.content && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Muistiinpanot</h2>
                <div className="prose prose-blue dark:prose-invert max-w-none">
                  <PortableText value={lesson.content} />
                </div>
              </div>
            )}

            <div className="flex justify-end">
              <LessonCompleteButton lessonId={lesson._id} clerkId={user!.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
