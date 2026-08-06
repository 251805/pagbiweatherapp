export default async function handler(req: any, res: any) {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  res.setHeader("Access-Control-Allow-Origin", "*");

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

    return res.status(200).json({
      status: "ok",
      count: items.length,
      items,
      fetchedAt: new Date().toISOString(),
    });
  } catch (error: any) {
    return res.status(500).json({
      status: "error",
      message: error?.message || "Internal server error fetching feed",
    });
  }
}
