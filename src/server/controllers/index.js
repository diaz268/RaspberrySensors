import { db } from "../../storage/index.js";

const create = async (req, res) => {
  const { body } = req;
  try {
    const data = await db.query(
      "INSERT INTO sensors(value, voltage) VALUES ($1, $2) RETURNING *",
      [body.value, body.voltage]
    );

    res.status(201).json(data.rows[0]);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getAll = async (_req, res) => {
  try {
    const data = await db.query("SELECT * FROM sensors");
    res.status(200).json(data.rows);
  } catch (err) {
    res.status(500).json(err);
  }
};

const SensorsController = { create, getAll };

export default SensorsController;
