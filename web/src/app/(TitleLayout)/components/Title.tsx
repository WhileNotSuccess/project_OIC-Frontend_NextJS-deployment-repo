

type TitleProps = {
  category : string;
}

export default function Title({ category } : TitleProps){
  return(        
    <div className="w-full h-68 border flex items-center bg-[#5592e7] ">
      <div className="text-white font-bold text-7xl px-4">
        {category}
      </div>
    </div>
  );
}