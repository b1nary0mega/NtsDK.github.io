---
layout: post
title: "Visualizations"
---

## Visualization of Data Mining algorithms: K-Means vs. Fuzzy C-Means

Some time ago I need comparison of K-Means and Fuzzy C-Means clustering algorithms. I made a [visualization][km-fm-vis] of these algs. There are some hardcoded values now - 4 clusters with 50 points. Cluster size is fixed. Centroids initialization takes 4 random points from existing points. Then clustering starts. Each cluster has own color. Fuzzy C-Means colors points in color mix. K-means colors points by nearest centroid. Also convex hull is drawn for each cluster. Earlier there were centroid tracks but after fabric.js update this feature is broken by unknown reason.

* [Visualization of Data Mining algorithms: K-Means vs. Fuzzy C-Means - Repo][km-fm-repo]

![My helpful screenshot]({{ "/images/FCMvsKMeans-big.jpg" | absolute_url }})

## Vorkosigan Saga wormholes map

Many Vorkosigan Saga games require the wormholes map. I search Internet for some but most of them have bad quality. So I decided to solve this problem. First of all I made a graphML map for yEd editor (free schema editor). Using it you can make changes in the map as you wish like changing colors, adding planets and so on. Then you can export an image to raster (PNG) or vector (SVG) format. Also you can apply many types of schema layouts from yEd. I published a wormhole map JSON data file in both English and Russian.

Also I have a force directed 3D schema renderer. If you don't understand what does it mean just look how it works.

* [Vorkosigan Saga wormholes map GraphML (for yEd, ENG)][wh-map-yed]
* [Vorkosigan Saga wormholes map png (raster, ENG)][wh-map-png]
* [Vorkosigan Saga wormholes map svg (vector, ENG)][wh-map-svg]
* [Vorkosigan Saga wormholes map JSON (for programming, ENG)][wh-map-json]
* [Vorkosigan Saga wormholes map 3D, ENG][wh-map-3d]

![My helpful screenshot]({{ "/barrayar/Barrayar tunnel map - en.svg" | absolute_url }})

## Polls Assistant

This is a modification of Larpwriter Toolkit NIMS early version for saving polls visitor statistics. It includes simple visualization comparison tool.

![My helpful screenshot]({{ "/images/polls.jpg" | absolute_url }})

[km-fm-vis]: /dmVis/page.html
[km-fm-repo]: https://github.com/NtsDK/Data-Mining-Visualizations
[wh-map-yed]: /barrayar/Barrayar tunnel map - en.graphml
[wh-map-png]: /barrayar/Barrayar tunnel map - en.png
[wh-map-svg]: /barrayar/Barrayar tunnel map - en.svg
[wh-map-json]: /barrayar/Barrayar tunnel map - en.json
[wh-map-3d]: /nims/Graph-Visualization/barrayar3d-en.html