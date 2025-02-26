import { headers } from "next/headers";

const HEADERS_KEYS = {
  currentPath: "x-current-path",
};

const getAppURL = () => {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
    process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
    "http://localhost:3000/";
  // Make sure to include `https://` when not localhost.
  url = url.startsWith("http") ? url : `https://${url}`;
  // Make sure to include a trailing `/`.
  url = url.endsWith("/") ? url : `${url}/`;
  return url;
};

const AUTH_PATHS = ["/login", "/auth", "/register"];

const isAuthPath = (path: string) => {
  return AUTH_PATHS.some((authPath) => path.startsWith(authPath));
};

const getCurrentPathname = async () => {
  return (await headers()).get(HEADERS_KEYS.currentPath);
};

const isCurrentPathAnAuthPath = async () => {
  const currentPath = await getCurrentPathname();
  if (!currentPath) return false;
  return isAuthPath(currentPath);
};

export {
  getAppURL,
  isCurrentPathAnAuthPath,
  getCurrentPathname,
  isAuthPath,
  HEADERS_KEYS,
  AUTH_PATHS,
};
