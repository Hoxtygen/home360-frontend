import { useState } from "react";
import { buildingPurpose, buildingType } from "src/constants";
import { Button } from "./Button";
import { CustomSelect } from "./CustomSelect";
import { Input } from "./Input";

export default function SearchForm() {
  const [buildinP, setBuildinP] = useState("");
  const [buildingT, setBuildingT] = useState("");
  const [location, setLocation] = useState("");

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
              onChange={(e) => setLocation(e.target.value)}
              className="w-full rounded-md sm:rounded-r-none dark:text-black text-base"
              value={location}
            />
          </div>
          <div className="flex grow sm:w-2/4 sm:mt-0 mt-4">
            <div className="grow w-2/4">
              <CustomSelect
                name="building-purpose"
                value={buildinP}
                options={buildingPurpose}
                onChange={(e) => setBuildinP(e.currentTarget.value)}
                className="w-full dark:text-black rounded-l-md sm:rounded-none"
              />
            </div>
            <div className="grow w-2/4">
              <CustomSelect
                name="building-type"
                value={buildingT}
                options={buildingType}
                onChange={(e) => setBuildingT(e.currentTarget.value)}
                className="w-full rounded-r-md dark:text-black"
              />
            </div>
          </div>
          <Button
            type="submit"
            className="h-12 sm:ml-5 ml-0 mt-4 sm:mt-0 dark:bg-accent-background font-Open-Sans font-semibold"
            size="lg"
          >
            Search
          </Button>
        </div>
      </form>
    </div>
  );
}
