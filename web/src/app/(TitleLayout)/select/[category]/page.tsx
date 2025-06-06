import { Props } from "@/app/common/types";
import Title from "../../components/Title";
import InternationalAgreeCompo from "./components/InternationalAgreeCompo";

export default async function internationalAgreements({ params }: Props) {

  const resolvedParams = await params;
  const { category } = resolvedParams;

  return (
    <div className="dark:bg-white dark:text-black">
      <Title category={category} />
      <InternationalAgreeCompo />
    </div>

  );
}
