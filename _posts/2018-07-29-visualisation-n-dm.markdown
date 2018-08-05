---
layout: post
title: "Visualisations"
---

Visualisation of Data Mining algorithms: K-Means vs. Fuzzy C-Means

Some time ago I need comprison of K-Means and Fuzzy C-Means clustering algos. I made visualisation for this task. There are some hardcoded values now - 4 clusters with 50 points. Cluster size is fixed. Centroids initialization takes 4 random points from existing points. Then clustering starts. Each cluster has own color. Fuzzy C-Means colors points in color mix. K-means color points by nearest centroid. Also convex hull is drawn for each cluster. Earlier there were centroid tracks but after fabric.js update this reature is broken by unknown reason. 