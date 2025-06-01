// 全局变量
let viewer;
let trafficLayer = null;
let isNightMode = false;

// Cesium初始化
document.addEventListener('DOMContentLoaded', async function() {
  try {
    // 1. 设置基础路径
    window.CESIUM_BASE_URL = 'Cesium/Build/Cesium/';
    
    // 2. 初始化Viewer
    viewer = new Cesium.Viewer('cesiumContainer', {
      terrainProvider: await Cesium.createWorldTerrainAsync(),
      animation: false,
      timeline: false,
      sceneModePicker: false,
      skyBox: false, // 禁用默认天空盒
      skyAtmosphere: true // 启用大气效果
    });
    
    // 3. 加载交通数据
    trafficLayer = await Cesium.GeoJsonDataSource.load('data/tokyo_motorway.geojson', {
      stroke: Cesium.Color.YELLOW.withAlpha(0.7),
      strokeWidth: 3,
      clampToGround: true
    });
    viewer.dataSources.add(trafficLayer);
    
    // 4. 初始视角
    flyToTokyo();
    
    console.log('Cesium初始化完成');
  } catch (error) {
    console.error('初始化失败:', error);
    alert(`加载错误: ${error.message}`);
  }
});

// ========== 夜景模式优化 ==========
window.switchToNight = function() {
  if (!viewer) return;

  const scene = viewer.scene;
  
  // 1. 设置月光（新版API）
  scene.light = new Cesium.DirectionalLight({
    direction: Cesium.Cartesian3.fromDegrees(-120, 35),
    intensity: 0.4,
    color: new Cesium.Color(0.3, 0.3, 0.5)
  });

  // 2. 环境光调整（兼容所有版本）
  scene.globe.enableLighting = true;
  scene.skyAtmosphere.brightnessShift = -0.8;
  scene.skyAtmosphere.hueShift = 0.6;
  
  // 3. 移除可能出错的动态光照设置
  scene.primitives.forEach(primitive => {
    if (primitive instanceof Cesium.Cesium3DTileset) {
      // 使用新版光照参数
      primitive.luminanceAtNight = 0.3;
      if (primitive.hasOwnProperty('dynamicLighting')) {
        primitive.dynamicLighting = true; // 仅当属性存在时设置
      }
    }
  });

  console.log("夜景模式已激活（兼容版）");
};
// ========== 白天模式 ==========
window.resetDayMode = function() {
  if (!viewer || !isNightMode) return;
  
  const scene = viewer.scene;
  
  // 1. 恢复默认光照
  scene.light = new Cesium.SunLight();
  scene.globe.enableLighting = false;
  scene.skyAtmosphere.brightnessShift = 0;
  scene.skyAtmosphere.hueShift = 0;
  scene.backgroundColor = Cesium.Color.BLACK.withAlpha(0);
  
  // 2. 恢复道路样式
  if (trafficLayer) {
    trafficLayer.entities.values.forEach(entity => {
      if (entity.polyline) {
        entity.polyline.material = new Cesium.PolylineMaterialProperty(
          Cesium.Color.YELLOW.withAlpha(0.7)
        );
      }
    });
  }
  
  // 3. UI恢复日间样式
  document.getElementById('toolbar').classList.remove('night-mode');
  
  isNightMode = false;
  console.log('已恢复白天模式');
};

// ========== 其他功能 ==========
window.flyToTokyo = function() {
  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(139.6917, 35.6895, 30000),
    orientation: {
      heading: Cesium.Math.toRadians(0),
      pitch: Cesium.Math.toRadians(-45),
      roll: 0
    },
    duration: 2
  });
};

window.toggleTraffic = function() {
  if (trafficLayer) {
    trafficLayer.show = !trafficLayer.show;
  }
};