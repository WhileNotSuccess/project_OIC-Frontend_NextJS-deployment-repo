import { Props } from "@/app/common/types";
import HtmlDocs from "../../components/HtmlDocs";
import Title from "../../components/Title";

export default async function GuidancePage ({ params } : Props) {
  const resolvedParams = await params;

  const { category } = resolvedParams;
  return(
    <div className="dark:bg-gray-400 dark:text-black">
      <Title category={category}/>
      <HtmlDocs category={category}/>
    </div>
  );
}