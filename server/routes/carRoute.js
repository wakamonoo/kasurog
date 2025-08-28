import express from "express";
import clientPromise from "../lib/mongodb.js";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

router.put("/addCar", async (req, res) => {
  const { uid, car, year, seat, fuel, price, transmission, aircon, image } =
    req.body;
  try {
    const client = await clientPromise;
    const db = client.db("arqila");

    const newID = `car-${uuidv4()}`;
    await db.collection("cars").updateOne(
      { carid: newID },
      {
        $setOnInsert: {
          uid,
          car,
          year,
          seat,
          fuel,
          price,
          transmission,
          aircon,
          image,
        },
      },
      { upsert: true }
    );

    res.status(200).json({ message: "succesfully added car" });
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "failed to update user" });
  }
});

router.put("/updateCar", async (req, res) => {
  const { carid, car, year, seat, fuel, price, transmission, aircon, image } =
    req.body;
  try {
    const client = await clientPromise;
    const db = client.db("arqila");

    await db
      .collection("cars")
      .updateOne(
        { carid },
        { $set: { car, year, seat, fuel, price, transmission, aircon, image } },
        { upsert: true }
      );

    res.status(200).json({ message: "succesfully added car" });
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "failed to update car" });
  }
});

router.delete("/deleteCar/:carid", async (req, res) => {
  const { carid } = req.params;
  try {
    const client = await clientPromise;
    const db = client.db("arqila");

    await db.collection("cars").deleteOne({ carid });
    res.status(200).json({ message: "succesfully deleted car" });
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "failed to delete car" });
  }
});

export default router;
