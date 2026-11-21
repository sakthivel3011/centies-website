/** Edition history taken from the official organisers and results PDFs (2010 – 2020). */
export type Edition = {
  year: number;
  edition: number;
  hosts: string[];
  colleges?: number;
  note?: string;
};

export const EDITIONS: Edition[] = [
  { year: 2010, edition: 1, hosts: ["Tamilnadu College of Engineering"], colleges: 23, note: "The first championship — Table Tennis and Volleyball for men and women." },
  { year: 2011, edition: 2, hosts: ["Nehru Institute of Engineering & Technology"], colleges: 32, note: "Badminton and Basketball join the programme." },
  { year: 2012, edition: 3, hosts: ["KPR Institute of Engineering & Technology"], colleges: 21, note: "Ball Badminton, Chess, Football, Handball and Kho-Kho added." },
  { year: 2013, edition: 4, hosts: ["KPR Institute of Engineering & Technology", "PSG College of Technology", "SVS College of Engineering"], colleges: 24 },
  {
    year: 2014,
    edition: 5,
    hosts: ["Erode Builders Educational Trust, Kangeyam", "Hindustan Institute of Technology", "Kalaivani College of Technology", "Ranganathar College of Engineering", "Sri Krishna College of Technology"],
    colleges: 35,
  },
  {
    year: 2015,
    edition: 6,
    hosts: ["Adithya Institute of Technology", "Coimbatore Institute of Technology", "Erode Builders Educational Trust, Kangeyam", "PSG College of Technology", "Sri Krishna College of Technology"],
    colleges: 35,
    note: "Athletics and women’s Throwball introduced.",
  },
  {
    year: 2016,
    edition: 7,
    hosts: ["Coimbatore Institute of Technology", "Erode Builders Educational Trust, Kangeyam", "PSG College of Technology", "Sri Sakthi Institute of Engineering & Technology", "United Institute of Technology"],
    colleges: 35,
    note: "Tennis joins the men’s events.",
  },
  {
    year: 2017,
    edition: 8,
    hosts: [
      "Coimbatore Institute of Technology",
      "Kumaraguru College of Technology",
      "Erode Builders Educational Trust, Kangeyam",
      "PSG College of Technology",
      "Sri Sakthi Institute of Engineering & Technology",
      "Sri Krishna College of Technology",
      "United Institute of Technology",
    ],
    colleges: 36,
  },
  {
    year: 2018,
    edition: 9,
    hosts: ["Bannari Amman Institute of Technology", "Coimbatore Institute of Technology", "PSG College of Technology", "SNS College of Technology", "Sri Sakthi Institute of Engineering & Technology", "United Institute of Technology"],
    colleges: 36,
    note: "Hockey added. The forum is renamed CENTIES on 3 May 2018.",
  },
  {
    year: 2019,
    edition: 10,
    hosts: ["Bannari Amman Institute of Technology", "Coimbatore Institute of Technology", "Kongu Engineering College", "SNS College of Technology", "Sriguru Institute of Technology", "Sri Sakthi Institute of Engineering & Technology"],
    colleges: 27,
    note: "Kabaddi added for men.",
  },
  { year: 2020, edition: 11, hosts: ["Bannari Amman Institute of Technology", "Kongu Engineering College", "PSG College of Technology", "SNS College of Technology"], colleges: 24 },
];

export const MILESTONES = [
  { year: "2009", title: "The idea", text: "On 22 November 2009, physical education directors of engineering colleges meet at a zonal athletic meet and decide to start a sports forum." },
  { year: "2010", title: "1st CENTIES Championship", text: "Two games — Table Tennis and Volleyball for men and women — with 23 colleges taking part." },
  { year: "2015", title: "Athletics arrives", text: "Athletics and women’s Throwball join a programme that now spans more than ten sports." },
  { year: "2018", title: "Renamed CENTIES", text: "On 3 May 2018 the general body renames the Engineering Colleges Physical Educationist Club (ECPEC) to CENTIES." },
  { year: "2023", title: "Registered association", text: "CENTIES Association is registered in Tamil Nadu — " + "SRG/CBE/40/2023." },
  { year: "2026", title: "15th Championship", text: "14 events for men and 10 for women, with online registration for the first time." },
];
