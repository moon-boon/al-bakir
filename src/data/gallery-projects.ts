import houseImage1 from "@/assets/project-1kanal-designer-house-1.jpg";
import houseImage2 from "@/assets/project-1kanal-designer-house-2.jpg";
import estateImage1 from "@/assets/project-2kanal-designer-house-1.jpg";
import estateImage2 from "@/assets/project-2kanal-designer-house-2.jpg";
import estateImage3 from "@/assets/project-2kanal-designer-house-3.jpg";
import cafeImage1 from "@/assets/project-rooftop-cafe-1.jpg";
import cafeImage2 from "@/assets/project-rooftop-cafe-2.jpg";
import cafeImage3 from "@/assets/project-rooftop-cafe-3.jpg";
import cocoBite1 from "@/assets/cafe/coco-bite-cafe-1.jpg";
import cocoBite2 from "@/assets/cafe/coco-bite-cafe-2.jpg";
import cocoBite3 from "@/assets/cafe/coco-bite-cafe-3.jpg";
import cocoBite4 from "@/assets/cafe/coco-bite-cafe-4.jpg";
import cocoBite5 from "@/assets/cafe/coco-bite-cafe-5.jpg";
import cocoBite6 from "@/assets/cafe/coco-bite-cafe-6.jpg";
import interior1 from "@/assets/interior/interior-1.jpg";
import interior2 from "@/assets/interior/interior-2.jpg";
import interior3 from "@/assets/interior/interior-3.jpg";
import interior4 from "@/assets/interior/interior-4.jpg";
import interior5 from "@/assets/interior/interior-5.jpg";
import interior6 from "@/assets/interior/interior-6.jpg";
import interior7 from "@/assets/interior/interior-7.jpg";
import interior8 from "@/assets/interior/interior-8.jpg";
import interior9 from "@/assets/interior/interior-9.jpg";
import rooftop1 from "@/assets/rooftop/rooftop-1.jpg";
import rooftop2 from "@/assets/rooftop/rooftop-2.jpg";
import rooftop3 from "@/assets/rooftop/rooftop-3.jpg";
import farmhouse1 from "@/assets/farmhouse-design/farmhouse-1.jpg";
import farmhouse2 from "@/assets/farmhouse-design/farmhouse-2.jpg";
import farmhouse3 from "@/assets/farmhouse-design/farmhouse-3.jpg";
import farmhouse4 from "@/assets/farmhouse-design/farmhouse-4.jpg";
import farmhouse5 from "@/assets/farmhouse-design/farmhouse-5.jpg";
import farmhouse6 from "@/assets/farmhouse-design/farmhouse-6.jpg";
import farmhouse7 from "@/assets/farmhouse-design/farmhouse-7.jpg";
import farmhouse8 from "@/assets/farmhouse-design/farmhouse-8.jpg";
import farmhouse9 from "@/assets/farmhouse-design/farmhouse-9.jpg";
import farmhouse10 from "@/assets/farmhouse-design/farmhouse-10.jpg";
import farmhouse11 from "@/assets/farmhouse-design/farmhouse-11.jpg";
import farmhouse12 from "@/assets/farmhouse-design/farmhouse-12.jpg";
import farmhouse13 from "@/assets/farmhouse-design/farmhouse-13.jpg";
import farmhouse14 from "@/assets/farmhouse-design/farmhouse-14.jpg";
import farmhouse15 from "@/assets/farmhouse-design/farmhouse-15.jpg";
import farmhouse16 from "@/assets/farmhouse-design/farmhouse-16.jpg";
import frontElevation1 from "@/assets/front-elevations/front-elevation-1.jpg";
import frontElevation2 from "@/assets/front-elevations/front-elevation-2.jpg";
import frontElevation3 from "@/assets/front-elevations/front-elevation-3.jpg";
import frontElevation4 from "@/assets/front-elevations/front-elevation-4.jpg";
import cornerImage1 from "@/assets/project-1kanal-corner-1.jpg";
import cornerImage2 from "@/assets/project-1kanal-corner-2.jpg";
import cornerImage3 from "@/assets/project-1kanal-corner-3.jpg";
import cornerImage4 from "@/assets/project-1kanal-corner-4.jpg";
import cornerImage5 from "@/assets/project-1kanal-corner-5.jpg";
import cornerImage6 from "@/assets/project-1kanal-corner-6.jpg";
import cornerImage7 from "@/assets/project-1kanal-corner-7.jpg";
import cornerImage8 from "@/assets/project-1kanal-corner-8.jpg";
import b17Image1 from "@/assets/real-estate-b17/b17-1.jpg";
import b17Image2 from "@/assets/real-estate-b17/b17-2.jpg";
import b17Image3 from "@/assets/real-estate-b17/b17-3.jpg";
import b17Image4 from "@/assets/real-estate-b17/b17-4.jpg";
import b17Image5 from "@/assets/real-estate-b17/b17-5.jpg";
import b17Image6 from "@/assets/real-estate-b17/b17-6.jpg";
import faisalHills1 from "@/assets/faisal-hills/faisal-hills-1.jpg";
import faisalHills2 from "@/assets/faisal-hills/faisal-hills-2.jpg";
import faisalHills3 from "@/assets/faisal-hills/faisal-hills-3.jpg";
import faisalHills4 from "@/assets/faisal-hills/faisal-hills-4.jpg";
import faisalTown1 from "@/assets/faisal-town/faisal-town-1.jpg";
import faisalTown2 from "@/assets/faisal-town/faisal-town-2.jpg";
import newBlueArea1 from "@/assets/new-blue-area/new-blue-area-1.jpg";
import dhaIslamabad1 from "@/assets/dha-islamabad/dha-islamabad-1.jpg";
import dhaIslamabad2 from "@/assets/dha-islamabad/dha-islamabad-2.jpg";
import bahriaTown1 from "@/assets/bahria-town/bahria-town-1.jpg";
import bahriaTown2 from "@/assets/bahria-town/bahria-town-2.jpg";

export type GalleryProject = {
  id: string;
  title: string;
  caption?: string;
  description?: string;
  images: string[];
};

const architectureDesignProjects: GalleryProject[] = [
  {
    id: "1-kanal-designer-house",
    title: "1 Kanal Designer House",
    images: [houseImage1, houseImage2],
  },
  {
    id: "2-kanal-designer-house",
    title: "2 Kanal Designer House, Modern Grandeur",
    images: [estateImage1, estateImage2, estateImage3],
  },
  {
    id: "roof-top-cafe",
    title: "Roof Top Cafe",
    images: [cafeImage1, cafeImage2, cafeImage3],
  },
  {
    id: "cafe-design",
    title: "Cafe Design",
    images: [cocoBite1, cocoBite2, cocoBite3, cocoBite4, cocoBite5, cocoBite6],
  },
  {
    id: "interior-design",
    title: "Interior Design",
    images: [
      interior1,
      interior2,
      interior3,
      interior4,
      interior5,
      interior6,
      interior7,
      interior8,
      interior9,
    ],
  },
  {
    id: "roof-top-design",
    title: "Roof Top Design",
    images: [rooftop1, rooftop2, rooftop3],
  },
  {
    id: "farmhouse-design",
    title: "Farmhouse Design",
    images: [
      farmhouse1,
      farmhouse2,
      farmhouse3,
      farmhouse4,
      farmhouse5,
      farmhouse6,
      farmhouse7,
      farmhouse8,
      farmhouse9,
      farmhouse10,
      farmhouse11,
      farmhouse12,
      farmhouse13,
      farmhouse14,
      farmhouse15,
      farmhouse16,
    ],
  },
];

const constructionProjects: GalleryProject[] = [
  {
    id: "1-kanal-designer-house-corner",
    title: "1 Kanal Designer House Corner",
    images: [
      cornerImage1,
      cornerImage2,
      cornerImage3,
      cornerImage4,
      cornerImage5,
      cornerImage6,
      cornerImage7,
      cornerImage8,
    ],
  },
  {
    id: "front-elevations",
    title: "Front Elevations",
    images: [frontElevation1, frontElevation2, frontElevation3, frontElevation4],
  },
];

const realEstateProjects: GalleryProject[] = [
  {
    id: "services-in-b17",
    title: "b17 society. sales, rentals & investment opportunities",
    description:
      "at b17 society, we connect you with premium real estate opportunities. whether you're looking to purchase a plot or apartment, explore rental options, or invest in high-rise developments, we provide expert guidance every step of the way.",
    images: [b17Image5, b17Image1, b17Image2, b17Image3, b17Image4, b17Image6],
  },
  {
    id: "faisal-hills",
    title: "faisal hills real estate services",
    description:
      "explore buying, renting, and investment opportunities in faisal hills. we offer quality properties ranging from plots to high-rise apartments, backed by professional service and transparent guidance.",
    images: [faisalHills3, faisalHills1, faisalHills2, faisalHills4],
  },
  {
    id: "faisal-town",
    title: "faisal town. buy, rent & invest with confidence",
    description:
      "discover real estate opportunities in faisal town with professional guidance you can trust. we help you navigate property sales, find rental investments, and build wealth through high-rise developments. your success is our priority.",
    images: [faisalTown1, faisalTown2],
  },
  {
    id: "new-blue-area",
    title: "new blue area. sales, rentals & investments",
    description:
      "we also work in new blue area. whether you're looking to buy a plot or apartment, rent a property, or invest in developments, we help you find the right opportunity with expert guidance.",
    images: [newBlueArea1],
  },
  {
    id: "dha-islamabad",
    title: "dha islamabad. sales, rentals & investments",
    description:
      "we also work in dha islamabad. whether you're looking to buy a plot or apartment, rent a property, or invest in developments, we help you find the right opportunity with expert guidance.",
    images: [dhaIslamabad1, dhaIslamabad2],
  },
  {
    id: "bahria-town-islamabad",
    title: "bahria town islamabad. sales, rentals & investments",
    description:
      "we also work in bahria town islamabad. whether you're looking to buy a plot or apartment, rent a property, or invest in developments, we help you find the right opportunity with expert guidance.",
    images: [bahriaTown1, bahriaTown2],
  },
];

export const galleryProjects: Record<string, GalleryProject[]> = {
  "architecture-design": architectureDesignProjects,
  construction: constructionProjects,
  "real-estate": realEstateProjects,
};
