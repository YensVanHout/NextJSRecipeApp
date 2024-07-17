"use client";
import Image from "next/image";
import { recipe } from "@/interfaces/interfaces";
import { getRecipes } from "@/helpers/helpers";
import RecipePreview from "@/components/RecipePreview/RecipePreview";
import { useEffect, useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

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
      <h2 className="font-bold text-4xl dark:text-complementary">
        Latest recipes:
      </h2>
      <div className="md:flex flex-wrap justify-around">
        <Masonry columnsCount={3} gutter={"5px"}>
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
        </Masonry>
      </div>
    </main>
  );
}
