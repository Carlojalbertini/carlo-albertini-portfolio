import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import { WorkMenu } from "./components/WorkMenu";
import { ProjectGallery } from "./components/ProjectGallery";
import { Bio } from "./components/Bio";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "work", Component: WorkMenu },
      { path: "work/:slug", Component: ProjectGallery },
      { path: "about", Component: Bio },
    ],
  },
]);
