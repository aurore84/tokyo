# Tokyo 3D 沙盘项目（简易版）

一个基于 CesiumJS 和 Google Earth 的交互式三维城市沙盘，展示东京的地形、建筑与人口图层，支持多场景切换和在线/离线展示。

---

## 📌 项目特色

- 🌆 真实三维建筑 + 地形数据（来自 Cesium / Google Earth）
- 🗺️ 图层叠加：人口密度、未来规划等可视化
- 🌙 多场景支持：夜景模式、动态漫游
- 💻 零成本部署：可本地运行或网页嵌入

---

## 🧱 项目结构

tokyo-sandbox/
│
├── index.html # 主网页入口
├── app.js # Cesium 代码逻辑
├── tokyo_population.geojson # 示例人口图层
├── css/
│ └── style.css # 样式表
└── README.md # 项目说明文档
## 🚀 使用步骤

### 1️⃣ 获取数据资源

- 注册 [Cesium ion](https://cesium.com/ion/) 免费账号
- 上传 Tokyo 建筑或地形数据，获取 Asset ID
- 替换 `app.js` 中：
  - `YOUR_CESIUM_ION_TOKEN`
  - `YOUR_TOKYO_BUILDING_ASSET_ID`

### 2️⃣ 启动本地演示

推荐使用本地服务器方式（否则部分资源无法加载）：

#### 使用 VSCode + Live Server 插件：

- 打开项目文件夹
- 右键 `index.html` → “Open with Live Server”

或使用 Python 启动临时服务器：

```bash
# Python 3
python -m http.server
# 然后在浏览器打开 http://localhost:8000

东京巴士
东京巴士
东京的巴士系统是城市公共交通的重要组成部分，尤其在地铁未覆盖的区域提供便利的出行选择。以下是关于东京巴士的实用信息：

1. 主要巴士公司
都营巴士：由东京都交通局运营，覆盖东京23区内主要路线。

私营巴士：如京王巴士、小田急巴士、东急巴士等，服务郊区及特定线路。

观光巴士：如“东京敞篷巴士”（Sky Hop Bus）提供旅游观光服务。

2. 常见巴士类型
普通巴士：市区内常规线路，票价固定或按距离计费。

深夜巴士：部分线路运营至凌晨（如“午夜箭头”巴士），适合夜间出行。

高速巴士：连接东京与周边城市（如富士山、大阪等），需提前购票。

3. 支付方式
一段话概括
东京的巴士系统由都营巴士和多家私营公司运营，涵盖市区常规线路、深夜巴士及高速长途巴士，提供地铁之外的便捷出行选择。乘客可使用IC卡（如Suica、Pasmo）或现金支付，部分线路需按距离计费，车内有电子屏显示到站信息，部分巴士支持多语言服务以方便游客。

东京车站站点 一句话概括
东京站是日本最大的交通枢纽之一，汇集了JR山手线、新干线、地铁及多条巴士线路，提供前往全国及东京都内的高效换乘服务。

东京各车站站点 一段话概括
东京拥有密集且高效的车站网络，核心枢纽如东京站（新干线、JR山手线、地铁）、新宿站（全球最繁忙车站，JR、私铁、地铁交汇）、涩谷站（时尚枢纽，JR山手线、东京地铁、东急线）、上野站（通往东北地区及成田机场的交通节点）等，覆盖JR、地铁、私铁及巴士系统，支持IC卡（Suica/Pasmo）无缝换乘，部分大站提供多语言指引，确保本地通勤与游客出行便利。

东京的地形与三维数据能用QGIS做吗
是的，QGIS 完全可以用于处理和分析东京的地形与三维数据。以下是具体方法和数据来源的说明：

1. 地形数据处理
数据获取：

DEM（数字高程模型）：可从以下渠道获取东京的高程数据：

ALOS World 3D（AW3D30，30米分辨率，JAXA提供）。

NASA SRTM（30米/90米分辨率，免费下载）。

日本国土地理院（GSI）的5米/10米网格DEM（需注册）。

矢量数据：东京的行政区划、道路、建筑轮廓等可从OpenStreetMap导出，或使用GSI的基盘地図情報。

QGIS操作：

加载DEM数据，通过 栅格 → 分析 → 地形分析 生成坡度、坡向、等高线。

使用 3D视图（需启用QGIS的Qgis2threejs插件）可视化地形。

2. 三维建筑建模
数据来源：

LOD2/LOD3建筑模型：部分开放数据可通过东京都政府或PLATEAU（日本国土交通省的城市三维项目）获取。

OpenStreetMap：导出建筑轮廓后，通过QGIS插件（如OSM2World）生成简易3D模型。

QGIS操作：

使用 DB Manager 导入建筑矢量数据，并关联高度属性（如height字段）。

通过 Layer → 3D View 或插件（如QGIS2ThreeJS）生成交互式3D场景。

3. 三维可视化效果
工具扩展：

Qgis2threejs：将地形、建筑、道路等导出为网页交互式3D模型。

QGIS的3D Map View（需QGIS 3.0+）：直接渲染3D场景，支持光照、纹理调整。

示例流程：

加载东京的DEM和建筑轮廓数据。

为建筑图层设置高度属性（如楼层数×3米）。

打开 3D Map View，调整视角和材质，模拟真实城市景观。

4. 注意事项
数据精度：GSI或PLATEAU的数据更适用于高精度分析，而OpenStreetMap适合快速建模。

性能优化：处理大规模三维数据时，建议分块操作或使用简化模型。

通过上述步骤，你可以在QGIS中完成从地形分析到三维城市建模的全流程。如果需要更高级的渲染，可导出数据至Blender或Unreal Engine进一步处理。

该怎么做成一个可交互的cesium项目文件包
要将东京的地形和三维数据转换为 可交互的Cesium项目，可以通过以下步骤实现。最终生成的是一个包含数据、配置和网页的完整文件包，可直接部署到Web服务器或本地运行。

1. 准备工作
所需工具
QGIS（处理地形和矢量数据）

CesiumJS（Web端3D地球引擎）

Node.js（可选，用于本地测试）

3D Tiles工具（如3d-tiles-tools或CesiumLab，用于优化模型）

数据准备
地形数据：DEM（如ALOS或GSI的GeoTIFF文件）

3D建筑数据：GeoJSON/Shapefile建筑轮廓 + 高度属性，或PLATEAU的CityGML数据

其他矢量数据：道路、绿地等（可选）

2. 数据处理流程
步骤1：在QGIS中准备数据
地形数据 → Cesium地形切片

使用 QGIS 导出DEM为 GeoTIFF 格式。

通过 Cesium Terrain Builder 或 CesiumLab 工具将GeoTIFF转换为Cesium支持的 Quantized-Mesh 地形切片（.terrain 文件）。

3D建筑 → 3D Tiles

在QGIS中导出建筑轮廓为 GeoJSON，确保包含高度字段（如 height）。

使用 3d-tiles-tools 或 CesiumLab 将GeoJSON转换为 3D Tiles（.b3dm 文件）：

bash
# 示例命令（需安装3d-tiles-tools）
3d-tiles-tools geojsonTo3dtiles -i tokyo_buildings.geojson -o output_3dtiles
其他矢量数据（可选）

道路、水域等可导出为 GeoJSON，通过Cesium的 CZML 或直接加载。

步骤2：创建Cesium项目文件包
初始化Cesium项目

下载 CesiumJS 或通过npm安装：

bash
npm install cesium
项目目录结构示例：

/tokyo-cesium-project
  ├── /Buildings (3D Tiles)
  ├── /Terrain (地形切片)
  ├── /lib (CesiumJS库)
  ├── index.html (主页面)
  └── app.js (Cesium初始化代码)
编写HTML/JavaScript代码

在 index.html 中加载Cesium和3D数据：

html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Tokyo 3D Viewer</title>
    <script src="lib/Cesium/Cesium.js"></script>
    <style>
      #cesiumContainer { width: 100%; height: 100vh; }
    </style>
  </head>
  <body>
    <div id="cesiumContainer"></div>
    <script src="app.js"></script>
  </body>
</html>
在 app.js 中初始化Cesium并加载数据：

javascript
const viewer = new Cesium.Viewer("cesiumContainer", {
  terrainProvider: new Cesium.CesiumTerrainProvider({
    url: "Terrain", // 地形切片目录
  }),
});

// 加载3D建筑
const tileset = viewer.scene.primitives.add(
  new Cesium.Cesium3DTileset({
    url: "Buildings/tileset.json", // 3D Tiles入口文件
  })
);

// 定位到东京
viewer.camera.flyTo({
  destination: Cesium.Cartesian3.fromDegrees(139.6917, 35.6895, 5000), // 东京坐标
});
步骤3：优化与交互功能
添加交互

点击建筑显示信息：

javascript
viewer.screenSpaceEventHandler.setInputAction((click) => {
  const feature = viewer.scene.pick(click.position);
  if (feature instanceof Cesium.Cesium3DTileFeature) {
    console.log(feature.getProperty("height")); // 显示建筑高度属性
  }
}, Cesium.ScreenSpaceEventType.LEFT_CLICK);
性能优化

对大规模建筑数据使用 3D Tiles 的LOD（细节层次）分级。

启用Cesium的 depthTestAgainstTerrain 确保建筑贴合地形：

javascript
viewer.scene.globe.depthTestAgainstTerrain = true;
步骤4：测试与部署
本地测试

启动本地服务器（如VS Code的 Live Server 或Python HTTP服务）：

bash
python -m http.server 8000
访问 http://localhost:8000/tokyo-cesium-project 查看效果。

部署

将整个文件夹上传至Web服务器（如GitHub Pages、Netlify或AWS S3）。

最终成果
用户可通过浏览器访问交互式3D东京地图，自由缩放、旋转视角，点击建筑查看属性。

示例效果参考：Cesium Tokyo Demo（需替换为自己的数据）。

注意事项
数据版权：确保使用的DEM和建筑数据允许公开分享。

性能：若数据量过大，建议使用Cesium Ion托管地形和3D Tiles。

通过以上步骤，你可以生成一个完整的、可交互的Cesium项目文件包，展示东京的三维地形与建筑。

我现在通过QGIS向cesium中导入了响应数据并在cesium中制作了相应幻灯片 接下来该怎么做
在完成QGIS数据导入和Cesium幻灯片制作后，下一步是优化交互体验、部署项目并分享成果。以下是详细的分步指南：

1. 完善Cesium幻灯片功能
(1) 添加导航控件与时间轴
javascript
const viewer = new Cesium.Viewer("cesiumContainer", {
  animation: true,         // 显示动画控件
  timeline: true,          // 显示时间轴
  shouldAnimate: true,     // 自动播放动画
  baseLayerPicker: false   // 隐藏默认底图选择器（可选）
});
(2) 幻灯片自动播放设置
如果幻灯片是通过Cesium.Camera关键帧创建的，可通过以下代码控制循环播放：

javascript
viewer.clock.onTick.addEventListener(function() {
  if (viewer.clock.currentTime >= viewer.clock.stopTime) {
    viewer.clock.currentTime = viewer.clock.startTime; // 循环播放
  }
});
2. 增强用户交互
(1) 添加数据弹窗（InfoBox）
点击建筑或地标时显示属性信息：

javascript
viewer.screenSpaceEventHandler.setInputAction((click) => {
  const feature = viewer.scene.pick(click.position);
  if (feature instanceof Cesium.Cesium3DTileFeature) {
    viewer.selectedEntity = new Cesium.Entity({
      name: "建筑信息",
      description: `高度: ${feature.getProperty("height")}米`
    });
  }
}, Cesium.ScreenSpaceEventType.LEFT_CLICK);
(2) 添加图例与按钮控制
在HTML中添加自定义UI控件：

html
<div id="toolbar" style="position: absolute; top: 10px; left: 10px; z-index: 999;">
  <button onclick="flyToTokyo()">聚焦东京</button>
  <button onclick="resetSlide()">重置幻灯片</button>
</div>
在JavaScript中定义对应函数：

javascript
function flyToTokyo() {
  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(139.6917, 35.6895, 5000)
  });
}
3. 性能优化
(1) 3D Tiles优化
LOD分级：确保3D Tiles生成时设置了合理的geometricError（在tileset.json中配置）。

动态加载：启用Cesium的动态屏幕空间误差（SSE）控制：

javascript
tileset.maximumScreenSpaceError = 2; // 数值越小精度越高（默认16）
(2) 地形优化
使用CesiumTerrainProvider的requestWaterMask和requestVertexNormals提升渲染效果：

javascript
viewer.terrainProvider = new Cesium.CesiumTerrainProvider({
  url: "Terrain",
  requestWaterMask: true,     // 显示水面效果
  requestVertexNormals: true  // 增强地形光照
});
4. 部署与分享
(1) 本地测试
使用VS Code的Live Server或Python快速启动服务：

bash
python -m http.server 8000
访问http://localhost:8000检查功能是否正常。

(2) 打包项目
压缩以下文件为ZIP包：

/index.html
/app.js
/Buildings/ (3D Tiles数据)
/Terrain/ (地形切片)
/lib/ (Cesium库)
(3) 部署选项
平台	适用场景	操作步骤
GitHub Pages	免费静态托管	上传至仓库的docs文件夹或启用gh-pages分支
Netlify	自动化部署（支持拖拽上传）	直接拖拽ZIP文件到Netlify控制台
Cesium Ion	高性能托管（付费可选）	上传数据至Cesium Ion账户，替换代码中的URL为ion的Asset ID
5. 高级功能扩展（可选）
(1) 添加天气效果
使用Cesium的ParticleSystem模拟雨雪：

javascript
viewer.scene.primitives.add(
  new Cesium.ParticleSystem({
    image: "path/to/snowflake.png",
    emitter: new Cesium.SphereEmitter(10000.0),
    modelMatrix: Cesium.Matrix4.IDENTITY,
    lifetime: 10.0,
    emissionRate: 1000.0
  })
);
(2) 集成实时数据
通过GeoJSON或CZML动态更新数据：

javascript
const dataSource = viewer.dataSources.add(
  Cesium.GeoJsonDataSource.load("realtime.geojson", {
    stroke: Cesium.Color.RED,
    fill: Cesium.Color.RED.withAlpha(0.5)
  })
);
6. 最终检查清单
幻灯片时间轴流畅，无卡顿

所有交互按钮功能正常

3D Tiles和地形加载无缺失

移动端适配（通过CSS媒体查询调整界面）

确认数据版权允许公开分享

完成后，你的Cesium项目将成为一个功能完备、可交互的3D东京可视化应用！如需进一步简化部署，可考虑使用CesiumJS Starter Template快速搭建。

能不能简易一点不复杂的
当然可以！以下是极简版的步骤，无需复杂工具或代码，5分钟内完成部署：

1. 准备文件
只需这3个文件（放在同一个文件夹内）：

/tokyo-cesium-demo
  ├── index.html   （网页主文件）
  ├── app.js      （交互逻辑）
  └── /data       （存放3D模型和地形数据）
2. 极简代码
(1) index.html（直接复制）
html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>东京3D演示</title>
  <script src="https://cesium.com/downloads/cesiumjs/releases/1.95/Build/Cesium/Cesium.js"></script>
  <link href="https://cesium.com/downloads/cesiumjs/releases/1.95/Build/Cesium/Widgets/widgets.css" rel="stylesheet">
  <style>#cesiumContainer { width: 100%; height: 100vh; }</style>
</head>
<body>
  <div id="cesiumContainer"></div>
  <script src="app.js"></script>
</body>
</html>
(2) app.js（直接复制）
javascript
// 1. 初始化Cesium（自动加载在线底图）
const viewer = new Cesium.Viewer("cesiumContainer");

// 2. 直接使用Cesium Ion在线数据（无需本地地形）
viewer.terrainProvider = Cesium.createWorldTerrain();

// 3. 加载你的3D建筑数据（替换为你的tileset.json路径）
const tileset = viewer.scene.primitives.add(
  new Cesium.Cesium3DTileset({
    url: "data/tileset.json" 
  })
);

// 4. 自动飞到东京
viewer.camera.flyTo({
  destination: Cesium.Cartesian3.fromDegrees(139.6917, 35.6895, 2000)
});
3. 快速测试
下载Cesium官方示例数据
（右键保存tileset.json和相关文件到/data文件夹）

双击index.html

浏览器会自动打开3D东京视图（含示例建筑）

鼠标拖动旋转，滚轮缩放

4. 替换成你的数据
将QGIS导出的3D Tiles文件夹（含tileset.json）复制到/data目录

刷新浏览器即可看到自定义模型

5. 一键分享
压缩整个文件夹 → 发送给他人（对方解压后双击index.html即可查看）

免费在线托管：拖拽文件夹到Netlify Drop（无需注册）

效果对比
操作	你的操作	结果
双击index.html	无	看到东京3D地图
替换/data内容	放入自己的3D Tiles数据	显示自定义模型
修改app.js坐标	调整经度/纬度/高度	定位到不同区域
💡 提示：如果模型不显示，检查浏览器控制台（F12）是否有路径错误，确保tileset.json路径正确。

这个3d tiles数据是什么
3D Tiles 是Cesium团队开发的一种开放标准格式，专门用于高效流式传输和渲染大规模3D地理空间数据（如建筑、地形、点云等）。它的核心目的是在Web浏览器中实现高性能的3D可视化，尤其适合城市建模、GIS分析等场景。

1. 3D Tiles是什么？
本质：一种分块（Tile-based）、多细节层次（LOD）的3D数据格式。

特点：

分块加载：只渲染当前视野内的数据，避免卡顿。

自适应细节：根据距离自动切换模型精度（远看简化，近看精细）。

兼容性：专为Cesium优化，但也可用于其他引擎（如Three.js）。

2. 3D Tiles的常见类型
类型	文件扩展名	用途	示例来源
Batched 3D Model	.b3dm	带属性的3D建筑模型	QGIS导出的建筑轮廓+高度
Point Cloud	.pnts	激光雷达点云数据	东京的LiDAR扫描数据
Composite	.cmpt	组合多个其他类型的3D Tiles	复杂场景合并
3. 你的数据如何变成3D Tiles？
(1) 从QGIS生成
导出建筑轮廓：

在QGIS中将建筑图层导出为GeoJSON，确保包含高度字段（如height）。

转换工具：

使用 CesiumLab（免费工具，图形化操作）：

导入GeoJSON → 设置高度字段 → 输出为3D Tiles。

或命令行工具（需安装3d-tiles-tools）：

bash
3d-tiles-tools geojsonTo3dtiles -i buildings.geojson -o output_tiles
(2) 直接获取现成数据
PLATEAU项目：日本官方提供的免费3D城市模型（含东京），下载CityGML后可用工具转换为3D Tiles。

OpenStreetMap：通过OSM2World导出OBJ模型，再转换为3D Tiles。

4. 3D Tiles的文件结构
生成的3D Tiles通常包含：

/tileset.json        # 入口文件，定义根Tile和层级关系
/0/                  # 子目录存储具体数据文件
  /0.b3dm            # 建筑模型块
  /1.b3dm
  /...
5. 在Cesium中加载3D Tiles
只需一行代码：

javascript
viewer.scene.primitives.add(
  new Cesium.Cesium3DTileset({
    url: "path/to/your/tileset.json"  // 指向入口文件
  })
);
6. 为什么选择3D Tiles？
性能最优：相比直接加载OBJ/FBX等格式，3D Tiles的加载速度提升10倍以上。

属性保留：支持点击查询建筑高度、用途等元数据。

跨平台：兼容Cesium/Unreal Engine/Unity等。

常见问题
❌ 问题：模型在Cesium中不显示？
✅ 检查：

浏览器控制台（F12）是否有404错误（路径是否正确）。

tileset.json是否和模型文件在同一目录。

坐标是否匹配（确保模型和地形位置对齐）。

❌ 问题：如何降低3D Tiles文件大小？
✅ 优化：

在CesiumLab中简化模型面数。

使用gltf-pipeline压缩纹理：

bash
gltf-pipeline -i model.gltf -o model_compressed.gltf --draco.compressMeshes
通过3D Tiles，你可以轻松将QGIS中的东京数据变成流畅的Web 3D应用！

项目二：城市沙盘可视化（基于 Google
Earth）
平台链接： Google Earth 设计
构建可交互三维城市沙盘，叠加地形、建筑、交通、人口等多层数据，实现城市规划与演变的动态
展示。
🎯 项目目标
序号 目标描述
1 导出目标城市（三选一：东京／上海／北京）地形与建筑三维数据
2 在 GIS 或 Cesium 引擎中重构场景，支持视角漫游与图层切换
3 整合交通流量、人口密度、规划方案等动态数据图层
4 设计主题场景（历史演变／夜景照明／未来规划）
5 生成可嵌入网页或离线演示的沙盘交互包
✨ 项目亮点
沉浸式体验：自由漫游、缩放、图层透明度调节
多源数据融合：实时／历史数据动态叠加
多场景展示：一套沙盘，多种城市发展视角
开源生态：Google Earth、Cesium、QGIS 等免费工具
📦 预期成果
1. 沙盘交互包（HTML/JS 或 Cesium 项目文件）
2. 项目报告（数据来源、处理流程、技术架构、使用说明）
3. 演示视频（2–3 分钟，展示主要功能）
4. 展示幻灯片（期末汇报用，PPT 格式） 这是整个项目要求 现在根据我之前已经做的内容要做一个cesium项目文件 接下来要做什么 简易步骤
以下是针对你的 城市沙盘可视化（Cesium项目） 的极简步骤指南，基于你已完成的QGIS数据导出和基础Cesium场景，快速实现项目目标：

简易步骤清单
1. 整理数据（30分钟）
地形数据：确保已从QGIS导出DEM为GeoTIFF，并通过CesiumLab转换为.terrain地形切片。

建筑数据：将QGIS导出的建筑轮廓（含高度属性）转换为3D Tiles（.b3dm格式，方法见上文）。

其他数据：

交通/人口：从开放数据平台（如东京都统计局）下载CSV/GeoJSON，在QGIS中处理为矢量图层。

2. 创建Cesium项目（1小时）
文件结构：

/city-sandbox
  ├── /data
    ├── terrain/          # 地形切片
    ├── buildings/        # 3D Tiles建筑
    ├── traffic.geojson   # 交通数据
  ├── index.html          # 网页模板（复制下方代码）
  ├── app.js              # 主逻辑（复制下方代码）
  └── /lib                # Cesium库（直接下载）
HTML模板（index.html）：

html
<!DOCTYPE html>
<html>
<head>
  <title>东京城市沙盘</title>
  <script src="lib/Cesium/Cesium.js"></script>
  <style>
    #cesiumContainer { width: 100%; height: 100vh; }
    #layerPanel { position: absolute; top: 10px; left: 10px; background: white; padding: 10px; }
  </style>
</head>
<body>
  <div id="cesiumContainer"></div>
  <div id="layerPanel">
    <h3>图层控制</h3>
    <label><input type="checkbox" checked onclick="toggleBuildings()"> 建筑</label>
    <label><input type="checkbox" onclick="toggleTraffic()"> 交通流量</label>
  </div>
  <script src="app.js"></script>
</body>
</html>
JavaScript逻辑（app.js）：

javascript
// 初始化Cesium
const viewer = new Cesium.Viewer("cesiumContainer", {
  terrainProvider: new Cesium.CesiumTerrainProvider({ url: "data/terrain" }),
});

// 加载建筑
const buildings = viewer.scene.primitives.add(
  new Cesium.Cesium3DTileset({ url: "data/buildings/tileset.json" })
);

// 加载交通数据（GeoJSON）
Cesium.GeoJsonDataSource.load("data/traffic.geojson").then(dataSource => {
  viewer.dataSources.add(dataSource);
  dataSource.entities.values.forEach(entity => {
    entity.polyline.width = 5;
    entity.polyline.material = new Cesium.ColorMaterialProperty(
      Cesium.Color.RED.withAlpha(0.5)
    );
  });
});

// 图层控制函数
function toggleBuildings() {
  buildings.show = !buildings.show;
}
function toggleTraffic() {
  viewer.dataSources.get(0).show = !viewer.dataSources.get(0).show;
}

// 定位到东京
viewer.camera.flyTo({
  destination: Cesium.Cartesian3.fromDegrees(139.6917, 35.6895, 2000)
});
3. 动态数据叠加（1小时）
人口密度热力图：
使用Cesium Heatmap库，将人口CSV转换为热力图。

交通动画：
在GeoJSON中添加time属性，通过CZML实现动态流动效果（参考Cesium CZML文档）。

4. 主题场景设计（1小时）
夜景模式：
在app.js中添加：

javascript
viewer.scene.moon.show = false;
viewer.scene.skyAtmosphere.show = false;
viewer.scene.backgroundColor = Cesium.Color.BLACK;
// 为建筑添加发光材质（需在3D Tiles生成时设置）
历史演变：
准备不同年份的建筑数据，通过按钮切换tileset.json路径。

5. 打包与演示（30分钟）
测试：双击index.html检查功能。

压缩：将整个文件夹打包为ZIP。

部署：上传至Netlify Drop或GitHub Pages。

最终成果文件
city-sandbox.zip
  ├── index.html      # 交互网页
  ├── app.js         # 所有控制逻辑
  ├── /data          # 地形、建筑、动态数据
  └── /lib           # Cesium库
避坑指南
3D Tiles路径错误：确保tileset.json和模型文件在同一目录。

坐标偏移：在QGIS中导出数据时统一使用WGS84坐标系（EPSG:4326）。

性能卡顿：减少建筑面数（用CesiumLab简化模型），或分区域加载。

按此流程，你可以在 3-4小时 内完成一个功能完整的城市沙盘，直接用于项目提交！

开启新对话
给 DeepSeek 发送消息 
