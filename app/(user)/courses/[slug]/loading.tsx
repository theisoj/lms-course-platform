import { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  const title = "Ladataan..."

  return {
    title,
    icons: { icon: "https://images.jesunmaailma.fi/uploads/icons/JM_kurssit_icon_color.png", apple: "https://images.jesunmaailma.fi/uploads/icons/JM_kurssit_icon_color.png" }
  }
}

function Loading() {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
    </div>
  );
}

export default Loading;
