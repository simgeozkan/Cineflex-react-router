import type { Route } from "../routes/+types/home";
import { Welcome } from "../welcome/welcome";

export function Home({ loaderData }: Route.ComponentProps) {
  return <Welcome message={loaderData.message} />;
} 