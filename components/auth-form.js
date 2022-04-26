import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import axios from "axios";
import { useCookies } from "react-cookie";

export default function AuthForm() {
  const [cookies, setCookie, removeCookie] = useCookies(["app"]);

  const [inputFields, setInputFields] = useState({ email: "", password: "" });

  const { data: session } = useSession();

  console.log("Cookie", cookies.app);

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = await axios.post("/api/auth/login", inputFields);

    console.log(user);
  };

  const getUser = async () => {
    const user = await axios.get("/api/user");

    console.log(user);
  };

  const handleInputChange = (event) => {
    setInputFields({ ...inputFields, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <button onClick={() => signIn("github")}>Sign in with Github</button>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={inputFields.email}
            onChange={(event) => handleInputChange(event)}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={inputFields.password}
            onChange={(event) => handleInputChange(event)}
          />
        </div>
        <button>Send</button>
      </form>
      <button onClick={getUser}>Get User</button>
    </div>
  );
}
