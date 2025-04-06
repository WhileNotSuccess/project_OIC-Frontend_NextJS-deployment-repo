import Image from "next/image";


type TitleProps = {
  category : string;
}

export default function Title({ category } : TitleProps){
  return(        
    <div className="w-full h-32 sm:h-68 border flex items-center bg-[#000000] relative">
      <Image
        src={"/images/yeungjinTitlePicture.jpg"}
        alt="영진전문대 국제교류원 제목 사진"
        layout="fill"
        objectFit="cover"
        className="opacity-50"
      >
      </Image>
      <div className="absolute top-1/3 left-4 text-white font-bold text-4xl sm:text-7xl">
        {category}
      </div>
    </div>
  );
}