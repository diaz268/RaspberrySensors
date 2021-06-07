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

const getAll = async (req, res) => {
  try {
    const { rows } = await db.query(
      "SELECT * FROM sensors ORDER BY created_on DESC LIMIT 50"
    );
    //TODO: Transpose array
    const data = Object.assign(
      ...Object.keys(rows[0]).map((key) => ({
        [key]: rows.map((o) => o[key]),
      }))
    );

    if (req.ws) {
      const ws = await req.ws();
      ws.send(JSON.stringify({ data }));

      db.query('LISTEN "watch"');
      db.on("notification", (data) =>
        ws.send(JSON.stringify({ update: data.payload }))
      );
    } else {
      res.status(200).json(data);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const SensorsController = { create, getAll };

export default SensorsController;
