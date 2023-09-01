import BackButton from "components/BackButton";
import { Button } from "components/Button";
import Error from "components/Error";
import { useFormik } from "formik";
import toast from "react-hot-toast";

import { userSignupValidationSchema, userSignupValues } from "lib/validations";
import { useRouter } from "next/router";
import { Input } from "../Input";
import useSignup from "hooks/useSignup";
import Spinner from "components/loaders/Spinner";
import { useEffect } from "react";

export default function SignupForm() {
  const router = useRouter();

  const { isLoadingUserSignup, mutateSignup, userSignupData, userSignupError } =
    useSignup();

  const formik = useFormik({
    initialValues: userSignupValues,
    validationSchema: userSignupValidationSchema,
    onSubmit: (values) => {
      mutateSignup(values);
    },
  });

  useEffect(() => {
    if (userSignupData?.status === 201) {
      toast.success(userSignupData.message);
      router.push("/login");
    }
  }, [router, userSignupData?.message, userSignupData?.status]);

  const { errors, touched, handleBlur, handleSubmit } = formik;

  function displayError(signupError: string[] | string) {
    if (typeof signupError === "string") {
      return <Error error={signupError} className="text-center mb-2" />;
    } else {
      return signupError.map((err, index) => (
        <Error key={index} error={err} className="text-center mb-2" />
      ));
    }
  }

  return (
    <form onSubmit={handleSubmit} className="border p-4 bg-white">
      <div className="flex items-center mb-8">
        <BackButton
          className="pr-14"
          btnClassName="dark:bg-transparent bg-transparent dark:hover:bg-transparent dark:hover:text-black"
        />
        <h3 className="align-middle">Registration Form</h3>
      </div>
      {userSignupError?.errors && displayError(userSignupError?.errors)}
      {userSignupError?.message && (
        <Error error={userSignupError.message} className="text-center mb-2" />
      )}
      <div className=" mb-5">
        <Input
          placeholder="Enter first name"
          name="firstName"
          type="text"
          className="w-full"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          onBlur={handleBlur}
        />
        {touched.firstName && errors.firstName && (
          <Error error={errors.firstName!} />
        )}
      </div>
      <div className=" mb-5">
        <Input
          placeholder="Enter last name"
          name="lastName"
          type="text"
          className="w-full"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          onBlur={handleBlur}
        />
        {touched.lastName && errors.lastName && (
          <Error error={errors.lastName!} />
        )}
      </div>
      <div className=" mb-5">
        <Input
          placeholder="Enter email"
          name="email"
          type="email"
          className="w-full"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {touched.email && errors.email && <Error error={errors.email!} />}
      </div>
      <div className=" mb-5">
        <Input
          placeholder="Enter address"
          name="address"
          type="text"
          className="w-full"
          value={formik.values.address}
          onChange={formik.handleChange}
          onBlur={handleBlur}
        />
        {touched.address && errors.address && <Error error={errors.address!} />}
      </div>
      <div className=" mb-5">
        <Input
          placeholder="Enter phone number"
          name="phoneNumber"
          type="text"
          className="w-full"
          value={formik.values.phoneNumber}
          onChange={formik.handleChange}
          onBlur={handleBlur}
        />
        {touched.phoneNumber && errors.phoneNumber && (
          <Error error={errors.phoneNumber!} />
        )}
      </div>
      <div className=" mb-5">
        <Input
          placeholder="Enter password"
          name="password"
          type="password"
          className="w-full"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={handleBlur}
        />
        {touched.password && errors.password && (
          <Error error={errors.password!} />
        )}
      </div>
      <div className="text-center">
        <Button
          size="xl"
          type="submit"
          disabled={!(formik.isValid && formik.dirty) || isLoadingUserSignup}
          className="dark:text-white"
        >
          {isLoadingUserSignup ? <Spinner /> : "Submit"}
        </Button>
      </div>
      <p className="text-center">
        <small>
          Already registered? Login{" "}
          <Button
            variant="link"
            href="/login"
            className="dark:bg-transparent dark:hover:underline dark:hover:bg-transparent p-0 dark:hover:text-black dark:disabled:bg-green-300"
          >
            here
          </Button>
        </small>
      </p>
    </form>
  );
}
