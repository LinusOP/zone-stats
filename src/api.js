const API_URL = "https://roleplay.co.uk/rpukapi/capture";
const CORS_PROXY_URL = "https://cors-anywhere.herokuapp.com";

export default async function getApiData() {
  const response = await fetch(`${CORS_PROXY_URL}/${API_URL}`);
  return response.json();
}
