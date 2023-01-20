import type { Handle } from "@sveltejs/kit";
import { parse } from "cookie";

export const handle: Handle = async ({ event, resolve }) => {
  const { headers } = event.request;
  const cookies = parse(headers.get("cookie") ?? "");

  if (cookies.AuthorizationToken && !event.locals.user) {
    const response = await fetch('https://osu.ppy.sh/api/v2/me/osu', {
      headers: {
        "Authorization": cookies.AuthorizationToken,
        "Content-Type": "application/json",
        "Accept": "application/json",
    }});

    if (response.status !== 200) {
      throw Error();
    }

    const user = await response.json() as {
      avatar_url: string,
      username: string,
    };

    event.locals.user = {
      username: user.username,
      avatarUrl: user.avatar_url,
    };
  } else {
    event.locals.user = null;
  }

  return resolve(event);
};
