import { ChangeEvent, useCallback } from "react";

export type UseSelectParams<T> = {
  selectedOption: T;
  options: readonly T[];
  onChange: (option: T) => void;
};

export type UseSelect = {
  value: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
};
export function useSelect<T extends string>({
  selectedOption,
  options,
  onChange,
}: UseSelectParams<T>): UseSelect {
  const onChangeCallback = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const nextOption = options[event.currentTarget.selectedIndex];
      if (nextOption !== undefined) {
        onChange(nextOption);
      }
    },
    [options, onChange]
  );

  return {
    value: selectedOption,
    onChange: onChangeCallback,
  };
}
