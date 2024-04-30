import { WorkOS } from "@workos-inc/node";

export async function ALL({ locals, url, request }) {
    const env = locals.runtime.env;
    const workosApiKey = env.WORKOS_API_KEY;
    const workosClientId = env.WORKOS_CLIENT_ID;
    const workos = new WorkOS(workosApiKey);
    const authorizationUrl = workos.userManagement.getAuthorizationUrl({
        provider: 'authkit',
        redirectUri: url.origin + '/auth/callback',
        clientId: workosClientId,
    });
    console.log(authorizationUrl);
    return Response.redirect(authorizationUrl);
}