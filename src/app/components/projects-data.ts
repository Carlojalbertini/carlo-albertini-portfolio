import img1 from "../../assets/9989fe5d0379abda7a7c2ffcc1745fd88926a15a.png";
import img2 from "../../assets/66e0c6c0bd80fa84557e06843cc9abc9b8c24cc7.png";
import tarot1 from "../../assets/25165369141bc54729eff48e3ce96d5aa7d7ac29.png";
import tarot2 from "../../assets/1d004fce2ed234dd1bb37323a1879ef4b33fa2e3.png";
import tarot3 from "../../assets/9a87102131c4e1e024dcd791ac8495ddb1b944d8.png";
import tarot4 from "../../assets/020d7fa9e6fdb9e29be40e1c6fee98515e806d33.png";
import tarot5 from "../../assets/7abd72f9230b3033b48038e6b8ef188d0f00fce9.png";
import tarotFortune from "../../assets/0c3427e8f1b7a66f9ff9a95a217452ccb31225d9.png";
import artA from "../../assets/a09faba96e75779dfeccef706de7577158b28f84.png";
import artB from "../../assets/113a352c8090050fcd495b7463a4331a49f4434d.png";
import artC from "../../assets/9f3832fa89252d7c40928dd63035a0886cacff2c.png";

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

export const projects: Project[] = [
  {
    slug: "bestiario-onirico",
    year: "2024",
    title: "Bestiario Onirico",
    displayTitle: "BESTIARIO ONIRICO",
    category: "Illustration",
    titleStyle: "uppercase",
    thumbnail: img2,
    description:
      "A visionary catalogue of impossible creatures, born from the crossroads of fantastic zoology and baroque nightmare. Each plate is a fragment of a parallel world where flesh becomes ornament and ornament becomes flesh.",
    images: [
      { src: img2, title: "The Night Horsewoman", medium: "Ink and tempera on parchment" },
      { src: artA, title: "The Symposium of Shadows", medium: "India ink on linen" },
      { src: artB, title: "Serpens Coronatus", medium: "Pen and ink on paper" },
      { src: artC, title: "Chimera at Dusk", medium: "Mixed media on panel" },
    ],
  },
  {
    slug: "herbarium-tenebrarum",
    year: "2023",
    title: "Herbarium Tenebrarum",
    displayTitle: "Herbarium Tenebrarum",
    category: "Etching",
    titleStyle: "italic",
    thumbnail: artC,
    description:
      "An impossible herbarium of plants that do not exist, drawn with the precision of a naturalist and the fever of a visionary. Roots becoming limbs, flowers opening like mouths, leaves veined with omens.",
    images: [
      { src: artC, title: "Twilight Bloom", medium: "Pen and walnut ink" },
      { src: artA, title: "Vanitas with Black Lily", medium: "Etching and drypoint" },
      { src: artB, title: "Rosa Nigra", medium: "Engraving on copper plate" },
    ],
  },
  {
    slug: "acque-nere",
    year: "2023",
    title: "Acque Nere",
    displayTitle: "BLACK WATERS",
    category: "Illustration",
    titleStyle: "uppercase",
    thumbnail: img1,
    description:
      "Visions of aquatic creatures and submerged nymphs, traced with black ink on wet paper. The mark expands like water itself, creating forms that oscillate between the human and the abyssal.",
    images: [
      { src: img1, title: "The Submerged Nymph", medium: "Ink on Fabriano paper" },
      { src: artB, title: "The Guardian of the Threshold", medium: "Engraving on copper plate" },
      { src: artC, title: "Vegetal Abyss", medium: "Ink on wet paper" },
    ],
  },
  {
    slug: "ars-moriendi",
    year: "2022",
    title: "Ars Moriendi",
    displayTitle: "Ars Moriendi",
    category: "Illustration\n& Publishing",
    titleStyle: "italic",
    thumbnail: artA,
    description:
      "A visual meditation on death and transience, inspired by medieval treatises on the art of dying. The plates guide the reader through allegories of the end, where skulls and flowers dance together.",
    images: [
      { src: artA, title: "Danse Macabre", medium: "Iron gall ink on paper" },
      { src: artC, title: "Memento", medium: "Pen on parchment" },
      { src: artB, title: "The Veiled Oracle", medium: "Mixed media on panel" },
    ],
  },
  {
    slug: "tarot",
    year: "2022",
    title: "Tarot",
    displayTitle: "TAROT",
    category: "Illustration\n& Publishing",
    titleStyle: "uppercase",
    thumbnail: tarot5,
    description:
      "A complete Major Arcana reimagined through the lens of dark symbolism and occult iconography. Each card is a portal — hand-drawn figures surrounded by intricate borders teeming with hidden creatures, botanical grotesques, and esoteric emblems. The Wizard, the Empress, the Hermit, the Lovers, Fortune: archetypes reborn in ink and bone.",
    images: [
      { src: tarotFortune, title: "X — Fortune", medium: "India ink on Bristol board" },
      { src: tarot5, title: "I — The Wizard", medium: "India ink on Bristol board" },
      { src: tarot2, title: "III — The Empress", medium: "India ink on Bristol board" },
      { src: tarot4, title: "VI — The Lovers", medium: "India ink on Bristol board" },
      { src: tarot1, title: "IX — The Hermit", medium: "India ink on Bristol board" },
      { src: tarot3, title: "X — Fortune (study)", medium: "India ink on Bristol board" },
    ],
  },
];

export const personalProjects = {
  slug: "personal",
  label: "Personal projects",
};