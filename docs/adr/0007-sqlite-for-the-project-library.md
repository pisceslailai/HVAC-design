---
status: accepted
---

# 项目库采用 SQLite

项目库使用应用内置的 SQLite 数据库，不部署独立数据库服务。当前系统是单服务器、轻并发且单项目最多 200 个房间，SQLite 足以提供持久化与事务能力，并显著降低 Linux 和 Windows 原生部署的运维复杂度。
