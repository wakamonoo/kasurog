import express from "express";
import clientPromise from "../lib/mongodb.js";
import admin from "../lib/firebaseAdmin.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { token } = req.body;
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    const { uid, email, name } = decoded;

    const client = await clientPromise;
    const db = client.db("arqila");

    await db
      .collection("users")
      .updateOne(
        { uid },
        { $setOnInsert: { uid, email, name, role: "user" } },
        { upsert: true }
      );

    res.status(200).json({ message: "user signed up" });
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "token invalid " });
  }
});

router.post("/upgrade", async (req, res) => {
  const { token } = req.body;
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    const { uid } = decoded;

    const client = await clientPromise;
    const db = client.db("arqila");

    await db
      .collection("users")
      .updateOne(
        { uid },
        { $set: { role: "seller" } }
      );

    res.status(200).json({ message: "user upgraded to seller" });
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "token invalid " });
  }
});

export default router;
