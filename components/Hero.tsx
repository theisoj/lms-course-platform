export default function Hero() {
  return (
    <div className="h-[30vh] sm:h-[35vh] w-full my-12">

      <div className="container mx-auto px-4 h-full flex flex-col justify-center">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-6xl font-bold mb-4 text-white">
            Laajenna osaamistasi kursseillamme
          </h1>
          <p className="text-base lg:text-xl text-muted-foreground">
            Tutustu oppimisen maailmaan asiantuntevasti laadituilla
            kursseillamme. Opi alan ammattilaisilta ja vie taitosi seuraavaan
            taso.
          </p>
        </div>
      </div>
    </div>
  )
}
