const BASE_URL = "https://api.clashofclans.com/v1";

export async function cocFetch<T>(endpoint: string): Promise<T> {
  const token = process.env.COC_API_TOKEN;

  if (!token) {
    throw new Error("Missing COC_API_TOKEN in .env.local");
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      const errorData = await response.json();

      throw new Error(
        errorData.reason || "Failed to fetch data from Clash of Clans API"
      );
    }

    return response.json();
  } catch (error) {
    console.error("CoC API Error:", error);

    throw error;
  }
}