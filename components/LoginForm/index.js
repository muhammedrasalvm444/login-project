"use client";
import { useAuth } from "../../context/authContext";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const schema = yup
  .object({
    username: yup.string().required("Username is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be atleast 6 characters"),
  })
  .required();
const LoginForm = () => {
  const { login, loading } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  console.log("loginform");
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) =>
    login({ username: data?.username, password: data?.password });

  return (
    <div className="flex items-center justify-center h-screen ">
      <div className="w-full max-w-md p-8 border border-black rounded-md bg-gradient-to-br from-white via-gray-400 to-white">
        <h1 className="text-3xl font-medium text-center text-white ">Login</h1>
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
            loadingPosition="start"
            fullWidth
            // startIcon={<SaveIcon />}
            className="flex items-center mt-4 bg-black hover:bg-gray-900 text-white font-medium "
            loading={loading}
          >
            Submit
          </LoadingButton>
        </form>
        <p className=" text-center my-4 font-bold">Or</p>
        <LoadingButton
          loadingPosition="start"
          fullWidth
          startIcon={<GitHubIcon />}
          className="flex items-center mt-4 bg-black hover:bg-gray-900 text-white font-medium "
          loading={loading}
        >
          Github
        </LoadingButton>{" "}
        <LoadingButton
          loadingPosition="start"
          fullWidth
          startIcon={<LinkedInIcon />}
          className="flex items-center mt-4 bg-blue-500 hover:bg-gray-900 text-white font-medium "
          loading={loading}
        >
          LinkedIn
        </LoadingButton>
      </div>
    </div>
  );
};
export default LoginForm;
