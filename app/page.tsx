"use client";
import Image from "next/image";
import { recipe } from "@/interfaces/interfaces";
import { getRecipes } from "@/helpers/helpers";
import RecipePreview from "@/components/RecipePreview/RecipePreview";
import { useEffect, useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState<boolean>(true);
  const [recipes, setRecipes] = useState<recipe[]>([]);

  useEffect(() => {
    getRecipes(6, 0).then((data) => {
      setRecipes(data.data);
      setLoading(false);
    });
  }, []);

  return (
    <main>
      <h2 className="font-bold text-4xl">Latest recipes:</h2>
      <div className="md:flex flex-wrap justify-around">
        {recipes.map((recipe) => {
          return (
            <RecipePreview
              key={"recipe-" + recipe.id}
              id={recipe.id}
              title={recipe.title}
              tags={recipe.tags}
            />
          );
        })}
      </div>
    </main>
  );
}
