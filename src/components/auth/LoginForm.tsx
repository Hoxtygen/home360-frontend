import BackButton from "components/BackButton";
import { Button } from "components/Button";
import { Input } from "components/Input";
import React from "react";
import { useFormik } from "formik";
import { userLoginValidationSchema } from "lib/validations";
import Error from "components/Error";
import { useAuth } from "context/AuthContext";
import { LoginData } from "typedef";

export default function LoginForm() {
  const loginFormValues: LoginData = {
    email: "",
    password: "",
  };

  const { state, login } = useAuth();
  const { error } = state;

  const formik = useFormik({
    initialValues: loginFormValues,
    validationSchema: userLoginValidationSchema,
    onSubmit: (values) => {
      login(values);
    },
  });

  const { errors, touched, handleBlur, values, handleSubmit } = formik;

  return (
    <div>
      <form action="" className="border p-4 bg-white" onSubmit={handleSubmit}>
        <div className="flex items-center mb-8">
          <BackButton
            className="pr-14"
            btnClassName="dark:bg-transparent bg-transparent dark:hover:bg-transparent dark:hover:text-black"
          />
          <h3>Login Form</h3>
        </div>
        {error && <Error error={error} className="text-center mb-4" />}
        <div className="mb-5">
          <Input
            name="email"
            placeholder="Enter your email e.g jondoe@example.com"
            type="email"
            value={values.email}
            className="w-full"
            onChange={formik.handleChange}
            onBlur={handleBlur}
          />
          {touched.email && errors.email && <Error error={errors.email!} />}
        </div>
        <div className="mb-5">
          <Input
            name="password"
            type="password"
            placeholder="Enter password"
            value={values.password}
            className="w-full"
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
            Not registered yet? signup{" "}
            <Button
              className="dark:bg-transparent dark:hover:underline dark:hover:bg-transparent p-0 dark:hover:text-black "
              href="/signup"
              variant="link"
            >
              here
            </Button>
          </small>
        </p>
      </form>
    </div>
  );
}
