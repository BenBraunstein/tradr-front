## Tradr

Welcome to Tradr!

## Demo

[Try it!](https://tradr-frontend.herokuapp.com/)

## Motivation

Everyone has old stuff they don't use anymore, which sits in the corner of your room or in the back of a closet somewhere.

You don't want to get rid of these because they have value. Either that value is to you or to someone else, it still exists.

Tradr is an app where you could finally get these things out of your house (and make your spouse happy) and into the hands of someone who will finally put them to good use once again. Not only will you rid yourself of these items, you can get something of actual value in return.

## Build Status

Tradr is in a Beta Status. It is ready for everyday use, however has some small bugs which will be fixed.

## Code Style

Indentation using Prettier Code Formatter.

## Frameworks

This app is built using React.js, FileStack, Rails 5 API and the Twilio API to send SMS messages.

## Installation

Clone down then start the backend with the command `rails s`.

## Features

1. Authentication and Authorization using Bcrypt and JSON Web Tokens.
2. Add items you want to trade into your list of items (and add images of them using FilesStack)
3. View, search and filter all available items for trade
4. Propose trades with others.
5. Integrated notification system to see all pending trades.
6. New trades use Twilio API to send SMS messages and notify recipient of the trade.
7. Users of the application can chat using Text and Emoji.

## License

GNU

## [Front-End Github](https://github.com/MildlyConfused/tradr-front)

## Screenshots

Homepage:

![Homepage Showing Avaiable Items](https://i.imgur.com/SCNBu9J.png)

Adding an Item:

![Adding an Item](https://i.imgur.com/Ykd9DXb.png)

Making a Trade:

![Making a Trade](https://i.imgur.com/SCNBu9J.png)

Outgoing Trade Notification:

![Outgoing Trade Notification](https://i.imgur.com/oF6Fd2X.png)

Incoming Trade Notification:

![Incoming Trade Notification](https://i.imgur.com/N3Dnsbb.png)

Tradr Chat:

![Tradr Chat](https://i.imgur.com/WFb00Xv.png)

SMS Message Example:

![SMS Message Example](https://i.imgur.com/YU9qvDk.png)
