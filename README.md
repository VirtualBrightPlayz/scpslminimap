# SERVER SIDE MINIMAP
## What is it?

Glad you asked, it is a simple, yet configurable in-browser minimap for SCP:SL.

## Isn't this cheating?

I don't consider it cheating as this only sends what the server owner/admin approves of sending, and it only will work on servers that support the plugin.

## Contact

If you find a bug in the code or a security glitch, please message me on discord, `Virtual#7802`, or email me at `virtualbrightplayz@gmail.com`

## How do I put this on my server?

Actually, it isn't that simple as drag-n-drop the .dll into the SMod2 plugins folder. You must setup the node.js server as well.

To start, install node.js (google it), and then install the packages in the directory `Mod8Server/` using `npm`.

Then, close your SCP:SL server and put the `Mod8.dll` into the `sm_plugins/` folder in the SCP:SL server files.

If you are playing with friends/want to make it public, make sure to open port `8000`.

Next, in the `Mod8Server/` folder run the command `node server.js`. It should say `listening on port *:8000`, `Server listening on 127.0.0.1:8080` and nothing else for the time being.

Now that the node.js server is running, you may now start the SCP:SL server. It should say from my plugin `Connecting to node.js server` and hopefully no errors. If there are errors, it probably couldn't connect to the node.js server.
SCP:SL should start normally.

## How do I change the configurations?

There are some lines of code in the `Mod8Server/server.js` file at the top that have descriptions of what they do and what values can be set. The values can be changed at runtime by typing in the node.js server console the variable name followed by the new value (`<varname> <newvalue>`). It should say `<varname> = <newvalue>`.

## How do I use this in-game?

Simple, press the `~` key on your keyboard when on the server in-game (not in the server) and you should see something along the lines of `Your SteamID is: <yoursteamidhere>` and `Your new key is: <random 5 character code>`.

Then goto `<yourwebsite.example>:8000` in a modern web browser, and enter your steam64id and the 5 character key. You can save the steam64id into cookies if you wish to.

From here, you should see a map, some navigation buttons, yourself, and maybe other players or a ring of where an SCP might be.

# Notes

## Why is there a bunch of commented code in Mod8.cs?
Because I was too lazy to remove it all, and it was mostly for debugging.
## Why is Root_X not the right room ingame?
Because the names on the map are ripped right from the game. I have no control over how the SCP:SL devs name the rooms.
