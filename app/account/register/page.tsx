"use client";
import { supabase } from "@/lib/supabaseClient";
import { useState } from "react";
export default function Page() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [signUpError, setSignUpError] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");

  const handleSubmit = async () => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          firstName,
          lastName,
        },
      },
    });
    if (error) {
      setSignUpError(error.message);
    } else {
      return;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {signUpError && <p className="text-red-500">{signUpError}</p>}
      <form className="flex flex-col items-center justify-center">
        <fieldset>
          <label htmlFor="email" className="block mt-4 font-bold">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="password" className="block mt-4 font-bold">
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {signUpError && <p className="text-red-500">{signUpError}</p>}
        </fieldset>
        <fieldset>
          <label htmlFor="firstName" className="block mt-4 font-bold">
            First Name:
          </label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="lastName" className="block mt-4 font-bold">
            Last Name:
          </label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </fieldset>
        <button
          className="bg-primary dark:bg-complementary text-white cursor-pointer text-center font-bold py-2 px-4 rounded mt-4"
          type="button"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
