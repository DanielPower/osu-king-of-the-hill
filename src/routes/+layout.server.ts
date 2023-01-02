import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad<{ user: { username: string } }> = (event) => {
  const data = { user: event.locals.user };
  return data;
};
