import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
});

export const CompanyModel = mongoose.model("Company", CompanySchema);

// Comany Actions:

// get all companies or get compaines by using their name or location.
export const getAllCompanies = (filter: string) =>
  CompanyModel.find({
    $or: [
      {
        name: {
          $regex: filter,
        },
      },
      {
        location: {
          $regex: filter,
        },
      },
    ],
  });

// Get company by its id.
export const getCompanyById = (id: string) => CompanyModel.findById(id);

// POST a new comany

export const addComany = (value: Record<string, any>) =>
  CompanyModel.create(value);

// PUT Update a comany details by id,

export const updateComanyById = (id: string, value: Record<string, any>) =>
  CompanyModel.findByIdAndUpdate(id, value);

// Delete a comany by id
export const deleteComanyById = (id: string) =>
  CompanyModel.findByIdAndDelete(id);
