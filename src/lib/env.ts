const getEnvironmentVariable = (key: string, format = String) => {
  const value = process.env[key];

  if (!value) {
    throw new Error(`Environment variable ${key} not found`);
  }

  return format(value);
};

const SUPABASE_URL = getEnvironmentVariable("NEXT_PUBLIC_SUPABASE_URL");
const SUPABASE_ANON_KEY = getEnvironmentVariable(
  "NEXT_PUBLIC_SUPABASE_ANON_KEY"
);

export { SUPABASE_URL, SUPABASE_ANON_KEY };
