export type recipe = {
  creator?: string | null;
  date_create?: string | null;
  id?: string;
  image?: string | null;
  ingredients: string[];
  steps: string[];
  tags?: string[] | null;
  time?: string | null;
  title: string;
  tools?: string[] | null;
};

export type filter = {
  name: string;
  type: string;
};
