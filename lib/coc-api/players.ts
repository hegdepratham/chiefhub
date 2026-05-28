import { cocFetch } from "./client";

export async function getPlayer(tag: string) {
  const encodedTag = encodeURIComponent(tag);

  return cocFetch(`/players/${encodedTag}`);
}