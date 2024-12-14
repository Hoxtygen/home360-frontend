import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

import BackButton from "components/buttons/BackButton";
import { Button } from "components/buttons/Button";
import { Input } from "components/input";
import useLocalStorage from "hooks/useLocalStorage";
import { useLogin } from "hooks/useLogin";
import { mapLoginResponse } from "lib/utils/utils";
import { loginValues, userLoginValidationSchema } from "lib/validations";
import ErrorMessage from "shared/ErrorMessage";
import { MappedSuccessLoginResponse } from "typedef";

export default function LoginForm() {
  const router = useRouter();
  const { isLoadingLogin, mutateLogin, userData, userLoginError } = useLogin();
  const [_, setUser] = useLocalStorage<MappedSuccessLoginResponse | null>(
    "user",
    null
  );

  useEffect(() => {
    if (userData && userData.status === "OK") {
      setUser(mapLoginResponse(userData));
      toast.success(userData.message);
      router.push("/dashboard");
      return;
    }
  }, [router, setUser, userData]);

  const formik = useFormik({
    initialValues: loginValues,
    validationSchema: userLoginValidationSchema,
    onSubmit: (values) => {
      mutateLogin(values);
    },
  });

  const { errors, touched, handleBlur, values, handleSubmit } = formik;

  return (
    <div className="dark: text-black">
      <form
        action=""
        className="border p-4 bg-white dark:bg-[#F7F7F7] text-18 rounded-md"
        onSubmit={handleSubmit}
      >
        <div className="flex items-center mb-8">
          <BackButton
            className="pr-14"
            btnClassName="dark:bg-transparent bg-transparent dark:hover:bg-transparent dark:hover:text-black"
          />
          <h3>Login Form</h3>
        </div>
        {userLoginError && (
          <ErrorMessage
            error={userLoginError.message}
            className="text-center mb-4"
          />
        )}
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
          {touched.email && errors.email && (
            <ErrorMessage error={errors.email!} />
          )}
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
            <ErrorMessage error={errors.password!} />
          )}
          <p>
            <small>
              Forgot Password?click
              <Button
                variant="link"
                className="dark:bg-transparent dark:hover:underline dark:hover:bg-transparent p-0 dark:hover:text-black mx-1"
                href="/auth/password-reset-request"
              >
                here
              </Button>
              to reset
            </small>
          </p>
        </div>
        <div className="text-center">
          <Button
            size="xl"
            type="submit"
            disabled={!(formik.isValid && formik.dirty)}
            className="dark:text-white"
            isLoading={isLoadingLogin}
          >
            Submit
          </Button>
        </div>
        <p className="text-center">
          <small>
            Not registered yet? signup{" "}
            <Button
              className="dark:bg-transparent dark:hover:underline dark:hover:bg-transparent p-0 dark:hover:text-black "
              href="/auth/signup"
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
