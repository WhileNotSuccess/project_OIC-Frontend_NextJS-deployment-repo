import { Props } from "@/app/common/types";
import Editor from "../../components/Editor";
import Title from "../../components/Title";


export default async function PostPage({ params } : Props){
  const resolvedParams = await params;

  const { category } = resolvedParams;
  return(
    <div>
      <Title category={category}/>
      <Editor/>
    </div>
  );
}