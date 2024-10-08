import InputLabel from "components/inputLabel/InputLabel";
import { formatString, mergeClass } from "lib/utils/utils";
import { SelectProps } from "./types";

export default function Select({
  value,
  onChange,
  name,
  options,
  label,
  id,
  className,
  format,
  ...props
}: SelectProps) {
  return (
    <div className=" relative before:content-[''] before:absolute before:right-4 before:pointer-events-none after:content-[''] after:absolute after:right-4 after:pointer-events-none before:border-x-[0.3rem] before:border-x-transparent before:border-b-[0.3rem] border-b-black before:top-[40%] after:border-x-[0.3rem] after:border-x-transparent after:border-t-[0.3rem] border-t-black after:top-[55%] text-black">
      {label && (
        <div>
          <InputLabel label={label} htmlFor={id} />
        </div>
      )}
      <select
        className={mergeClass(
          "appearance-none w-full text-[1.15rem] py-[0.675em] pl-3 bg-white dark:bg-[#121212] dark:text-white border dark:border-gray-200 border-[#caced1] focus:border-black focus:outline-none rounded-[0.25rem] text-black cursor-pointer",
          className
        )}
        value={value}
        onChange={onChange}
        name={name}
        id={id}
        {...props}
      >
        <option value={""}>{props.title}</option>
        {options.map((option) => (
          <option
            key={option.value}
            value={formatString(option.value as string, format)}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
