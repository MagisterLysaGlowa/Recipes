import Image from "next/image";
import React from "react";
import schabowy from "../../../public/images/schabowy.jpg";
import { Clock, Star } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons/faStar";
import Link from "next/link";
type Props = {
  title: string;
  rating: number;
  cookingTime: string;
  imageSrc: string;
  route: string;
};

const RecipeCard = (props: Props) => {
  const { title, rating, cookingTime, imageSrc, route } = props;
  return (
    <Link href={route} className="flex flex-col w-full max-w-[400px] shadow-lg">
      <Image
        src={imageSrc ? imageSrc : schabowy}
        alt={`${title}_image`}
        height={250}
        width={500}
        className="w-full h-[250px] rounded-t-md object-fill"
      />
      <div className="bg-white rounded-b-md px-3 pb-5 flex flex-col">
        <h2 className="text-3xl font-bold text-gray-800 justify-start mt-3 mb-8">
          {title}
        </h2>
        <div className="flex">
          <div className="flex gap-1 items-center flex-grow">
            <Clock width={20} color="gray" />
            <h5 className="text-xl" style={{ color: "gray" }}>
              {cookingTime}
            </h5>
          </div>
          <div className="flex gap-2 items-center">
            <div className="flex gap-2">
              <FontAwesomeIcon icon={faStar} width={20} color="orange" />
              <FontAwesomeIcon icon={faStar} width={20} color="orange" />
              <FontAwesomeIcon icon={faStar} width={20} color="orange" />
              <FontAwesomeIcon icon={faStar} width={20} color="orange" />
              <FontAwesomeIcon icon={faStar} width={20} color="orange" />
            </div>
            <h4 className="text-xl font-bold" style={{ color: "orange" }}>
              {rating}
            </h4>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
