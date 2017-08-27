# Kraken Tracker

**Simple desktop app for tracking prices of major currencies on kraken exchange**

This is a minimal Electron application built using the Kraken public API. The only current feature available is viewing the current ticker price of ETH and BTC in various fiat currency denominations.

## Setup

In order to make calls to the private kraken API endpoints (no currennt features use this, but may be added in future - such as placing orders), an API key and secret need to be passed as environment variables. The easiest way to do this is create a .env file and set the following:

```bash
# Set API key and secret
apiKey='asdffjvaljhjlas'
apiSec='arhgrabvanslkasvarsvas=='
```


## To Use

To clone and run this repository you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
git clone https://github.com/louisstewart/KrakenTracker
# Go into the repository
cd KrakenTracker
# Install dependencies
npm install
# Run the app
npm start
```

Note: If you're using Linux Bash for Windows, [see this guide](https://www.howtogeek.com/261575/how-to-run-graphical-linux-desktop-applications-from-windows-10s-bash-shell/) or use `node` from the command prompt.

## License

[CC0 1.0 (Public Domain)](LICENSE.md)
