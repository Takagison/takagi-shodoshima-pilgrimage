export function getSiteUrl() {
  const explicitUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const url = explicitUrl ?? "http://localhost:3000";

  return url.replace(/\/$/, "");
}
