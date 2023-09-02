import Image from "next/image";

interface HouseCardProps {
  id: number;
  imgSrc: string;
  state: string;
  price: string;
  name: string;
  availableRooms: number;
  city: string;
}
type Data = { data: HouseCardProps };
export default function HouseCard({ data }: Data) {
  return (
    <div className="carousel-item text-center relative w-64 snap-start border">
      <Image
        src={data.imgSrc}
        alt="house"
        width="248"
        height="180"
        className="w-full"
      />
      <p className="text-left text-sm font-semibold px-3 pt-2">{data.name}</p>
      <p className="text-left text-sm px-3 mb-1">
        {data.city}, {data.state}
      </p>
      <div className="flex justify-between px-3 py-2  font-semibold">
        <p>{data.availableRooms} rooms</p>
        <p className="text-lg">{data.price}</p>
      </div>
    </div>
  );
}
