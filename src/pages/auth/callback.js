import { WorkOS } from "@workos-inc/node";
import { sealData, unsealData } from 'iron-session';
import { serialize } from 'cookie';

export async function ALL({ locals, url, request }) {

    const env = locals.runtime.env;
    const workosApiKey = env.WORKOS_API_KEY;
    const clientId = env.WORKOS_CLIENT_ID;

    const workos = new WorkOS(workosApiKey);

    const code = url.searchParams.get("code");
    
    const { user, accessToken, refreshToken, impersonator } =
        await workos.userManagement.authenticateWithCode({
            code,
            clientId,
        });

    // The refreshToken should never be accesible publicly,
    // hence why we encrypt it in the cookie session.
    // Alternatively you could persist the refresh token in a backend database
    const encryptedSession = await sealData(
        { accessToken, refreshToken, user, impersonator },
        { password: env.WORKOS_COOKIE_PASSWORD },
    );

    const sessionCookie = serialize('wos-session', encryptedSession, {
        path: '/',
        httpOnly: true,
        secure: true,
        samesite: 'lax'
    });

    const response = new Response(null, {
        status: 302,
        headers: {
          "Location":  url.origin,
          "Set-Cookie": sessionCookie
        }
      });
    
    return response;

}
