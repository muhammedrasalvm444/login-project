"use client";
import { useAuth } from "../../context/authContext";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import React, { useCallback, useEffect, useState } from "react";
import { LoginSocialGithub, LoginSocialLinkedin } from "reactjs-social-login";
import {
  GithubLoginButton,
  LinkedInLoginButton,
} from "react-social-login-buttons";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const schema = yup
  .object({
    username: yup.string().required("Username is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be atleast 6 characters"),
  })
  .required();
const REDIRECT_URI = "http://localhost:3000/login";

const LoginForm = () => {
  const { login, loading, setToken, token } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const onLoginStart = useCallback(() => {
    alert("Are you sure with Login this method");
  }, []);

  const onLogoutSuccess = useCallback(() => {
    setProfile(null);
    setProvider("");
    alert("logout success");
  }, []);
  const [provider, setProvider] = useState("");
  const [profile, setProfile] = useState();
  const router = useRouter();

  const onLogout = useCallback(() => {}, []);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    login({ username: data?.username, password: data?.password });
  };
  useEffect(() => {
    if (profile) {
      setToken(profile?.access_token);
      localStorage.setItem("token", token);
      toast.success("You are successfully logged in");
    }
    if (token) {
      router?.push("/");
    }
  }, [profile, token]);

  return (
    <div className="flex items-center justify-center h-screen ">
      <div className="w-full max-w-md p-8 border border-black rounded-md shadow-xl bg-white">
        <h1 className="text-3xl font-medium text-center text-black ">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="username"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="User name"
                variant="outlined"
                margin="normal"
                fullWidth
                error={!!errors.username}
                helperText={errors.username?.message}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Password"
                variant="outlined"
                margin="normal"
                fullWidth
                type={showPassword ? "text" : "password"}
                error={!!errors.password}
                helperText={errors.password?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />

          <LoadingButton
            // loadingPosition="start"
            fullWidth
            type="submit"
            // startIcon={<SaveIcon />}
            className="flex items-center mt-4 bg-black hover:bg-gray-900 text-white font-medium "
            loading={loading}
            sx={{
              backgroundColor: loading ? "gray" : "black",
              "&:hover": {
                backgroundColor: loading ? "gray" : "gray", // Adjust hover color as needed
              },
              color: "white",
              "&.MuiButton-loading .MuiCircularProgress-circle": {
                color: "white",
              },
            }}
          >
            {loading ? "Loading" : "Submit"}
          </LoadingButton>
        </form>
        <p className=" text-center my-4 font-bold">Or</p>
        <div className=" flex flex-col gap-">
          <LoginSocialLinkedin
            isOnlyGetToken
            client_id={"86b519lwppqk42" || ""}
            client_secret={"I8YweePNcON4uF9f" || ""}
            redirect_uri={REDIRECT_URI}
            onLoginStart={onLoginStart}
            onResolve={({ provider, data }) => {
              setProvider(provider);
              setProfile(data);
            }}
            onReject={(err) => {}}
          >
            <LinkedInLoginButton />
          </LoginSocialLinkedin>
          <LoginSocialGithub
            isOnlyGetToken
            client_id={"b0c563118d14cd712181" || ""}
            client_secret={"57e134e7d179dea327125f06cab7d63e3abbcef6" || ""}
            redirect_uri={REDIRECT_URI}
            onLoginStart={onLoginStart}
            onLogoutSuccess={onLogoutSuccess}
            onResolve={({ provider, data }) => {
              setProvider(provider);
              setProfile(data);
            }}
            onReject={(err) => {}}
          >
            <GithubLoginButton />
          </LoginSocialGithub>
        </div>
      </div>
    </div>
  );
};
export default LoginForm;
