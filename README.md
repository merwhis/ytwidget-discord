
# Discord | Youtube Statistics Widget

Show ur YouTube channel statistics on discord profile.


![YouTube](https://img.shields.io/badge/YouTube-black?logo=youtube)
![Discord](https://img.shields.io/badge/Discord-black?logo=discord&logoColor=white)
[![MIT License](https://img.shields.io/badge/License-MIT-black?labelColor=black)](https://choosealicense.com/licenses/mit/)


## Widget Setup

 - **You can find all widget tutorials, errors and solutions in [Discord Previews](https://discord.gg/discord-603970300668805120).**
 
 - **Widget Tutorial (Discord Previews):** **https://discord.com/channels/603970300668805120/1520802815310823544**


- # Widget Top
**Select Layout: Contained**

| Name | Presentation Type | Value Type    | Data Field | Fallback |
| :-------- | :------- | :-------- | :------------------------- | :------------------------- |
| `Image` | Media | `User Data` | `channel_image` | Application Asset - youtube_icon|
| `Title` |  String | `User Data` | `channel_name` | Custom String - Loading.. |
| `Subtitle 1` |  String | `User Data` | `channel_username` | Custom String - Loading.. |

- # Widget Bottom
**Select Layout: Collection**

| | | | |
|:-:|:-:|:-:|:-:|
| ![](https://raw.githubusercontent.com/merwhis/ytwidget-discord/refs/heads/main/images-tutorial/BottomItem1.png) | ![](https://raw.githubusercontent.com/merwhis/ytwidget-discord/refs/heads/main/images-tutorial/BottomItem2.png) | ![](https://raw.githubusercontent.com/merwhis/ytwidget-discord/refs/heads/main/images-tutorial/BottomItem3.png) | ![](https://raw.githubusercontent.com/merwhis/ytwidget-discord/refs/heads/main/images-tutorial/BottomItem4.png) |

- # Add Widget Preview
**Select Layout: Hero**
![](https://raw.githubusercontent.com/merwhis/ytwidget-discord/refs/heads/main/images-tutorial/HeroImage.png)

- # Widget Sample JSON
```js
{
  "data": {
    "dynamic": [
      {
        "type": 3,
        "name": "channel_image",
        "value": {
          "url": "<URL to channel_image.png>"
        }
      },
      {
        "type": 1,
        "name": "channel_name",
        "value": "Whisky"
      },
      {
        "type": 1,
        "name": "channel_username",
        "value": "@testuser"
      },
      {
        "type": 1,
        "name": "subs_count",
        "value": "1000"
      },
      {
        "type": 1,
        "name": "video_count",
        "value": "15"
      },
      {
        "type": 1,
        "name": "channel_date",
        "value": "05/12/2015"
      }
    ]
  }
}
```
---



    
## Setup / Installation

 - Install dependencies:


```bash
  npm install
```

- Configure environment variables:
```bash
YOUTUBE_CHANNEL_ID=Your Channel ID
YOUTUBE_API_KEY=Your YouTube Data V3 API Key
DISCORD_BOT_TOKEN=Your Discord Bot Token
DISCORD_APPLICATION_ID=Your Discord Bot ID
DISCORD_USER_ID=Your Discord ID
```

- Run the project.
```bash
  npm run start
```


    
## Environment Variables



| Name | Required     | Description                |
| :-------- | :------- | :------------------------- |
| `YOUTUBE_CHANNEL_ID` | `yes` | Find on https://www.tunepocket.com/youtube-channel-id-finder/ |
| `YOUTUBE_API_KEY` | `yes` | Get on https://console.cloud.google.com/ * YouTube Data V3 API |
| `DISCORD_BOT_TOKEN` | `yes` | Get on https://discord.com/developers/home |
| `DISCORD_APPLICATION_ID` | `yes` | Get on https://discord.com/developers/home |
| `DISCORD_USER_ID` | `yes` | Get on https://discord.com/ |




