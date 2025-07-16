import { Profile } from "../components/Profile";
import { useParams } from "react-router";

export default function ProfileRoute() {
  const { id } = useParams();
  return <Profile id={id} />;
} 