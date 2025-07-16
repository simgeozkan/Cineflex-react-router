import { type RouteConfig, index } from "@react-router/dev/routes";

const routes: RouteConfig = [
  { path: "*", file: "routes/notfoundpage.tsx" }, // <-- 404 catch-all
  index("routes/home.tsx"),
];

export default routes;
