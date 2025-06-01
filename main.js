// ========= 1. 必须设置 Cesium 静态路径 =========
window.CESIUM_BASE_URL = 'Cesium/Build/Cesium/';

// ========= 2. 设置 Cesium ion Token（替换为你自己的） =========
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkOTcwNGJiMi1jZGMxLTRmYWQtYWVkYy03NTExNjgwMmZmMDIiLCJpZCI6MzA2MjgwLCJpYXQiOjE3NDgyNDEwNTZ9.uWzKJd7hvZgAlifHHHNpCtF02jU0ee3OULbbVxNyLpE';  // 请替换！

// ========= 3. 全局变量 =========
let viewer;
let trafficLayer = null;
let tileset = null;

// ========= 4. 初始化 Viewer =========
document.addEventListener('DOMContentLoaded', async function () {
  try {
    viewer = new Cesium.Viewer('cesiumContainer', {
      terrainProvider: await Cesium.createWorldTerrainAsync(),
      animation: false,
      timeline: false,
      sceneModePicker: false
    });

    // 设置黑色背景以适配夜景
    viewer.scene.backgroundColor = Cesium.Color.BLACK;

    // 加载东京交通数据（GeoJSON）
    trafficLayer = await Cesium.GeoJsonDataSource.load('data/tokyo_motorway.geojson', {
      stroke: Cesium.Color.YELLOW,
      strokeWidth: 2,
      clampToGround: true
    });
    viewer.dataSources.add(trafficLayer);

    // 加载东京 3D 建筑（3D Tiles）
    const assetId = 2602291; // 替换为你的 Asset ID（Japan 3D Buildings）
    tileset = await Cesium.Cesium3DTileset.fromIonAssetId(assetId);
    viewer.scene.primitives.add(tileset);

    console.log('Cesium 初始化完成！');

  } catch (error) {
    console.error('初始化失败:', error);
    alert(`地图加载失败: ${error.message}`);
  }
});

// ========= 5. 控制按钮功能 =========

window.flyToTokyo = function () {
  if (!viewer) return alert('地图未加载完成');
  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(139.6917, 35.6895, 30000),
    orientation: {
      heading: Cesium.Math.toRadians(0),
      pitch: Cesium.Math.toRadians(-45),
      roll: 0
    }
  });
};

window.toggleTraffic = function () {
  if (trafficLayer) trafficLayer.show = !trafficLayer.show;
};

window.switchToNight = function () {
  if (!viewer) return;

  // 启用地球光照
  viewer.scene.globe.enableLighting = true;

  // 关闭天空盒
  viewer.scene.skyBox.show = false;

  // 添加弱光源模拟夜景
  viewer.scene.light = new Cesium.DirectionalLight({
    direction: new Cesium.Cartesian3(-0.5, -1.0, -0.3),
    intensity: 0.6
  });

  // 大气层调暗
  viewer.scene.skyAtmosphere.brightnessShift = -0.5;

  // 模拟夜间灯光（仅适用于 3D Tiles）
  if (tileset) {
    tileset.luminanceAtNight = 0.4;
    tileset.colorBlendMode = Cesium.Cesium3DTileColorBlendMode.MIX;
    tileset.style = new Cesium.Cesium3DTileStyle({
      color: "color('white', 0.6)"
    });
  }

  // 添加月亮（可选）
  viewer.scene.moon = new Cesium.Moon({ show: true });

  console.log("夜景模式已启用");
};
