import { Props } from "@/app/common/types";
import BoardPageCompo from "../../components/BoardPageCompo";
import Title from "../../components/Title";



export default async function BoardPage({ params } : Props) {
  const resolvedParams = await params;

  const { category } = resolvedParams;
  return (
    <div className="dark:bg-white dark:text-black">
      <Title category={category}/>
      <BoardPageCompo name={category} />
    </div>
  );
}
