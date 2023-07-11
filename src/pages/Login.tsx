import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ContainedButton from "../components/buttons/ContainedButton";
import TextField from "../components/textfields/DefaultTextField";
import { useAuth } from "../contexts/AuthContext";
import { LoginValues, loginValueSchema } from "../validations/LoginValidation";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const { auth, login, loginError } = useAuth();
  const [loginErr, setLoginErr] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginValueSchema),
  });

  const onSubmit: SubmitHandler<LoginValues> = async (data) => {
    const { email, password } = data;
    setLoginErr(false);
    await login({ email, password });
    setLoginErr(loginError);
  };

  useEffect(() => {
    if (auth) {
      navigate("/dashboard");
    }
  }, [auth, navigate]);

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        {loginErr && (
          <div
            className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 w-full sm:max-w-md"
            role="alert"
          >
            <svg
              className="flex-shrink-0 inline w-4 h-4 mr-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span className="sr-only">Info</span>
            <div>
              <span className="font-bold">Error</span> Invalid email or password
            </div>
          </div>
        )}

        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Login to your account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <TextField
                {...register("email")}
                label="Your email"
                placeholder="name@mail.com"
                error={errors.email?.message}
              />
              <TextField
                {...register("password")}
                type="password"
                label="Password"
                placeholder="••••••••"
                error={errors.password?.message}
              />
              <ContainedButton
                type="submit"
                disabled={isSubmitting}
                loading={isSubmitting}
              >
                Login
              </ContainedButton>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
