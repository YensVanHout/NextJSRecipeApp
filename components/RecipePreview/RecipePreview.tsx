interface props {
  title: string;
  id: string | null | undefined;
  tags: string[] | null | undefined;
}

export default function RecipePreview(props: props) {
  return (
    <div className="card dark:bg-stone-200 my-2 lg:w-1/4 flex md:w-full mx-2">
      <a href={"recipes/recipe/" + props.id} className="w-full">
        <h3>{props.title}</h3>
        <div className="tags flex flex-wrap justify-around h-fit align-bottom w-full">
          {props.tags?.map((tag) => {
            return (
              <span className="pill" key={"tag-" + tag}>
                {tag}
              </span>
            );
          })}
        </div>
      </a>
    </div>
  );
}
