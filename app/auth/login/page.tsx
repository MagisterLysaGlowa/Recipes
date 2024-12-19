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
    <section className="w-full flex justify-center h-[90vh] items-center">
      <div className="flex flex-col w-full max-w-[400px]">
        <h2 className="text-main text-5xl text-center font-extrabold mb-12 uppercase ">
          Login To Our System
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label className="text-main text-xl font-bold mb-2">E-mail</label>
          <input
            type="text"
            name="email"
            onChange={handleChange}
            className="outline-none h-12 bg-white rounded-xl pl-3 text-xl"
          />
          <label className="text-main text-xl font-bold mb-2">Hasło</label>
          <input
            className="outline-none h-12 bg-white rounded-xl pl-3 text-xl"
            type="password"
            name="password"
            onChange={handleChange}
          />
          <button className="outline-none h-12 bg-main text-white rounded-xl text-xl font-bold mt-10">
            Zaloguj się
          </button>
        </form>
        <button
          className="outline-none h-12 bg-transparent border-2 text-gray rounded-xl text-xl font-bold mt-5"
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
      </div>
    </section>
  );
};

export default LoginPage;
