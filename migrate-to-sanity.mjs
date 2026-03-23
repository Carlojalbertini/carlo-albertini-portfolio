import { createClient } from "@sanity/client";
import { createReadStream } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// ── CONFIG ─────────────────────────────────────────────────────────────────
const PROJECT_ID = "4amrjh0n";
const DATASET    = "production";
const TOKEN      = process.env.SANITY_TOKEN; // passa via env
// ───────────────────────────────────────────────────────────────────────────

const client = createClient({
  projectId: PROJECT_ID,
  dataset:   DATASET,
  token:     TOKEN,
  apiVersion: "2024-01-01",
  useCdn:    false,
});

const ASSETS = resolve(__dirname, "src/assets");

async function uploadImage(filename) {
  const filePath = resolve(ASSETS, filename);
  console.log(`  ↑ Uploading ${filename}...`);
  const asset = await client.assets.upload("image", createReadStream(filePath), {
    filename,
  });
  return asset._id;
}

const projects = [
  {
    slug:         "bestiario-onirico",
    year:         "2024",
    title:        "Bestiario Onirico",
    displayTitle: "BESTIARIO ONIRICO",
    category:     "Illustration",
    titleStyle:   "uppercase",
    order:        1,
    thumbnail:    "66e0c6c0bd80fa84557e06843cc9abc9b8c24cc7.png",
    description:  "A visionary catalogue of impossible creatures, born from the crossroads of fantastic zoology and baroque nightmare. Each plate is a fragment of a parallel world where flesh becomes ornament and ornament becomes flesh.",
    images: [
      { file: "66e0c6c0bd80fa84557e06843cc9abc9b8c24cc7.png", title: "The Night Horsewoman",    medium: "Ink and tempera on parchment" },
      { file: "a09faba96e75779dfeccef706de7577158b28f84.png", title: "The Symposium of Shadows", medium: "India ink on linen" },
      { file: "113a352c8090050fcd495b7463a4331a49f4434d.png", title: "Serpens Coronatus",         medium: "Pen and ink on paper" },
      { file: "9f3832fa89252d7c40928dd63035a0886cacff2c.png", title: "Chimera at Dusk",           medium: "Mixed media on panel" },
    ],
  },
  {
    slug:         "herbarium-tenebrarum",
    year:         "2023",
    title:        "Herbarium Tenebrarum",
    displayTitle: "Herbarium Tenebrarum",
    category:     "Etching",
    titleStyle:   "italic",
    order:        2,
    thumbnail:    "9f3832fa89252d7c40928dd63035a0886cacff2c.png",
    description:  "An impossible herbarium of plants that do not exist, drawn with the precision of a naturalist and the fever of a visionary. Roots becoming limbs, flowers opening like mouths, leaves veined with omens.",
    images: [
      { file: "9f3832fa89252d7c40928dd63035a0886cacff2c.png", title: "Twilight Bloom",      medium: "Pen and walnut ink" },
      { file: "a09faba96e75779dfeccef706de7577158b28f84.png", title: "Vanitas with Black Lily", medium: "Etching and drypoint" },
      { file: "113a352c8090050fcd495b7463a4331a49f4434d.png", title: "Rosa Nigra",           medium: "Engraving on copper plate" },
    ],
  },
  {
    slug:         "acque-nere",
    year:         "2023",
    title:        "Acque Nere",
    displayTitle: "BLACK WATERS",
    category:     "Illustration",
    titleStyle:   "uppercase",
    order:        3,
    thumbnail:    "9989fe5d0379abda7a7c2ffcc1745fd88926a15a.png",
    description:  "Visions of aquatic creatures and submerged nymphs, traced with black ink on wet paper. The mark expands like water itself, creating forms that oscillate between the human and the abyssal.",
    images: [
      { file: "9989fe5d0379abda7a7c2ffcc1745fd88926a15a.png", title: "The Submerged Nymph",        medium: "Ink on Fabriano paper" },
      { file: "113a352c8090050fcd495b7463a4331a49f4434d.png", title: "The Guardian of the Threshold", medium: "Engraving on copper plate" },
      { file: "9f3832fa89252d7c40928dd63035a0886cacff2c.png", title: "Vegetal Abyss",              medium: "Ink on wet paper" },
    ],
  },
  {
    slug:         "ars-moriendi",
    year:         "2022",
    title:        "Ars Moriendi",
    displayTitle: "Ars Moriendi",
    category:     "Illustration & Publishing",
    titleStyle:   "italic",
    order:        4,
    thumbnail:    "a09faba96e75779dfeccef706de7577158b28f84.png",
    description:  "A visual meditation on death and transience, inspired by medieval treatises on the art of dying. The plates guide the reader through allegories of the end, where skulls and flowers dance together.",
    images: [
      { file: "a09faba96e75779dfeccef706de7577158b28f84.png", title: "Danse Macabre",    medium: "Iron gall ink on paper" },
      { file: "9f3832fa89252d7c40928dd63035a0886cacff2c.png", title: "Memento",          medium: "Pen on parchment" },
      { file: "113a352c8090050fcd495b7463a4331a49f4434d.png", title: "The Veiled Oracle", medium: "Mixed media on panel" },
    ],
  },
  {
    slug:         "tarot",
    year:         "2022",
    title:        "Tarot",
    displayTitle: "TAROT",
    category:     "Illustration & Publishing",
    titleStyle:   "uppercase",
    order:        5,
    thumbnail:    "7abd72f9230b3033b48038e6b8ef188d0f00fce9.png",
    description:  "A complete Major Arcana reimagined through the lens of dark symbolism and occult iconography. Each card is a portal — hand-drawn figures surrounded by intricate borders teeming with hidden creatures, botanical grotesques, and esoteric emblems.",
    images: [
      { file: "0c3427e8f1b7a66f9ff9a95a217452ccb31225d9.png", title: "X — Fortune",         medium: "India ink on Bristol board" },
      { file: "7abd72f9230b3033b48038e6b8ef188d0f00fce9.png", title: "I — The Wizard",      medium: "India ink on Bristol board" },
      { file: "1d004fce2ed234dd1bb37323a1879ef4b33fa2e3.png", title: "III — The Empress",   medium: "India ink on Bristol board" },
      { file: "020d7fa9e6fdb9e29be40e1c6fee98515e806d33.png", title: "VI — The Lovers",     medium: "India ink on Bristol board" },
      { file: "25165369141bc54729eff48e3ce96d5aa7d7ac29.png", title: "IX — The Hermit",     medium: "India ink on Bristol board" },
      { file: "9a87102131c4e1e024dcd791ac8495ddb1b944d8.png", title: "X — Fortune (study)", medium: "India ink on Bristol board" },
    ],
  },
];

async function migrate() {
  if (!TOKEN) {
    console.error("❌  Manca il token! Lancia con: SANITY_TOKEN=xxx node migrate-to-sanity.mjs");
    process.exit(1);
  }

  console.log("🚀  Inizio migrazione verso Sanity...\n");

  // Cache degli asset già caricati (evita duplicati)
  const uploaded = {};

  async function getRef(filename) {
    if (!uploaded[filename]) {
      uploaded[filename] = await uploadImage(filename);
    }
    return uploaded[filename];
  }

  for (const p of projects) {
    console.log(`\n📁  Progetto: ${p.title}`);

    const thumbnailRef = await getRef(p.thumbnail);

    const imagesDocs = [];
    for (const img of p.images) {
      const ref = await getRef(img.file);
      imagesDocs.push({
        _type: "object",
        _key: ref,
        src: { _type: "image", asset: { _type: "reference", _ref: ref } },
        title: img.title,
        medium: img.medium,
      });
    }

    const doc = {
      _type: "project",
      _id:   `project-${p.slug}`,
      slug:  { _type: "slug", current: p.slug },
      year:  p.year,
      title: p.title,
      displayTitle: p.displayTitle,
      category:     p.category,
      titleStyle:   p.titleStyle,
      order:        p.order,
      description:  p.description,
      thumbnail: {
        _type: "image",
        asset: { _type: "reference", _ref: thumbnailRef },
      },
      images: imagesDocs,
    };

    await client.createOrReplace(doc);
    console.log(`  ✅  Salvato e pubblicato: ${p.title}`);
  }

  console.log("\n🎉  Migrazione completata! Controlla il pannello Sanity.");
}

migrate().catch((err) => {
  console.error("❌  Errore:", err.message);
  process.exit(1);
});
