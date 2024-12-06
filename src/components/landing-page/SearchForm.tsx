import { Select } from "components/select";
import { apartmentType } from "constant-data";
import { Button } from "../buttons/Button";
import { Input } from "../input";
import { SearchFormProps } from "@/typedef";

export default function SearchForm({
  searchData,
  handleChange,
  handleSubmit,
}: SearchFormProps) {
  return (
    <div className="max-w-4xl rounded-md container mx-auto p-10 border shadow-lg mt-5 dark:bg-white">
      <form
        className="font-hanken-medium text-[1.15rem]"
        onSubmit={handleSubmit}
      >
        <div className="form-inner flex w-full flex-col sm:flex-row rounded-md content-center">
          <div className="grow sm:w-2/4">
            <Input
              type="text"
              name="location"
              pattern="^[a-zA-Z\s]+$"
              title="Only English alphabets allowed"
              id="location"
              placeholder="Where:town,city"
              onChange={handleChange}
              className="w-full rounded-md sm:rounded-r-none text-base"
              value={searchData.location}
            />
          </div>
          <div className="flex grow sm:w-2/4 sm:mt-0 mt-4">
            <div className="grow w-2/4">
              <Select
                value={searchData["apartmentType"]}
                title="Select apartment type"
                options={apartmentType}
                onChange={handleChange}
                name="apartmentType"
                className="rounded-none py-[0.57rem] border-black"
              />
            </div>
            <div className="grow sm:w-2/4">
              <Input
                type="number"
                name="price"
                id="price"
                placeholder="Price from"
                onChange={handleChange}
                onWheel={(e) => e.currentTarget.blur()}
                className="w-full rounded-md sm:rounded-l-none text-base"
                value={searchData.price}
              />
            </div>
          </div>
          <Button
            type="submit"
            className="h-12 sm:ml-5 ml-0 mt-4 sm:mt-0 dark:bg-black dark:text-white font-Open-Sans font-semibold"
            size="lg"
            disabled={
              !searchData.apartmentType ||
              searchData.location === "" ||
              !searchData.price
            }
          >
            Search
          </Button>
        </div>
      </form>
    </div>
  );
}
