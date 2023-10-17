import { formatCurrency } from "lib/utils/utils";
import Image from "next/image";
import Slider from "react-slick";
import LocationIcon from "../../../public/icons/location-icon.svg";

type ListingItemProps = {
  imagesUrl?: string[];
  title: string;
  location: string;
  annualRent: number;
  numberOfRooms: string;
  details?: string[];
};
export default function ListingItem({
  imagesUrl,
  title,
  location,
  annualRent,
  numberOfRooms,
  details,
}: ListingItemProps) {
  const slickSettings = {
    infinite: true,
    speed: 1000,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="flex p-3">
      <div className="w-2/5 relative">
        <Slider {...slickSettings}>
          {imagesUrl?.map((image, index) => (
            <div className="" key={index}>
              <Image
                alt="building imag"
                src={
                  image ||
                  `https://source.unsplash.com/random/300x200?sig=${
                    Math.random() * 10
                  }`
                }
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "100%", height: "auto" }}
              />
            </div>
          ))}
        </Slider>
      </div>
      <div className="pl-7">
        <h3 className="font-semibold text-lg">{title}</h3>
        <h3 className="text-sm flex mt-4">
          <Image
            src={LocationIcon}
            alt="location icon"
            width={20}
            height={20}
          />
          {location}
        </h3>
        <div className="flex mt-6">
          <div className="px-3">
            <h4 className="font-semibold">{formatCurrency(annualRent)}</h4>
            <p>Rent</p>
          </div>
          <div className="px-3">
            <h4 className="font-semibold">{numberOfRooms}</h4>
            <p>Rooms</p>
          </div>
        </div>
        <div className="flex flex-wrap mt-4">
          {details &&
            details.map((detail, index) => (
              <p
                className="bg-[#EAEAEA] p-[6px] text-xs mr-1 rounded mb-[3px]"
                key={`${detail}-${index}`}
              >
                {detail}
              </p>
            ))}
        </div>
      </div>
    </div>
  );
}
