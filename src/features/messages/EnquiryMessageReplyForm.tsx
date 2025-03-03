import React from "react";
import { Formik } from "formik";

import { AutoTextArea } from "components/autotextArea";
import { Button } from "components/buttons/Button";
import { maxCharacter } from "constant-data/staticData";
import { replyFormValidationSchema } from "./validationSchema";
import {
  EnquiryMessageReplyFormData,
  EnquiryMessageReplyFormProps,
} from "./types";

export default function EnquiryMessageReplyForm({
  replyInitialValues,
  handleSubmitReply,
  messageStatuses,
}: EnquiryMessageReplyFormProps<EnquiryMessageReplyFormData>) {
  const initialValues = {
    enquiryId: replyInitialValues.enquiryId,
    agentId: replyInitialValues.agentId,
    enquirerId: replyInitialValues.enquirerId,
    content: "",
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={replyFormValidationSchema}
        onSubmit={(values, actions) => {
          handleSubmitReply(values);

          actions.resetForm();
        }}
      >
        {({
          handleBlur,
          handleChange,
          values,
          handleSubmit,
          isValid,
          dirty,
        }) => (
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
              className="bg-primary-active dark:hover:bg-primary-disabled disabled:bg-slate-500 disabled:cursor-not-allowed"
              variant="outline"
              size="xl"
              disabled={!(isValid && dirty)}
              type="submit"
            >
              Send
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
}
