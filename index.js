const dotenv = require("dotenv");
const { google } = require("googleapis");

dotenv.config();

const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;
const API_KEY = process.env.YOUTUBE_API_KEY;
const USER_ID = process.env.DISCORD_USER_ID;
const APPLICATION_ID = process.env.DISCORD_APPLICATION_ID;
const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
const INTERVAL_MIN = 30; // minute

const requiredEnv = {
  CHANNEL_ID,
  API_KEY,
  USER_ID,
  APPLICATION_ID,
  BOT_TOKEN,
  INTERVAL_MIN
};

for (const [key, value] of Object.entries(requiredEnv)) {
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
};

async function getChannelDetails(channelId, apiKey) {
  try {
    const youtube = google.youtube({
      version: "v3",
      auth: apiKey,
    });

    const response = await youtube.channels.list({
      part: ["snippet", "statistics"],
      id: [channelId],
    });

    const channel = response.data.items?.[0];

    if (!channel) {
      return {
        success: false,
        message: "Channel not found.",
      };
    };

    const snippet = channel.snippet || {};
    const stats = channel.statistics || {};

    const thumbnails = snippet.thumbnails || {};

    const channelImage =
      thumbnails.high?.url ||
      thumbnails.medium?.url ||
      thumbnails.default?.url ||
      "https://static.thenounproject.com/png/5100711-200.png";

    return {
      success: true,
      data: {
        dynamic: [
          {
            type: 3,
            name: "channel_image",
            value: {
              url: String(channelImage),
            },
          },
          {
            type: 1,
            name: "channel_name",
            value: String(snippet.title || "Non"),
          },
          {
            type: 1,
            name: "channel_username",
            value: String(snippet.customUrl || "Non"),
          },
          {
            type: 1,
            name: "subs_count",
            value: Number(stats.subscriberCount || 0).toLocaleString("en-US"),
          },
          {
            type: 1,
            name: "video_count",
            value: Number(stats.videoCount || 0).toLocaleString("en-US"),
          },
          {
            type: 1,
            name: "channel_date",
            value: snippet.publishedAt
              ? new Date(snippet.publishedAt).toLocaleDateString("en-US")
              : "Non",
          },
        ],
      },
    };
  } catch (error) {
    console.error("[YouTube API Error]");
    console.error(error);
    return {
      success: false,
      message: error.message,
    };
  };
};

async function patchWidget(payload) {
  const url = `https://discord.com/api/v9/applications/${APPLICATION_ID}/users/${USER_ID}/identities/0/profile`;

  const controller = new AbortController();

  const timeout = setTimeout(() => {
    controller.abort();
  }, 15000);

  try {
    return await fetch(url, {
      method: "PATCH",
      headers: {
        Authorization: `Bot ${BOT_TOKEN}`,
        "Content-Type": "application/json",
        "User-Agent": "DiscordBot",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  };
};

async function widgetMainJob() {
  const youtubeData = await getChannelDetails(CHANNEL_ID, API_KEY);

  if (!youtubeData.success) {
    console.error("[Widget] Failed to fetch YouTube data.");
    return;
  };

  const payload = {
    username: "youtubestatswhisky",
    data: youtubeData.data,
  };

  const response = await patchWidget(payload);

  if (response.ok) {
    console.log(`[${new Date().toISOString()}] Widget patched successfully.`);
    return;
  };

  const body = await response.text();

  console.error("[Discord PATCH Failed]");
  console.error("Status:", response.status);
  console.error("Response:", body);
};

let running = false;

async function runWidgetJob() {
  if (running) {
    console.log("job still running. skipping...");
    return;
  };

  running = true;

  try {
    await widgetMainJob();
  } catch (error) {
    console.error("[Widget Error]");
    console.error(error);
  } finally {
    running = false;
  };
};

// first start
runWidgetJob();

// run every INTERVAL_MIN min
setInterval(runWidgetJob, INTERVAL_MIN * 60 * 1000);
