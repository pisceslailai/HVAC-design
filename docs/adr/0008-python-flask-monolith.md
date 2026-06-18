---
status: accepted
---

# 采用 Python Flask 单体应用

系统使用 Python Flask 单体架构，Jinja、HTMX 和少量原生 JavaScript 负责页面交互，SQLite 保存数据，`openpyxl` 处理 Excel，计算规则由独立的版本化 Python 模块实现。该方案避免独立前端工程、微服务和额外基础设施，符合轻量内网工具及 Linux/Windows 原生部署目标。
