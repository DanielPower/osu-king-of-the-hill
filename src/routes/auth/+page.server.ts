import { CLIENT_SECRET } from '$env/static/private';
import { PUBLIC_CLIENT_ID, PUBLIC_ROOT_URL } from '$env/static/public';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
  const error = event.url.searchParams.get('error');

  if (error) {
    return { error };
  }

  const code = event.url.searchParams.get('code');

  const response = await fetch('https://osu.ppy.sh/oauth/token', {
    headers: {
        Accept: 'application/json',
        "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      client_id : PUBLIC_CLIENT_ID,
      client_secret : CLIENT_SECRET,
      code,
      grant_type: "authorization_code",
      redirect_uri: `${PUBLIC_ROOT_URL}/auth`,
    }),
  });

  const token = await response.json();

  if (!('access_token' in token) || !('expires_in' in token)) {
    throw Error();
  }

  event.cookies.set('AuthorizationToken', `Bearer ${token.access_token}`, {
    httpOnly: true,
    path: '/',
    secure: true,
    sameSite: 'lax',
    maxAge: parseInt(`${token.expires_in}`),
  });

  throw redirect(307, '/profile');
};
