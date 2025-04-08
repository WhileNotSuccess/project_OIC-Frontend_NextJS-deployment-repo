import HtmlDocs from "@/app/(TitleLayout)/components/HtmlDocs";
import { IdProps } from "@/app/common/types";


export default async function GuidancePage ({ params } : IdProps) {
  const resolvedParams = await params;

  const { id } = resolvedParams;
  return(
    <div className="ml-40">
      <HtmlDocs category={id}/>
    </div>
  );
}