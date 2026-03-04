import { groq } from "next-sanity";
import { sanityClient } from "../sanity";
import { PageInfo } from "../typings";

const query = groq`
  *[_type=="pageInfo"][0]{
    ..., 
    "fileUrl": resume.asset->url,
     socials[]->
  }
`;

export const fetchPageInfo = async () => {
  const pageInfo: PageInfo = await sanityClient.fetch(query);
  return pageInfo;
};
