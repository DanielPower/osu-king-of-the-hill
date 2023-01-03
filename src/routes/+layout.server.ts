import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = (event) => {
  const data = { user: event.locals.user };
  console.log({ layout: data });
  return data;
};
