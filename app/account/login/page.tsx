"use client";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    error ? setError(error.message) : setError("");
  };

  return (
    <div className="h-full">
      <h2 className="text-3xl font-bold text-center my-4">Log In</h2>
      <form autoComplete="off" className="w-fit md:w-1/2 mx-auto">
        <fieldset className="text-center mb-3">
          <label htmlFor="email" className="block text-2xl dark:text-slate-200">
            E-Mail:
          </label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </fieldset>
        <fieldset className="text-center mb-3">
          <label
            htmlFor="password"
            className="block text-2xl dark:text-slate-200"
          >
            Password:
          </label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </fieldset>
        <Link
          href={"/password-forgotten"}
          className="dark:text-slate-200 text-center w-full block"
        >
          Password forgotten?
        </Link>
        {error ? <p className="text-red-500">{error}</p> : null}
        <button className="btn-complementary mt-2 mx-auto px-6">Submit</button>
      </form>
    </div>
  );
}
