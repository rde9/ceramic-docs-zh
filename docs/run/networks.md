---
sidebar_position: 2
---

# 网络

网络是 Ceramic [节点](../glossary#nodes) 的集合，它们共享特定的配置并通过专用的 [libp2p](../glossary#libp2p) topic 进行通信。网络之间互不相关。存在于一个网络上的[流](../glossary#streams) _无法_ 在另一个网络上被发现或移植。

## 公共网络

Ceramic 有三个公共网络可供构建应用程序时使用: Mainnet、Clay Testnet 和 Dev Unstable。

### **主网 Mainnet**

Mainnet 是用于 Ceramic 生产部署的主要公共网络。Ceramic 的主网节点通过专用的 `/ceramic/mainnetlibp2p` topic 进行通信，并使用[以太坊](../glossary#ethereum)的主网区块链 (`EIP155:1`) 生成用于[流](../glossary#streams)的[锚点提交](../glossary#anchor-commit)的时间戳。主网目前正在运行，任何人都可以公开地使用[社区主网网关](./nodes/community-nodes.md#gateways)从主网上的流中查询数据，但只有主网早期启动计划 (early launch program, ELP) 候补名单上的项目才能向主网写入数据。如果您想将数据写入主网，[请在此处注册 ELP](https://blog.ceramic.network/ceramic-mainnet-early-launch-program/)。_随着时间的推移，我们将对所有应用程序完全开放主网。_

### **Clay 测试网 Clay Testnet**

Clay Testnet 是社区用于应用程序原型设计、开发和测试目的的公共 Ceramic 网络。Ceramic 核心开发者也使用 Clay 来测试官方协议发布候选。虽然我们的目标是努力保证 Clay 测试网的高质量，尽可能地反映主网的期望，但最终 Clay 网络的可靠性、性能和稳定性保证都是低于主网的。因此，Clay 网络不应该用于生产中的应用程序。Clay 节点通过专用的 `/ceramic/testnet-claylibp2p` topic 进行通信，并使用[以太坊](../glossary#ethereum)的 Rinkeby 和 Ropsten 测试网区块链来生成用于[流](../glossary#streams)的[锚点提交](../glossary#anchor-commit)的时间戳。**现在，Clay 已公开供任何人使用。**

### **Dev 测试网 Dev Unstable**

Dev Unstable 是 Ceramic 核心协议开发人员用于测试新的协议特性和 `js-ceramic` develop 分支上的最新提交时使用的 Ceramic 网络。它应被认为是不稳定的和高度实验性的；只有在您想测试最前沿的功能，但预计会出现问题时才使用此网络。Dev Unstable 节点通过专用的 `/ceramic/dev-unstablelibp2p` topic 进行通信，并使用[以太坊](../glossary#ethereum)的 Rinkeby 和 Ropsten 测试网区块链来生成用于[流](../glossary#streams)的[锚点提交](../glossary#anchor-commit)的时间戳。

## 专用网络

您也可以通过在与其他公共节点完全断开的本地环境中运行协议，以在 Ceramic 上进行应用程序原型设计。

### **本地测试网 Local**

Local 是用于 Ceramic 应用程序本地开发的私有测试网络。连接到同一本地网络的节点通过随机生成的 libp2p topic `/ceramic/local-$(randomNumber)` 进行通信，并使用 Truffle 的 Ganache 提供的本地以太坊区块链生成用于[流](../glossary#streams)的[锚点提交](../glossary#anchor-commit)的时间戳。
