"use client";

import { Button } from "@/components/ui/button";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { signInWithGoogle } from "./actions";

const TEXT = {
  welcome: "Welcome to Team Health",
  description: "Sign in to share updates and stay connected with your team",
  continueWithGoogle: "Continue with Google",
  loginError: "An error occurred while signing in",
};

export default function Login() {
  const [error, signInWithGoogleAction, isPending] = useActionState(
    signInWithGoogle,
    undefined
  );

  useEffect(() => {
    if (error) {
      toast.error(TEXT.loginError);
      // TODO: Log error to error tracking service
    }
  }, [error]);

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-card rounded-lg shadow-lg animate-in">
      <form className="text-center space-y-6" action={signInWithGoogleAction}>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">{TEXT.welcome}</h1>
          <p className="text-muted-foreground">{TEXT.description}</p>
        </div>
        <Button className="w-full" variant="outline" disabled={isPending}>
          <svg
            className="mr-2 h-4 w-4"
            aria-hidden="true"
            focusable="false"
            data-prefix="fab"
            data-icon="google"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 488 512"
          >
            <path
              fill="currentColor"
              d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
            ></path>
          </svg>
          {TEXT.continueWithGoogle}
        </Button>
      </form>
    </div>
  );
}
