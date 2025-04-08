import { locationMap } from "@/app/menu";
import MapCompo from "./MapCompo";
import { Language } from "@/app/common/types";


type HtmlDocsDirectionProps = {
  language : Language;
}

export default function HtmlDocsDirection({ language } : HtmlDocsDirectionProps){
  
  return(
    <div>
      <section
        className="w-full mt-4 flex justify-center"
        style={{ height: "400px", overflow: "hidden" }}
      >
        <MapCompo />
      </section>
      <section className="w-full mt-0 flex justify-center">
        <div className="w-[70%] bg-[#5592e7] p-4 mb-10">
          <div className="text-left text-white text-lg font-bold">
            {locationMap[language]["main-campus"]}
          </div>
        </div>
      </section>
    </div>
  );
}