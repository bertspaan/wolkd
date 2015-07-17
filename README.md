# wolkd

Alle animaties `f(t, i, x, y) -> color`

Twee mogelijkheden:

  - Losse frames
  - Functie

## Installation

    npm install
    npm install spi

    cp wolkd.example.config.json ~/wolkd.config.json
    export WOLKD_CONFIG=/home/bert/wolkd.config.json


## Patterns

## Modifiers

modifiers: modifiers zijn functie op 1 frame, hebben envelope-functie/fadeout, en `t` als parameter. En modifiers slaan variabele `lastCalled` of zo op, als ze worden aangeroepen. En modifiers luisteren naar Websockets.

Ideeën:
  - mouse
  - invert
  - fft/audio-in
  - hue
  - alles uit/alles aan/één kleur
  - noise

## Screen

Just `s.setPixel(pixel, r, g, b)` and then `s.update()` to update the screen

```js
  	var s = require('./lib/screen')
  	for(var i = 0; i < 100; i++) {
  		s.setPixel(i, Math.random()*255, Math.random()*255, Math.random()*255)
  	}
  	s.update()
```

## Raspberry

- Installation: http://raspberrypi.stackexchange.com/questions/15192/installing-raspbian-from-noobs-without-display
- WiFi: https://www.raspberrypi.org/documentation/configuration/wireless/wireless-cli.md
- Run `sudo raspi-config`
  - Enable SPI
  - Set locale
  - Set hostname to `wolk`
- Add user `wolk`: https://www.raspberrypi.org/documentation/linux/usage/users.md
  - `sudo adduser wolk`
  - `sudo usermod -a -G sudo,audio,video,users,netdev,input,spi,i2c,gpio wolk`
- Install Node.js: http://weworkweplay.com/play/raspberry-pi-nodejs/
- Install screen: `sudo apt-get install screen`
- Install nginx: https://www.raspberrypi.org/documentation/remote-access/web-server/nginx.md
- Install Shairport: http://www.redsilico.com/multiroom-audio-raspberry-pi
- Remove annoying hiss:
  - https://www.raspberrypi.org/forums/viewtopic.php?f=28&t=85811
  - `sudo nano /boot/config.txt`
  - Add `disable_audio_dither=1`
- Install

mopoidu

wolkd as service

## Gif

https://www.npmjs.com/package/pixel-gif

## BPM

- 120 BPM beetje standaard
- 500ms één beat
- Kijken hoeveel frames Rasp haalt
- Stel: 30ms per frame,
  - 16 frames per beat!
  - Ruim zitten
    - 80 BPM: 21 f/s
    - 100 BPM: 26 f/s
    - 120 BPM: 32 f/s
    - 160 BPM: 42 f/s

- Dus: maak functie die elke x ms draait, en corrigeert

## SCP

    scp -r ./ wolk@wolk.local:~/wolkd.new

## Daemon

  From http://www.slidequest.com/Taboca/70ang:

  1. `sudo npm install -g forever`
  2. `sudo cp ./daemon/wolk /etc/init.d/wolkd`
  3. `sudo chmod 755 /etc/init.d/wolkd`
  4. `update-rc.d wolkd defaults`

# TODO:

- BPM!
- Meer functies!
- Automator!


