import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes";

export default defineConfig({
  name: "carlo-albertini-portfolio",
  title: "Carlo Albertini — Portfolio CMS",

  // SOSTITUISCI con il tuo Project ID e Dataset da sanity.io/manage
  projectId: "4amrjh0n",
  dataset: "production",

  plugins: [
    structureTool(),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
