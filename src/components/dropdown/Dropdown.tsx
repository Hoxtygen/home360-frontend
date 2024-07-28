import { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { GoChevronDown } from "react-icons/go";
import useOutsideClick from "hooks/useOutsideClick";
import { SelectOption } from "features/listings/types";
import { DropdownProps } from "./types";

const Dropdown = ({
  id,
  name,
  title = "Select",
  data,
  position = "bottom-left",
  hasImage = false,
  style,
  selectedId,
  onSelect,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<SelectOption | undefined>(
    selectedId ? data?.find((item) => item.value === selectedId) : undefined
  );

  const handleChange = (item: SelectOption) => {
    setSelectedItem(item);
    onSelect && onSelect(item.value);
    setIsOpen(false);
  };

  useEffect(() => {
    if (selectedId && data) {
      const newSelectedItem = data.find((item) => item.value === selectedId);
      newSelectedItem && setSelectedItem(newSelectedItem);
    } else {
      setSelectedItem(undefined);
    }
  }, [selectedId, data]);

  const dropdownRef = useRef<HTMLDivElement>(null);
  useOutsideClick({
    ref: dropdownRef,
    handler: () => setIsOpen(false),
  });

  const dropdownClass = classNames(
    "absolute bg-gray-100 max-h-52 overflow-y-auto py-3 rounded shadow-md z-10 w-full",
    {
      "top-full right-0 mt-2": position === "bottom-right",
      "top-full left-0 mt-2": position === "bottom-left",
      "bottom-full right-0 mb-2": position === "top-right",
      "bottom-full left-0 mb-2": position === "top-left",
    }
  );

  return (
    <div ref={dropdownRef} className="relative h-12">
      <button
        id={id}
        name={name}
        aria-label="Toggle dropdown"
        aria-haspopup="true"
        aria-expanded={isOpen}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={classNames(
          "flex justify-between items-center gap-5 rounded w-full py-2 px-4  border border-black text-black h-full",
          style
        )}
      >
        <span>{selectedItem?.label || title}</span>
        <GoChevronDown
          size={20}
          className={classNames("transform duration-500 ease-in-out", {
            "rotate-180": isOpen,
          })}
        />
      </button>
      {/* Open */}
      {isOpen && (
        <div aria-label="Dropdown menu" className={dropdownClass}>
          <ul
            role="menu"
            aria-labelledby={id}
            aria-orientation="vertical"
            className="leading-10"
          >
            {data?.map((item) => (
              <li
                key={item.label}
                onClick={() => handleChange(item)}
                className={classNames(
                  " items-center cursor-pointer hover:bg-gray-200 px-3",
                  { "bg-gray-300": selectedItem?.value === item.value }
                )}
              >
                {/* {hasImage && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.imageUrl}
                    alt='image'
                    loading='lazy'
                    className='w-8 h-8 rounded-full bg-gray-400 object-cover me-2'
                  />
                )} */}
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
