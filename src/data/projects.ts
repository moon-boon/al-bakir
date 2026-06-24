export type ProjectCategory = "Architecture" | "Construction" | "Real Estate";

export type Project = {
  id: string;
  title: string;
  location: string;
  year: number;
  category: ProjectCategory;
  span: "wide" | "tall" | "square" | "large";
  accent: "blue" | "orange" | "green";
  summary: string;
};

export const projects: Project[] = [
  {
    id: "p1",
    title: "Skyline Residences",
    location: "B-17, Islamabad",
    year: 2025,
    category: "Architecture",
    span: "large",
    accent: "blue",
    summary: "Forty unit residential tower with cross ventilated layouts.",
  },
  {
    id: "p2",
    title: "Margalla View Villa",
    location: "F-7, Islamabad",
    year: 2024,
    category: "Construction",
    span: "tall",
    accent: "orange",
    summary: "Private villa built around a courtyard and reflecting pool.",
  },
  {
    id: "p3",
    title: "Gulberg Commercial",
    location: "Lahore",
    year: 2024,
    category: "Real Estate",
    span: "square",
    accent: "green",
    summary: "Mixed use retail block with curated leasing.",
  },
  {
    id: "p4",
    title: "Studio House 09",
    location: "Bahria Town",
    year: 2023,
    category: "Architecture",
    span: "wide",
    accent: "blue",
    summary: "Compact urban home for a young family of four.",
  },
  {
    id: "p5",
    title: "Heritage Restoration",
    location: "Rawalpindi",
    year: 2023,
    category: "Construction",
    span: "square",
    accent: "orange",
    summary: "Structural retrofit of an early twentieth century facade.",
  },
  {
    id: "p6",
    title: "B-17 Investment Plots",
    location: "Multi Gardens",
    year: 2025,
    category: "Real Estate",
    span: "wide",
    accent: "green",
    summary: "Curated residential plot inventory with title verification.",
  },
];
