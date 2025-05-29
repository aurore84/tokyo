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
