import { Props } from "@/app/common/types";
import Editor from "../../components/Editor";
import Title from "../../components/Title";


export default async function PostPage({ params } : Props){
  const resolvedParams = await params;

  const { category } = resolvedParams;
  return(
    <div className="dark:bg-white dark:text-black">
      <Title category={category}/>
      <Editor categoryName={category}/>
    </div>
  );
}