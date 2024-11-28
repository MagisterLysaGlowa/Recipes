"use client";
import { signIn } from "next-auth/react";
import React, { ChangeEvent, SyntheticEvent, useState } from "react";

interface LoginData {
  email: string;
  password: string;
}

const LoginPage = () => {
  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    signIn("credentials", {
      email: loginData.email,
      password: loginData.password,
      callbackUrl: "/",
      redirect: true,
    });
  };
  return (
    <section>
      <h2>Login Page</h2>
      <form onSubmit={handleSubmit}>
        <label>E-mail</label>
        <input type="text" name="email" onChange={handleChange} />
        <label>Hasło</label>
        <input type="password" name="password" onChange={handleChange} />
        <button>Zaloguj się</button>
      </form>
      <button
        type="button"
        onClick={() => {
          signIn("github", {
            callbackUrl: "/",
            redirect: true,
          });
        }}
      >
        Github
      </button>
    </section>
  );
};

export default LoginPage;
