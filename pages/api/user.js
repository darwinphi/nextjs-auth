export default async function handler(req, res) {
  const { cookies } = req;
  const jwt = cookies.app;
  if (!jwt) {
    res.json({ message: "Invalid token" });
  } else {
    console.log(jwt);
    res.json({ message: "Success" });
  }
}
