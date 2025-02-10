"use client"

import { CheckCircle, Loader2, XCircle } from "lucide-react"
import { Button } from "./ui/button"
import { useState, useEffect, useTransition } from "react"
import { useRouter } from "next/navigation"
import { completeLessonAction } from "@/app/actions/completeLessonAction"
import { uncompleteLessonAction } from "@/app/actions/uncompleteLessonAction"
import { getLessonCompletionStatusAction } from "@/app/actions/getLessonCompletionStatusAction"
import { cn } from "@/lib/utils"

interface LessonCompleteButtonProps {
  lessonId: string
  clerkId: string
}

export function LessonCompleteButton({
  lessonId,
  clerkId,
}: LessonCompleteButtonProps) {
  const [isPending, setIsPending] = useState(false)
  const [isCompleted, setIsCompleted] = useState<boolean | null>(null)
  const [isPendingTransition, startTransition] = useTransition()
  const router = useRouter()

  useEffect(() => {
    startTransition(async () => {
      try {
        const status = await getLessonCompletionStatusAction(lessonId, clerkId)
        setIsCompleted(status)
      } catch (error) {
        console.error("Error checking lesson completion status:", error)
        setIsCompleted(false)
      }
    })
  }, [lessonId, clerkId])

  const handleToggle = async () => {
    try {
      setIsPending(true)
      if (isCompleted) {
        await uncompleteLessonAction(lessonId, clerkId)
      } else {
        await completeLessonAction(lessonId, clerkId)
      }

      startTransition(async () => {
        const newStatus = await getLessonCompletionStatusAction(
          lessonId,
          clerkId
        )
        setIsCompleted(newStatus)
      })

      router.refresh()
    } catch (error) {
      console.error("Error toggling lesson completion:", error)
    } finally {
      setIsPending(false)
    }
  }

  const isLoading = isCompleted === null || isPendingTransition

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 sm:my-4 sm:mx-16 rounded-none sm:rounded-xl bg-background/80 backdrop-blur-sm border z-50">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex-1 w-full text-center sm:text-start">
          <p className="text-sm font-medium">
            {isCompleted
              ? "Oppitunti suoritettu!"
              : "Oletko valmis suorittamaan tämän oppitunnin?"}
          </p>
          <p className="text-sm text-muted-foreground">
            {isCompleted
              ? "Voit merkitä sen keskeneräiseksi, jos haluat tarkastella sitä uudelleen."
              : "Merkitse se valmiiksi, kun olet valmis."}
          </p>
        </div>
        <Button
          onClick={handleToggle}
          disabled={isPending || isLoading}
          size="lg"
          variant="default"
          className={cn(
            "min-w-full sm:min-w-[200px] transition-all duration-200 ease-in-out sm:transition-none",
            isCompleted
              ? "bg-red-600 hover:bg-red-700 text-white"
              : "bg-green-600 hover:bg-green-700 text-white"
          )}
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Päivitetään...
            </>
          ) : isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              {isCompleted ? "Keskeytetään..." : "Valmistetaan..."}
            </>
          ) : isCompleted ? (
            <>
              <XCircle className="h-4 w-4" />
              Merkitse keskeneräiseksi
            </>
          ) : (
            <>
              <CheckCircle className="h-4 w-4" />
              Valmis
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
