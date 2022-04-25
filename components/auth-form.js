import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }
  return (
    <div>
      <button onClick={() => signIn("github")}>Sign in with Github</button>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" required />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" required />
        </div>
        <button>Log In</button>
      </form>
    </div>
  );
}
