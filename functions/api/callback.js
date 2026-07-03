// Cloudflare Pages Function: GET /api/callback
// Step 2 of the Decap CMS <-> GitHub OAuth handshake.
// GitHub redirects here with a temporary ?code=... which we exchange
// server-side for an access token (this is why we need a backend at all -
// the client_secret can never be exposed in the browser), then post the
// token back to the Decap CMS popup window via postMessage.

export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return new Response("Missing code from GitHub", { status: 400 });
  }

  const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      client_id: env.GITHUB_CLIENT_ID,
      client_secret: env.GITHUB_CLIENT_SECRET,
      code,
    }),
  });

  const tokenData = await tokenResponse.json();

  if (tokenData.error) {
    return new Response(`GitHub OAuth error: ${tokenData.error_description || tokenData.error}`, {
      status: 400,
    });
  }

  const token = tokenData.access_token;
  const payloadSuccess = JSON.stringify({ token, provider: "github" });
  const payloadError = JSON.stringify(tokenData.error || "OAuth failed");

  // This exact message format ("authorization:github:success:{...}") is what
  // Decap CMS's popup listener expects. Do not change the wording.
  const html = `
<!DOCTYPE html>
<html>
<body>
<script>
(function() {
  function receiveMessage(e) {
    window.opener.postMessage(
      'authorization:github:success:${payloadSuccess.replace(/'/g, "\\'")}',
      e.origin
    );
    window.removeEventListener("message", receiveMessage, false);
  }
  window.addEventListener("message", receiveMessage, false);
  window.opener.postMessage("authorizing:github", "*");
})();
</script>
</body>
</html>`;

  return new Response(html, {
    headers: { "Content-Type": "text/html" },
  });
}
