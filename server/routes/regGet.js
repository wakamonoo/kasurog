import express from "express";
import clientPromise from "../lib/mongodb.js";

const router = express.Router();

router.get("/regGet", async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("arqila");

    const reg = await db.collection("registration").find({}).toArray();

    res.status(200).json(reg);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "failed to fetch users" });
  }
});


export default router;