import { Technology } from "../typings";

export const fetchSkills = async (host: string) => {
  const res = await fetch(`${host}/api/getSkills`);
  const data = await res.json();
  const skills: Technology[] = data.skills;
  return skills;
};
