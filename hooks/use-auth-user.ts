'use client';

import app from "@/lib/firebase";
import {
  getAuth,
  onAuthStateChanged,
  signOut as firebaseSignOut,
  type User as FirebaseUser,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { signOut as nextAuthSignOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const auth = getAuth(app);

export type AuthUser = {
  email: string | null;
  image: string | null;
  name: string;
  source: "firebase" | "nextauth";
};

function getFallbackName(email: string | null | undefined) {
  if (!email) {
    return "User";
  }

  const [localPart] = email.split("@");
  return localPart || "User";
}

export function useAuthUser() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [isFirebaseReady, setIsFirebaseReady] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);
      setIsFirebaseReady(true);
    });

    return unsubscribe;
  }, []);

  let user: AuthUser | null = null;

  if (session?.user) {
    user = {
      email: session.user.email ?? null,
      image: session.user.image ?? null,
      name: session.user.name || getFallbackName(session.user.email),
      source: "nextauth",
    };
  } else if (firebaseUser) {
    user = {
      email: firebaseUser.email,
      image: firebaseUser.photoURL,
      name: firebaseUser.displayName || getFallbackName(firebaseUser.email),
      source: "firebase",
    };
  }

  const isLoading = status === "loading" || (status !== "authenticated" && !isFirebaseReady);

  const signOut = async () => {
    if (isSigningOut) {
      return;
    }

    setIsSigningOut(true);

    try {
      const signOutTasks: Promise<unknown>[] = [];

      if (firebaseUser) {
        signOutTasks.push(firebaseSignOut(auth));
      }

      if (session) {
        signOutTasks.push(nextAuthSignOut({ redirect: false }));
      }

      if (signOutTasks.length > 0) {
        await Promise.allSettled(signOutTasks);
      }
    } finally {
      setFirebaseUser(null);
      setIsSigningOut(false);
      router.refresh();
    }
  };

  return {
    isLoading,
    isSigningOut,
    signOut,
    user,
  };
}
