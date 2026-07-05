import houseImage1 from "@/assets/project-1kanal-designer-house-1.jpg";
import houseImage2 from "@/assets/project-1kanal-designer-house-2.jpg";
import estateImage1 from "@/assets/project-2kanal-designer-house-1.jpg";
import estateImage2 from "@/assets/project-2kanal-designer-house-2.jpg";
import estateImage3 from "@/assets/project-2kanal-designer-house-3.jpg";
import cafeImage1 from "@/assets/project-rooftop-cafe-1.jpg";
import cafeImage2 from "@/assets/project-rooftop-cafe-2.jpg";
import cafeImage3 from "@/assets/project-rooftop-cafe-3.jpg";
import cornerImage1 from "@/assets/project-1kanal-corner-1.jpg";
import cornerImage2 from "@/assets/project-1kanal-corner-2.jpg";
import cornerImage3 from "@/assets/project-1kanal-corner-3.jpg";
import cornerImage4 from "@/assets/project-1kanal-corner-4.jpg";
import cornerImage5 from "@/assets/project-1kanal-corner-5.jpg";
import cornerImage6 from "@/assets/project-1kanal-corner-6.jpg";
import cornerImage7 from "@/assets/project-1kanal-corner-7.jpg";
import cornerImage8 from "@/assets/project-1kanal-corner-8.jpg";

export type GalleryProject = {
  id: string;
  title: string;
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
];

export const galleryProjects: Record<string, GalleryProject[]> = {
  "architecture-design": architectureDesignProjects,
  construction: constructionProjects,
};
