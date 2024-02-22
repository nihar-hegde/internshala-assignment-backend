import express from "express";
import comanyRouter from "./company";

const router = express.Router();

router.use("/company", comanyRouter);

export default router;
