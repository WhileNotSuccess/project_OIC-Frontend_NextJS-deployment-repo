import { Props } from "@/app/common/types";
import Title from "../../components/Title";
import GlobalCarousel from "./components/GlobalCarousel";

export default async function GuidancePage({ params }: Props) {
  const resolvedParams = await params;
  const { category } = resolvedParams;

  return (
    <div className="dark:bg-white dark:text-black">
      <Title category={category} />
      <div className="h-[500px] flex items-center justify-center px-4">
        <GlobalCarousel />
      </div>
    </div>
  );
}

