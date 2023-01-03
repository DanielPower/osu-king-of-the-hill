import { redirect } from "@sveltejs/kit";
import { parse } from "cookie";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async (event) => {
  const { headers } = event.request;
  const cookies = parse(headers.get("cookie") ?? "");

  if (!cookies.AuthorizationToken) {
    throw redirect(307, '/login');
  }

  return { user: event.locals.user };
};
