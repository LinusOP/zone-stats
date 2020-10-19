export default async function getApiData() {
  const response = await fetch(process.env.VUE_APP_API_URL);
  return response.json();
}
