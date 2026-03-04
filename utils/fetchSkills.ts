import { groq } from "next-sanity";
import { sanityClient } from "../sanity";
import { Technology } from "../typings";

const query = groq`
  *[_type=="skill"]
`;

export const fetchSkills = async () => {
  const skills: Technology[] = await sanityClient.fetch(query);
  return skills;
};
