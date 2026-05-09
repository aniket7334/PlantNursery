export default async function handler(req, res) {
  const apiToken = process.env.TREFLE_API_KEY || process.env.VITE_TREFLE_API_KEY;

  if (!apiToken) {
    return res.status(500).json({ error: "Missing TREFLE_API_KEY environment variable" });
  }

  try {
    const targetUrl = new URL("https://trefle.io/api/v1/plants");

    Object.entries(req.query || {}).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((entry) => targetUrl.searchParams.append(key, entry));
        return;
      }

      if (value !== undefined) {
        targetUrl.searchParams.append(key, value);
      }
    });

    targetUrl.searchParams.set("token", apiToken.trim());

    const response = await fetch(targetUrl);
    const body = await response.text();

    res.status(response.status);
    res.setHeader("Content-Type", response.headers.get("content-type") || "application/json");
    return res.send(body);
  } catch (error) {
    return res.status(500).json({
      error: "Failed to reach Trefle API",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
