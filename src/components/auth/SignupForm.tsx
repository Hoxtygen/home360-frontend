import BackButton from "components/BackButton";
import { Button } from "components/Button";
import { Input } from "../Input";
import { useFormik } from "formik";
import { userSignupValidationSchema } from "lib/validations";
import Error from "components/Error";
import fetcher from "lib/utils/fetcher";
import { SIGNUP_URL } from "constants/urls";
import useLocalStorage from "hooks/useLocalStorage";
import { userInitialData } from "constants/staticData";
import { useRouter } from "next/router";
import { useState } from "react";
import { isAxiosError } from "axios";

type RegError = {
  field: string;
  errorMessage: string;
};

export default function SignupForm() {
  const [_, setUser] = useLocalStorage("user", userInitialData);
  const [error, setError] = useState<RegError[] | null | string>(null);
  const router = useRouter();
  const formValues = {
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    phoneNumber: "",
    password: "",
  };
  const formik = useFormik({
    initialValues: formValues,
    validationSchema: userSignupValidationSchema,
    onSubmit: (values) => {
      handleRegister(values);
    },
  });

  async function handleRegister(data: any) {
    try {
      const response = await fetcher(SIGNUP_URL, {
        method: "POST",
        data: data,
      });
      setUser(response.data.data);
      router.push("/dashboard");
    } catch (error) {
      if (isAxiosError(error)) {
        setError(error?.response?.data.error);
      } else {
        setError("something went wrong");
      }
    }
  }
  const { errors, touched, handleBlur } = formik;

  function displayError(signupError: RegError[] | string) {
    if (typeof signupError === "string") {
      return <Error error={signupError} className="text-center mb-2" />;
    } else {
      return signupError.map((err) => (
        <Error
          key={err.field}
          error={err.errorMessage}
          className="text-center mb-1"
        />
      ));
    }
  }

  return (
    <form onSubmit={formik.handleSubmit} className="border p-4 bg-white">
      <div className="flex items-center mb-8">
        <BackButton
          className="pr-14"
          btnClassName="dark:bg-transparent bg-transparent dark:hover:bg-transparent dark:hover:text-black"
        />
        <h3 className="align-middle">Registration Form</h3>
      </div>
      {error && displayError(error)}
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
          disabled={!(formik.isValid && formik.dirty)}
          className="dark:text-white"
        >
          Submit
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
