import type { HistoricalEvent } from "@/data/types";

export const scienceEvents: HistoricalEvent[] = [
  {
    id: "tutankhamun-tomb",
    title: "Finding the steps of Tutankhamun's tomb",
    prompt:
      "An archaeologist's team found a sealed staircase leading to a nearly intact royal tomb in a valley of royal burials. The stair was uncovered in the autumn. The burial chamber was opened the following year. Mark the year the stair was found.",
    locationLabel: "KV62, Valley of the Kings, Egypt",
    lat: 25.74039,
    lon: 32.60142,
    year: 1922,
    era: "AD",
    explanation:
      "On 4 November 1922, Howard Carter's workmen uncovered the steps of KV62, the tomb of Tutankhamun, in the Valley of the Kings. The burial chamber was opened in February 1923. This question asks for 1922, the year the stair was found.",
    precisionNote:
      "The pin marks the tomb entrance, KV62. The Valley of the Kings contains many other tombs; this is the one found in 1922.",
    sources: [
      {
        title: "Tutankhamun",
        url: "https://www.britannica.com/biography/Tutankhamun",
        publisher: "Encyclopaedia Britannica",
      },
      {
        title: "Discovering Tutankhamun",
        url: "https://www.griffith.ox.ac.uk/discoveringtut/",
        publisher: "Griffith Institute, University of Oxford",
      },
    ],
    hiddenTerms: ["Tutankhamun", "Carter", "1922", "Egypt", "Luxor", "KV62"],
  },
  {
    id: "penicillin",
    title: "Fleming's penicillin observation",
    prompt:
      "A researcher came back from holiday to a messy culture dish and saw that a mold had cleared the bacteria around it. The dish was in a hospital laboratory. Mark that hospital, not the factories that later made the medicine.",
    locationLabel: "St Mary's Hospital, Paddington, London",
    lat: 51.51722,
    lon: -0.17306,
    year: 1928,
    era: "AD",
    explanation:
      "In September 1928, Alexander Fleming, working at St Mary's Hospital in London, noticed that a Penicillium mold had killed staphylococci on a culture plate. That observation opened the antibiotic age. Industrial production came later, and elsewhere.",
    precisionNote:
      "The pin marks St Mary's Hospital, where the observation was made. The hospital is a complex of buildings; this is not a claim about one laboratory bench, and it is not a later factory.",
    sources: [
      {
        title: "Alexander Fleming facts",
        url: "https://www.nobelprize.org/prizes/medicine/1945/fleming/facts/",
        publisher: "Nobel Prize Outreach",
      },
      {
        title: "Alexander Fleming",
        url: "https://www.britannica.com/biography/Alexander-Fleming",
        publisher: "Encyclopaedia Britannica",
      },
    ],
    hiddenTerms: ["Fleming", "Penicillin", "1928", "Paddington", "London", "Mary"],
  },
  {
    id: "double-helix",
    title: "The double-helix model at the Cavendish",
    prompt:
      "Two researchers built a double-helix model of the molecule that carries hereditary information. They used X-ray evidence produced by a scientist working in another city. Mark the laboratory where the model was built, not the laboratory where that photograph was taken.",
    locationLabel: "Old Cavendish Laboratory, Free School Lane, Cambridge",
    lat: 52.20337,
    lon: 0.1187,
    year: 1953,
    era: "AD",
    explanation:
      "In 1953, James Watson and Francis Crick built their double-helix model of DNA at the Cavendish Laboratory on Free School Lane in Cambridge. They relied on X-ray diffraction work by Rosalind Franklin and Raymond Gosling at King's College London, with Maurice Wilkins also at King's. The Nature paper appeared on 25 April 1953. The pin is the Cambridge laboratory, not King's.",
    precisionNote:
      "The Cavendish Laboratory later moved to a campus in west Cambridge. That newer site is the wrong place. The pin marks Free School Lane, the street of the original laboratory where the 1953 model was built. It is the street of the building, not a surveyed bench inside the room.",
    sources: [
      {
        title: "The Nobel Prize in Physiology or Medicine 1962",
        url: "https://www.nobelprize.org/prizes/medicine/1962/summary/",
        publisher: "Nobel Prize Outreach",
      },
      {
        title: "Molecular structure of nucleic acids",
        url: "https://www.nature.com/articles/171737a0",
        publisher: "Nature",
      },
    ],
    hiddenTerms: ["Watson", "Crick", "Franklin", "Cavendish", "Cambridge", "1953", "King's", "Wilkins"],
  },
  {
    id: "sputnik-1",
    title: "Launch of Sputnik 1",
    prompt:
      "A polished metal sphere with four radio antennas became the first artificial satellite of Earth. Mark the launch pad it left from, not the design office in a capital and not the orbit.",
    locationLabel: "Baikonur Site 1, Gagarin's Start, Kazakhstan",
    lat: 45.92028,
    lon: 63.34222,
    year: 1957,
    era: "AD",
    explanation:
      "On 4 October 1957, the Soviet Union launched Sputnik 1 from Site 1 at the Baikonur Cosmodrome, in what is now Kazakhstan. The same pad was later called Gagarin's Start. The design bureau was in the Moscow region; the scored place is the pad.",
    precisionNote:
      "The cosmodrome covers a vast area with many pads. The pin marks Site 1, the pad Sputnik 1 left from, not the center of the cosmodrome and not a design office near Moscow.",
    sources: [
      {
        title: "Sputnik and the Dawn of the Space Age",
        url: "https://www.nasa.gov/history/sputnik/",
        publisher: "NASA",
      },
      {
        title: "Sputnik",
        url: "https://www.britannica.com/technology/Sputnik",
        publisher: "Encyclopaedia Britannica",
      },
    ],
    hiddenTerms: ["Sputnik", "Baikonur", "1957", "Kazakhstan", "Korolev", "Moscow"],
  },
  {
    id: "heart-transplant",
    title: "First human heart transplant",
    prompt:
      "A surgical team transferred a human heart from a donor to a patient, and the patient survived the operation. Mark the hospital where that first transplant was done.",
    locationLabel: "Groote Schuur Hospital, Cape Town",
    lat: -33.94139,
    lon: 18.46278,
    year: 1967,
    era: "AD",
    explanation:
      "On 3 December 1967, Christiaan Barnard's team at Groote Schuur Hospital in Cape Town transplanted a human heart into Louis Washkansky, who survived the operation and lived for 18 days. Earlier attempts elsewhere had not produced a patient who survived the surgery. The pin is the hospital.",
    precisionNote:
      "The pin marks Groote Schuur Hospital. The operating room is inside that campus; the coordinate is the hospital, not a single door.",
    sources: [
      {
        title: "Christiaan Barnard",
        url: "https://www.britannica.com/biography/Christiaan-Barnard",
        publisher: "Encyclopaedia Britannica",
      },
      {
        title: "The first human heart transplant",
        url: "https://www.ahajournals.org/doi/10.1161/CIRCULATIONAHA.117.033147",
        publisher: "Circulation, American Heart Association",
      },
    ],
    hiddenTerms: ["Barnard", "Groote", "Schuur", "1967", "Cape", "Washkansky"],
  },
];
