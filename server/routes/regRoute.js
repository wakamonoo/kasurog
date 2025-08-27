import express from "express";
import clientPromise from "../lib/mongodb.js";

const router = express.Router();

router.post("/driverReg", async (req, res) => {
  const { uid, name, orcr, license } = req.body;
  try {

    const client = await clientPromise;
    const db = client.db("arqila");

    await db
      .collection("registration")
      .updateOne(
        { uid },
        { $setOnInsert: { uid, name, orcr, license } },
        { upsert: true }
      );

    res.status(200).json({ message: "user application for driverpreneur success" });
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "user application for driverpreneur error" });
  }
});



export default router;
