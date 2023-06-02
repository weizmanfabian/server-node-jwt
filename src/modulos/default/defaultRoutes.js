import express from "express";
import { createDefault, deleteDefault, findAllDefault, findByKeyDefault, updateDefault } from "./defaultController.js";
const router = express.Router();

router.get("/:table", findAllDefault);
router.get("/:table/:key/:value", findByKeyDefault);
router.post("/:table/:key", createDefault);
router.delete("/:table/:key/:value", deleteDefault);
router.put("/:table/:key/:value", updateDefault);

export default router;