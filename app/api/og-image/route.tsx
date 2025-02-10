import { ImageResponse } from "@vercel/og"
import { NextRequest } from "next/server"

export const runtime = "edge" // Nopea Vercel Edge-runtime

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const course = searchParams.get("course") || "Kurssin nimi"
  const instructors = searchParams.get("instructors") || "Opettajat"

  return new ImageResponse(
    (
      <div className="flex flex-col w-[1200px] h-[630px] bg-[#1741ef] text-white justify-center items-center text-center p-[40px]">
        <div className="text-[70px]">📚 {course}</div>
        <div className="text-[40px] mt-[20px]">👨‍🏫 {instructors}</div>
        <div className="text-[30px] mt-[40px] opacity-80">
          Liity mukaan nyt!
        </div>
      </div>
    ),

    {
      width: 1200,
      height: 630,
      status: 200,
    }
  )
}
