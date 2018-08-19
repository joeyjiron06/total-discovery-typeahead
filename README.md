# Total Discovery Typeahead

Hi, and thank you for viewing my single page application, built in response to [https://gist.github.com/amysutedja/1ba14c8fd501ac9196c463154e96e429](https://gist.github.com/amysutedja/1ba14c8fd501ac9196c463154e96e429). This was a really fun project to write because it aims to solve a real world problem. I tried to give it the look and feel of the total discovery website.

## Getting Started

Just clone the repo, install the dependencies, and start your server.

```bash
git clone https://github.com/joeyjiron06/total-discover-assignment.git
npm install
npm start
```

## Key features

I attempted to give the search functionality a true first-class experience, by borrowing UX patterns from google, amazon, facebook, apple and their awesome autocomplete features.

**Debouncing** - instead of sending every query to the server and hammering it with requests, I debounce the api requests to the server. There are solutions out there to help with this if using redux and wrapper libraries that cancel XHR requests, debouncers, etc. I avoid using those libraries because this application is so small and doesn't need more libraries.

**Key Navigation** - When you type something and you see the autocomplete dropdown, you can use the up and down arrows to highlight any of the suggestions (only tested this in chrome). The highlighting logic wraps around, meaning if you are currently highligting the last item, then pressing down will move the highlight to the top and same goes the other way around.

**ESC to close** - you can close the autocomplete dropdown by pressing the `ESCAPE` key.

**ENTER to search** - you commit to your search query by pressing the `ENTER` key. Optionally, you can press the search icon.

## Tests

I am a huge fan of TDD, but decided to leave them out for this demo and test by hand since I had limited time and wanted to focus my time on making an awesome UI. Of course if I was shipping this to customers, there's no way I would let this release without testing.

## Api Server

I created a REST server using [http://restify.com/](restify) because it's easy to use and extremely lightweight. I use `nodemon` so that the server restarts when you modify and save `api-server/index.js` (easier for development). The server runs at port 8080 and only has 2 endpoints. The data is an in-memory array and the endpoints are extremely dumb in how they return data, but good enough for demo purposes.

I took image assests and copy from [https://www.totaldiscovery.com/](https://www.totaldiscovery.com/) to make it look like the website.

Hope you enjoy my project :)
