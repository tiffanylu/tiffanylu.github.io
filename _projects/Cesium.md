---
title: Cesium
layout: project
---
# ![][5] Cesium
### Aug - Dec 2015
#### Contributor

[Cesium][6] is an open-source JavaScript library for world-class 3D globes and maps. It is downloaded more than 10,000 times every month and powers apps that reach millions of users. I contributed to two Cesium releases under the mentorship of lead developer Patrick Cozzi, during an [Open-Source Software Development course][9] at the University of Pennsylvania.

## CZML Examples

[CZML][8] is Cesium’s JSON schema for describing time-dynamic scenes. It uses information "packets" of graphical primitives (e.g., lines, points, shapes, sprites) and their change over time to describe graphical properties for individual objects in a scene. I helped smooth out the CZML learning curve for Cesium users by adding breadth and depth of CZML examples to the demo environment (Cesium Sandcastle).

- CZML Gallery, [Cesium Sandcastle][7] (see CZML tab)
- ["Hosting Cesium Sandcastle with GitHub Pages"][3], Cesium Blog
- [Cesium Version 1.15 Release Notes][10]
  - See GitHub issues [#3027][14] and [#3063][13]

## Optimizing Imagery Providers

Cesium serves terrain imagery via graphical map tiles served by various imagery providers (e.g., OpenStreetMap, Bing, Mapbox). Despite vast amounts of shared logic between retrieving images from different providers, the Cesium codebase had separate classes and methods for each imagery provider. I abstracted specific imagery provider classes (e.g., `OpenStreetMapImageryProvider`, `TileMapServiceImageryProvider`) to inherit functionality from a generic `UrlTemplateImageryProvider`.

- [Cesium Version 1.16 Release Notes][12]
  - See GitHub pull request [#3150][11]

[1]: https://docs.google.com/presentation/d/1B3TKKrlR3Cv7rHPrFh6q_cm9WRHjiUvoXqldixDYwtw/edit?usp=sharing
[2]: http://cesiumjs.org/2015/09/29/Collaboration-with-University-of-Pennsylvania/
[3]: http://cesiumjs.org/2015/10/07/Hosting-Cesium-Sandcastle-with-GitHub-pages/
[4]: http://cesiumjs.org/2015/11/02/Cesium-version-1.15-released/
[5]: /assets/images/cesium-logo.jpg
[6]: https://cesium.com/
[7]: http://cesiumjs.org/Cesium/Apps/Sandcastle/index.html
[8]: https://github.com/AnalyticalGraphicsInc/czml-writer/wiki/CZML-Guide
[9]: https://cesium.com/blog/2015/09/29/collaboration-with-university-of-pennsylvania/
[10]: https://cesium.com/blog/2015/11/02/cesium-version-1.15-released/
[11]: https://github.com/AnalyticalGraphicsInc/cesium/pull/3150
[12]: https://github.com/AnalyticalGraphicsInc/cesium/blob/1.18/CHANGES.md
[13]: https://github.com/AnalyticalGraphicsInc/cesium/issues/3063
[14]: https://github.com/AnalyticalGraphicsInc/cesium/issues/3027
