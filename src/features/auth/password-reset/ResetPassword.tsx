import { Button } from "components/buttons/Button";
import { Input } from "components/inputs/Input";
import ErrorMessage from "components/shared/ErrorMessage";
import SuccessMessage from "components/shared/SuccessMessage";
import { setCookie } from "cookies-next";
import { useFormik } from "formik";
import { useResetPassword } from "hooks/useResetPassword";
import {
  resetPasswordValidationSchema,
  resetPasswordValues,
} from "lib/validations/authValidation";
import React, { useEffect } from "react";
import AuthLayout from "../AuthLayout";

export default function ResetPassword({ token }: { token: string }) {
  const {
    isLoadingResetPassword,
    mutateResetPassword,
    resetPasswordData,
    resetPasswordError,
  } = useResetPassword();

  const formik = useFormik({
    initialValues: resetPasswordValues,
    validationSchema: resetPasswordValidationSchema,
    onSubmit: (values) => {
      mutateResetPassword(values);
      formik.resetForm();
    },
  });
  useEffect(() => {
    setCookie("resetPasswordToken", token);
  }, [token]);
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
        {resetPasswordError && (
          <ErrorMessage
            className="text-18 bg-white"
            error={resetPasswordError.message}
          />
        )}
        {resetPasswordData && (
          <SuccessMessage
            className="bg-white text-18"
            message={resetPasswordData.message}
          />
        )}
      </div>
      <form onSubmit={handleSubmit} className="border p-4">
        <h1 className="text-center text-24 font-hanken-semibold mb-4 text-white">
          Reset your password
        </h1>
        <div className="mb-5">
          <Input
            name="newPassword"
            type="password"
            placeholder="Enter password"
            value={values.newPassword}
            className="w-full rounded-md text-20 h-16"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.newPassword && errors.newPassword && (
            <ErrorMessage
              className="text-red-500"
              error={errors.newPassword!}
            />
          )}
        </div>
        <div className="mb-5">
          <Input
            name="confirmPassword"
            type="password"
            placeholder="Enter confirm password"
            value={values.confirmPassword}
            className="w-full rounded-md text-20 h-16"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.confirmPassword && errors.confirmPassword && (
            <ErrorMessage
              className="text-red-500"
              error={errors.confirmPassword!}
            />
          )}
        </div>
        <div className="text-center">
          <Button
            size="xl"
            type="submit"
            disabled={!(isValid && dirty)}
            className="dark:text-white"
            isLoading={isLoadingResetPassword}
          >
            Submit
          </Button>
        </div>
      </form>
    </AuthLayout>
  );
}
