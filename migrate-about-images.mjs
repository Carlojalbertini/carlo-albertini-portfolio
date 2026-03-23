import { createClient } from "@sanity/client";

const PROJECT_ID = "4amrjh0n";
const DATASET    = "production";
const TOKEN      = process.env.SANITY_TOKEN;

const client = createClient({
  projectId: PROJECT_ID,
  dataset:   DATASET,
  token:     TOKEN,
  apiVersion: "2024-01-01",
  useCdn:    false,
});

const unsplashImages = [
  { url: "https://images.unsplash.com/photo-1735823197840-c6eaa4869c12?w=1080&q=80", alt: "Gothic ink illustration" },
  { url: "https://images.unsplash.com/photo-1623672655463-932bce1d4043?w=1080&q=80", alt: "Vintage engraving botanical" },
  { url: "https://images.unsplash.com/photo-1598408104280-9a4f0137ad7e?w=1080&q=80", alt: "Artist hands drawing with ink" },
  { url: "https://images.unsplash.com/photo-1771986923184-12644c050457?w=1080&q=80", alt: "Dark moody portrait" },
  { url: "https://images.unsplash.com/photo-1548092542-6daae5350557?w=1080&q=80", alt: "Gothic cathedral detail" },
  { url: "https://images.unsplash.com/photo-1715705721271-203dac81a315?w=1080&q=80", alt: "Gothic skull engraving" },
  { url: "https://images.unsplash.com/photo-1759255552032-195f86204da9?w=1080&q=80", alt: "Vintage anatomical illustration" },
  { url: "https://images.unsplash.com/photo-1679214889254-2f48f4d5aa29?w=1080&q=80", alt: "Dark vanitas still life" },
  { url: "https://images.unsplash.com/photo-1670483113676-01371126c768?w=1080&q=80", alt: "Gothic ornament detail" },
];

async function uploadFromUrl(url, alt) {
  console.log(`  ↑ Scarico e carico: ${alt}...`);
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Fetch fallita: ${url}`);
  const buffer = Buffer.from(await response.arrayBuffer());
  const asset = await client.assets.upload("image", buffer, {
    filename: `${alt.toLowerCase().replace(/\s+/g, "-")}.jpg`,
    contentType: "image/jpeg",
  });
  return asset._id;
}

async function migrate() {
  if (!TOKEN) {
    console.error("❌  Manca il token! Lancia con: SANITY_TOKEN=xxx node migrate-about-images.mjs");
    process.exit(1);
  }

  console.log("🚀  Migrazione immagini About verso Sanity...\n");

  const imagesDocs = [];
  for (const img of unsplashImages) {
    const ref = await uploadFromUrl(img.url, img.alt);
    imagesDocs.push({
      _type: "object",
      _key: ref,
      image: { _type: "image", asset: { _type: "reference", _ref: ref } },
      alt: img.alt,
    });
  }

  const doc = {
    _type: "about",
    _id: "about-page",
    images: imagesDocs,
  };

  await client.createOrReplace(doc);
  console.log("\n✅  About Page creata con 9 immagini!");
  console.log("🎉  Apri carlo-albertini.sanity.studio → About Page per vederle e sostituirle con le tue.");
}

migrate().catch((err) => {
  console.error("❌  Errore:", err.message);
  process.exit(1);
});
