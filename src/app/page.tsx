"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data } = useSession();
  console.log(data);
  return (
    <div>
      <h1>Test</h1>
      <button onClick={() => signIn("google")}>Click to login</button>
      <button onClick={() => signOut()}>Logout</button>
      <p>Seu email é {data?.user?.email}</p>
    </div>
  );
}
