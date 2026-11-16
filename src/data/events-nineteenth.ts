import type { HistoricalEvent } from "@/data/types";

export const nineteenthEvents: HistoricalEvent[] = [
  {
    id: "waitangi",
    title: "Signing of the Treaty of Waitangi",
    prompt:
      "Agents of a distant empire and many indigenous chiefs signed a treaty beside a bay. It was read in English and in the Māori language. The signing place is still a national memorial.",
    locationLabel: "Treaty House, Waitangi, New Zealand",
    lat: -35.2658,
    lon: 174.0816,
    year: 1840,
    era: "AD",
    explanation:
      "On 6 February 1840, the Treaty of Waitangi was first signed at the Treaty House grounds in the Bay of Islands, between representatives of the British Crown and Māori chiefs. Further copies were signed elsewhere in the months that followed. This question is the 6 February signing at Waitangi.",
    precisionNote:
      "The pin marks the Treaty House grounds, where the first signing took place. It does not mark every later signing site around the country.",
    sources: [
      {
        title: "The Treaty in brief",
        url: "https://nzhistory.govt.nz/politics/treaty/the-treaty-in-brief",
        publisher: "New Zealand History, Ministry for Culture and Heritage",
      },
      {
        title: "Treaty of Waitangi",
        url: "https://www.britannica.com/event/Treaty-of-Waitangi",
        publisher: "Encyclopaedia Britannica",
      },
    ],
    hiddenTerms: ["Waitangi", "Zealand", "1840", "Hobson", "Busby", "Bay of Islands"],
  },
  {
    id: "seneca-falls",
    title: "Seneca Falls Convention",
    prompt:
      "A two-day meeting in a chapel adopted a declaration on women's rights, modeled on an older independence declaration. One organizer insisted that the text demand the vote.",
    locationLabel: "Wesleyan Chapel, Seneca Falls, New York",
    lat: 42.9137,
    lon: -76.7978,
    year: 1848,
    era: "AD",
    explanation:
      "On 19 and 20 July 1848, the Seneca Falls Convention met in the Wesleyan Chapel in Seneca Falls, New York. Elizabeth Cady Stanton and the other organizers presented the Declaration of Sentiments, including a demand for women's suffrage. The year scored is 1848.",
    precisionNote:
      "The chapel was later altered. The pin marks the chapel site preserved at Women's Rights National Historical Park, not a modern reconstruction detail.",
    sources: [
      {
        title: "Women's Rights National Historical Park",
        url: "https://www.nps.gov/wori/",
        publisher: "US National Park Service",
      },
      {
        title: "Seneca Falls Convention",
        url: "https://www.britannica.com/event/Seneca-Falls-Convention",
        publisher: "Encyclopaedia Britannica",
      },
    ],
    hiddenTerms: ["Seneca", "Stanton", "1848", "Sentiments", "Mott"],
  },
  {
    id: "puebla",
    title: "Battle of Puebla",
    prompt:
      "Defenders at two hilltop forts outside a city stopped a French army that had expected an easy campaign. The victory is still a national holiday, even though the same city later fell.",
    locationLabel: "Forts of Loreto and Guadalupe, Puebla, Mexico",
    lat: 19.05,
    lon: -98.2,
    year: 1862,
    era: "AD",
    explanation:
      "On 5 May 1862, Mexican forces under Ignacio Zaragoza defeated a French army at the forts of Loreto and Guadalupe, outside Puebla. The victory is celebrated as Cinco de Mayo. French forces took Puebla the following year; this question is the 1862 battle.",
    precisionNote:
      "The pin marks the mapped battle at the two hilltop forts, not the cathedral square in the center of Puebla, which is a short distance away.",
    sources: [
      {
        title: "Battle of Puebla",
        url: "https://www.britannica.com/event/Battle-of-Puebla",
        publisher: "Encyclopaedia Britannica",
      },
      {
        title: "Cinco de Mayo",
        url: "https://www.britannica.com/topic/Cinco-de-Mayo",
        publisher: "Encyclopaedia Britannica",
      },
    ],
    hiddenTerms: ["Puebla", "1862", "Loreto", "Guadalupe", "Zaragoza", "Mexico", "Cinco"],
  },
  {
    id: "golden-spike",
    title: "Golden spike at Promontory Summit",
    prompt:
      "Two railroad crews, building toward each other across a continent, met on a high desert summit and drove a ceremonial last spike.",
    locationLabel: "Promontory Summit, Utah, United States",
    lat: 41.61796,
    lon: -112.55163,
    year: 1869,
    era: "AD",
    explanation:
      "On 10 May 1869, the Central Pacific and Union Pacific railroads met at Promontory Summit, Utah, and a ceremonial golden spike was driven to mark the transcontinental line. The site is now Golden Spike National Historical Park.",
    precisionNote:
      "Promontory Point, on the Great Salt Lake, is a different place and the wrong pin. This coordinate is Promontory Summit, the meeting point preserved in the national historical park.",
    sources: [
      {
        title: "Golden Spike National Historical Park",
        url: "https://www.nps.gov/gosp/",
        publisher: "US National Park Service",
      },
      {
        title: "Transcontinental railroad",
        url: "https://www.britannica.com/topic/Transcontinental-Railroad",
        publisher: "Encyclopaedia Britannica",
      },
    ],
    hiddenTerms: ["Promontory", "Utah", "1869", "Stanford", "Pacific"],
  },
  {
    id: "charter-oath",
    title: "Promulgation of the Charter Oath",
    prompt:
      "A young emperor's new government published an oath in five articles, promising assemblies and a search for knowledge. It was proclaimed at the palace in the old capital, not in the port city that later became the seat of government.",
    locationLabel: "Kyoto Imperial Palace, Japan",
    lat: 35.02528,
    lon: 135.76222,
    year: 1868,
    era: "AD",
    explanation:
      "On 6 April 1868, the Charter Oath, five articles setting out the aims of the new Meiji government, was promulgated at the Kyoto Imperial Palace. The capital later moved to Tokyo. This question is the oath of 1868, not the later constitution.",
    precisionNote:
      "The palace grounds are large. The pin marks the Kyoto Imperial Palace, where the oath was promulgated, not a single room and not the later government quarter in Tokyo.",
    sources: [
      {
        title: "The Charter Oath",
        url: "https://www.ndl.go.jp/modern/e/cha1/description01.html",
        publisher: "National Diet Library of Japan",
      },
      {
        title: "Meiji Restoration",
        url: "https://www.britannica.com/event/Meiji-Restoration",
        publisher: "Encyclopaedia Britannica",
      },
    ],
    hiddenTerms: ["Meiji", "Kyoto", "Tokyo", "1868", "Charter Oath"],
  },
];
