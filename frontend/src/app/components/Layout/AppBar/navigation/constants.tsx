import { Route } from "./types";

export const routes: Route[] = [
  {
    title: "Arrangementer",
    path: "/events",
  },
  { title: "Verv", path: "/listings" },
  { title: "Hyttebooking", path: "/cabins" },
  { title: "Bang", path: "https://bangg.pages.dev" },
  { title: "Dokumenter", path: "/archive", permission: "archive.view_archivedocument" },
  { title: "Om oss", path: "/about" },
];