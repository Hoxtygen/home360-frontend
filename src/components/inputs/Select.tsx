import { mergeClass } from "lib/utils/utils";
import React, { useRef, useState, useEffect, ElementRef } from "react";
import InputLabel from "./InputLabel";

export type SelectOption = {
  label: string;
  value: string | number;
};
type MultipleSelectProps = {
  multiple: true;
  value: SelectOption[];
  onChange: (value: SelectOption[]) => void;
};

type SingleSelectProps = {
  multiple?: false;
  value?: SelectOption;
  onChange: (value: SelectOption | undefined) => void;
};

type SelectProps = {
  options: SelectOption[];
  classname?: string;
  label?: string;
  id: string;
} & (SingleSelectProps | MultipleSelectProps);

export default function Select({
  multiple,
  value,
  onChange,
  options,
  classname,
  label,
  id,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  // const containerRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<ElementRef<"div">>(null);

  function clearOptions() {
    multiple ? onChange([]) : onChange(undefined);
  }
  function selectOption(option: SelectOption) {
    if (multiple) {
      if (value.includes(option)) {
        onChange(value.filter((o) => o !== option));
      } else {
        onChange([...value, option]);
      }
    } else {
      if (option !== value) onChange(option);
    }
  }

  function isOptionSelected(option: SelectOption) {
    return multiple ? value.includes(option) : option === value;
  }

  useEffect(() => {
    if (isOpen) setHighlightedIndex(0);
  }, [isOpen]);

  return (
    <div className="">
      {label && <InputLabel label={label} htmlFor={id} />}
      <div
        ref={containerRef}
        onBlur={() => setIsOpen(false)}
        onClick={() => setIsOpen((prev) => !prev)}
        tabIndex={0}
        className={mergeClass(
          "relative w-80 min-[1.5rem] border border-gray-400 flex items-center gap-2 p-2 rounded-lg outline-none focus:border-[hsl(200, 10%, 50%)]",
          classname
        )}
      >
        <span className="grow flex gap-2 flex-wrap">
          {multiple
            ? value.map((v) => (
                <button
                  key={v.value}
                  onClick={(event) => {
                    event.stopPropagation();
                    selectOption(v);
                  }}
                  className="flex items-center border-[#777] border-[0.05rem] rounded-[0.25rem] gap-1 px-[0.15rem] py-1 cursor-pointer bg-none outline-none focus:bg-[#ffcccc] focus:border-[#ff0000] hover:bg-[#ffcccc] hover:border-[#ff0000] .option-badge"
                >
                  {v.label}{" "}
                  <span className="text-xl text-[#777] remove-btn">
                    &times;
                  </span>
                </button>
              ))
            : value?.label}
        </span>
        <button
          onClick={(event) => {
            event.stopPropagation();
            clearOptions();
          }}
          className="bg-none text-gray-500 outline-none cursor-pointer text-[1.25rem] focus:text-red-300 hover:text-red-300"
        >
          &times;
        </button>
        <div className="bg-gray-400 self-stretch w-[1px]"></div>
        <div className="translate-x-[0] translate-y-[25%] border-8 border-transparent border-t-[#777]"></div>
        <ul
          className={mergeClass(
            `absolute m-0 p-0 list-none hidden max-h-[15rem] overflow-y-auto border-[1px] border-[#777] rounded-[0.25rem] w-full left-0 top-[calc(100%-0.25rem)] bg-red-600 z-[100], ${
              isOpen ? "block" : ""
            }`
          )}
        >
          {options.map((option, index) => (
            <li
              key={option.value}
              onClick={(event) => {
                event.stopPropagation();
                selectOption(option);
                setIsOpen(false);
              }}
              onMouseEnter={() => setHighlightedIndex(index)}
              className={mergeClass(
                `px-2 py-1 cursor-pointer ${
                  isOptionSelected(option) ? "bg-[#66ccff]" : ""
                } ${index === highlightedIndex ? "bg-[#00aaff]" : ""}`
              )}
            >
              {option.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
