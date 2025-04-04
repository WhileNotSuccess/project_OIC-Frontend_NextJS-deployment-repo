import Editor from "../../components/Editor";
import Title from "../../components/Title";


type Params = {
  category: string;
};

type Props = {
  params: Promise<Params>;
};

export default async function PostPage({ params } : Props){
  const resolvedParams = await params;

  const { category } = resolvedParams;
  return(
    <div className="ml-40">
      <Title category={category}/>
      <Editor/>
    </div>
  );
}