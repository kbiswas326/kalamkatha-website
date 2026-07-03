// Cloudflare Pages Function: GET /api/auth
// Step 1 of the Decap CMS <-> GitHub OAuth handshake.
// Redirects the admin-panel login popup to GitHub's authorize screen.

export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const redirectUri = `${url.origin}/api/callback`;

  const githubAuthUrl = new URL("https://github.com/login/oauth/authorize");
  githubAuthUrl.searchParams.set("client_id", env.GITHUB_CLIENT_ID);
  githubAuthUrl.searchParams.set("redirect_uri", redirectUri);
  githubAuthUrl.searchParams.set("scope", "repo,user");

  return Response.redirect(githubAuthUrl.toString(), 302);
}
