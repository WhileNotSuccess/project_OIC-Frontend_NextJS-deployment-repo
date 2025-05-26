import { IdProps } from "@/app/common/types";
import Editor from "../../components/Editor";


export default async function PostPage({ params } : IdProps){
  const resolvedParams = await params;
  console.log(resolvedParams);

  const { id } = resolvedParams;
  console.log(id);
  return(
    <div>
      <Editor id={id}/>
    </div>
  );
}