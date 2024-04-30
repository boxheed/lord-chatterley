import { WorkOS } from "@workos-inc/node";
import { parse, serialize } from 'cookie';
import { createRemoteJWKSet, jwtVerify } from 'jose';
import { sealData, unsealData } from 'iron-session';

async function auth({ redirect, locals, url, request}, next) {
    //console.log(arguments);
    const env = locals.runtime.env;
    const workosApiKey = env.WORKOS_API_KEY;
    const workos = new WorkOS(workosApiKey);
    const clientId = env.WORKOS_CLIENT_ID;
    const cookieHeader = request.headers.get("Cookie");

    if(!cookieHeader) {
        return redirect('/auth');
    }
    const cookies = parse(cookieHeader);
    const session = await getSessionFromCookie(cookies, env.WORKOS_COOKIE_PASSWORD);

    // If no session, redirect the user to the login page
    if (!session) {
        console.log("No session");
        return redirect('/auth');
    }
    const JWKS = createRemoteJWKSet(
        new URL(workos.userManagement.getJwksUrl(clientId)),
    );

    const hasValidSession = await verifyAccessToken(session.accessToken, JWKS);

    // If the session is valid, move on to the next function
    if (hasValidSession) {
        console.log("Valid Session");
        return await next();
    }

    try {
        // If the session is invalid (i.e. the access token has expired)
        // attempt to re-authenticate with the refresh token
        const { accessToken, refreshToken } =
        await workos.userManagement.authenticateWithRefreshToken({
            clientId,
            refreshToken: session.refreshToken,
        });
    
        // Refresh tokens are single use, so update the session with the
        // new access and refresh tokens
        const encryptedSession = await sealData(
        {
            accessToken,
            refreshToken,
            user: session.user,
            impersonator: session.impersonator,
        },
        { password: env.WORKOS_COOKIE_PASSWORD },
        );
    
        // Update the cookie
        const sessionCookie = serialize('wos-session', encryptedSession, {
            path: '/',
            httpOnly: true,
            secure: true,
            samesite: 'lax'
        });
    
        return await next();
    } catch (e) {
        // Failed to refresh access token, redirect user to login page
        // after deleting the cookie
        return redirect('/auth');
    }


}


async function getSessionFromCookie(cookies, password) {
    const cookie = cookies['wos-session'];
  
    if (cookie) {
      return unsealData(cookie, {
        password: password,
      });
    }
}
  
async function verifyAccessToken(accessToken, JWKS) {

    try {
      await jwtVerify(accessToken, JWKS);
      return true;
    } catch (e) {
      console.warn('Failed to verify session:', e);
      return false;
    }
}

export { auth };