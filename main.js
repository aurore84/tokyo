// ========= 1. 设置Cesium基础路径 =========
window.CESIUM_BASE_URL = 'Cesium/Build/Cesium/';

// ========= 2. 设置Cesium ion Token =========
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkOTcwNGJiMi1jZGMxLTRmYWQtYWVkYy03NTExNjgwMmZmMDIiLCJpZCI6MzA2MjgwLCJpYXQiOjE3NDgyNDEwNTZ9.uWzKJd7hvZgAlifHHHNpCtF02jU0ee3OULbbVxNyLpE';

// ========= 3. 全局变量 =========
let viewer;
let tokyoBoundaryLayer = null;
let subwayLayer = null;
let populationLayer = null;
let trafficLayer = null;
let tileset = null;
let isNightMode = false;
let markers = {
  tokyoTower: null,
  ginza: null,
  akihabara: null,
  centralArea: null
};

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
      skyBox: false,
      infoBox: true
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

    // 加载3D建筑
    tileset = await Cesium.Cesium3DTileset.fromIonAssetId(96188);
    viewer.scene.primitives.add(tileset);

    // 添加东京标记
    addTokyoMarkers();

    console.log('地图已加载完成');
  } catch (error) {
    console.error('初始化失败:', error);
    alert('地图加载失败: ' + error.message);
  }
});

async function loadTokyoBoundary() {
  if (tokyoBoundaryLayer) return;

  tokyoBoundaryLayer = await Cesium.GeoJsonDataSource.load('data/tokyo_boundary.geojson', {
    fill: Cesium.Color.YELLOW.withAlpha(0.15), // 柔和黄色半透明填充
    stroke: Cesium.Color.YELLOW.withAlpha(0.9), // 明亮边界线
    strokeWidth: 3,
    clampToGround: true
  });

  viewer.dataSources.add(tokyoBoundaryLayer);
  viewer.flyTo(tokyoBoundaryLayer); // 可选，自动飞行
}

async function loadSubwayLayer() {
  if (subwayLayer) return;

  subwayLayer = await Cesium.GeoJsonDataSource.load('data/tokyo_subway.geojson', {
    clampToGround: true
  });

  const colorMap = {
    "都営地下鉄浅草線": Cesium.Color.fromCssColorString("#FF0000"),  // 红
    "都営地下鉄三田線": Cesium.Color.fromCssColorString("#FF7F00"),  // 橙
    "都営地下鉄大江戸線": Cesium.Color.fromCssColorString("#FFFF00"),  // 黄
    "東京メトロ銀座線": Cesium.Color.fromCssColorString("#00FF00"),  // 绿
    "東京メトロ日比谷線": Cesium.Color.fromCssColorString("#0000FF"),  // 蓝
    "東京メトロ千代田線": Cesium.Color.fromCssColorString("#4B0082"),  // 靛
    "東京メトロ有楽町線": Cesium.Color.fromCssColorString("#8B00FF"),  // 紫
    "東京メトロ南北線": Cesium.Color.fromCssColorString("#FF1493"),  // 粉
    "東京メトロ丸ノ内線": Cesium.Color.fromCssColorString("#00FFFF")   // 青绿
  };

  subwayLayer.entities.values.forEach(entity => {

    const lineName = entity.properties?.name?.getValue?.() || "Tokyo Subway";
    const color = colorMap[lineName] || Cesium.Color.CYAN;
  //  console.log('属性字段:', entity.properties.getPropertyNames());
    entity.polyline.material = color.withAlpha(0.8);
    entity.polyline.width = 4;

    // 设置描述
    entity.description = `
      <div class="info-content">
        <h3>🚇 ${lineName}</h3>
        <p>东京地铁线路</p>
      </div>
    `;
  });

  viewer.dataSources.add(subwayLayer);
  console.log('地铁线路图层已加载并分类着色');
}


async function loadPopulationLayer() {
  if (populationLayer) return;

  populationLayer = await Cesium.GeoJsonDataSource.load('data/tokyo_population_density.geojson', {
    clampToGround: true
  });

  populationLayer.entities.values.forEach(entity => {
    const density = entity.properties?.population_density?.getValue();

    if (density !== undefined) {
      let color = Cesium.Color.PURPLE.withAlpha(0.1); // 默认最低密度颜色：紫

      if (density > 1000)  color = Cesium.Color.CYAN.withAlpha(0.15);   // 青
      if (density > 3000)  color = Cesium.Color.BLUE.withAlpha(0.18);   // 蓝
      if (density > 5000)  color = Cesium.Color.GREEN.withAlpha(0.2);   // 绿
      if (density > 8000)  color = Cesium.Color.YELLOW.withAlpha(0.25); // 黄
      if (density > 12000) color = Cesium.Color.ORANGE.withAlpha(0.3);  // 橙
      if (density > 20000) color = Cesium.Color.RED.withAlpha(0.35);    // 红

      entity.polygon.material = color;
      entity.polygon.outline = false;

      entity.description = `
        <div class="info-content">
          <h3>区域人口密度</h3>
          <p>👥 ${density.toLocaleString()} 人/km²</p>
        </div>
      `;
    }
  });

  viewer.dataSources.add(populationLayer);
}
window.toggleLegend = function () {
  const legend = document.getElementById('legend');
  if (legend) {
    legend.style.display = (legend.style.display === 'none') ? 'block' : 'none';
  }
};


// ========= 5. 添加东京标记 =========
function addTokyoMarkers() {
  // 清除旧标记
  Object.values(markers).forEach(marker => {
    if (marker) viewer.entities.remove(marker);
  });

  // 1. 东京中心区域标记
  markers.centralArea = viewer.entities.add({
    name: "东京中心区",
    description: `
      <div class="info-content">
        <h3>东京中心区</h3>
        <p>📍 包含皇居、东京站等核心区域</p>
      </div>
    `,
    rectangle: {
      coordinates: Cesium.Rectangle.fromDegrees(139.70, 35.67, 139.77, 35.71),
      material: Cesium.Color.YELLOW.withAlpha(0.2),
      outline: true,
      outlineColor: Cesium.Color.YELLOW,
      outlineWidth: 2
    }
  });

  // 2. 东京塔标记
  markers.tokyoTower = viewer.entities.add({
    name: "东京塔",
    description: `
      <div class="info-content">
        <h3>东京塔</h3>
        <p>🗼 东京地标性建筑</p>
        <p>📍 港区芝公园</p>
        <p>⏰ 开放时间: 9:00-23:00</p>
      </div>
    `,
    position: Cesium.Cartesian3.fromDegrees(139.7454, 35.6586),
    ellipse: {
      semiMinorAxis: 500,
      semiMajorAxis: 500,
      material: Cesium.Color.RED.withAlpha(0.1),
      outline: true,
      outlineColor: Cesium.Color.RED,
      outlineWidth: 3
    },
    label: {
      text: "东京塔",
      font: "14px sans-serif",
      fillColor: Cesium.Color.WHITE,
      outlineColor: Cesium.Color.BLACK,
      outlineWidth: 2,
      style: Cesium.LabelStyle.FILL_AND_OUTLINE,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
      pixelOffset: new Cesium.Cartesian2(0, -20)
    }
  });

  // 3. 银座标记
  markers.ginza = viewer.entities.add({
    name: "银座",
    description: `
      <div class="info-content">
        <h3>银座</h3>
        <p>🛍️ 东京高端购物区</p>
        <p>📍 中央区银座</p>
        <p>✨ 知名品牌旗舰店聚集地</p>
      </div>
    `,
    position: Cesium.Cartesian3.fromDegrees(139.7676, 35.6716),
    ellipse: {
      semiMinorAxis: 400,
      semiMajorAxis: 400,
      material: Cesium.Color.BLUE.withAlpha(0.1),
      outline: true,
      outlineColor: Cesium.Color.BLUE,
      outlineWidth: 3
    },
    label: {
      text: "银座",
      font: "14px sans-serif",
      fillColor: Cesium.Color.WHITE,
      outlineColor: Cesium.Color.BLACK,
      outlineWidth: 2,
      style: Cesium.LabelStyle.FILL_AND_OUTLINE,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
      pixelOffset: new Cesium.Cartesian2(0, -20)
    }
  });

  // 4. 秋叶原标记
  markers.akihabara = viewer.entities.add({
    name: "秋叶原",
    description: `
      <div class="info-content">
        <h3>秋叶原</h3>
        <p>🎮 动漫与电子产品天堂</p>
        <p>📍 千代田区外神田</p>
        <p>🕹️ 电器店和女仆咖啡厅集中地</p>
      </div>
    `,
    position: Cesium.Cartesian3.fromDegrees(139.7738, 35.7022),
    ellipse: {
      semiMinorAxis: 350,
      semiMajorAxis: 350,
      material: Cesium.Color.PURPLE.withAlpha(0.1),
      outline: true,
      outlineColor: Cesium.Color.PURPLE,
      outlineWidth: 3
    },
    label: {
      text: "秋叶原",
      font: "14px sans-serif",
      fillColor: Cesium.Color.WHITE,
      outlineColor: Cesium.Color.BLACK,
      outlineWidth: 2,
      style: Cesium.LabelStyle.FILL_AND_OUTLINE,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
      pixelOffset: new Cesium.Cartesian2(0, -20)
    }
  });
}

// ========= 6. 功能函数 =========
window.flyToTokyo = function() {
  if (!viewer) return alert('地图未加载完成');
  
  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(139.74, 35.68, 8000),
    orientation: {
      heading: Cesium.Math.toRadians(0),
      pitch: Cesium.Math.toRadians(-30),
      roll: 0
    },
    duration: 2
  });
};

window.toggleTraffic = function() {
  if (trafficLayer) {
    trafficLayer.show = !trafficLayer.show;
    console.log('交通图层已' + (trafficLayer.show ? '显示' : '隐藏'));
  }
};
window.togglePopulation = function () {
  if (!populationLayer) {
    loadPopulationLayer();
  } else {
    populationLayer.show = !populationLayer.show;
    console.log('人口密度图层已' + (populationLayer.show ? '显示' : '隐藏'));
  }
};

window.switchToNight = function() {
  if (!viewer || isNightMode) return;

  viewer.scene.globe.enableLighting = true;
  viewer.scene.light = new Cesium.DirectionalLight({
    direction: Cesium.Cartesian3.fromDegrees(-135, 30),
    intensity: 0.5,
    color: Cesium.Color.fromCssColorString('#3a3a5a')
  });

  viewer.scene.skyAtmosphere.brightnessShift = -0.7;
  viewer.scene.skyAtmosphere.hueShift = 0.5;
  viewer.scene.backgroundColor = Cesium.Color.fromCssColorString('#0a0a1a');

  if (tileset) tileset.luminanceAtNight = 0.3;

  isNightMode = true;
  console.log('夜景模式已激活');
};

window.resetDayMode = function() {
  if (!viewer || !isNightMode) return;

  viewer.scene.globe.enableLighting = false;
  viewer.scene.light = new Cesium.SunLight();
  viewer.scene.skyAtmosphere.brightnessShift = 0;
  viewer.scene.skyAtmosphere.hueShift = 0;
  viewer.scene.backgroundColor = Cesium.Color.BLACK;

  if (tileset) tileset.luminanceAtNight = 0;

  isNightMode = false;
  console.log('已恢复白天模式');
};

window.toggleTokyoBoundary = function () {
  if (!tokyoBoundaryLayer) {
    loadTokyoBoundary();
  } else {
    tokyoBoundaryLayer.show = !tokyoBoundaryLayer.show;
    console.log('东京边界图层已' + (tokyoBoundaryLayer.show ? '显示' : '隐藏'));
  }
};

window.toggleSubway = function () {
  if (!subwayLayer) {
    loadSubwayLayer();
  } else {
    subwayLayer.show = !subwayLayer.show;
    console.log('地铁线路图层已' + (subwayLayer.show ? '显示' : '隐藏'));
  }
};
window.toggleSubwayLegend = function () {
  const legend = document.getElementById('subwayLegend');
  if (legend) {
    legend.style.display = (legend.style.display === 'none') ? 'block' : 'none';
  }
};
