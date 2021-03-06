import fs from "fs";
import { getCategories, getMostPopularVideos, Video } from "../libs/youtube";

export const saveCategories = async () => {
  const categories = await getCategories();
  await fs.writeFileSync(
    "./json/youtube/categories.json",
    JSON.stringify(categories, null, 2)
  );
};

export const saveYouTube = async () => {
  const videos = await getMostPopularVideos(0, 50);
  const json = JSON.stringify(videos, null, 2);
  await fs.writeFileSync("./json/youtube/videos.json", json);

  const markdown: string = `# YouTube
  
${videos
  .map((video: Video, index: number) => {
    const { id, title, channelTitle, channelId } = video;
    const channel: string = `[${channelTitle}](https://www.youtube.com/channel/${channelId})`;
    return `${index + 1}. [${title}](https://youtu.be/${id}) - ${channel}`;
  })
  .join("\n")}
`;
  await fs.writeFileSync("./markdown/YOUTUBE.md", markdown);
};
