import { client, urlFor } from "./sanityClient";

export interface ProjectImage {
  src: string;
  title: string;
  medium: string;
}

export interface Project {
  slug: string;
  year: string;
  title: string;
  displayTitle: string;
  category: string;
  titleStyle: "uppercase" | "italic" | "normal";
  thumbnail: string;
  description: string;
  images: ProjectImage[];
}

const ABOUT_QUERY = `
  *[_type == "about"][0] {
    bioText,
    images[] {
      "src": image.asset._ref,
      alt
    }
  }
`;

export async function fetchAbout(): Promise<{ bioText?: string; images: { src: string; alt: string }[] } | null> {
  const raw = await client.fetch(ABOUT_QUERY);
  if (!raw) return null;

  return {
    bioText: raw.bioText,
    images: (raw.images || []).map((img: any) => ({
      src: urlFor(img.src).width(1080).url(),
      alt: img.alt || "",
    })),
  };
}

const PROJECT_QUERY = `
  *[_type == "project"] | order(order asc, year desc) {
    "slug": slug.current,
    year,
    title,
    displayTitle,
    category,
    titleStyle,
    "thumbnail": thumbnail.asset._ref,
    description,
    images[] {
      "src": src.asset._ref,
      title,
      medium
    }
  }
`;

export async function fetchProjects(): Promise<Project[]> {
  const raw = await client.fetch(PROJECT_QUERY);

  return raw.map((p: any) => ({
    ...p,
    displayTitle: p.displayTitle || p.title,
    titleStyle: p.titleStyle || "normal",
    thumbnail: urlFor(p.thumbnail).width(600).url(),
    images: (p.images || []).map((img: any) => ({
      ...img,
      src: urlFor(img.src).width(1600).url(),
    })),
  }));
}
