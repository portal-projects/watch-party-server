# Portal-Watch-Party
This website works by:
1. Loading the YouTube API as defined at https://developers.google.com/youtube/iframe_api_reference
2. Comparing the date the video began (or is scheduled to begin) to the current date. This makes the current date minus the scheduled date the timestamp. (This also becomes the "start" playerVar on iframe load.)

Because of the fact that nearly all html objects are governed by javascript, this process can be customized to your heart's content. Since the iplayer does not exist in index.html, and whether or not it loads could be governed by an "if" statement in main.js, we could potentially expand the website to work for video files and videos from other websites.

Major Changes:
5/15/20: Intermission system complete
