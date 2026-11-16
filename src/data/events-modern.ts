import type { HistoricalEvent } from "@/data/types";

export const modernEvents: HistoricalEvent[] = [
  {
    id: "march-on-washington",
    title: "March on Washington",
    prompt:
      "Hundreds of thousands of people gathered at a memorial to a president who had led a civil war. A minister spoke there about a dream of equality. Mark the memorial the crowd faced.",
    locationLabel: "Lincoln Memorial, Washington, D.C.",
    lat: 38.88928,
    lon: -77.05014,
    year: 1963,
    era: "AD",
    explanation:
      "On 28 August 1963, the March on Washington for Jobs and Freedom gathered at the Lincoln Memorial. Martin Luther King Jr. delivered the \"I Have a Dream\" speech from the memorial steps. The pin is the memorial, not the Capitol at the other end of the Mall.",
    precisionNote:
      "The crowd filled the National Mall. The pin marks the Lincoln Memorial, where the speakers stood and which the crowd faced.",
    sources: [
      {
        title: "March on Washington",
        url: "https://www.nps.gov/articles/march-on-washington.htm",
        publisher: "US National Park Service",
      },
      {
        title: "March on Washington",
        url: "https://www.britannica.com/event/March-on-Washington",
        publisher: "Encyclopaedia Britannica",
      },
    ],
    hiddenTerms: ["Lincoln", "Washington", "King", "1963", "Mall"],
  },
  {
    id: "apollo-11-launch",
    title: "Launch of Apollo 11",
    prompt:
      "A rocket carried the first crew that would land on the Moon. Mark the launch pad they left, not the control room that talked to them and not the lunar landing site.",
    locationLabel: "Launch Complex 39A, Kennedy Space Center, Florida",
    lat: 28.60833,
    lon: -80.60444,
    year: 1969,
    era: "AD",
    explanation:
      "On 16 July 1969, Apollo 11 lifted off from Launch Complex 39A at the Kennedy Space Center. Neil Armstrong and Buzz Aldrin landed on the Moon four days later; Michael Collins stayed in lunar orbit. Mission control for the flight was in Houston. This pin is the pad they left.",
    precisionNote:
      "Launch Complex 39B is a different pad, to the north. The pin marks 39A, the pad Apollo 11 used. It is not Houston and not the lunar landing site.",
    sources: [
      {
        title: "Apollo 11",
        url: "https://www.nasa.gov/mission/apollo-11/",
        publisher: "NASA",
      },
      {
        title: "Apollo 11",
        url: "https://www.britannica.com/event/Apollo-11",
        publisher: "Encyclopaedia Britannica",
      },
    ],
    hiddenTerms: ["Apollo", "Kennedy", "Florida", "1969", "Houston", "Armstrong", "Merritt"],
  },
  {
    id: "independence-palace",
    title: "Fall of Saigon at the Independence Palace",
    prompt:
      "As a long war ended, tanks entered the presidential palace of a capital while helicopters lifted people out of the city. Mark the palace.",
    locationLabel: "Independence Palace, Ho Chi Minh City",
    lat: 10.77694,
    lon: 106.69528,
    year: 1975,
    era: "AD",
    explanation:
      "On 30 April 1975, North Vietnamese tanks entered the Independence Palace in Saigon as the South Vietnamese government surrendered. The day is remembered as the fall of Saigon. The city is now Ho Chi Minh City. Helicopters had been evacuating people from the city in the days before.",
    precisionNote:
      "The pin marks the Independence Palace, also called the Reunification Palace. The evacuation and the fighting were spread across the city; the palace is the building the tanks entered.",
    sources: [
      {
        title: "Fall of Saigon",
        url: "https://www.britannica.com/event/Fall-of-Saigon",
        publisher: "Encyclopaedia Britannica",
      },
      {
        title: "Ending the Vietnam War",
        url: "https://history.state.gov/milestones/1969-1976/ending-vietnam",
        publisher: "US Department of State, Office of the Historian",
      },
    ],
    hiddenTerms: ["Saigon", "1975", "Vietnam", "Independence", "Minh"],
  },
  {
    id: "chernobyl-reactor",
    title: "Explosion of Chernobyl reactor 4",
    prompt:
      "During a late-night safety test, a reactor at a nuclear power station exploded and spread radioactive material over a wide region. Mark the destroyed reactor, not the city built nearby for the station's workers.",
    locationLabel: "Chernobyl reactor 4, Ukraine",
    lat: 51.38972,
    lon: 30.09917,
    year: 1986,
    era: "AD",
    explanation:
      "On 26 April 1986, reactor 4 of the Chernobyl Nuclear Power Plant exploded during a safety test. The accident spread radioactive material across a wide region. Pripyat, the city built for the plant's workers, is a few kilometers away and is the wrong pin.",
    precisionNote:
      "The pin marks reactor 4 at the power station. Pripyat is a different place. The contamination zone is far larger than either point; the scored location is the destroyed reactor.",
    sources: [
      {
        title: "Chernobyl",
        url: "https://www.iaea.org/newscenter/focus/chernobyl",
        publisher: "International Atomic Energy Agency",
      },
      {
        title: "Chernobyl disaster",
        url: "https://www.britannica.com/event/Chernobyl-disaster",
        publisher: "Encyclopaedia Britannica",
      },
    ],
    hiddenTerms: ["Chernobyl", "Pripyat", "1986", "Ukraine", "Soviet"],
  },
  {
    id: "bornholmer-strasse",
    title: "First opening of the Berlin Wall",
    prompt:
      "After a confused press conference announced new travel rules, crowds forced open a crossing in a divided city before midnight. Mark the crossing that opened first that night, not the whole length of the barrier.",
    locationLabel: "Bornholmer Straße border crossing, Berlin",
    lat: 52.55472,
    lon: 13.39861,
    year: 1989,
    era: "AD",
    explanation:
      "On the evening of 9 November 1989, a Politburo spokesman announced that new travel rules would take effect. Crowds gathered at several crossings. The first to open that night was Bornholmer Straße, where border officer Harald Jäger let people through before midnight. The Brandenburg Gate, farther south, was not the first opening.",
    precisionNote:
      "The Wall ran across the city. The pin marks the Bornholmer Straße crossing, the first one opened on the night of 9 November 1989. A pin at the Brandenburg Gate is a few kilometers south: close on the scale of the Earth, but not this crossing.",
    sources: [
      {
        title: "Berlin Wall",
        url: "https://www.britannica.com/topic/Berlin-Wall",
        publisher: "Encyclopaedia Britannica",
      },
      {
        title: "Berlin Wall Memorial",
        url: "https://www.stiftung-berliner-mauer.de/en/",
        publisher: "Stiftung Berliner Mauer",
      },
    ],
    hiddenTerms: ["Berlin", "Bornholmer", "Brandenburg", "1989", "Germany", "Jäger"],
  },
];
