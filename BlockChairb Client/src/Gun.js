import GUN from "gun";
import "gun/sea";
import "gun/axe";

// Database
export const db = GUN();

// Gun User
export const user = db.user().recall({ sessionStorage: true });

// Current User's username
//
//user.get("alias").on((v) => username.set(v));

db.on("auth", async (event) => {
  const alias = await user.get("alias"); // username string

  console.log(`signed in as ${alias}`);
});
