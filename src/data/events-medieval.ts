import type { HistoricalEvent } from "@/data/types";

export const medievalEvents: HistoricalEvent[] = [
  {
    id: "magna-carta",
    title: "Sealing of Magna Carta",
    prompt:
      "Rebellious barons forced a king to seal a charter of liberties in a riverside meadow. The charter limited arbitrary royal power. Later reissues exist; this question is the first sealing.",
    locationLabel: "Runnymede meadow, beside the Thames, England",
    lat: 51.44444,
    lon: -0.56528,
    year: 1215,
    era: "AD",
    explanation:
      "On 15 June 1215, King John sealed Magna Carta at Runnymede after his barons rebelled. The charter limited arbitrary royal acts and was reissued in later reigns. This question is the 1215 sealing, not the 1225 reissue.",
    precisionNote:
      "Runnymede is a meadow, not a desk. The pin marks the memorial meadow associated with the sealing. No survey peg from June 1215 survives to a tighter point.",
    sources: [
      {
        title: "Magna Carta",
        url: "https://www.parliament.uk/about/living-heritage/evolutionofparliament/originsofparliament/birthofparliament/overview/magnacarta/",
        publisher: "UK Parliament",
      },
      {
        title: "Magna Carta",
        url: "https://www.britannica.com/topic/Magna-Carta",
        publisher: "Encyclopaedia Britannica",
      },
    ],
    hiddenTerms: ["Magna", "Carta", "Runnymede", "John", "1215", "Windsor", "Thames"],
  },
  {
    id: "pompeii",
    title: "Burial of Pompeii",
    prompt:
      "A volcanic eruption buried a Roman town under ash and pumice, preserving streets and bodies. Mark the buried town, not the crater of the volcano.",
    locationLabel: "Archaeological site of Pompeii, Italy",
    lat: 40.75,
    lon: 14.48611,
    year: 79,
    era: "AD",
    explanation:
      "In AD 79, an eruption of Mount Vesuvius buried Pompeii. The year is secure from Roman writers and from the archaeology; the exact day, traditionally 24 August, is still debated. Herculaneum was buried in the same eruption. This pin is Pompeii.",
    precisionNote:
      "The town covers more than a single building. The pin marks the archaeological site of Pompeii, about 10 kilometers from the volcano's summit. It is not the crater.",
    sources: [
      {
        title: "Archaeological Areas of Pompei, Herculaneum and Torre Annunziata",
        url: "https://whc.unesco.org/en/list/829/",
        publisher: "UNESCO World Heritage Centre",
      },
      {
        title: "Pompeii",
        url: "https://www.britannica.com/place/Pompeii",
        publisher: "Encyclopaedia Britannica",
      },
    ],
    hiddenTerms: ["Pompeii", "Vesuvius", "Herculaneum", "79", "Naples"],
  },
  {
    id: "constantinople",
    title: "Fall of Constantinople",
    prompt:
      "After a siege of several weeks, an Ottoman army broke through the land walls of an old imperial capital. The last emperor of that city died in the assault.",
    locationLabel: "Land walls of Constantinople, near the final assault sector",
    lat: 41.03,
    lon: 28.935,
    year: 1453,
    era: "AD",
    explanation:
      "On 29 May 1453, the army of Mehmed II took Constantinople after a siege that had begun in early April. The decisive breach was on the Theodosian land walls. Constantine XI, the last Byzantine emperor, died in the fighting. The city is now Istanbul.",
    precisionNote:
      "The land walls run for kilometers, and the assault was a sector, not a doorway. The pin is the point associated with the 1453 fall on that land-wall sector, near the northern stretch of the walls. It is not Hagia Sophia and not the whole city.",
    sources: [
      {
        title: "Fall of Constantinople",
        url: "https://www.britannica.com/event/Fall-of-Constantinople-1453",
        publisher: "Encyclopaedia Britannica",
      },
      {
        title: "Fall of Constantinople",
        url: "https://www.worldhistory.org/article/1180/1453-the-fall-of-constantinople/",
        publisher: "World History Encyclopedia",
      },
    ],
    hiddenTerms: ["Constantinople", "Istanbul", "Byzantine", "Mehmed", "Mehmet", "1453", "Theodosian"],
  },
  {
    id: "hastings",
    title: "Battle of Hastings",
    prompt:
      "A duke who had crossed the sea defeated an English king who had just marched his army south. The victor later founded an abbey on the ridge where the battle was fought.",
    locationLabel: "Battle Abbey, on the traditional site of the Battle of Hastings",
    lat: 50.915,
    lon: 0.4858,
    year: 1066,
    era: "AD",
    explanation:
      "On 14 October 1066, William of Normandy defeated King Harold II on a ridge north of Hastings. Harold was killed in the battle. William later founded Battle Abbey on the field, with the high altar traditionally placed where Harold fell.",
    precisionNote:
      "The abbey marks the traditional battlefield, and the story that the high altar sits on Harold's death place is a medieval claim, not a modern trench survey. The pin is the abbey and battlefield site kept by English Heritage.",
    sources: [
      {
        title: "1066 Battle of Hastings, Abbey and Battlefield",
        url: "https://www.english-heritage.org.uk/visit/places/1066-battle-of-hastings-abbey-and-battlefield/",
        publisher: "English Heritage",
      },
      {
        title: "Battle of Hastings",
        url: "https://www.britannica.com/event/Battle-of-Hastings",
        publisher: "Encyclopaedia Britannica",
      },
    ],
    hiddenTerms: ["Hastings", "Harold", "Normandy", "1066", "Senlac", "William"],
  },
  {
    id: "nicaea",
    title: "First Council of Nicaea",
    prompt:
      "The first great council of Christian bishops met at an emperor's command in a city in Asia Minor. It rejected a priest's teaching about the nature of Christ and issued a creed.",
    locationLabel: "Ancient Nicaea, now İznik, Türkiye",
    lat: 40.429,
    lon: 29.7195,
    year: 325,
    era: "AD",
    explanation:
      "In 325, Constantine I summoned bishops to Nicaea, in Bithynia, for what became the first ecumenical council. The council condemned Arius's teaching and issued the creed associated with Nicaea. A later council in the same city, in 787, dealt with icons; this question is the council of 325.",
    precisionNote:
      "The council met in the imperial palace at Nicaea. That hall is not standing, so the pin marks the ancient city, modern İznik, rather than a surviving doorway.",
    sources: [
      {
        title: "Council of Nicaea",
        url: "https://www.britannica.com/event/First-Council-of-Nicaea-325",
        publisher: "Encyclopaedia Britannica",
      },
      {
        title: "First Council of Nicaea",
        url: "https://www.worldhistory.org/article/2020/the-council-of-nicaea/",
        publisher: "World History Encyclopedia",
      },
    ],
    hiddenTerms: ["Nicaea", "Nicene", "Iznik", "İznik", "Constantine", "325", "Arius"],
  },
];
