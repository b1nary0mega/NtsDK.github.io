---
layout: post
title: "Visualizations"
---

## Visualization of Data Mining algorithms: K-Means vs. Fuzzy C-Means

Some time ago I need comparison of K-Means and Fuzzy C-Means clustering algorithms. I made a [visualization][km-fm-vis] of these algs. There are some hardcoded values now - 4 clusters with 50 points. Cluster size is fixed. Centroids initialization takes 4 random points from existing points. Then clustering starts. Each cluster has own color. Fuzzy C-Means colors points in color mix. K-means colors points by nearest centroid. Also convex hull is drawn for each cluster. Earlier there were centroid tracks but after fabric.js update this feature is broken by unknown reason.

![My helpful screenshot]({{ "/images/FCMvsKMeans-big.jpg" | absolute_url }})

## Links

* [Visualization of Data Mining algorithms: K-Means vs. Fuzzy C-Means - Repo][km-fm-repo]

[km-fm-vis]: /dmVis/page.html
[km-fm-repo]: https://github.com/NtsDK/Data-Mining-Visualizations