"use client";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Eye, EyeSlash, Input } from "../common";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL, notify } from "../../utils";
import { AuthContext } from "../../context/AuthProvider";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    setValue,
    watch,
    getValues,
  } = useForm();
  const navigate = useNavigate();
  const { isLoggedIn, setLogin } = useContext(AuthContext);

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const onSubmit = async (data) => {
    try {
      if (data.email === "kminchelle" && data.password === "0lelplR") {
        const res = await axios.post(`${BACKEND_URL}/auth/login`, {
          username: "emilys",
          password: "emilyspass",
          expiresInMins: 600,
        });
        if (res.data.token) {
          localStorage.setItem("accessToken", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data));
          notify(`Welcome Back! ${res.data.firstName} ${res.data.lastName}`);
          setLogin();
          navigate("/");
        }
      } else {
        setError("apiError", { message: "Invalid credentials" });
      }
    } catch (e) {
      console.log(e);
      setError("apiError", { message: e?.message });
    }
  };

  const email = watch("email", "");
  const password = watch("password", "");
  const passwordShow = watch("passwordShow", false);

  return (
    <div className="flex flex-col justify-center items-center h-full bg-[url('https://1.bp.blogspot.com/--UQ8_O1EFN8/XWkZdpW_MMI/AAAAAAAATDE/kcJXA9nMy4ElB4NmBZDM6WwPE4JQD7ACQCLcBGAs/s1600/shape.png')] bg-cover">
      <div className="bg-[#133f878a] px-[40px] rounded-[12px] shadow-md py-[40px] w-[400px]">
        <form
          className="flex flex-col gap-[16px]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            label="Username"
            value={email}
            setValue={(value) => {
              clearErrors("email");
              clearErrors("apiError");
              setValue("email", value);
            }}
            placeholder="Enter your Username"
            type="text"
            isClearable
            error={errors?.email && errors?.email.message?.toString()}
            {...register("email", {
              required: "Username is required",
            })}
          />
          {/* {errors.email && <p className="text-red-500">{errors.email.message?.toString()}</p>} */}

          <Input
            label="Password"
            value={password}
            setValue={(value) => {
              clearErrors("password");
              clearErrors("apiError");
              setValue("password", value);
            }}
            placeholder="Enter your password"
            type={passwordShow ? "text" : "password"}
            error={errors.password && errors.password.message?.toString()}
            icon={
              passwordShow ? (
                <Eye onClick={() => setValue("passwordShow", false)} />
              ) : (
                <EyeSlash onClick={() => setValue("passwordShow", true)} />
              )
            }
            {...register("password", {
              required: "Password is required",
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{5,}$/,
                message:
                  "Password must be at least 5 characters long, contain at least one uppercase letter, one lowercase letter, and one digit.",
              },
            })}
          />
          {/* {errors.password && <p className="text-red-500">{errors.password.message?.toString()}</p>} */}

          {errors.apiError && (
            <div className="text-red-400 mt-2">
              {/* There was an error logging you in: {errors.apiError.message} */}
              Invalid Credentials, Please Try Again!
            </div>
          )}

          <div className="flex justify-center items-center mt-[20px]">
            <Button
              className="my-[20px] rounded-[10px] text-md font-medium w-[120px]"
              type="submit"
            >
              Log in
            </Button>
          </div>

          <div className="text-center mt-4 text-sm text-[#fff]">
            <div>Don&apos;t have an account?</div>
            <div className="text-[#000]">
              Click{" "}
              <Link to="/signup" className="text-white">
                here
              </Link>{" "}
              to signup.
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
