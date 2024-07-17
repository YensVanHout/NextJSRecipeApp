interface props {
  title: string;
  id: string | null | undefined;
  tags: string[] | null | undefined;
}

export default function RecipePreview(props: props) {
  return (
    <div className="card dark:bg-stone-200 lg:w-1/4 flex h-fit md:w-full">
      <a href={"recipes/recipe/" + props.id} className="w-full">
        <h3 className="text-md font-bold">{props.title}</h3>
        <div className="tags flex flex-wrap justify-around h-fit align-bottom w-full">
          {props.tags?.map((tag) => {
            return (
              <span className="pill dark:bg-complementary" key={"tag-" + tag}>
                {tag}
              </span>
            );
          })}
        </div>
      </a>
    </div>
  );
}
