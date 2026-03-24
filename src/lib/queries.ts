import { client, urlFor } from "./sanityClient";

const HOMEPAGE_QUERY = `
  *[_type == "homepage"][0] {
    "skull1": skull1.asset._ref,
    "skull2": skull2.asset._ref,
    "skull3": skull3.asset._ref,
    line1Left,
    line1Right,
    line2Left,
    line2Right,
    line3Text
  }
`;

export interface HomepageData {
  skull1?: string;
  skull2?: string;
  skull3?: string;
  line1Left?: string;
  line1Right?: string;
  line2Left?: string;
  line2Right?: string;
  line3Text?: string;
}

export async function fetchHomepage(): Promise<HomepageData | null> {
  const raw = await client.fetch(HOMEPAGE_QUERY);
  if (!raw) return null;
  return {
    skull1: raw.skull1 ? urlFor(raw.skull1).width(300).url() : undefined,
    skull2: raw.skull2 ? urlFor(raw.skull2).width(300).url() : undefined,
    skull3: raw.skull3 ? urlFor(raw.skull3).width(300).url() : undefined,
    line1Left: raw.line1Left,
    line1Right: raw.line1Right,
    line2Left: raw.line2Left,
    line2Right: raw.line2Right,
    line3Text: raw.line3Text,
  };
}

export interface ProjectImage {
  mediaType: "image" | "gif" | "video";
  src: string;
  videoUrl?: string;
  title: string;
  medium: string;
  alt?: string;
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
      "mediaType": coalesce(mediaType, "image"),
      "src": image.asset._ref,
      "srcUrl": image.asset->url,
      "videoUrl": video.asset->url,
      alt
    }
  }
`;

export async function fetchAbout(): Promise<{ bioText?: string; images: { mediaType: string; src: string; videoUrl?: string; alt: string }[] } | null> {
  const raw = await client.fetch(ABOUT_QUERY);
  if (!raw) return null;

  return {
    bioText: raw.bioText,
    images: (raw.images || []).map((img: any) => ({
      mediaType: img.mediaType || "image",
      src: img.mediaType === "gif"
        ? (img.srcUrl || (img.src ? urlFor(img.src).url() : ""))
        : img.mediaType === "video"
        ? ""
        : (img.src ? urlFor(img.src).width(1080).url() : ""),
      videoUrl: img.videoUrl || undefined,
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
      "mediaType": coalesce(mediaType, "image"),
      "src": image.asset._ref,
      "srcUrl": image.asset->url,
      "videoUrl": video.asset->url,
      title,
      medium,
      alt
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
      src: img.mediaType === "gif"
        ? (img.srcUrl || (img.src ? urlFor(img.src).url() : ""))
        : img.mediaType === "video"
        ? ""
        : (img.src ? urlFor(img.src).width(1600).url() : ""),
      videoUrl: img.videoUrl || undefined,
    })),
  }));
}
