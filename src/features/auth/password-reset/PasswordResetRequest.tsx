import { Button } from "components/buttons/Button";
import { Input } from "components/input";
import AuthLayout from "features/auth/AuthLayout";
import { useFormik } from "formik";
import { usePasswordResetRequest } from "hooks/usePasswordResetRequest";
import {
  passwordResetValidationSchema,
  passwordResetValues,
} from "lib/validations/authValidation";
import ErrorMessage from "shared/ErrorMessage";
import SuccessMessage from "shared/SuccessMessage";

export default function PasswordResetRequest() {
  const {
    isLoadingPasswordReset,
    passwordResetRequestData,
    passwordResetRequestError,
    mutateResetRequest,
  } = usePasswordResetRequest();

  const formik = useFormik({
    initialValues: passwordResetValues,
    validationSchema: passwordResetValidationSchema,
    onSubmit: (values) => {
      mutateResetRequest(values);
    },
  });

  const {
    errors,
    touched,
    handleBlur,
    handleSubmit,
    handleChange,
    values,
    isValid,
    dirty,
  } = formik;
  return (
    <AuthLayout>
      <div className="">
        {passwordResetRequestError && (
          <ErrorMessage
            className="text-center text-sm  p-2 text-red-600 rounded-sm"
            error={passwordResetRequestError.message}
          />
        )}

        {passwordResetRequestData && (
          <SuccessMessage
            className="text-center text-green-900 text-sm bg-green-300"
            message={passwordResetRequestData.data}
          />
        )}
      </div>
      <form
        onSubmit={handleSubmit}
        className="border border-gray-200 rounded-md p-4"
      >
        <div className="">
          <h1 className="text-center text-24 font-hanken-semibold mb-4 text-white">
            Password Reset Request
          </h1>
        </div>
        <div className="mb-5">
          <Input
            placeholder="Enter email"
            name="email"
            type="email"
            className="w-full rounded-md text-20 h-16"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.email && errors.email && (
            <ErrorMessage error={errors.email!} />
          )}
        </div>
        <div className="text-center">
          <Button
            size="xl"
            type="submit"
            disabled={!(isValid && dirty)}
            className="dark:text-white"
            isLoading={isLoadingPasswordReset}
          >
            Send
          </Button>
        </div>
      </form>
    </AuthLayout>
  );
}
