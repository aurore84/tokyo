// ========= 1. 设置Cesium基础路径 =========
window.CESIUM_BASE_URL = 'Cesium/Build/Cesium/';

// ========= 2. 设置Cesium ion Token（测试用，建议替换） =========
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkOTcwNGJiMi1jZGMxLTRmYWQtYWVkYy03NTExNjgwMmZmMDIiLCJpZCI6MzA2MjgwLCJpYXQiOjE3NDgyNDEwNTZ9.uWzKJd7hvZgAlifHHHNpCtF02jU0ee3OULbbVxNyLpE';

// ========= 3. 全局变量 =========
let viewer;
let trafficLayer = null;
let tileset = null;
let isNightMode = false;

// ========= 4. 初始化Viewer =========
document.addEventListener('DOMContentLoaded', async function() {
  try {
    // 初始化Cesium Viewer
    viewer = new Cesium.Viewer('cesiumContainer', {
      terrainProvider: await Cesium.createWorldTerrainAsync(),
      animation: false,
      timeline: false,
      sceneModePicker: false,
      baseLayerPicker: false,
      skyBox: false // 初始禁用天空盒
    });

    // 设置初始背景色
    viewer.scene.backgroundColor = Cesium.Color.BLACK;

    // 加载交通数据
    trafficLayer = await Cesium.GeoJsonDataSource.load('data/tokyo_motorway.geojson', {
      stroke: Cesium.Color.YELLOW.withAlpha(0.8),
      strokeWidth: 3,
      clampToGround: true
    });
    viewer.dataSources.add(trafficLayer);

    // 加载3D建筑（使用东京示例数据）
    tileset = await Cesium.Cesium3DTileset.fromIonAssetId(96188); // 替换为你的assetId
    viewer.scene.primitives.add(tileset);

    // 初始视角
    flyToTokyo();

    console.log('Cesium初始化完成！');
  } catch (error) {
    console.error('初始化失败:', error);
    alert('地图加载失败，请检查控制台错误');
  }
});

// ========= 5. 功能函数 =========

// 飞到东京
window.flyToTokyo = function() {
  if (!viewer) return alert('地图未加载完成');
  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(139.6917, 35.6895, 25000),
    orientation: {
      heading: Cesium.Math.toRadians(0),
      pitch: Cesium.Math.toRadians(-30),
      roll: 0
    },
    duration: 2
  });
};

// 切换交通显示
window.toggleTraffic = function() {
  if (trafficLayer) {
    trafficLayer.show = !trafficLayer.show;
    alert('交通图层已' + (trafficLayer.show ? '显示' : '隐藏'));
  }
};

// 夜景模式
window.switchToNight = function() {
  if (!viewer || isNightMode) return;

  // 光照设置
  viewer.scene.globe.enableLighting = true;
  viewer.scene.light = new Cesium.DirectionalLight({
    direction: Cesium.Cartesian3.fromDegrees(-135, 30),
    intensity: 0.5,
    color: Cesium.Color.fromCssColorString('#3a3a5a')
  });

  // 环境设置
  viewer.scene.skyAtmosphere.brightnessShift = -0.7;
  viewer.scene.skyAtmosphere.hueShift = 0.5;
  viewer.scene.backgroundColor = Cesium.Color.fromCssColorString('#0a0a1a');

  // 3D建筑设置
  if (tileset) {
    tileset.luminanceAtNight = 0.3;
  }

  isNightMode = true;
  console.log('夜景模式已激活');
};

// 白天模式
window.resetDayMode = function() {
  if (!viewer || !isNightMode) return;

  // 恢复日光
  viewer.scene.globe.enableLighting = false;
  viewer.scene.light = new Cesium.SunLight();

  // 恢复环境
  viewer.scene.skyAtmosphere.brightnessShift = 0;
  viewer.scene.skyAtmosphere.hueShift = 0;
  viewer.scene.backgroundColor = Cesium.Color.BLACK;

  // 恢复3D建筑
  if (tileset) {
    tileset.luminanceAtNight = 0;
  }

  isNightMode = false;
  console.log('已恢复白天模式');
};