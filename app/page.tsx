import { SearchParams } from "next/dist/server/request/search-params";
import Pagination from "./components/Pagination";
import LatestIssues from "./LatestIssues";

export default function Home() {
  return <LatestIssues />;
}
