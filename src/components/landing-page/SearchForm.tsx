import { ChangeEvent, useState } from "react";
import { BuildingPurpose, BuildingType } from "typedef";
import { buildingPurpose, buildingType } from "../../constants";
import { Button } from "../buttons/Button";
import { CustomSelect } from "../inputs/CustomSelect";
import { Input } from "../inputs/Input";

export default function SearchForm() {
  interface Search {
    buildingType: BuildingType;
    buildingPurpose: BuildingPurpose;
    location: string;
  }

  const [searchData, setSearchData] = useState<Search>({
    buildingPurpose: "rent",
    buildingType: "house",
    location: "",
  });

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    let value: (typeof searchData)[keyof typeof searchData] =
      event.target.value;
    setSearchData({ ...searchData, [event.target.name]: value });
  }

  return (
    <div className="max-w-4xl rounded-md container mx-auto p-10 border shadow-lg mt-5">
      <form action="" className=" ">
        <div className="form-inner flex w-full flex-col sm:flex-row rounded-md content-center">
          <div className="grow sm:w-2/4">
            <Input
              type="text"
              name="location"
              id=""
              placeholder="Where:town,city"
              onChange={handleChange}
              className="w-full rounded-md sm:rounded-r-none dark:text-black text-base"
              value={searchData.location}
            />
          </div>
          <div className="flex grow sm:w-2/4 sm:mt-0 mt-4">
            <div className="grow w-2/4">
              <CustomSelect
                name="buildingPurpose"
                value={searchData["buildingPurpose"]}
                options={buildingPurpose}
                onChange={handleChange}
                className="w-full dark:text-black rounded-l-md sm:rounded-none"
              />
            </div>
            <div className="grow w-2/4">
              <CustomSelect
                name="buildingType"
                value={searchData["buildingType"]}
                options={buildingType}
                onChange={handleChange}
                className="w-full rounded-r-md dark:text-black"
              />
            </div>
          </div>
          <Button
            type="submit"
            className="h-12 sm:ml-5 ml-0 mt-4 sm:mt-0 dark:bg-black dark:text-white font-Open-Sans font-semibold"
            size="lg"
          >
            Search
          </Button>
        </div>
      </form>
    </div>
  );
}
