import express from "express";
import {
  addNewCompany,
  deleteComany,
  fetchAllCompanies,
  fetchComanyById,
  updateComany,
} from "../controllers/company.controller";

const comanyRouter = express.Router();

comanyRouter.get("/companies", fetchAllCompanies);
comanyRouter.post("/add", addNewCompany);
comanyRouter.get("/:id", fetchComanyById);
comanyRouter.delete("/:id", deleteComany);
comanyRouter.put("/:id", updateComany);

export default comanyRouter;
