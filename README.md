# wolkd

Alle animaties `f(t, i, x, y) -> color`

Twee mogelijkheden:

  - Losse frames
  - Functie

## Installation


    npm install
    npm install spi

## Colors

https://github.com/One-com/one-color
http://stackoverflow.com/questions/726549/algorithm-for-additive-color-mixing-for-rgb-values
https://github.com/harthur/color

## Modifiers

modifiers: modifiers zijn functie op 1 frame, hebben envelope-functie/fadeout, en `t` als parameter. En modifiers slaan variabele `lastCalled` of zo op, als ze worden aangeroepen. En modifiers luisteren naar Websockets.

Ideeën:
  - mouse
  - invert
  - fft/audio-in
  - hue
  - alles uit/alles aan/één kleur
  - noise

## Raspberry

- Installation: http://raspberrypi.stackexchange.com/questions/15192/installing-raspbian-from-noobs-without-display
- WiFi: https://www.raspberrypi.org/documentation/configuration/wireless/wireless-cli.md
