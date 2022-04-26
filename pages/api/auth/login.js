import { sign } from "jsonwebtoken";
import { serialize } from "cookie";

const jwt_secret = process.env.JWT_SECRET;

export default async function handler(req, res) {
  const { email, password } = req.body;

  if (email === "admin@email.com" && password === "secret") {
    const token = sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, // 30 days
        email,
      },
      jwt_secret
    );

    const serialized = serialize("app", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });

    res.setHeader("Set-Cookie", serialized);
    res.status(200).json({ message: "Successfully login" });
  } else {
    res.status(401).json({ message: "Invalid credential" });
  }
}
