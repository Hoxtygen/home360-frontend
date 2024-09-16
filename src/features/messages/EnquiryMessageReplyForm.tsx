import React from "react";
import { useFormik } from "formik";

import { maxCharacter } from "constant-data/staticData";
import { AutoTextArea } from "components/autotextArea";
import { Button } from "components/buttons/Button";
import {
  EnquiryMessageReplyFormData,
  EnquiryMessageReplyFormProps,
} from "./types";

export default function EnquiryMessageReplyForm({
  replyInitialValues,
  handleSubmitReply,
  messageStatus,
}: EnquiryMessageReplyFormProps<EnquiryMessageReplyFormData>) {
  const formik = useFormik({
    initialValues: replyInitialValues,
    onSubmit: (values, { resetForm }) => {
      handleSubmitReply(values, resetForm);
    },
  });

  const { handleBlur, handleChange, values, handleSubmit, isValid, dirty } =
    formik;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <AutoTextArea
          cols={30}
          maxLength={maxCharacter}
          name="content"
          placeholder="message content"
          id="content"
          value={values.content}
          onBlur={handleBlur}
          onChange={handleChange}
          className="w-1/2"
          autoComplete="on"
        />
        <Button
          className="bg-primary-active dark:hover:bg-rose-900"
          variant="outline"
          size="xl"
          disabled={!(isValid && dirty)}
          type="submit"
          isLoading={messageStatus === "loading"}
        >
          Send
        </Button>
      </form>
    </div>
  );
}
