import { Props } from "@/app/common/types";
import BoardPageCompo from "../../components/BoardPageCompo";
import Title from "../../components/Title";
import Calendar from "../../components/Calendar";



export default async function BoardPage({ params } : Props) {
  const resolvedParams = await params;

  const { category } = resolvedParams;
  
  if (category === "calendar") {
    return (
      <div className="dark:bg-white dark:text-black">
        <Title category={category}/>
        <Calendar />
      </div>
    );
  }

  return (
    <div className="dark:bg-white dark:text-black">
      <Title category={category}/>
      <BoardPageCompo name={category} />
    </div>
  );
}
