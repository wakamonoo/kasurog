import clientPromise from "@/lib/mongodb";
import { verifyIdToken } from "@/lib/firebaseAdmin";

export async function POST(req) {
  try {
    const { token } = await req.json();

    // Verify Firebase token
    const decoded = await verifyIdToken(token);
    if (!decoded) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const { uid, email, name, picture } = decoded;

    // Save in MongoDB
    const client = await clientPromise;
    const db = client.db("arqila"); // change to your DB name

    const user = await db.collection("users").findOneAndUpdate(
      { uid },
      {
        $setOnInsert: {
          uid,
          email,
          name,
          picture,
          createdAt: new Date(),
        },
      },
      { upsert: true, returnDocument: "after" }
    );

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.error("Error saving user:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
