"use client";
import { supabase } from "@/lib/supabaseClient";
import { checkUserState } from "@/helpers/helpers";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const moon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="size-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
    />
  </svg>
);

const sun = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="size-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
    />
  </svg>
);

const SignOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error(error);
  }
};

const pages = [
  { name: "Home", href: "/", enabled: true },
  { name: "Recipes", href: "/recipes", enabled: true },
  { name: "Random", href: "/random", enabled: true },
  { name: "About", href: "/about", enabled: true },
  { name: "Contact", href: "/contact", enabled: true },
];

const filteredPages = pages.filter((page) => page.enabled);

export default function Navigation() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const pathname = usePathname();

  const toggleTheme = async () => {
    localStorage.setItem("theme", !isDark ? "dark" : "light");
    setIsDark(!isDark);
    document.body.classList.toggle("dark");
  };

  const fetchUserState = async () => {
    try {
      const loggedIn = await checkUserState();
      setLoggedIn(loggedIn);
    } catch (error) {
      console.error("Error checking user state:", error);
    }
  };

  const setTheme = () => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      setIsDark(true);
      document.body.classList.add("dark");
    }
  };

  useEffect(() => {
    fetchUserState();
    setTheme();
  }, []);
  return (
    <nav className="flex justify-between items-center w-full font-bold px-32 text-xl dark:text-stone-100">
      <ul id="navigation" className="flex gap-2 m-4">
        {filteredPages.map((page) => (
          <li key={page.name}>
            <Link
              href={page.href}
              className={`link ${
                pathname === page.href && "text-primary dark:text-complementary"
              }`}
            >
              {page.name}
            </Link>
          </li>
        ))}
        {loggedIn ? (
          <li>
            <a href="/create">Create Recipe</a>
          </li>
        ) : null}
      </ul>
      <ul className="flex gap-2 items-center">
        {loggedIn ? (
          <li>
            <a href="#" onClick={SignOut}>
              Sign Out
            </a>
          </li>
        ) : (
          <li>
            <a
              href="/account/login"
              className={`link ${
                pathname === "/account/login" &&
                "text-primary dark:text-complementary"
              }`}
            >
              Sign In
            </a>
          </li>
        )}
        <div id="theme">
          <span
            className="link dark:text-gray text-slate-200 cursor-pointer hover:text-black bg-primary dark:bg-complementary px-2 py-2 rounded block"
            onClick={toggleTheme}
          >
            {isDark ? moon : sun}
          </span>
        </div>
      </ul>
    </nav>
  );
}
