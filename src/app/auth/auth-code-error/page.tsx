import Link from "next/link";

export default function AuthCodeErrorPage() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-2xl font-bold">Error</h1>
        <p className="text-muted-foreground">
          There was an error with the authentication code
          <Link href={"/login"}>Please try again.</Link>
        </p>
      </main>
    </div>
  );
}
