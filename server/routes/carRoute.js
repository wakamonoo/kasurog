import express from "express";
import clientPromise from "../lib/mongodb.js";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

router.put("/addCar", async (req, res) => {
  const { car, fuel, price } = req.body;
  try {
    const client = await clientPromise;
    const db = client.db("arqila");

    const newID = `car-${uuidv4()}`;
    await db
      .collection("cars")
      .updateOne(
        { uid: newID},
        { $set: { car, fuel, price } },
        { upsert: true }
      );

    res.status(200).json({ message: "succesfully added car" });
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "failed to update user" });
  }
});

export default router;
