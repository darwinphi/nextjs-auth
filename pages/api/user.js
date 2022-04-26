export default async function handler(req, res) {
  const { cookies } = req;
  const jwt = cookies.app;
  if (!jwt) {
    res.status(401).json({ message: "Invalid credentials" });
  } else {
    console.log(jwt);
    res.json({ message: "Success" });
  }
}
