import type { Route } from "./+types/home";
import ThreeDModelPage from "~/components/ThreeDModelPage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "KZS Talks - 3D model" },
    { name: "description", content: "Sample code to display 3D model for the Kaizen Talks!" },
  ];
}

export default function Home() {
  return <ThreeDModelPage />;
}
