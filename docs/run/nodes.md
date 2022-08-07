---
sidebar_position: 5
title: 在生产环境运行节点
---

# 在生产环境中运行 Ceramic

---

本指南提供了启动连接良好、生产就绪的 Ceramic 节点的完整说明和各种工具。

## **谁应该运行 Cearmic 节点？**

---

此时，任何希望部署到 `mainnet` 的应用程序都需要运行他们自己的生产就绪的节点。此外，在 `testnet-clay` 上构建的开发者可能希望运行他们自己的节点，这样他们就不需要依赖[社区托管](./available.md)的节点，这些节点可能不稳定和/或不时擦除数据。

## **需要知道的事情**

---

**Ceramic 网络** – 目前有三个 Ceramic 网络: `mainnet`, `testnet-clay` 和 `dev-unstable`. 在 [此处](./networks.md) 了解各个网络的更多详情. 默认情况下，Ceramic 将连接到 `testnet-clay` 和一个运行在 Ethereum Ropsten 上的 [Ceramic 锚点服务 (Ceramic Anchor Service)](https://github.com/ceramicnetwork/ceramic-anchor-service)。当您准备好进入主网时，请在 [Ceramic Discord →](https://chat.ceramic.network) 上联系我们以获得我们的 `mainnet` 锚点服务。

**运行 IPFS** – Ceramic 依靠一个叫做 [IPFS](https://docs.ipfs.io/) 的系统来连接和共享 Ceramic 网络中的数据。在 Ceramic 节点自身之外，IPFS 作为一个独立的进程运行，每个 Ceramic 节点通过 HTTP 连接到一个专门的 IPFS 节点。Ceramic 守护进程可以自动启动一个 IPFS 进程（在 Ceramic 配置文件中被称为以 "捆绑 (bundled)" 模式运行 ipfs），这只为测试和本地开发而设计。对于生产部署，你应该手动运行你自己的 IPFS 进程，并将你的 Ceramic 节点指向它（在 Ceramic 配置文件中被称为在 "远程 (remote)" 模式下运行 ipfs）。 这允许为你的 IPFS 节点提供更多配置选项，从而实现更受控制的资源分配，以及改进的维护、调试和可观察性。请注意，Ceramic 仅支持 `go-ipfs` 0.12 或更高版本。

本指南的其余部分假设你在"远程 (remote)"模式下运行 Ceramic 和 IPFS。

**进程管理、重启和数据持久性** – Ceramic 和 IPFS 在崩溃时不会自动重启。您应该配置您自己的重启机制，而且必须确保重启之间的数据持久性。

## **所需步骤**

---

以下是在生产环境中运行 Ceramic 节点所需的步骤。本指南将教你如何：

1. [安装和启动 Ceramic 守护进程](#running-the-daemon)
2. [配置数据持久性](#data-persistence)
3. [连接网络](#get-connected-to-the-network)
4. [从你的节点获取监测数据（可选）](#observability)

## **快速开始**

---

### [**在 AWS ECS 上使用 Terraform 运行 Ceramic →**](https://github.com/ceramicnetwork/terraform-aws-ceramic)

3Box Labs 团队编写了一个 [Terraform 模块](https://github.com/ceramicnetwork/terraform-aws-ceramic)，该模块使用 Fargate 在 AWS ECS 中配置 Ceramic 和 IPFS。使用此模块是在云中运行 Ceramic 的一种快速可靠的方法，因为它是为数据持久性和自动重启而设置的。该模块目前需要预先配置一些常见的 AWS 资源以及 Cloudflare。请参阅一个[正在使用的模块示例](https://github.com/ceramicnetwork/terraform-aws-ceramic/blob/main/examples/ecs/main.tf)。

> 我们非常鼓励社区为不同的基础设施供应商创建 Terraform 模块或其他模板，以进一步促进 Ceramic 网络的去中心化。

## **运行守护进程**

---

[js-ceramic](https://github.com/ceramicnetwork/js-ceramic) 节点使用 Node.js 或 Docker 以守护进程形式运行。

默认情况下，Ceramic 守护程序与 go-ipfs 节点捆绑运行，并连接到 Clay 测试网和 Ethereum Ropsten [Ceramic 锚点服务](https://github.com/ceramicnetwork/ceramic-anchor-service)。在生产中，你应该更改这些默认值以保护你的数据并适应你的基础设施设置。

Ceramic 守护进程可以用一个 JSON 文件来配置，该文件在启动时创建，默认位于 `$HOME/.ceramic/daemon.config.json`（你也可以在启动 Ceramic 守护进程时使用 `--config` 标记将配置文件指向自定义位置）。见下面 `daemon.config.json` 的例子。配置选项可以在 [DaemonConfig 类的参考文档](https://developers.ceramic.network/reference/typescript/classes/_ceramicnetwork_cli.daemonconfig-1.html)中查看。

### **在 Docker 容器中运行**

运行 Ceramic 和 IPFS 的 Docker 镜像分别由 [js-ceramic](https://github.com/ceramicnetwork/js-ceramic) 和 [go-ipfs-daemon](https://github.com/ceramicnetwork/go-ipfs-daemon) 仓库的源代码构建。从主分支构建的镜像被标注 `latest` 和构建该镜像的 git 提交哈希。你可以[在 DockerHub 上查看 js-ceramic 的镜像构建情况](https://hub.docker.com/r/ceramicnetwork/js-ceramic)。`go-ipfs-daemon` 的 Docker 镜像使用插件预先配置了 IPFS，使其易于在云基础设施上运行。你可以[在 DockerHub 上查看 go-ipfs-daemon 的镜像构建情况](https://hub.docker.com/r/ceramicnetwork/go-ipfs-daemon)。

### **在容器外运行**

如果你想在容器外或在裸金属服务器上运行 Ceramic 和 IPFS，请首先安装 [go-ipfs](https://github.com/ipfs/go-ipfs)（**0.12 或更高版本**）。根据你的基础架构设置，你可以考虑使用[健康检查插件](https://github.com/ceramicnetwork/go-ipfs-healthcheck)和 [S3 数据存储插件](https://github.com/3box/go-ds-s3)构建 go-ipfs。IPFS 安装完毕后，配置它使用 pubsub，Ceramic 依靠它进行消息传递。这可以通过运行 IPFS 守护进程时添加 `--enable-pubsub-experiment` 标志来完成，或者通过运行 `ipfs config --json Pubsub.Enabled true` 来修改配置（在 [IPFS 文档](https://github.com/ipfs/go-ipfs/blob/master/docs/experimental-features.md#ipfs-pubsub)中了解更多）。接下来你可以运行 IPFS，用 [js-ceramic CLI](https://www.npmjs.com/package/@ceramicnetwork/cli) 安装 Ceramic 守护进程，它作为一个公共的 NPM 模块可用。目前它与 **Node.js 14 和 16 版本**兼容。

## **数据持久性**

要在生产环境中运行 Ceramic 节点，维持 [Cearmic 状态存储 (state store)](https://developers.ceramic.network/run/nodes/nodes/#ceramic-state-store) 和 [IPFS 数据存储 (datastore)](https://github.com/ipfs/go-ipfs/blob/master/docs/config.md#datastorespec) 的持久存在至关重要。你选择的存储形式还应配置为具有数据冗余的灾难恢复以及某种形式的快照和/或备份。

**这些数据的丢失可能会导致 Ceramic 流的永久丢失，并将导致你的节点处于损坏状态。**

Ceramic 状态存储和 IPFS 数据存储默认存储在你机器的文件系统中。Ceramic 状态存储默认为 `$HOME/.ceramic/statestore`。IPFS 数据存储默认为 `ipfs/blocks`，位于你运行 IPFS 的地方。

确保数据持久性的最快方法是给你的实例挂载一个持久卷，并配置 Ceramic 和 IPFS 节点来写入挂载的位置。挂载的卷应该被配置成在实例关闭时数据仍然存在。

你还可以将 AWS S3 用于数据存储，它对 Ceramic 和 IPFS 均支持。下面列出了这两种存储选项的配置示例。

#### IPFS 数据存储 (IPFS Datastore)

IPFS 数据存储存储了构成 Ceramic 流的原始 IPFS 块。为防止数据损坏，请使用写在配置文件中的环境变量，或者在启动时注入环境中，这样数据存储的位置在重启时就不会改变。

注意：切换数据存储位置是一项高级功能，应避免使用。根据分片的实现，你可能需要先进行数据迁移。更多信息请参考 https://github.com/ipfs/go-ipfs/blob/master/docs/config.md#datastorespec。

#### Ceramic 状态存储 (Ceramic State Store)

Ceramic 状态存储为钉住 (pinned) 的流保存状态，并作为你的节点创建或加载的 Ceramic 流的一个缓存。为了确保使用 Ceramic 节点创建的数据不会丢失，你必须钉住你关心的数据流，并且必须确保状态存储不会被删除。

## **示例**

---

### **使用 Docker 容器**

```bash
docker pull ceramicnetwork/go-ipfs-daemon:latest

# 使用这段代码让数据存储保持在卷中
docker run \
  -p 5001:5001 \ # API port
  -p 8011:8011 \ # Healthcheck port
  -v /path_on_volume_for_ipfs_repo:/data/ipfs \
  --name ipfs \
  go-ipfs-daemon

# 使用这段代码让数据存储保持在 S3 中
docker run \
  -p 5001:5001 \ # API port
  -p 8011:8011 \ # Healthcheck port
  -v /path_on_volume_for_ipfs_repo:/data/ipfs \
  -e IPFS_ENABLE_S3=true \
  -e IPFS_S3_REGION=region \
  -e IPFS_S3_BUCKET_NAME=bucket_name \
  -e IPFS_S3_ROOT_DIRECTORY=root_directory \
  -e IPFS_S3_ACCESS_KEY_ID=aws_access_key_id \
  -e IPFS_S3_SECRET_ACCESS_KEY=aws_secret_access_key \
  -e IPFS_S3_KEY_TRANSFORM=next-to-last/2 \ # Sharding method
  --name ipfs \
  go-ipfs-daemon

# 获取 IP 地址
docker inspect -f \
  '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' \
  ipfs
```

在启动 Ceramic 守护进程前，先配置其使用 IPFS "远程" 模式。 请参考下方的 [示例 daemon.config.json](#example-daemonconfigjson)。

```bash
docker pull ceramicnetwork/js-ceramic:latest

# 使用这段代码让状态存储保持在卷中
docker run -d \
  -p 7007:7007 \
  -v /path_on_volume_for_daemon_config:/root/.ceramic/daemon.config.json \
  -v /path_on_volume_for_ceramic_logs:/root/.ceramic/logs \
  -v /path_on_volume_for_ceramic_statestore:/root/.ceramic/statestore \
  -e NODE_ENV=production \
  --name js-ceramic \
  ceramicnetwork/js-ceramic:latest

# 使用这段代码让状态存储保持在 S3 中
docker run -d \
  -p 7007:7007 \
  -v /path_for_daemon_config:/root/.ceramic/daemon.config.json \
  -v /path_for_ceramic_logs:/root/.ceramic/logs \
  -e NODE_ENV=production \
  -e AWS_ACCESS_KEY_ID=s3_access_key_id \
  -e AWS_SECRET_ACCESS_KEY=s3_secret_access_key \
  --name js-ceramic \
  ceramicnetwork/js-ceramic:latest
```

### **不使用容器**

安装完成后，两个守护进程 (ipfs 和 ceramic) 可以分别用下面的命令启动：

```bash
ipfs init
ipfs daemon
```

在启动 Ceramic 守护进程前，先配置其使用 IPFS "远程" 模式。 请参考下方的 [示例 daemon.config.json](#example-daemonconfigjson)。

```bash
ceramic daemon
```

### **示例 daemon.config.json**

```json
{
    "anchor": {
        "ethereum-rpc-url": "https://eg_infura_endpoint" // 为避免用量限制，将其替换为一个 Ethereum RPC 端点
    },
    "http-api": {
        "cors-allowed-origins": [
            ".*"
        ]
    },
    "ipfs": {
        "mode": "remote",
        "host": "http://ipfs_ip_address:5001"
    },
    "logger": {
        "log-level": 2, // 0 最 verbose (输出最多的 log)
        "log-to-files": true
    },
    "network": {
        "name": "mainnet", // 连接到 mainnet, testnet-clay, 或 dev-unstable
    },
    "node": {},
    "state-store": {
        "mode": "s3",
        "s3-bucket": "bucket_name"
    }
}
```

对状态存储，如果使用卷 (volume storage) 而不是 S3:

```json
"state-store": {
    "mode": "fs",
    "local-directory": "/path_for_ceramic_statestore", // 默认为 $HOME/.ceramic/statestore
}
```

### **示例 AWS S3 策略**

IPFS AWS S3 policy for the access key

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "s3:GetObject",
        "s3:ListBucket",
        "s3:PutObject",
        "s3:DeleteObject"
      ],
      "Effect": "Allow",
      "Resource": ["ipfs_bucket_arn", "ipfs_bucket_arn/*"]
    }
  ]
}
```

:::info

  在纯 go-ipfs (vanilla go-ipfs) 中，[S3 数据存储](https://github.com/3box/go-ds-s3) 不是开箱即用的。为了以最小配置来使用它，请使用 3Box Labs 的 [go-ipfs-daemon](https://github.com/ceramicnetwork/go-ipfs-daemon)。

:::

Ceramic state store AWS S3 policy for the access key

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "s3:ListBucket",
        "s3:GetObject",
        "s3:PutObject",
        "s3:DeleteObject"
      ],
      "Effect": "Allow",
      "Resource": ["state_store_bucket_arn", "state_store_bucket_arn/*"]
    }
  ]
}
```

## **连接到 Ceramic 网络**

---

### **连接到 Ceramic**

Ceramic 守护进程提供一个 HTTP API ，客户使用它与你的 Ceramic 节点进行交互。默认的API端口是`7007`。确保这个端口对你计划用于你的应用程序的所有客户端是可用的。

:::tip
  
  Healthchecks can be run against the API endpoint `/api/v0/node/healthcheck`.

:::

### **保持与 IPFS 的连接**

Ceramic 节点依靠 IPFS 进行组网。IPFS节点使用名为 "switch"（又名 "swarm"）的 Libp2p 模块相互连接。这个模块运作在 websocket 上，默认端口为`4011`。websocket 端口必须可以访问互联网，这样你的 Ceramic 节点才可以连接到网络上。

:::tip

  Healthchecks can be run against the `HEALTHCHECK_PORT` (port `8011` by default) when `HEALTHCHECK_ENABLED` is `true`.

:::

此外，运行 IPFS 时，IPFS 的 API 端口必须能被 Ceramic 节点访问。默认的API端口是`5001`。然后通过 Ceramic 守护进程配置文件中的 ipfs.host 选项将 IPFS 节点的地址传递给 Ceramic。

### **连接到主网锚点服务**

对于希望连接到 Ceramic 主网的节点，该节点的IP地址必须被添加到由 3BoxLabs 运营的 Ceramic 锚点服务节点的允许列表 (allowlist) 中。一旦你用本指南完全配置了你的 Ceramic 节点，并有办法持久化它的配置和状态，请在[Ceramic Anchor Allowlist Repo](https://github.com/3box/ceramic-anchor-allowlist) 中创建一个 issue，提供你的 Ceramic 节点的公共静态*出口* IP 地址，并简要描述对多地址 (multiaddress)、 Ceramic 状态存储和 IPFS Repo 的数据持久性设置。一旦你的 issue 被关闭，你将能够连接到 Ceramic 网络和 Ceramic 锚点服务。

希望连接到其他 Ceramic 网络的节点，如 Clay 测试网，不需要做任何特别的事情来获得 Ceramic 锚点服务的访问。`testnet-clay`网络的锚点服务对所有人开放，不像主网服务那样有一个 IP 允许列表。

:::tip

  主网节点在启动后不会立即运行，直到你的拉取请求被审核、你的IP地址被添加到 3Box Labs 托管锚点服务的允许列表中。

:::

## **可观测性**

---

Ceramic 有一个调试模式，你可以用`--debug`标志启用。这将允许你看到打印到控制台的所有日志，包括调试日志、API请求、事件和错误。

为了便于观察，最好将这些日志写入文件，以调试可能出现的问题并生成指标。写入记录文件可以通过 `logger.log-to-files` 配置文件选项启用。日志的默认位置是`~/.ceramic/logs`，但这个路径可通过 `logger.log-directory` 配置文件选项来配置。即使没有启用调试模式，您仍然可以将关键日志和指标写入文件。

请求和事件日志使用 [logfmt](https://brandur.org/logfmt) 编写。这使得它们很容易使用像[Promtail](https://grafana.com/docs/loki/latest/clients/promtail/)这样的日志搜刮代理和像 [Loki](https://grafana.com/docs/loki/latest/) 这样的日志聚合器导入 [Grafana](https://grafana.com/) 仪表盘，后者可作为 Grafana 的数据源。示例设置可以在[这里](https://github.com/3box/ceramic-stats)找到。

## **下一步**

---

祝贺！您现在已经在云端建立了一个连接良好的 Ceramic 节点，它可以接收来自本地环境、[JS HTTP 客户端](../../build/javascript/installation.md#js-http-client)的 HTTP 请求，或者简单地作为另一个节点来复制和钉住流。如果遇到任何 bug, 请在 [JS Ceramic GitHub](https://github.com/ceramicnetwork/js-ceramic)上提出 issue。
