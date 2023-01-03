import { PUBLIC_CLIENT_ID, PUBLIC_ROOT_URL } from "$env/static/public";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = (event) => {
  throw redirect(307, `https://osu.ppy.sh/oauth/authorize?client_id=${PUBLIC_CLIENT_ID}&scope=public&redirect_uri=${PUBLIC_ROOT_URL}/auth&response_type=code`);
};
