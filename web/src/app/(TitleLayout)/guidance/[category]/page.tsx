import { Props } from "@/app/common/types";
import HtmlDocs from "../../components/HtmlDocs";
import Title from "../../components/Title";

export default async function GuidancePage ({ params } : Props) {
  const resolvedParams = await params;

  const { category } = resolvedParams;
  return(
    <div className="ml-40">
      <Title category={category}/>
      <HtmlDocs category={category}/>
    </div>
  );
}