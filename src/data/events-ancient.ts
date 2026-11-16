import type { HistoricalEvent } from "@/data/types";

export const ancientEvents: HistoricalEvent[] = [
  {
    id: "caesar",
    title: "Assassination of Julius Caesar",
    prompt:
      "A group of senators stabbed a Roman dictator during a Senate meeting. They did not do it in the Forum. The Senate was meeting in a hall attached to a theatre built by his late rival.",
    locationLabel: "Curia of Pompey, Largo di Torre Argentina, Rome",
    lat: 41.89528,
    lon: 12.47694,
    year: 44,
    era: "BC",
    explanation:
      "On 15 March 44 BC, Julius Caesar was killed at a Senate meeting in the Curia of Pompey, part of the theatre complex Pompey had built in the Campus Martius. The Roman Forum, the usual image of the Senate, was not the room. Excavations at Largo di Torre Argentina uncovered that curia.",
    precisionNote:
      "The pin marks the excavated site of the Curia of Pompey at Largo di Torre Argentina. It is the building identified as the meeting place, not a single chair in the chamber.",
    sources: [
      {
        title: "Julius Caesar",
        url: "https://www.britannica.com/biography/Julius-Caesar-Roman-ruler",
        publisher: "Encyclopaedia Britannica",
      },
      {
        title: "Sacred area of Largo di Torre Argentina",
        url: "https://www.turismoroma.it/en/places/sacred-area-largo-di-torre-argentina",
        publisher: "Turismo Roma",
      },
    ],
    hiddenTerms: ["Caesar", "Pompey", "Argentina", "44", "Ides"],
  },
  {
    id: "thermopylae",
    title: "Battle of Thermopylae",
    prompt:
      "A small Greek force held a narrow coastal pass for three days against the army of a Persian king. A local path let the invaders get behind the last defenders, including a Spartan rear guard.",
    locationLabel: "Thermopylae pass, near the Kolonos hill, Greece",
    lat: 38.79583,
    lon: 22.53694,
    year: 480,
    era: "BC",
    explanation:
      "In 480 BC, during Xerxes' invasion, Greek troops under the Spartan king Leonidas held the pass at Thermopylae for three days. After a local route exposed their flank, the remaining defenders were killed. The battle was fought the same summer as the later naval fight at Salamis.",
    precisionNote:
      "The shoreline has silted seaward since 480 BC, so the pass is wider and farther from the water than it was. The pin marks the historical battlefield as mapped today, at the Kolonos hill, not an ancient waterline measured by GPS.",
    sources: [
      {
        title: "Battle of Thermopylae",
        url: "https://www.britannica.com/event/Battle-of-Thermopylae-Greek-history-480-BC",
        publisher: "Encyclopaedia Britannica",
      },
      {
        title: "Battle of Thermopylae",
        url: "https://www.worldhistory.org/thermopylae/",
        publisher: "World History Encyclopedia",
      },
    ],
    hiddenTerms: ["Thermopylae", "Leonidas", "480", "Xerxes", "Salamis"],
  },
  {
    id: "actium",
    title: "Battle of Actium",
    prompt:
      "A naval battle off a western Greek promontory ended the last war of the Roman Republic. One side was led by a Roman general and an Egyptian queen; the other by the man who became the first emperor.",
    locationLabel: "Cape Actium, at the mouth of the Ambracian Gulf, Greece",
    lat: 38.953,
    lon: 20.768,
    year: 31,
    era: "BC",
    explanation:
      "On 2 September 31 BC, the fleet of Octavian defeated Mark Antony and Cleopatra off the promontory of Actium. Antony and Cleopatra escaped to Egypt; the battle left Octavian master of the Roman world. He later took the name Augustus.",
    precisionNote:
      "The fighting was at sea, immediately off the cape. There is no single wreck used as the marker. The pin is Cape Actium, the conventional land reference the battle is named for.",
    sources: [
      {
        title: "Battle of Actium",
        url: "https://www.britannica.com/event/Battle-of-Actium",
        publisher: "Encyclopaedia Britannica",
      },
      {
        title: "Battle of Actium",
        url: "https://www.worldhistory.org/Battle_of_Actium/",
        publisher: "World History Encyclopedia",
      },
    ],
    hiddenTerms: ["Actium", "Cleopatra", "Antony", "Octavian", "Augustus", "31", "Preveza"],
  },
  {
    id: "carthage",
    title: "Destruction of Carthage",
    prompt:
      "A third war between Rome and its North African rival ended when Roman forces destroyed that rival's city. The place to mark is the ruined city, not Rome.",
    locationLabel: "Byrsa hill, archaeological site of Carthage, Tunisia",
    lat: 36.85222,
    lon: 10.32389,
    year: 146,
    era: "BC",
    explanation:
      "In 146 BC, at the end of the Third Punic War, Roman troops under Scipio Aemilianus captured and destroyed Carthage. Rome later built a new city on the same ground. The year 146 BC is the standard date for the destruction; a Roman Carthage came afterward.",
    precisionNote:
      "The siege covered the city, not one house. The pin marks Byrsa, the acropolis of Punic Carthage inside the archaeological site. It is not a claim that every street was destroyed at this exact meter.",
    sources: [
      {
        title: "Archaeological Site of Carthage",
        url: "https://whc.unesco.org/en/list/37/",
        publisher: "UNESCO World Heritage Centre",
      },
      {
        title: "Carthage",
        url: "https://www.britannica.com/place/Carthage-ancient-city-Tunisia",
        publisher: "Encyclopaedia Britannica",
      },
    ],
    hiddenTerms: ["Carthage", "Tunis", "Byrsa", "Punic", "146", "Scipio"],
  },
  {
    id: "marathon",
    title: "Battle of Marathon",
    prompt:
      "Citizen soldiers from one city-state, with allies from a smaller neighbor, stopped a Persian landing force on a coastal plain. They later raised a burial mound for their dead on that field.",
    locationLabel: "Athenian burial mound on the plain of Marathon, Greece",
    lat: 38.11806,
    lon: 23.97833,
    year: 490,
    era: "BC",
    explanation:
      "In 490 BC, Athenian hoplites and a contingent from Plataea defeated a Persian force that had landed on the plain of Marathon. The Athenians buried their dead in a mound, the Soros, which still marks the field. The run to announce the victory is a later legend; the battle year is not.",
    precisionNote:
      "The fighting spread across the plain. The pin marks the mapped battlefield point at the Athenian burial mound, the Soros, not every part of the plain.",
    sources: [
      {
        title: "Battle of Marathon",
        url: "https://www.britannica.com/event/Battle-of-Marathon",
        publisher: "Encyclopaedia Britannica",
      },
      {
        title: "Battle of Marathon",
        url: "https://www.worldhistory.org/Battle_of_Marathon/",
        publisher: "World History Encyclopedia",
      },
    ],
    hiddenTerms: ["Marathon", "Athens", "Plataea", "490", "Soros", "Greece"],
  },
];
