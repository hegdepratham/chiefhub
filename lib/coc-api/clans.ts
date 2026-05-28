import { cocFetch } from "./client";
import { CocClan } from "@/types";

export async function getClan(tag: string): Promise<CocClan> {
  const encodedTag = encodeURIComponent(tag);

  return cocFetch<CocClan>(`/clans/${encodedTag}`);
}