import { Request, Response } from "express";
import {
  addComany,
  deleteComanyById,
  getAllCompanies,
  getCompanyById,
  updateComanyById,
} from "../db/company";
import { z } from "zod";

export const fetchAllCompanies = async (req: Request, res: Response) => {
  try {
    const filter = req.query.filter || "";
    const comany = await getAllCompanies(filter as string);
    res.status(200).json({ comany });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};

const CompanySchema = z.object({
  name: z.string(),
  location: z.string(),
});

export const addNewCompany = async (req: Request, res: Response) => {
  try {
    const validateData = CompanySchema.safeParse(req.body);
    if (!validateData.success) {
      return res.status(400).json({ message: "Invalid Input Data" });
    } else {
      const data = validateData.data;
      const createdComany = await addComany(data);
      res
        .status(200)
        .json({ message: "Comany Addes Successfully", createdComany });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};

export const fetchComanyById = async (req: Request, res: Response) => {
  try {
    const compayId = req.params.id;
    const companyDetails = await getCompanyById(compayId);
    if (companyDetails) {
      res.status(200).json({ message: "Comany Found", companyDetails });
    } else {
      res.status(404).json({ message: "Comany not found!" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};

export const updateComany = async (req: Request, res: Response) => {
  try {
    const comanyId = req.params.id;
    const validateData = CompanySchema.safeParse(req.body);
    if (!validateData.success) {
      res.status(400).json({ message: "Invalid input data." });
    } else {
      const data = validateData.data;
      const updatedCompany = await updateComanyById(comanyId, data);
      res
        .status(200)
        .json({ message: "Comany Updated succesfully", updatedCompany });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};

export const deleteComany = async (req: Request, res: Response) => {
  try {
    const comanyId = req.params.id;
    const deletedComany = await deleteComanyById(comanyId);
    res
      .status(200)
      .json({ message: "Comany deleted Succesfully!", deletedComany });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};
