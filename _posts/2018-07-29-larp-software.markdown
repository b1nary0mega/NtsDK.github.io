---
layout: post
title: "LARP software and activities"
---

Sometimes I made small programs for LARP. I will enumerate them here.

## Program "Match characters and players"

[Program for matching characters and players][matcher] and vice versa. Enter players and characters lists, enter profile item list, fill profiles. Program automatically match players and characters.

![My helpful screenshot]({{ "/images/matcher-big.jpg" | absolute_url }})

## The Mixing Desk of LARP

The Mixing Desk of LARP - famous Nordic LARP tool. It is used for make general view of game design and organizers decision perspective. The Mixing Desk is fully configurable. You can add/remove sliders and save your work state. Checked in Firefox and Chrome. Also the mixing desk of LARP is available as part of Larpwriter Toolkit NIMS.

* [The Mixing Desk of LARP classic][mdol-classic]
* [The Mixing Desk of LARP empty][mdol-empty]

![My helpful screenshot]({{ "/images/mixingDeskOfLARP.jpg" | absolute_url }})

## Gears

Gears is a well known tool for creating LARPs in Russia. You can use clear LARP design cards from Larpwriter Toolkit NIMS to get the same tool.

Steps of usage:

1. Create a node for each character and important item of your LARP
2. If character A needs character B to solve his problem then draw connection from A to B and add a note what is the connection means.

![My helpful screenshot]({{ "/images/cogs.jpg" | absolute_url }})

## Watches (2017)

Watches was a city LARP game by [The World of Watches][watches-link] franchise. It has a tool for organizers and for several types of players. It has mobile UI for field players and geo service for analytics.

![My helpful screenshot]({{ "/images/watches.jpg" | absolute_url }})

## Translation of "So You Want to Write a LARP" by Jeff Diewald

One day I found this [video][larp-101-onsite]. I liked it and translated it in Russian. I made a simple presentation packer for deck.js. I split initial presentation in several html files and packer automatically compile them back it two version: [bilingual][larp-101-en-ru] and [translation][larp-101-ru] only.

* [Translation source code][larp-101-repo]

## Deus Ex Machina - shop (2017)

This is an AWS Shop system made for [Deus Ex Machina LARP][deus-larp]. This is one part of a big IT solution named Alice. See [video][deus-shop-yt] for AWS shop details.

* [Build of AWS Shop][deus-shop-build]
* [Sources of Alice (IT system made by Stairway to Heaven group)][deus-alice]

![My helpful screenshot]({{ "/images/deus-shop.jpg" | absolute_url }})

## City Runner (2015)

City Runner project was made for city LARP game Arkham. On the other side. (RUS) and consist of server and gates editor. Game master creates gates schema. Gates consist of several trials for player. Gates schema loaded on the server and activated. After this player can enter the gates by the web link. Masters print gates link on QR code, players search QR-codes and solve trials. Master interface is built for desktops. Players interface is for smartphones. 

![My helpful screenshot](http://cs630917.vk.me/v630917695/dac3/bSI3xsOaQ-w.jpg)

## Cyber-City (2013)

Cyber-City project was made for pavilion LARP game Battletech 3: Arena's cost. (RU) There was a big developers team (RUS). Cyber-City is a game portal with information layer. It includes: banking, virtual possessions (stocks, companies, etc.), mech battles support, instant messages player-player and player-master, ratings and other. All made from scratch by Java+Tomcat+MySQL. 

![My helpful screenshot](http://cs630917.vk.me/v630917695/e03f/lAlfJoB4lbg.jpg)

[matcher]: /matcher/matcher-en.html
[mdol-classic]: /sliderShare/sliderShare-mdol-en.html
[mdol-empty]: /sliderShare/sliderShare-en.html
[watches-link]: https://en.wikipedia.org/wiki/World_of_Watches
[deus-larp]: http://deus.rpg.ru/
[deus-shop-build]: https://github.com/NtsDK/deus-ex-shop
[deus-alice]: https://github.com/sth-larp
[deus-shop-yt]: https://www.youtube.com/watch?v=M3XN6NM1tTg
[larp-101-onsite]: https://larpoutofcharacter.wordpress.com/2015/02/26/so-you-want-to-write-a-larp/
[larp-101-repo]: https://github.com/NtsDK/larp-theory-101-translation
[larp-101-en-ru]: /larp-theory-101/en_ru.html
[larp-101-ru]: /larp-theory-101/index.html
