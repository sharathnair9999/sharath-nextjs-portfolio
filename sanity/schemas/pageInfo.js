export default {
  name: "pageInfo",
  title: "PageInfo",
  type: "document",
  fields: [
    { name: "name", title: "Name", type: "string" },
    { name: "role", title: "Role", type: "string" },
    {
      name: "resume",
      title: "Resume",
      type: "file",
      options: {
        storeOriginalFilename: true,
      },
    },
    {
      name: "typewriterWords",
      title: "Type Writer Words",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "favicon",
      title: "Favicon",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "heroImage",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "seoImage",
      title: "SEO Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    { name: "shortInfo", title: "Short Info", type: "string" },
    { name: "domain", title: "domain", type: "string" },
    {
      name: "backgroundInformation",
      title: "Background Information",
      type: "text",
    },
    {
      name: "profilePic",
      title: "Profile Picture",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "phoneNumber",
      title: "Phone Number",
      type: "string",
    },
    {
      name: "email",
      title: "Email",
      type: "string",
    },
    {
      name: "address",
      title: "Address",
      type: "string",
    },
    {
      name: "socials",
      title: "Socials",
      type: "array",
      of: [{ type: "reference", to: { type: "social" } }],
    },
  ],
};
