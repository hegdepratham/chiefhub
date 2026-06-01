import { cleanupExpiredData } from "./cleanup";

let started = false;

export function startScheduler() {
  if (started) {
    return;
  }

  started = true;

  // Run once immediately
  cleanupExpiredData();

  // Run every hour
  setInterval(() => {
    cleanupExpiredData();
  }, 60 * 60 * 1000);

  console.log("[Scheduler] Started");
}