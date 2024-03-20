const rootUrl = import.meta.env.VITE_Google_Root_URL as string;
const redirectURI = import.meta.env.VITE_Google_Oauth_Redirect_URI as string;
const clientID = import.meta.env.VITE_Google_Client_ID as string;

function getGoogleOauth() {
  const options = {
    redirect_uri: redirectURI,
    client_id: clientID,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ].join(" "),
  };

  const qs = new URLSearchParams(options);

  return `${rootUrl}?${qs.toString()}`;
}

export default getGoogleOauth;
