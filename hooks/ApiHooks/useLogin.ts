"use client";
import { useState } from "react";
import { getCookies, removeCookies, setCookies } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import {
  ForgotPasswordd,
  login,
  ResetPasswordd,
  SignUp,
  TwoFACode,
  VerifyCode,
} from "@/services/auth/auth";
import { loginn, logout, signup } from "@/redux/userSlice";
import toast from "react-hot-toast";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const handleSignup = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      const result = await SignUp(values);
      if (!result) {
        toast.error("Login failed: No response from API");
        return;
      }
      const { status, data } = result;
      if (status === 201) {
        console.log("saaaaaaa", data.token, data.user);
        toast.success("Signup successful");
        setCookies("token", data.token);
        dispatch(signup(data.user));
        router.push(`/integration?step=1`);
      } else {
        toast.error("Login failed: API returned error");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(
        error?.data?.error || "Login error: Unexpected error occurred"
      );
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  const handleLogin = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      const result = await login(values);
      console.log(result, "loginDataafterLogin");
      if (!result) {
        toast.error("Login failed: No response from API");
        return;
      }
      const { status, data } = result;
      console.log("🚀 ~ handleLogin ~ data:", data);
      if (status === 200) {
        // if (data?.loginExpired === true) {
        //   router.push(`/login?method=2fa`);
        // }
        // if (data?.loginExpired === false) {
        toast.success("Login successful");
        setCookies("token", data.token);
        dispatch(loginn(data.user));
        // if (data?.role === "admin") {
        //   router.push(`/admin/dashboard/`);
        // } else {
        //   router.push(`/dashboard/home/`);
        // }
        router.push(`/dashboard/home/`);
        // }
        // console.log(data?.data?.token);
        // router.push(`/${data?.data?.role}/dashboard`);
      } else {
        toast.error("Login failed: API returned error");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(
        error?.data?.error || "Login error: Unexpected error occurred"
      );
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  const handleLogout = () => {
    setLoading(true);
    try {
      removeCookies("token");
      removeCookies("role");
      removeCookies("switch_role");
      // dispatch(logout());
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (error: any) {
      console.log(error);
      toast.error("Logout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const Varify2FA = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      const result = await TwoFACode(values);
      console.log(result, "loginDataafterLogin");
      if (!result) {
        toast.error("Login failed: No response from API");
        return;
      }
      const { status, data } = result;
      console.log("🚀 ~ Varify2FA ~ data:", data);
      if (status === 200) {
        localStorage.setItem("role", data.data?.role);
        if (data?.loginExpired === true) {
          router.push(`/2fa`);
        } else if (data?.loginExpired === false) {
          toast.success("Login successful");
          setCookies("token", data.data.token);
          setCookies("role", data.data?.role);
          dispatch(loginn(data.data));
          if (data?.data?.role === "admin") {
            router.push(`/admin/dashboard/`);
          } else {
            router.push(`/dashboard/home/`);
          }
        }
        // console.log(data?.data?.token);
        // router.push(`/${data?.data?.role}/dashboard`);
      } else {
        toast.error("Login failed: API returned error");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(
        error?.data?.error || "Login error: Unexpected error occurred"
      );
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  const VarifyPasswordCode = async (values: {
    email: string;
    password: string;
  }) => {
    setLoading(true);

    try {
      const result = await VerifyCode(values);
      console.log(result, "loginDataafterLogin");
      if (!result) {
        toast.error("Login failed: No response from API");
        return;
      }

      const { status, data } = result;
      if (status === 200) {
        localStorage.setItem("role", data.data?.role);
        // Labels(data?.message || "Something went wrong", "success");
        if (data?.loginExpired === true) {
          router.push(`/2fa`);
        } else if (data?.loginExpired === false) {
          toast.success("Login successful");
          setCookies("token", data.data.token);
          setCookies("role", data.data?.role);
          // dispatch(loginn(data.data));
          // if (data?.data?.role === "staff") {
          //   const filteredMenu = filterMenuByPermissions(
          //     staffMenu,
          //     data?.data?.permissions,
          //   );
          //   dispatch(setPermissions(filteredMenu));
          // }
          if (
            data?.data?.role === "user" ||
            data?.data?.role === "club-admin"
          ) {
            router.push(`/ebay/dashboard`);
          }
        }
        // console.log(data?.data?.token);
        // router.push(`/${data?.data?.role}/dashboard`);
      } else {
        toast.error("Login failed: API returned error");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(
        error?.data?.error || "Login error: Unexpected error occurred"
      );
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  const ForgotPassword = async (values: {
    email: string;
    password: string;
  }) => {
    setLoading(true);
    try {
      const result = await ForgotPasswordd(values);
      console.log(result, "loginDataafterLogin");
      if (!result) {
        toast.error("Login failed: No response from API");
        return;
      }
      const { status, data } = result;
      if (status === 200) {
        router.push(`/login`);
        setLoading(false);
      } else {
        toast.error("Login failed: API returned error");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(
        error?.data?.error || "Login error: Unexpected error occurred"
      );
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  const ResetPassword = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      const result = await ResetPasswordd(values);
      console.log(result, "loginDataafterLogin");
      if (!result) {
        toast.error("Login failed: No response from API");
        return;
      }
      const { status, data } = result;
      if (status === 200) {
        router.push(`/login`);
        setLoading(false);
      } else {
        toast.error("Login failed: API returned error");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(
        error?.data?.error || "Login error: Unexpected error occurred"
      );
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  return {
    handleLogin,
    handleSignup,
    handleLogout,
    loading,
    ForgotPassword,
    ResetPassword,
    Varify2FA,
    VarifyPasswordCode,
  };
};
