"use client";
import { useEffect, useState } from "react";
import { Recipe as RecipeType, recipe } from "@/interfaces/interfaces"; // Adjust the import path accordingly
import { checkUserState, deleteRecipe, getRecipeById } from "@/helpers/helpers";
import { useRouter } from "next/router";
import { useParams } from "next/navigation";

function NotFound() {
  return <div>Not Found</div>;
}

function Loading() {
  return <div>Loading...</div>;
}

function User({ id }: { id: string }) {
  const handleDelete = () => {
    deleteRecipe(id);
  };

  return (
    <button className="btn-complementary mx-auto px-4" onClick={handleDelete}>
      Delete Recipe
    </button>
  );
}

function Modal({ setModal }: { setModal: Function }) {
  // Implement Modal logic here or remove if not used
  return null;
}

function Recipe({
  recipe,
  loggedIn,
}: {
  recipe: RecipeType;
  loggedIn: boolean;
}) {
  return (
    <>
      {/* TITLE */}
      <div id="title" className="md:flex w-fit mx-auto">
        <h2 className="text-3xl mr-4 h-full text-center">{recipe.title}</h2>
        {loggedIn && recipe.id ? <User id={recipe.id} /> : null}
      </div>

      {/* TAGS */}
      <div id="tagList" className="mt-4 flex justify-center">
        {recipe.tags?.map((tag: string) => (
          <span key={"tag-" + tag} className="pill">
            {tag}
          </span>
        ))}
      </div>

      {/* TIME */}
      <div className="text-center m-4">
        <h3 className="text-2xl mr-4 h-full">{recipe.time}</h3>
      </div>

      {/* RECIPE DETAILS */}
      <div
        id="recipeDetails"
        className="ml-6 md:flex justify-around md:text-xl"
      >
        {/* INGREDIENTS */}
        {recipe.ingredients.length > 0 ? (
          <div id="ingredients" className="mt-6 w-1/6 md:text-xl">
            <h2 className="text-2xl">Ingredients</h2>
            <ul className="list-disc">
              {recipe.ingredients.map((ingredient: string) => (
                <li key={"ingredient-" + ingredient} className="pb-4">
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {/* TOOLS */}
        {recipe.tools && recipe.tools.length > 0 ? (
          <div id="tools" className="mt-6 w-1/6 md:text-xl">
            <h2 className="text-2xl">Tools</h2>
            <ul className="list-disc">
              {recipe.tools.map((tool: string) => (
                <li key={"tool-" + tool} className="pb-4">
                  {tool}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {/* STEPS */}
        {recipe.steps && recipe.steps.length > 0 ? (
          <div id="steps" className="mt-6 w-1/6 md:text-xl">
            <h2 className="text-2xl">Steps</h2>
            <ul className="list-disc">
              {recipe.steps.map((step: string, index: number) => (
                <li key={"step-" + (index + 1)} className="pb-4">
                  {step}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default function Page() {
  const param = useParams();
  const { id } = param;

  const [loading, setLoading] = useState<boolean>(true);
  const [recipe, setRecipe] = useState<RecipeType | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

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
    if (id) {
      getRecipeById(id.toString()).then((data) => {
        if (typeof data === "string") {
          setErrorMsg(data);
        } else {
          setRecipe(data);
        }
        setLoading(false);
      });
    }
  }, [id, errorMsg]);

  return (
    <div>
      {loading ? <Loading /> : null}
      {loading == false && recipe != null ? (
        <Recipe recipe={recipe} loggedIn={loggedIn} />
      ) : null}
      {loading == false && recipe == null ? <NotFound /> : null}
    </div>
  );
}
