import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Direct backend API route for real-time DOST-PAGASA YouTube RSS feed (bypasses third-party caches)
  app.get("/api/pagasa-feed", async (req, res) => {
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");

    const channelId = "UCpyLikj1x70S8UPxVqsPr6g";
    const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;

    try {
      const response = await fetch(rssUrl, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          "Cache-Control": "no-cache",
        },
      });

      if (!response.ok) {
        return res.status(502).json({
          status: "error",
          message: `Failed to fetch YouTube feed (HTTP ${response.status})`,
        });
      }

      const xmlText = await response.text();

      // Extract entries using regex matching
      const items: Array<{
        id: string;
        title: string;
        pubDate: string;
        thumbnail: string;
        link: string;
      }> = [];

      const entryRegex = /<entry>[\s\S]*?<\/entry>/g;
      const entryMatches = xmlText.match(entryRegex) || [];

      for (const entryStr of entryMatches) {
        const idMatch = entryStr.match(/<yt:videoId>([^<]+)<\/yt:videoId>/);
        const titleMatch = entryStr.match(/<title>([^<]+)<\/title>/);
        const pubMatch = entryStr.match(/<published>([^<]+)<\/published>/);
        const thumbMatch = entryStr.match(/<media:thumbnail\s+url="([^"]+)"/);

        if (idMatch && idMatch[1] && titleMatch && titleMatch[1]) {
          const videoId = idMatch[1].trim();
          let title = titleMatch[1].trim();

          // Unescape common XML entities
          title = title
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'")
            .replace(/&amp;/g, "&")
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">");

          const pubDate = pubMatch ? pubMatch[1].trim() : new Date().toISOString();
          const thumbnail = thumbMatch
            ? thumbMatch[1]
            : `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

          items.push({
            id: videoId,
            title,
            pubDate,
            thumbnail,
            link: `https://www.youtube.com/watch?v=${videoId}`,
          });
        }
      }

      return res.json({
        status: "ok",
        count: items.length,
        items,
        fetchedAt: new Date().toISOString(),
      });
    } catch (error: any) {
      console.error("Error in /api/pagasa-feed:", error);
      return res.status(500).json({
        status: "error",
        message: error?.message || "Internal server error fetching feed",
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
