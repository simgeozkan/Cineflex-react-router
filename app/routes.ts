import { type RouteConfig, index } from "@react-router/dev/routes";

const routes: RouteConfig = [
  index("routes/home.tsx"),
  { path: "about", file: "routes/about.tsx" },
  { path: "profile/:id", file: "routes/profile.tsx" },
  { path: "*", file: "routes/notfoundpage.tsx" }, // <-- 404 catch-all
];

export default routes;
