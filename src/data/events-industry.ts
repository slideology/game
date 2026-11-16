import type { HistoricalEvent } from "@/data/types";

export const industryEvents: HistoricalEvent[] = [
  {
    id: "sutters-mill",
    title: "Gold discovery at Sutter's Mill",
    prompt:
      "A carpenter checking a sawmill race saw flakes of yellow metal in the water. The discovery set off a rush that transformed a distant territory.",
    locationLabel: "Sutter's Mill, Coloma, California",
    lat: 38.80347,
    lon: -120.89236,
    year: 1848,
    era: "AD",
    explanation:
      "On 24 January 1848, James Marshall found gold in the tailrace of a sawmill he was building for John Sutter at Coloma, on the American River. The find started the California Gold Rush. The mill site is preserved at Marshall Gold Discovery State Historic Park.",
    precisionNote:
      "The pin marks the mill site at Coloma. Sutter's Fort in Sacramento is a different place, about 60 kilometers away, and is not the discovery.",
    sources: [
      {
        title: "Marshall Gold Discovery State Historic Park",
        url: "https://www.parks.ca.gov/?page_id=484",
        publisher: "California State Parks",
      },
      {
        title: "California Gold Rush",
        url: "https://www.britannica.com/topic/California-Gold-Rush",
        publisher: "Encyclopaedia Britannica",
      },
    ],
    hiddenTerms: ["Sutter", "Marshall", "Coloma", "California", "1848", "gold"],
  },
  {
    id: "eiffel-tower",
    title: "Public opening of the Eiffel Tower",
    prompt:
      "An iron lattice tower built for a world's fair opened to the public as the fair began. Writers and artists had protested the plan before it went up.",
    locationLabel: "Eiffel Tower, Paris",
    lat: 48.85822,
    lon: 2.2945,
    year: 1889,
    era: "AD",
    explanation:
      "The Eiffel Tower was built for the 1889 Exposition Universelle and opened to the public on 31 March 1889. A group of writers and artists had published a protest against the project while it was still going up. The pin is the tower itself.",
    precisionNote:
      "The pin marks the tower. The fair occupied a much wider area of the Champ de Mars; the scored point is the monument, not the whole exhibition ground.",
    sources: [
      {
        title: "The Eiffel Tower's history",
        url: "https://www.toureiffel.paris/en/the-monument/history",
        publisher: "Société d'Exploitation de la Tour Eiffel",
      },
      {
        title: "Eiffel Tower",
        url: "https://www.britannica.com/topic/Eiffel-Tower-Paris-France",
        publisher: "Encyclopaedia Britannica",
      },
    ],
    hiddenTerms: ["Eiffel", "Paris", "1889", "France", "Champ de Mars"],
  },
  {
    id: "athens-1896",
    title: "Opening of the first modern Olympic Games",
    prompt:
      "An international committee revived a multi-sport festival. The first games of the modern series were held in a marble stadium in the country where the ancient festival had been held.",
    locationLabel: "Panathenaic Stadium, Athens",
    lat: 37.96833,
    lon: 23.74111,
    year: 1896,
    era: "AD",
    explanation:
      "The first Olympic Games of the modern era opened on 6 April 1896 in the marble Panathenaic Stadium in Athens. Pierre de Coubertin had led the revival. Ancient Olympia, in the Peloponnese, is a different site and the wrong pin for these games.",
    precisionNote:
      "The pin marks the Panathenaic Stadium in Athens, where the 1896 games were held. It is not ancient Olympia.",
    sources: [
      {
        title: "Athens 1896 Olympic Games",
        url: "https://www.britannica.com/event/Athens-1896-Olympic-Games",
        publisher: "Encyclopaedia Britannica",
      },
      {
        title: "Panathenaic Stadium",
        url: "https://www.panathenaicstadium.gr/en/home/",
        publisher: "Panathenaic Stadium",
      },
    ],
    hiddenTerms: ["Athens", "Olympia", "1896", "Greece", "Coubertin", "Panathenaic"],
  },
  {
    id: "wright-flyer",
    title: "First flights of the Wright Flyer",
    prompt:
      "Two brothers kept a powered, controllable heavier-than-air machine in the air for twelve seconds. They launched from level ground beside a dune and flew three more times that morning.",
    locationLabel: "Wright Brothers National Memorial, Kill Devil Hills, North Carolina",
    lat: 36.0143,
    lon: -75.6679,
    year: 1903,
    era: "AD",
    explanation:
      "On 17 December 1903, Orville and Wilbur Wright made the first controlled, powered, heavier-than-air flights, from the dunes at Kill Devil Hills, North Carolina. The first flight lasted 12 seconds. The nearest town, Kitty Hawk, is often named in headlines, but the flights left the ground a few kilometers south of that town.",
    precisionNote:
      "The pin marks the flight ground at the Wright Brothers National Memorial in Kill Devil Hills. The town center of Kitty Hawk is the wrong point, though it is only a few kilometers away.",
    sources: [
      {
        title: "Wright Brothers National Memorial",
        url: "https://www.nps.gov/wrbr/",
        publisher: "US National Park Service",
      },
      {
        title: "Wright flyer of 1903",
        url: "https://airandspace.si.edu/collection-objects/1903-wright-flyer/nasm_A19610048000",
        publisher: "Smithsonian National Air and Space Museum",
      },
    ],
    hiddenTerms: ["Wright", "Kitty", "Hawk", "1903", "Carolina", "Dayton", "Orville", "Wilbur"],
  },
  {
    id: "jallianwala-bagh",
    title: "Jallianwala Bagh massacre",
    prompt:
      "On a command from a colonial officer, troops fired into a crowd trapped in a walled garden with few exits. Hundreds died. Mark the garden.",
    locationLabel: "Jallianwala Bagh, Amritsar, India",
    lat: 31.62056,
    lon: 74.88056,
    year: 1919,
    era: "AD",
    explanation:
      "On 13 April 1919, troops under Brigadier General Reginald Dyer fired on a crowd gathered in Jallianwala Bagh, a walled garden in Amritsar. Hundreds of people were killed. The garden is now a memorial.",
    precisionNote:
      "The pin marks the garden itself, which is a defined enclosure. It is not the whole city of Amritsar.",
    sources: [
      {
        title: "Jallianwala Bagh Massacre",
        url: "https://www.britannica.com/event/Jallianwala-Bagh-Massacre",
        publisher: "Encyclopaedia Britannica",
      },
      {
        title: "Jallianwala Bagh massacre",
        url: "https://www.worldhistory.org/Jallianwala_Bagh_Massacre/",
        publisher: "World History Encyclopedia",
      },
    ],
    hiddenTerms: ["Jallianwala", "Amritsar", "Dyer", "1919", "India", "Punjab"],
  },
];
