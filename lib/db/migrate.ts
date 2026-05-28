import fs from "fs";
import path from "path";
import { getDb } from "./index";

const db = getDb();

const schemaPath = path.join(process.cwd(), "lib/db/schema.sql");

const schema = fs.readFileSync(schemaPath, "utf8");

db.exec(schema);

console.log("Database migration completed successfully");