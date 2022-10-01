interface SanityBody {
  _createdAt: string;
  _id: string;
  _rev: string;
  _updatedAt: string;
}

interface Image {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
}

export interface PageInfo extends SanityBody {
  _type: "pageInfo";
  address: string;
  backgroundInformation: string;
  email: string;
  role: string;
  heroImage: Image;
  typewriterWords: string[];
  name: string;
  phoneNumber: string;
  profilePic: Image;
  shortInfo: string;
  domain: string;
  favicon: Image;
  seoImage: Image;
}

export interface Technology extends SanityBody {
  _type: "skill";
  image: Image;
  progress: number;
  title: string;
}

export interface Project extends SanityBody {
  _type: "projects";
  title: string;
  image: Image;
  linkToBuild: string;
  linkToRepo: string;
  summary: string;
  technologies: Technology[];
}

export interface Experience extends SanityBody {
  _type: "experience";
  company: string;
  points: string[];
  technologies: Technology[];
  jobTitle: string;
  dateStarted: date;
  dateEnded: date;
  isCurrentlyWorkingHere: boolean;
  companyImage: Image;
}

export interface Social extends SanityBody {
  _type: "social";
  title: string;
  url: string;
}
