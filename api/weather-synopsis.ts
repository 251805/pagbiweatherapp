import { GoogleGenAI } from "@google/genai";

let genAIClient: GoogleGenAI | null = null;
function getGenAIClient(): GoogleGenAI | null {
  if (!genAIClient && process.env.GEMINI_API_KEY) {
    genAIClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return genAIClient;
}

function avgVal(arr: number[] = [], start: number, end: number): number {
  if (!arr.length) return 0;
  const slice = arr.slice(start, end);
  if (!slice.length) return 0;
  return Math.round(slice.reduce((a, b) => a + b, 0) / slice.length);
}

function maxVal(arr: number[] = [], start: number, end: number): number {
  if (!arr.length) return 0;
  const slice = arr.slice(start, end);
  if (!slice.length) return 0;
  return Math.max(...slice);
}

function extractZoneStats(zData: any) {
  const c = zData?.current || {};
  const h = zData?.hourly || {};
  const temps = h.temperature_2m || [];
  const rains = h.precipitation_probability || [];
  const winds = h.wind_speed_10m || [];

  return {
    temp: c.temperature_2m !== undefined ? Math.round(c.temperature_2m) : 29,
    humidity: c.relative_humidity_2m !== undefined ? Math.round(c.relative_humidity_2m) : 78,
    wind: c.wind_speed_10m !== undefined ? Number(c.wind_speed_10m.toFixed(1)) : 12,
    windDirDeg: c.wind_direction_10m !== undefined ? Math.round(c.wind_direction_10m) : 90,
    rain: c.precipitation_probability !== undefined ? Math.round(c.precipitation_probability) : 15,
    cloud: c.cloud_cover !== undefined ? Math.round(c.cloud_cover) : 40,
    mornTemp: avgVal(temps, 6, 12) || 28,
    mornRain: maxVal(rains, 6, 12) || 15,
    mornWind: avgVal(winds, 6, 12) || 10,
    aftTemp: avgVal(temps, 12, 18) || 31,
    aftRain: maxVal(rains, 12, 18) || 25,
    aftWind: avgVal(winds, 12, 18) || 14,
    nightTemp: avgVal(temps, 18, 24) || 26,
    nightRain: maxVal(rains, 18, 24) || 20,
    nightWind: avgVal(winds, 18, 24) || 9,
  };
}

function generateRuleBasedSynopsis(coastal: any, plains: any, highlands: any) {
  const avgTempMorn = Math.round((coastal.mornTemp + plains.mornTemp + highlands.mornTemp) / 3);
  const maxRainMorn = Math.max(coastal.mornRain, plains.mornRain, highlands.mornRain);
  const avgTempAft = Math.round((coastal.aftTemp + plains.aftTemp + highlands.aftTemp) / 3);
  const maxRainAft = Math.max(coastal.aftRain, plains.aftRain, highlands.aftRain);
  const avgTempNight = Math.round((coastal.nightTemp + plains.nightTemp + highlands.nightTemp) / 3);
  const maxRainNight = Math.max(coastal.nightRain, plains.nightRain, highlands.nightRain);

  let morning = `Morning in Pagbilao opens at ~${avgTempMorn}°C with moderate relative humidity. `;
  if (maxRainMorn > 40) {
    morning += `Light to localized rain showers (${maxRainMorn}% max probability) are likely across coastal and highland zones.`;
  } else {
    morning += `Fair to partly cloudy skies with low ${maxRainMorn}% rain chance and gentle surface breezes across all barangays.`;
  }

  let afternoon = `Temperatures peak around ~${avgTempAft}°C during the afternoon across the Central Plains. `;
  if (maxRainAft > 50) {
    afternoon += `Isolated rain showers or localized convection thunderstorms (${maxRainAft}% chance) are expected in inland areas.`;
  } else if (maxRainAft > 25) {
    afternoon += `Expect warm conditions with passing clouds and a moderate ${maxRainAft}% chance of brief localized rain.`;
  } else {
    afternoon += `Warm and sunny conditions will prevail, tempered by sea breeze along Pagbilao Bay.`;
  }

  let night = `Evening temperatures settle to ~${avgTempNight}°C under mostly clear to partly cloudy conditions. `;
  if (maxRainNight > 35) {
    night += `Isolated light showers (${maxRainNight}% chance) may persist overnight along northern mountain slopes.`;
  } else {
    night += `Calm and mild conditions expected overnight with light surface winds.`;
  }

  return {
    morning,
    afternoon,
    night,
    coastalSummary: `South Coastal (Bantigue, Polo, Pinagbayanan): ${coastal.temp}°C, winds ${coastal.wind} km/h, rain chance ${coastal.rain}%. Normal coastal conditions.`,
    plainsSummary: `Central Plains (Poblacion, Bukal, Talipan): ${plains.temp}°C, humidity ${plains.humidity}%, rain chance ${plains.rain}%. Warm urban environment.`,
    highlandsSummary: `North Highlands (Bagumbungan, Antipolo): ${highlands.temp}°C, humidity ${highlands.humidity}%, rain chance ${highlands.rain}%. Cooler mountain elevation.`
  };
}

export default async function handler(req: any, res: any) {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  res.setHeader("Access-Control-Allow-Origin", "*");

  try {
    const openMeteoUrl = `https://api.open-meteo.com/v1/forecast?latitude=13.9300,13.9680,14.0100&longitude=121.7200,121.6700,121.6800&current=temperature_2m,relative_humidity_2m,wind_speed_10m,wind_direction_10m,precipitation_probability,cloud_cover&hourly=temperature_2m,precipitation_probability,wind_speed_10m,cloud_cover&timezone=Asia%2FSingapore`;

    const omRes = await fetch(openMeteoUrl);
    if (!omRes.ok) {
      throw new Error(`Open-Meteo API returned HTTP ${omRes.status}`);
    }

    const omData = await omRes.json();
    const zoneDataArray = Array.isArray(omData) ? omData : [omData, omData, omData];

    const coastalStats = extractZoneStats(zoneDataArray[0]);
    const plainsStats = extractZoneStats(zoneDataArray[1]);
    const highlandsStats = extractZoneStats(zoneDataArray[2]);

    let synopsisResult: {
      morning: string;
      afternoon: string;
      night: string;
      coastalSummary: string;
      plainsSummary: string;
      highlandsSummary: string;
    };
    let aiGenerated = false;

    const ai = getGenAIClient();
    if (ai) {
      try {
        const prompt = `You are a professional meteorologist for Pagbilao, Quezon, Philippines.
Below is the exact live telemetry from Open-Meteo for Pagbilao's 3 geographic zones today:

1. South Coastal Zone (Bantigue, Polo, Pinagbayanan):
- Current Temp: ${coastalStats.temp}°C, Humidity: ${coastalStats.humidity}%, Wind: ${coastalStats.wind} km/h, Rain Prob: ${coastalStats.rain}%, Cloud: ${coastalStats.cloud}%
- Morning (06:00-11:00): Temp ${coastalStats.mornTemp}°C, Rain Prob ${coastalStats.mornRain}%
- Afternoon (12:00-17:00): Temp ${coastalStats.aftTemp}°C, Rain Prob ${coastalStats.aftRain}%
- Night (18:00-23:00): Temp ${coastalStats.nightTemp}°C, Rain Prob ${coastalStats.nightRain}%

2. Central Plains Zone (Poblacion, Bukal, Talipan):
- Current Temp: ${plainsStats.temp}°C, Humidity: ${plainsStats.humidity}%, Wind: ${plainsStats.wind} km/h, Rain Prob: ${plainsStats.rain}%, Cloud: ${plainsStats.cloud}%
- Morning (06:00-11:00): Temp ${plainsStats.mornTemp}°C, Rain Prob ${plainsStats.mornRain}%
- Afternoon (12:00-17:00): Temp ${plainsStats.aftTemp}°C, Rain Prob ${plainsStats.aftRain}%
- Night (18:00-23:00): Temp ${plainsStats.nightTemp}°C, Rain Prob ${plainsStats.nightRain}%

3. North Highlands Zone (Bagumbungan, Antipolo):
- Current Temp: ${highlandsStats.temp}°C, Humidity: ${highlandsStats.humidity}%, Wind: ${highlandsStats.wind} km/h, Rain Prob: ${highlandsStats.rain}%, Cloud: ${highlandsStats.cloud}%
- Morning (06:00-11:00): Temp ${highlandsStats.mornTemp}°C, Rain Prob ${highlandsStats.mornRain}%
- Afternoon (12:00-17:00): Temp ${highlandsStats.aftTemp}°C, Rain Prob ${highlandsStats.aftRain}%
- Night (18:00-23:00): Temp ${highlandsStats.nightTemp}°C, Rain Prob ${highlandsStats.nightRain}%

Generate a JSON object strictly following this structure (no markdown formatting, plain JSON):
{
  "morning": "2-sentence clear weather synopsis for morning in Pagbilao based on the data.",
  "afternoon": "2-sentence clear weather synopsis for afternoon in Pagbilao based on the data.",
  "night": "2-sentence clear weather synopsis for night in Pagbilao based on the data.",
  "coastalSummary": "1-sentence summary specifically for South Coastal zone (sea level / coastal winds).",
  "plainsSummary": "1-sentence summary specifically for Central Plains zone (urban / inland).",
  "highlandsSummary": "1-sentence summary specifically for North Highlands zone (high elevation / mountain temperature)."
}`;

        const geminiRes = await ai.models.generateContent({
          model: "gemini-3.6-flash",
          contents: prompt,
          config: {
            responseMimeType: "application/json",
          },
        });

        const jsonText = geminiRes.text ? geminiRes.text.trim() : "";
        if (jsonText) {
          synopsisResult = JSON.parse(jsonText);
          aiGenerated = true;
        } else {
          synopsisResult = generateRuleBasedSynopsis(coastalStats, plainsStats, highlandsStats);
        }
      } catch (geminiError) {
        console.warn("Gemini API call failed or fallback used:", geminiError);
        synopsisResult = generateRuleBasedSynopsis(coastalStats, plainsStats, highlandsStats);
      }
    } else {
      synopsisResult = generateRuleBasedSynopsis(coastalStats, plainsStats, highlandsStats);
    }

    return res.status(200).json({
      status: "ok",
      fetchedAt: new Date().toISOString(),
      aiGenerated,
      synopsis: synopsisResult,
      zones: {
        coastal: {
          name: "South Coastal (Bantigue, Polo, Pinagbayanan)",
          temp: `${coastalStats.temp}°C`,
          humidity: `${coastalStats.humidity}%`,
          wind: `${coastalStats.wind} km/h`,
          rain: `${coastalStats.rain}%`,
          cloud: `${coastalStats.cloud}%`,
          summary: synopsisResult.coastalSummary
        },
        plains: {
          name: "Central Plains (Poblacion, Bukal, Talipan)",
          temp: `${plainsStats.temp}°C`,
          humidity: `${plainsStats.humidity}%`,
          wind: `${plainsStats.wind} km/h`,
          rain: `${plainsStats.rain}%`,
          cloud: `${plainsStats.cloud}%`,
          summary: synopsisResult.plainsSummary
        },
        highlands: {
          name: "North Highlands (Bagumbungan, Antipolo)",
          temp: `${highlandsStats.temp}°C`,
          humidity: `${highlandsStats.humidity}%`,
          wind: `${highlandsStats.wind} km/h`,
          rain: `${highlandsStats.rain}%`,
          cloud: `${highlandsStats.cloud}%`,
          summary: synopsisResult.highlandsSummary
        }
      }
    });
  } catch (error: any) {
    console.error("Error in /api/weather-synopsis:", error);
    return res.status(500).json({
      status: "error",
      message: error?.message || "Failed to generate weather synopsis",
    });
  }
}
