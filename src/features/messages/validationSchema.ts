import { number, object, string } from "yup";

export const replyFormValidationSchema = object().shape({
  enquiryId: string().required("Enquiry ID is required"),
  agentId: number().required("Agent ID is required"),
  enquirerId: number().required("Enquirer ID is required"),
  content: string()
    .required("Message content is required")
    .min(2, "You must type at least 2 characters"),
});
