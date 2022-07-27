---
sidebar_position: 1
---

# 运行节点

---

Ceramic 节点运营商负责托管各种 [Ceramic 网络](./networks.md)。为访问网络，Ceramic 客户端需要连接到节点。

下面的指南描述了如何以守护进程方式运行一个可以被 [JS HTTP 客户端](https://developers.ceramic.network/build/javascript/installation/#js-http-client) 或 [Ceramic CLI](https://developers.ceramic.network/build/cli/installation/#4-configure-a-node-url) 用作远程节点的 Ceramic 节点。

## **谁需要运行节点？**

应用程序开发者可以通过将他们的客户端连接到一个[社区成员托管的节点](./nodes/available.md)来开始构建，但在迁移到生产环境之前，您需要为您的应用程序运行一个节点。

> 我们正在与商业节点提供商合作，以提供生产环境的 Ceramic 节点即服务(Ceramic nodes-as-a-service)。当它们可用时，我们将更新此页面。

## **启动节点**

---

> 运行节点时，最好先从连接到 [Clay 测试网](https://developers.ceramic.network/learn/networks/#clay-testnet) 开始。 当您准备好迁移到主网， 请在 Discord 上 联系 3Box Labs 团队: [https://discord.gg/tsQXsG8Sde](https://discord.gg/tsQXsG8Sde).

### [**在开发环境运行 Ceramic→**](../build/cli/installation.md)

为开发和测试目的设置本地 Ceramic 节点。

### [**在生产环境运行 Ceramic→**](./nodes/nodes.md)

在云或裸金属服务器上运行可靠的、高性能的 Ceramic 节点，以供生产应用程序使用。