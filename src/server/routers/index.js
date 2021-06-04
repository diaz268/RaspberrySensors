import { App } from "@tinyhttp/app";

import SensorsController from "../controllers/index.js";

const routes = new App();

routes.post("/sensors", SensorsController.create);
routes.get("/sensors", SensorsController.getAll);

export default routes;
