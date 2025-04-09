import { Props } from "@/app/common/types";
import StaffIntro from "../../components/StaffIntro";
import Title from "../../components/Title";


export default async function StaffPage({ params } : Props){
  const resolvedParams = await params;

  const { category } = resolvedParams;
  return(
    <div>
      <Title category={category}/>
      <StaffIntro/>
    </div>
  );
}