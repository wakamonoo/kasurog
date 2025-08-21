import express from "express";
import clientPromise from "../lib/mongodb.js";

const router = express.Router();

router.get("/users/:uid", async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("arqila");

    const { uid } = req.params;
    const user = await db.collection("users").findOne({ uid });

    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "failed to fetch user" });
  }
});

export default router;
