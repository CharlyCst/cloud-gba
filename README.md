# Cloud-GBA

Have you ever used console emulators to revive memories of your childhood ? They are pretty cool, but using them can be fairly cumbersome. It was time for the Game Boy to finally enter the era of game streaming, this is what Cloud-GBA provides you.

## Building the project

You can use the `build-lib.sh` to build mGBA (notably the mGBA python bindings which are needed for the server). You might need to add `-DCMAKE_POSITION_INDEPENDENT_CODE=ON` to cmake and remove the `-DLIBMGBA_ONLY:bool=TRUE` flag for it to work.

## Running the project

To run the server, you need to download a game ROM, edit the game loader to load this game, and launch the server : `python3 server.py 1 &> /dev/null`. You can either host your own web client by running `static_server.go`, or use the hosted one at `https://charlycst.github.io/cloud-gba/` provided your server is accessible from the Internet.

Now you can go on the web page, provide your server IP:PORT and you are ready to play !