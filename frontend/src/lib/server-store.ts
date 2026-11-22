import fs from "fs";
import path from "path";
import crypto from "crypto";
import { execFile } from "child_process";

// Path to persistent DB store
const DB_FILE = path.resolve(process.cwd(), "..", "backend", "app", "db", "local_storage.json");
const SCRIPT_PATH = path.resolve(process.cwd(), "..", "backend", "app", "scripts", "dispatch_email.py");

interface DBStore {
  users?: any[];
  email_verifications?: any[];
  otp_codes?: any[];
  [key: string]: any;
}

export function loadDB(): DBStore {
  try {
    if (fs.existsSync(DB_FILE)) {
      const data = fs.readFileSync(DB_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (err) {
    console.warn("[SERVER STORE LOAD ERROR]", err);
  }
  return { users: [], email_verifications: [], otp_codes: [] };
}

export function saveDB(store: DBStore) {
  try {
    const dir = path.dirname(DB_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(store, null, 2), "utf-8");
  } catch (err) {
    console.error("[SERVER STORE SAVE ERROR]", err);
  }
}

export function hashOtp(otp: string): string {
  return crypto.createHash("sha256").update(otp.trim()).digest("hex");
}

export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 32, "sha256").toString("hex");
  return `pbkdf2:sha256:10000$${salt}$${hash}`;
}

export function verifyPassword(password: string, storedHash: string): boolean {
  if (!storedHash) return false;
  // Handle plain dev fallback
  if (storedHash === password) return true;
  if (storedHash.startsWith("pbkdf2:sha256:")) {
    const parts = storedHash.split("$");
    if (parts.length === 3) {
      const salt = parts[1];
      const expectedHash = parts[2];
      const actualHash = crypto.pbkdf2Sync(password, salt, 10000, 32, "sha256").toString("hex");
      return actualHash === expectedHash;
    }
  }
  return false;
}

export function generateToken(payload: object): string {
  const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url");
  const exp = Math.floor(Date.now() / 1000) + 3600 * 24; // 24 hours
  const body = Buffer.from(JSON.stringify({ ...payload, exp })).toString("base64url");
  const secret = process.env.JWT_SECRET || "awadh_kisan_sewa_super_secret_jwt_key_2026";
  const signature = crypto.createHmac("sha256", secret).update(`${header}.${body}`).digest("base64url");
  return `${header}.${body}.${signature}`;
}

/**
 * Dispatch real email using Python smtplib script
 */
export async function sendOtpEmail(email: string, name: string, otp: string): Promise<any> {
  return new Promise((resolve) => {
    // If python script exists, invoke it
    if (fs.existsSync(SCRIPT_PATH)) {
      execFile("python", [SCRIPT_PATH, email, name || "किसान मित्र", otp], { timeout: 10000 }, (error, stdout, stderr) => {
        if (!error && stdout) {
          try {
            // Find last json line from output
            const lines = stdout.trim().split("\n");
            for (let i = lines.length - 1; i >= 0; i--) {
              const l = lines[i].trim();
              if (l.startsWith("{") && l.endsWith("}")) {
                const parsed = JSON.parse(l);
                return resolve(parsed);
              }
            }
          } catch (e) {
            console.warn("[SCRIPT PARSE NOTICE]", e);
          }
        }
        console.warn("[EMAIL SCRIPT FALLBACK]", error?.message || stderr);
        resolve({
          status: "sent_local",
          message: "सत्यापन कोड (OTP) जनरेट किया गया।",
        });
      });
    } else {
      resolve({
        status: "sent_local",
        message: "सत्यापन कोड (OTP) जनरेट किया गया।",
      });
    }
  });
}
