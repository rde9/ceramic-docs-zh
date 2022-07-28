---
sidebar_position: 4
title: 在开发环境运行节点
---

# 启动本地 Ceramic 节点

---

Ceramic 命令行界面 (CLI) 提供了一个简单的方法来启动本地 Node.js 环境中的 JS Ceramic 节点。这是开始使用 Ceramic 进行开发的好方法，然后再转移到生产用例的云托管节点上。

## **先决条件**

---

安装 CLI 需要控制台(终端?)、[Node.js](https://nodejs.org/en/) v14 和 [npm](https://www.npmjs.com/get-npm) v6。请确保你的机器上已安装它们。

> 虽然 npm v7 还未得到官方支持，但您仍然可以使用它。您将需要全局安装 `node-pre-gyp` 包。在 IPFS 所依赖的 `node-webrtc` [被升级](https://github.com/node-webrtc/node-webrtc/pull/694)之前，这是必须的。
  ```bash
  npm install -g node-pre-gyp
  ```

:::caution

  **弃用提示：**与 流(Streams) 和 TileDocuments 的交互已经转移到我们的 [Glaze CLI](../../../tools/glaze/development#cli). 如果您在使用下面的命令时遇到任何错误，请先使用 Glaze CLI 重新尝试。

:::

## **安装和使用**

---

### **安装 Ceramic CLI**

打开您的控制台，用 npm 安装 CLI:

```bash
npm install -g @ceramicnetwork/cli
```

### **启动 Ceramic 节点**

使用 `ceramic daemon` 命令启动一个连接到 [Clay Testnet](./networks#clay-testnet) 的本地 JS Ceramic 节点，节点运行在 `https://localhost:7007`.

```bash
ceramic daemon
```

### **配置您的网络**

(可选) 默认情况下，JS CLI会在Clay Testnet上启动一个节点。如果您想使用不同的网络，可以使用`--network`选项来指定它。查看[可用的网络](./networks.md)。注意，CLI 不能与 Mainnet 一起使用。

### **配置节点 URL**

(可选) 除本地节点外，还可以通过 HTTP 与远程 Ceramic 节点使用 CLI。要做到这一点，使用`config set`命令设置`ceramicHost`变量为您想使用的节点 URL.

```bash
ceramic config set ceramicHost 'https://yourceramicnode.com'
```

