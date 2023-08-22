import useClickOutside from "hooks/useClickOutside";
import { ReactNode, useEffect, useState } from "react";

export interface OptionProps {
  label: string;
  value: string;
}

interface SidebarDropdownItemProps {
  name: string;
  isMenuActive: boolean;
  options: OptionProps[];
  activeOption?: string;
  children: ReactNode;
  tooltipText: string;
  onOptionSelect?: (value: string) => void;
}
export default function SidebarDropdown({
  options,
  activeOption,
  isMenuActive,
  name,
  children,
  tooltipText,
  onOptionSelect,
}: SidebarDropdownItemProps) {
  const [open, setOpen] = useState(false);
  const [hasWindowObject, setHasWindowObject] = useState(false);
  useEffect(() => setHasWindowObject(true), []);

  const node = useClickOutside(() => {
    setOpen(false);
  });

  const handleOptionClick = (option: string) => {
    onOptionSelect && onOptionSelect(option);
  };

  return (
    <div ref={node}>
      {/* {hasWindowObject && <Tooltip className="!overflow-visible" />} */}
      <div
        className={`flex items-center min-w-max w-full h-11 px-[18.5px] rounded-md ${
          !open && "mb-5"
        } text-16 
        hover:bg-primary-disabled ${
          isMenuActive
            ? "bg-primary-disabled bg-opacity-25 text-white"
            : "text-primary-disabled"
        } hover:text-white transition-all duration-300 cursor-pointer ease-linear hover:bg-opacity-25`}
        onClick={() => setOpen((val) => !val)}
      >
        <span className="flex items-center">{children}</span>
        <span className="ml-4 font-Open-Sans">{name}</span>
        <span className="ml-2">
          <svg
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12.2929 5.40617C12.6834 5.01565 13.3166 5.01565 13.7071 5.40617C14.0976 5.7967 14.0976 6.42986 13.7071 6.82039L8.70711 11.8204C8.31658 12.2109 7.68342 12.2109 7.29289 11.8204L2.29289 6.82039C1.90237 6.42986 1.90237 5.7967 2.29289 5.40617C2.68342 5.01565 3.31658 5.01565 3.70711 5.40617L8 9.69907L12.2929 5.40617Z"
            />
          </svg>
        </span>
        <span
          className="ml-2"
          data-tip={tooltipText}
          data-place="right"
          data-effect="solid"
        >
          <svg
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current"
          >
            <path
              d="M5.48511 6.11328C5.85118 5.33649 6.83895 4.77995 8.00004 4.77995C9.4728 4.77995 10.6667 5.67538 10.6667 6.77995C10.6667 7.71291 9.81496 8.49667 8.66285 8.71768C8.30125 8.78705 8.00004 9.07842 8.00004 9.44661M8 11.4466H8.00667M14 8.11328C14 11.427 11.3137 14.1133 8 14.1133C4.68629 14.1133 2 11.427 2 8.11328C2 4.79957 4.68629 2.11328 8 2.11328C11.3137 2.11328 14 4.79957 14 8.11328Z"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
      {open && (
        <>
          {(options || [])
            .sort((a: any, b: any) =>
              String(a.value) === String(activeOption)
                ? a.value - b.value
                : b.value - a.value
            )
            .map((option: OptionProps, index: number) => (
              <div
                key={index}
                onClick={() => handleOptionClick(option.value)}
                className={`flex items-center w-full h-11 px-[18.5px] rounded-md ml-3 text-16 
                hover:bg-primary-disabled ${
                  isMenuActive
                    ? "bg-primary-disabled bg-opacity-25 text-white"
                    : "text-primary-disabled"
                } hover:text-white transition-all duration-300 cursor-pointer ease-linear hover:bg-opacity-25`}
              >
                {String(option.value) === String(activeOption) ? (
                  <span>
                    <svg
                      width="6"
                      height="7"
                      viewBox="0 0 6 7"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="3" cy="3.61304" r="3" fill="white" />
                    </svg>
                  </span>
                ) : (
                  <span>
                    <svg
                      width="6"
                      height="7"
                      viewBox="0 0 6 7"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="3"
                        cy="3.61304"
                        r="3"
                        className="stroke-current"
                      />
                    </svg>
                  </span>
                )}
                <span className="ml-4 font-avenir-heavy">{option.label}</span>
              </div>
            ))}
        </>
      )}
    </div>
  );
}
