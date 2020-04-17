## Multiuser Sketchpad (COVID-19 edition)

Seeing that the only solution to fight COVID-19 is to stay home, I thought it would be a good idea to bring this project back and help people stay connected somehow.

[https://multiuser-sketchpad.glitch.me/](https://multiuser-sketchpad.glitch.me/)

#### Dev notes

This is a rework of a websockets experiment I did back in 2010:
[https://web.archive.org/web/20101103142857/http://mrdoob.com/blog/post/701](https://web.archive.org/web/20101103142857/http://mrdoob.com/blog/post/701)
[https://multisketchpad.tumblr.com/](https://multisketchpad.tumblr.com/)

Back then browsers didn't support binary websockets yet so it turned out to be a bit expensive to maintain and I had to shut it down.

10 years later, most browsers support binary websockets and pointer events so making this was fairly straighforward.

The part that took time was defining the data packets (which ended up being a bit like a video codec). Most of the events being sent are delta positions so the average packet size is 4 bytes.

Seems like people are mostly interested in the `server.js` file but imho the interesting ones are `Recorder.js` and `Painter.js`.

Hope to see people remixing this so we can start seeing more multiuser realtime sites!

Stay safe.

[Mr.doob](https://mrdoob.com/)

P.S Let me know if you have suggestions or feature requests: [@mrdoob](https://twitter.com/mrdoob)

P.P.S Please, don't try to break it. Consider using these skills for good instead.