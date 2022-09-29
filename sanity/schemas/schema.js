// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator";

import schemaTypes from "all:part:@sanity/base/schema-type";

import pageInfo from "./pageInfo";
import social from "./social";
import skill from "./skill";
import projects from "./projects";
import experience from "./experience";
export default createSchema({
  name: "default",
  types: schemaTypes.concat([pageInfo, experience, skill, projects, social]),
});
