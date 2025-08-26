import express from "express";
import clientPromise from "../lib/mongodb.js";

const router = express.Router();

router.get("/carsDisplay", async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("arqila");

    const cars = await db.collection("cars").find({}).toArray();

    res.status(200).json(cars);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "failed to fetch cars" });
  }
});

router.get("/carsList/:uid", async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("arqila");

    const { uid } = req.params;
    const cars = await db.collection("cars").find({ uid }).toArray();

    res.status(200).json(cars);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "failed to fetch cars" });
  }
});

export default router;
