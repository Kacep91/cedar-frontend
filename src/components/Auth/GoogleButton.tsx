import React from "react";

export function GoogleButton({
  clientId,
  redirectUrl,
}: {
  clientId: string;
  redirectUrl: string;
}) {
  const options = {
    redirect_uri: redirectUrl,
    client_id: clientId,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: ["https://www.googleapis.com/auth/userinfo.email"],
  };

  console.log(options);

  const qs = new URLSearchParams(options);

  const link = `https://accounts.google.com/o/oauth2/v2/auth?${qs.toString()}`;

  return <a href={link}>Login with Google</a>;
}
