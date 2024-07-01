"use client";
import { supabase } from "@/lib/supabaseClient";
import { checkUserState } from "@/helpers/helpers";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

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

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  useEffect(() => {
    const fetchUserState = async () => {
      try {
        const loggedIn = await checkUserState();
        setLoggedIn(loggedIn);
      } catch (error) {
        console.error("Error checking user state:", error);
      }
    };
    fetchUserState();
  }, []);
  return (
    <nav className="flex justify-between items-center w-full font-bold px-5 text-2xl">
      <ul id="navigation" className="flex gap-2 m-4">
        {filteredPages.map((page) => (
          <li key={page.name}>
            <Link
              href={page.href}
              className={`link ${pathname === page.href && "text-red-500"}`}
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
      <ul className="flex gap-2">
        {loggedIn ? (
          <li>
            <a href="#" onClick={SignOut}>
              Sign Out
            </a>
          </li>
        ) : (
          <li>
            <a href="/account/login">Sign In</a>
          </li>
        )}
        <div id="theme">
          <span
            className="link text-gray dark:text-slate-200 cursor-pointer hover:text-black"
            onClick={toggleTheme}
          >
            {isDark ? "Dark" : "Light"}
          </span>
        </div>
      </ul>
    </nav>
  );
}
