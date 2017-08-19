Cesium.BingMapsApi.defaultKey = "AmpMgzJo6R6yUmEllLhbqHLYM5Jrza_bJkzpR0rXdZFYywlCPcbMI07S1eN5Qnvd";

var viewer = new Cesium.Viewer('cesiumContainer', {
    animation: false,
    baseLayerPicker: true,
    geocoder: false,
    imageryProvider: false,
    homeButton: false,
    navigationHelpButton: false,
    timeline: false,
    infoBox: false
});

var tileset = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
    url: 'data/stadium_all',
    debugShowStatistics: true,
    debugShowBoundingVolume: true,
}));

tileset.readyPromise.then(function() {
    console.log('Loaded tileset');
    var bounding = tileset._root._boundingVolume;
    var center = bounding.boundingSphere.center;
    var cart = Cesium.Ellipsoid.WGS84.cartesianToCartographic(center);
    var dest = Cesium.Cartesian3.fromDegrees(
        cart.longitude * (180 / Math.PI),
        cart.latitude * (180 / Math.PI),
        bounding.boundingSphere.radius * 2.2);

    viewer.camera.setView({
        destination: dest
    });
});