/* eslint-disable unused-imports/no-unused-vars */
import { Search } from "components/searchResult/SearchResult";
import { ChangeEvent, FormEvent } from "react";
import { apartmentType } from "../../constants";
import { Button } from "../buttons/Button";
import { CustomSelect } from "../inputs/CustomSelect";
import { Input } from "../inputs/Input";

export type SearchFormProps = {
  searchData: Search;
  handleChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void;
  handleSubmit(event: FormEvent<HTMLFormElement>): void;
};
export default function SearchForm({
  searchData,
  handleChange,
  handleSubmit,
}: SearchFormProps) {
  return (
    <div className="max-w-4xl rounded-md container mx-auto p-10 border shadow-lg mt-5">
      <form className="" onSubmit={handleSubmit}>
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
                name="apartmentType"
                value={searchData["apartmentType"]}
                options={apartmentType}
                onChange={handleChange}
                className="w-full rounded-md dark:text-black sm:rounded-none"
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
                className="w-full rounded-md sm:rounded-l-none dark:text-black text-base"
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
