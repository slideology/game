import type { HistoricalEvent } from "@/data/types";

export const revolutionEvents: HistoricalEvent[] = [
  {
    id: "bastille",
    title: "Storming of the Bastille",
    prompt:
      "A crowd stormed a royal fortress used as a prison and seized its gunpowder. The date became a national holiday in that country.",
    locationLabel: "Site of the Bastille, now the Place de la Bastille, Paris",
    lat: 48.85306,
    lon: 2.36917,
    year: 1789,
    era: "AD",
    explanation:
      "On 14 July 1789, a crowd in Paris stormed the Bastille, a royal fortress used as a prison, and took the gunpowder stored there. The fortress was demolished soon afterward. The date is still the French national holiday.",
    precisionNote:
      "The fortress is gone. The pin marks its footprint, now the Place de la Bastille, not a surviving tower.",
    sources: [
      {
        title: "Storming of the Bastille",
        url: "https://www.britannica.com/event/storming-of-the-Bastille",
        publisher: "Encyclopaedia Britannica",
      },
      {
        title: "The Storming of the Bastille",
        url: "https://www.worldhistory.org/Storming_of_the_Bastille/",
        publisher: "World History Encyclopedia",
      },
    ],
    hiddenTerms: ["Bastille", "Paris", "1789", "France"],
  },
  {
    id: "waterloo",
    title: "Battle of Waterloo",
    prompt:
      "A French emperor's return from exile ended on a ridge where an allied army and a Prussian force defeated him. A huge earthen lion was later raised on that battlefield.",
    locationLabel: "Lion's Mound on the Waterloo battlefield, Belgium",
    lat: 50.67833,
    lon: 4.40472,
    year: 1815,
    era: "AD",
    explanation:
      "On 18 June 1815, Napoleon was defeated south of Brussels by the allied army under the Duke of Wellington and the Prussian army under Blücher. In the 1820s a great conical mound, topped by a lion, was built on the allied ridge.",
    precisionNote:
      "The mound was built after the battle, and the earth was scraped from the field, so the ground is not the 1815 surface. The pin marks the Lion's Mound on that ridge, the monument that now stands for the battlefield.",
    sources: [
      {
        title: "Battle of Waterloo",
        url: "https://www.britannica.com/event/Battle-of-Waterloo",
        publisher: "Encyclopaedia Britannica",
      },
      {
        title: "Battle of Waterloo",
        url: "https://www.nam.ac.uk/explore/battle-waterloo",
        publisher: "National Army Museum",
      },
    ],
    hiddenTerms: ["Waterloo", "Napoleon", "Wellington", "Blucher", "Blücher", "1815", "Brussels", "Belgium"],
  },
  {
    id: "rosetta-stone",
    title: "Discovery of the Rosetta Stone",
    prompt:
      "Soldiers repairing a fort in a river delta found a broken stone carved with the same decree in three scripts. One script was Greek, and it became the key to reading the ancient writing beside it.",
    locationLabel: "Fort Julien, near Rashid (Rosetta), Egypt",
    lat: 31.43972,
    lon: 30.38944,
    year: 1799,
    era: "AD",
    explanation:
      "In July 1799, French soldiers rebuilding Fort Julien, near Rashid in the Nile Delta, found the stone now called the Rosetta Stone. The decree is carved in hieroglyphs, Demotic, and Greek. The stone itself is now in the British Museum; this question asks where it was found.",
    precisionNote:
      "The pin marks Fort Julien, the findspot, not the British Museum gallery where the stone is displayed today.",
    sources: [
      {
        title: "The Rosetta Stone",
        url: "https://www.britishmuseum.org/collection/object/Y_EA24",
        publisher: "British Museum",
      },
      {
        title: "Rosetta Stone",
        url: "https://www.britannica.com/topic/Rosetta-Stone",
        publisher: "Encyclopaedia Britannica",
      },
    ],
    hiddenTerms: ["Rosetta", "Rashid", "Julien", "1799", "Egypt", "Nile", "British Museum"],
  },
  {
    id: "haiti-independence",
    title: "Haitian Declaration of Independence",
    prompt:
      "In a Caribbean port, a revolutionary leader proclaimed a new state, ending slavery and French colonial rule there. The proclamation followed more than a decade of revolt.",
    locationLabel: "Gonaïves, Haiti",
    lat: 19.44556,
    lon: -72.68833,
    year: 1804,
    era: "AD",
    explanation:
      "On 1 January 1804, Jean-Jacques Dessalines proclaimed the independence of Haiti at Gonaïves. The colony of Saint-Domingue had been in revolution since 1791. The 1804 proclamation, not the start of the revolt, is the event scored here.",
    precisionNote:
      "An exact podium from that day is not what this coordinate is. The pin marks the city of Gonaïves, the port where independence was proclaimed.",
    sources: [
      {
        title: "Haiti",
        url: "https://www.britannica.com/place/Haiti",
        publisher: "Encyclopaedia Britannica",
      },
      {
        title: "Haitian Revolution",
        url: "https://www.worldhistory.org/Haitian_Revolution/",
        publisher: "World History Encyclopedia",
      },
    ],
    hiddenTerms: ["Haiti", "Gonaives", "Gonaïves", "Dessalines", "1804", "Saint-Domingue"],
  },
  {
    id: "tiananmen-proclamation",
    title: "Proclamation of the People's Republic of China",
    prompt:
      "A communist leader stood above a vast city square and proclaimed a people's republic from an old imperial gate. The day is still that state's national day.",
    locationLabel: "Tiananmen gate, Beijing",
    lat: 39.90733,
    lon: 116.39108,
    year: 1949,
    era: "AD",
    explanation:
      "On 1 October 1949, Mao Zedong proclaimed the People's Republic of China from the rostrum of the Tiananmen gate, at the north side of Tiananmen Square. The day is China's National Day. The gate, not the middle of the square, is the place he stood.",
    precisionNote:
      "The pin marks the Tiananmen gate itself. The square to its south is a separate, much larger space.",
    sources: [
      {
        title: "The Chinese Revolution of 1949",
        url: "https://history.state.gov/milestones/1945-1952/chinese-rev",
        publisher: "US Department of State, Office of the Historian",
      },
      {
        title: "China: establishment of the People's Republic",
        url: "https://www.britannica.com/place/China/Establishment-of-the-Peoples-Republic",
        publisher: "Encyclopaedia Britannica",
      },
    ],
    hiddenTerms: ["Tiananmen", "Beijing", "Mao", "China", "1949", "Forbidden"],
  },
];
