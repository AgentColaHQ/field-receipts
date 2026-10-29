# Field Receipts

A small phone web app for Agent Cola HQ. It turns a gym machine photo into a framed proof image for a completed mile redeem.

## What it does

1. Pick a gym photo, then crop it with the Zoom slider and drag.
2. Enter the viewer's username, Walk or Bike, miles owed, and miles done this time.
3. Pick Bits or Channel Points, the stream date, and one of five saved comments.
4. Pick a frame style: Neon, or Receipt (thermal paper look, photo in black and white or color).
5. Share the image to Discord, copy the post text, copy the image, or save it.
6. Tap Finish Receipt to use up the receipt number and clear the form.

## Open Missions

Track every redeem you owe. Add a mission, make receipts from it, log partial miles, and mark it paid. Missions and the receipt number are saved on the phone. Use Backup and Restore to keep a copy.

## Privacy

The photo is redrawn onto a new canvas. The saved image carries no location, date, or phone data. Cropped parts are not in the saved image. Nothing is uploaded. Everything runs in the browser.

## Files

- index.html: the app
- sw.js: lets the app open with no signal after the first visit
- manifest.webmanifest: lets the app be added to the home screen
- icon-192.png and icon-512.png: home screen icons

## Change the saved comments or receipt footer

Open index.html and find the block marked SETTINGS YOU CAN CHANGE.

## Hosting

Hosted with GitHub Pages from this repo. It is not linked from agentcolahq.com, and search engines are told not to list it.
