import { ApartmentInfo } from "@/typedef";
import {
  capitalizeFirstCharacter,
  formatDate,
  replaceSpecialCharactersWithSpace,
} from "lib/utils/utils";

type ApartmentInfoProps = {
  petsAllowed: string;
  facilityQuality: string;
  availableFrom: Date;
  apartmentInfo: ApartmentInfo;
};

export default function ApartmentDescription({
  availableFrom,
  facilityQuality,
  petsAllowed,
  apartmentInfo,
}: ApartmentInfoProps) {
  return (
    <div className="grid grid-cols-2 text-14">
      <div className="">
        <div className="flex text-[#747474]">
          <p className="w-2/4">Type:</p>
          <p className="w-2/4">
            {capitalizeFirstCharacter(apartmentInfo?.apartmentType)}
          </p>
        </div>
        <div className="flex text-[#747474]">
          <p className="w-2/4">Vacant From:</p>
          <p className="w-2/4">{formatDate(availableFrom)}</p>
        </div>
        {facilityQuality && (
          <div className="flex text-[#747474]">
            <p className="w-2/4">Facility Quality:</p>
            <p className="w-2/4">{capitalizeFirstCharacter(facilityQuality)}</p>
          </div>
        )}
        <div className="flex text-[#747474]">
          <p className="w-2/4">Pets Allowed:</p>
          <p className="w-2/4">
            {replaceSpecialCharactersWithSpace(
              capitalizeFirstCharacter(petsAllowed)
            )}
          </p>
        </div>
      </div>
      <div className="">
        <div className="flex text-[#747474]">
          <p className="w-2/4">Room:</p>
          <p className="w-2/4">{apartmentInfo.roomNums}</p>
        </div>
        <div className="flex text-[#747474]">
          <p className="w-2/4">Bedroom:</p>
          <p className="w-2/4">{apartmentInfo?.bedroomNums}</p>
        </div>
        <div className="flex text-[#747474]">
          <p className="w-2/4">Bathroom:</p>
          <p className="w-2/4">{apartmentInfo?.bathroomNums}</p>
        </div>
      </div>
    </div>
  );
}
