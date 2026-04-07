import mongoose from "mongoose";
import XLSX from "xlsx";
import School from "./models/School.js";

mongoose.connect("mongodb://127.0.0.1:27017/erp");

const workbook = XLSX.readFile("school.xlsx");
const sheet = workbook.Sheets[workbook.SheetNames[0]];

const data = XLSX.utils.sheet_to_json(sheet);

console.log("Excel rows:", data.length);
console.log("First row:", data[0]);

const formattedData = data
  .filter(row => row["School Name"]) // empty rows skip
  .map(row => ({
    schoolName: row["School Name"],
    location: row["Location"],
    plan: row["Plan"],
    status: row["Status"],
    registeredDate: row["Registered Date"]
      ? new Date(row["Registered Date"])
      : null,
    revenue: row["Revenue ($)"] || 0
  }));

async function importData() {
  try {
    await School.insertMany(formattedData);
    console.log("✅ Excel data imported successfully");
    process.exit();
  } catch (error) {
    console.error(error);
  }
}

importData();