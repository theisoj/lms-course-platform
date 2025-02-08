import { StructureBuilder } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure = (S: StructureBuilder) =>
  S.list()
    .title("Admin-hallintapaneeli")
    .items([
      // Kurssisisältö
      S.listItem()
        .title("Kurssisisältö")
        .child(
          S.documentTypeList("course")
            .title("Kurssit")
            .child((courseId) =>
              S.list()
                .title("Kurssin asetukset")
                .items([
                  // Vaihtoehto kurssin sisällön muokkaamiseen
                  S.listItem()
                    .title("Muokkaa kurssin sisältöä")
                    .child(
                      S.document().schemaType("course").documentId(courseId)
                    ),
                  // Vaihtoehto kurssin ilmoittautuneiden opiskelijoiden katsomiseen
                  S.listItem()
                    .title("Katso opiskelijat")
                    .child(
                      S.documentList()
                        .title("Kurssin ilmoittautumiset")
                        .filter(
                          '_type == "enrollment" && course._ref == $courseId'
                        )
                        .params({ courseId })
                    ),
                ])
            )
        ),

      S.divider(),

      // Käyttäjät
      S.listItem()
        .title("Käyttäjien hallinta")
        .child(
          S.list()
            .title("Valitse käyttäjätyyppi")
            .items([
              // Opettajat ja asetukset
              S.listItem()
                .title("Opettajat")
                .schemaType("instructor")
                .child(
                  S.documentTypeList("instructor")
                    .title("Opettajat")
                    .child((instructorId) =>
                      S.list()
                        .title("Opettajan asetukset")
                        .items([
                          // Vaihtoehto opettajan tietojen muokkaamiseen
                          S.listItem()
                            .title("Muokkaa opettajan tietoja")
                            .child(
                              S.document()
                                .schemaType("instructor")
                                .documentId(instructorId)
                            ),
                          // Vaihtoehto katsella opettajan kursseja
                          S.listItem()
                            .title("Katso kurssit")
                            .child(
                              S.documentList()
                                .title("Opettajan kurssit")
                                .filter(
                                  '_type == "course" && instructor._ref == $instructorId'
                                )
                                .params({ instructorId })
                            ),
                        ])
                    )
                ),
              // Opiskelijat ja asetukset
              S.listItem()
                .title("Opiskelijat")
                .schemaType("student")
                .child(
                  S.documentTypeList("student")
                    .title("Opiskelijat")
                    .child((studentId) =>
                      S.list()
                        .title("Opiskelijan asetukset")
                        .items([
                          // Vaihtoehto opiskelijan tietojen muokkaamiseen
                          S.listItem()
                            .title("Muokkaa opiskelijan tietoja")
                            .child(
                              S.document()
                                .schemaType("student")
                                .documentId(studentId)
                            ),
                          // Vaihtoehto katsella opiskelijan ilmoittautumisia
                          S.listItem()
                            .title("Katso ilmoittautumiset")
                            .child(
                              S.documentList()
                                .title("Opiskelijan ilmoittautumiset")
                                .filter(
                                  '_type == "enrollment" && student._ref == $studentId'
                                )
                                .params({ studentId })
                            ),
                          // Vaihtoehto katsella opiskelijan suorittamia oppitunteja
                          S.listItem()
                            .title("Katso suoritettuja oppitunteja")
                            .child(
                              S.documentList()
                                .title("Suoritettuja oppitunteja")
                                .schemaType("lessonCompletion")
                                .filter(
                                  '_type == "lessonCompletion" && student._ref == $studentId'
                                )
                                .params({ studentId })
                                .defaultOrdering([
                                  { field: "completedAt", direction: "desc" },
                                ])
                            ),
                        ])
                    )
                ),
            ])
        ),

      S.divider(),

      // Järjestelmän hallinta
      S.listItem()
        .title("Järjestelmän hallinta")
        .child(
          S.list()
            .title("Järjestelmän hallinta")
            .items([S.documentTypeListItem("category").title("Kategoriat")])
        ),
    ]);