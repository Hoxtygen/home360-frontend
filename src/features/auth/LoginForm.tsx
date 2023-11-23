import { setCookie } from "cookies-next";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useEffect } from "react";

import BackButton from "components/buttons/BackButton";
import { Button } from "components/buttons/Button";
import { Input } from "components/inputs/Input";
import Spinner from "components/loaders/Spinner";
import ErrorMessage from "components/shared/ErrorMessage";
import useLocalStorage from "hooks/useLocalStorage";
import { useLogin } from "hooks/useLogin";
import { loginValues, userLoginValidationSchema } from "lib/validations";
import { toast } from "react-hot-toast";
import { AuthenticationSuccessResponse } from "typedef";

export default function LoginForm() {
  const router = useRouter();
  const { isLoadingLogin, mutateLogin, userData, userLoginError } = useLogin();
  const [user, setUser] = useLocalStorage<AuthenticationSuccessResponse | null>(
    "user",
    null
  );

  useEffect(() => {
    if (userData && userData.token) {
      setCookie("token", userData.token, {
        path: "/",
        httpOnly: false,
      });
    }
    if (userData && userData.status === 200) {
      setUser(userData);
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
    <div>
      <form action="" className="border p-4 bg-white" onSubmit={handleSubmit}>
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
              Forgot Password?click{" "}
              <Button
                variant="link"
                className="dark:bg-transparent dark:hover:underline dark:hover:bg-transparent p-0 dark:hover:text-black"
                href="/auth/password-reset"
              >
                here to reset
              </Button>
            </small>
          </p>
        </div>
        <div className="text-center">
          <Button
            size="xl"
            type="submit"
            disabled={!(formik.isValid && formik.dirty)}
            className="dark:text-white"
          >
            {isLoadingLogin ? <Spinner /> : "Submit"}
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
