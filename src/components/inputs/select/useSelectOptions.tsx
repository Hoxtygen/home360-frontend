import { formatString } from "lib/utils/utils";

export type UseSelectOptionsParams<T> = {
  options: readonly T[];
  getLabel: (option: T) => string;
};

export function useSelectOptions<T extends string>({
  options,
  getLabel,
}: UseSelectOptionsParams<T>) {
  return (
    <>
      {options.map((option, index) => (
        <option key={index} value={formatString(option.toString())}>
          {getLabel(option)}
        </option>
      ))}
    </>
  );
}
