import { createClient } from "next-sanity";
import createImageUrlBuilder from "@sanity/image-url";
export const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  apiVersion: "2021-10-21",
  useCdn: false,
};

export const sanityClient = createClient(config);

export const urlFor = (source: any) =>
  createImageUrlBuilder(config as any).image(source);

export const setExperienceCardWidth = (width: number | undefined) => {
  if (!width) return;
  if (width < 600) {
    return 100;
  }
  if (width >= 500 && width < 900) {
    return 100;
  }
  if (width >= 900) {
    return 70;
  }
};
