import { Props } from "@/app/common/types";
import Title from "../../components/Title";
import TranslationEditor from "../components/TranslationEditor";

export default async function PostPage({ params } : Props){
  const resolvedParams = await params;

  const { category } = resolvedParams;
  return(
    <div className="dark:bg-white dark:text-black">
      <Title category={category}/>
      <TranslationEditor categoryName={category}/>
    </div>
  );
}