import { mergeClass } from "lib/utils/utils";
import { ChangeEvent, useState } from "react";
import InputLabel from "../inputLabel/InputLabel";
import { AutoTextAreaProps } from "./types";

export default function AutoTextArea({
  label,
  className,
  value,
  ...props
}: AutoTextAreaProps) {
  const [state, setState] = useState({
    rows: props.rows || 7,
    minRows: 7,
    maxRows: 10,
  });

  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    const textareaLineHeight = 24;
    const { minRows, maxRows } = state;
    const previousRows = event.target.rows;
    event.target.rows = minRows;
    const currentRows = ~~(event.target.scrollHeight / textareaLineHeight);

    if (currentRows === previousRows) {
      event.target.rows = currentRows;
    }

    if (currentRows >= maxRows) {
      event.target.rows = maxRows;
      event.target.scrollTop = event.target.scrollHeight;
    }
    setState({
      ...state,
      rows: currentRows < maxRows ? currentRows : maxRows,
    });
    if (props.onChange) {
      props.onChange(event);
    }
  }

  return (
    <div className="">
      {label && (
        <div className="">
          <InputLabel label={label} htmlFor={props.id} />
        </div>
      )}
      <textarea
        cols={props.cols}
        rows={state.rows || props.rows}
        onBlur={props.onBlur}
        value={value}
        className={mergeClass(
          "textarea leading-6 p-3 box-border border dark:border-gray-200 rounded text-[1rem] resize-none overflow-auto h-auto shadow-[0px 4px 10px -8px black] outline-none border-black",
          className
        )}
        onChange={handleChange}
        name={props.name}
        maxLength={props.maxLength}
        placeholder={props.placeholder}
        id={props.id}
      />
    </div>
  );
}
