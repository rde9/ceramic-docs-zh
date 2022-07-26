# Ceramic 入门

原文链接：**[Getting Started With Ceramic](https://blog.ceramic.network/getting-started-with-ceramic/)**

:::info

  原文更新时间：2022年6月27日。

:::

在 Mirror 上阅读：https://mirror.xyz/0buwu.eth/F_cPy1_-rp6Hw4Z1yyMl0vpWefh1nj8RAgF_SJF89Nk

:::tip

 本指南基于 js-ceramic 包 Ceramic V2.0.0 版本编写。
 
:::

在这篇初学者友好的指南中，我将为您提供将 Ceramic Network 集成到您的 Web3 dapps 所需的所有工具和知识。

Ceramic Network 是一个去中心化的数据网络，旨在为 Web3 dapps 带来可组合的数据。Ceramic 可以处理多种类型的数据，但对于本指南，我们可以将 Ceramic 视为去中心化的 NoSQL 文档数据库。

本指南旨在让您边学边做，因此在继续阅读时会有图表和代码示例出现。

## **您的学习经历**

除了这份书面指南，我还提供了一个[GitHub 仓库](https://github.com/ceramicstudio/tutorial-getting-started-with-ceramic)，其中包含我将参考的所有代码。

如果您更喜欢视频而不是书面教程，您可以在[Ceramic Youtube 频道](https://www.youtube.com/channel/UCgCLq5dx7sX-yUrrEbtYqVw)观看视频演练。

在开始之前，您应该具有如下的通用 Web 开发技能：

**本指南中使用的技能**

- [基础 Javascript](https://developer.mozilla.org/zh-CN/docs/Learn/Getting_started_with_the_web/JavaScript_basics)
- 理解 [客户端 JS 和服务端 JS 的根本区别](https://computersciencewiki.org/index.php/Client-side_scripting_and_server-side_scripting)
- JavaScript 包管理
- 对 [Webpack](https://webpack.js.org/) 的基本了解

**可选技能**

- [Git](https://git-scm.com/)
- 版本控制（即 GitHub、GitLab、BitBucket）

**所需工具（需要提前安装）**

- 文本编辑器（即 VS Code、Sublime、vim 等）
- [NodeJS](https://www.nodejs.org/) v16 或更高版本
- [NPM](https://www.npmjs.com/) v8 或更高版本或 [Yarn](https://yarnpkg.com/)

## **我们需要谈论的事情**

在开始之前，我将介绍将在本指南中使用的一些关键术语。

#### **[去中心化标识符 Decentralized Identifier](https://www.w3.org/TR/did-core/)**

通常称为 [DID](https://www.w3.org/TR/did-core/#dfn-decentralized-identifiers).

DID 是包含您的元数据的唯一的标识符。例如您的[公钥](https://en.wikipedia.org/wiki/Public-key_cryptography)，一些验证信息，允许您访问的服务点以及其他一些事情。

简而言之，DID 被用作 Ceramic 的账户标识符。

> 此处用到的依赖包有：
>
> - `DIDs`

#### **[DID 解析器 DID Resolver](https://www.w3.org/TR/did-core/#dfn-did-resolvers)**

DID 解析器将 DID 作为输入，并返回 [DID Document](https://www.w3.org/TR/did-core/#dfn-did-documents).

此解析过程将 DID 从通用事物转变为文档，该文档能准确描述一个身份以及该身份允许执行哪些方法和功能。

简而言之，解析器将 DID 与*它能够执行的操作*结合起来。

> 此处用到的依赖包有：
>
> - `key-did-resolver`
> - `@glazed/did-datastore`

#### **[以太坊提供者 Ethereum Providers](https://docs.ethers.io/v4/api-providers.html#providers)**

如果您希望您的应用程序能够访问区块链，则需要使用提供者。

本指南连接到以太坊区块链，因此使用以太坊提供者。

提供者用于代替您自己运行的区块链节点。提供者有两个主要任务：

1. 告诉您的应用程序要连接到哪个区块链。
2. 连接后，运行查询并发送修改区块链状态的签名交易。

Metamask 是最受欢迎的区块链提供者之一，我们将用它作为提供者把我们的应用程序连接到以太坊区块链。

简而言之，提供者对用户进行*身份验证*以在区块链上执行操作。

> 此处用到的依赖包有：
>
> - `key-did-provider-ed25519`
> - `@glazed/did-session`
> - `@ceramicnetwork/blockchain-utils-linking`

#### **[数据流类型 Data StreamTypes](https://developers.ceramic.network/learn/glossary/#streamtypes)**

当我提及数据流时，我并不是从消费的角度谈论[流数据](https://en.wikipedia.org/wiki/Streaming_data)。Ceramic 将它的数据结构称为流。请随意阅读有关[流](https://developers.ceramic.network/learn/glossary/#streams)的更多信息。

[StreamType](https://developers.ceramic.network/learn/glossary/#streamtypes) 只是流的一种可能的数据结构。在本指南中，我们将**间接**使用`TileDocument` [StreamType](https://developers.ceramic.network/learn/glossary/#streamtypes)，您可以将其视为 [JSON 对象](https://www.json.org/json-en.html)。 这些 StreamTypes 处理与数据相关的一切，它们在 [Ceramic 节点](https://developers.ceramic.network/learn/glossary/#nodes) 上运行。

简而言之，StreamTypes 定义了*数据结构*以及数据的状态被允许*如何改变*。

> 此处用到的依赖包有：
>
> - `@glazed/did-datastore`



#### **[数据模型 Data models](https://developers.ceramic.network/docs/advanced/standards/data-models/#data-models)**

数据模型通常用于表示应用程序功能。例如笔记、用户档案、博客文章甚至是社交图。

数据模型是可组合数据的核心。单个应用程序使用多个数据模型很常见，而单个数据模型跨多个应用程序使用也很常见！

以这种方式完成的可组合性也会为开发人员带来更好的体验。在 Ceramic 上构建应用程序就像浏览数据模型市场，将它们插入您的应用程序，并自动获取存储在网络上符合这些数据模型的所有数据的访问权限。

简而言之，数据模型使应用程序中的*数据可组合性*成为可能。

## 关于这个应用

您将构建一个简单的 Web 应用程序，该应用程序对 Ceramic 网络上的数据执行简单的读写操作。要使此应用程序正常工作，它需要按序完成以下步骤。

1. 使用以太坊提供者将您的区块链钱包验证到 Ceramic.
2. 验证完成后，解析一个用于 Ceramic 的 DID.
3. 使用 Ceramic 实例通过给定的 DID，对 `TileDocument` 流执行读写操作。

我在“我们需要谈论的事情”部分中提到了上面的一些依赖项，但在进一步讨论之前，还有其他一些依赖项值得一提。

#### **[Ceramic 客户端 Ceramic Client](https://developers.ceramic.network/reference/core-clients/ceramic-http/)**

This is the web client that allows your application to connect to [Ceramic nodes](https://developers.ceramic.network/learn/glossary/#nodes) that are a part of the network.

这个 Web 客户端允许您的应用程序连接到作为网络一部分的[Ceramic 节点](https://developers.ceramic.network/learn/glossary/#nodes)。

> 此处用到的依赖包有：
>
> - `@ceramicnetwork/http-client`

#### **[Webpack](https://webpack.js.org/)**

您将编写的 JavaScript 代码使用 Node 包，使其成为了服务端代码。然而 Web 浏览器需要的是客户端代码。

Webpack 是一个很好的模块，它会把您将要编写的服务端 JavaScript 转换为您的浏览器可以理解的客户端 JavaScript.

为此，我们需要一些依赖项。

> 此处用到的依赖包有：
>
> - `webpack`
> - `webpack-cli`
> - `buffer`

## 编写前端页面

我将引导您使用简单的 HTML 和 CSS 构建此应用程序前端。

1. 让我们首先为项目创建文件夹。这个过程因操作系统而异，所以请选择适合您的环境的解决方案。

   **Windows**

   ```
   md getting-started-with-ceramic
   ```
   
   **MacOS/Linux**

   ```
   mkdir getting-started-with-ceramic
   ```
   
2. 在文件夹根目录创建一个名为 `index.html` 的文件。  `index.html` 包含以下内容：

   ```html
   <!DOCTYPE html>
   <html lang="en">
   
   <head>
       <meta charset="UTF-8">
       <meta http-equiv="X-UA-Compatible" content="IE=edge">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <link rel="stylesheet" href="style.css">
       <link rel="shortcut icon" href="/favicon.ico">
   
       <title>Getting Started</title>
   </head>
   
   <body>
       <!-- create header with connect button -->
       <header class="SiteHeader">
           <div class="HeaderContainer">
               <h1 id="pageTitle">Getting Start With Ceramic</h1>
           </div>
           <div class="HeaderContainer">
               <button id="walletBtn"></button>
           </div>
   
       </header>
       <div class="MainCont">
           <div class="DataBlocks">
               <div class="DataBlock">
                   <div id="basicProfile">
                       <div class="BodyContainer">
                           <h2>Basic Profile</h2>
                           <p>Read from Ceramic Datamodel</p>
                           <br>
                           <p class="ProfileData" id="profileName"></p>
                           <p class="ProfileData" id="profileGender"></p>
                           <p class="ProfileData" id="profileCountry"></p>
                       </div>
                   </div>
               </div>
           </div>
           <div class="ProfileForm">
               <div class="BodyContainer">
                   <h2>Update Basic Profile on Ceramic</h2>
                   <br>
                   <form id="profileForm">
                       <div class="formfield">
                           <label class="formLabel" for="name">Name:</label>
                           <input class="forminput" type="text" id="name" placeholder="John Doe">
                       </div>
                       <div class="formfield">
                           <label class="formLabel" for="country">Country:</label>
                           <input class="forminput" type="text" id="country" placeholder="USA">
                       </div>
                       <div class="formfield">
                           <label class="formLabel" for="gender">Gender:</label>
                           <select class="forminput" id="gender">
                               <option value="female">Female</option>
                               <option value="male">Male</option>
                               <option value="non-binary">Non-Binary</option>
                               <option value="other">Other</option>
                           </select>
                       </div>
                       <div class="formfield">
                           <input class="forminput" type="submit" id="submitBtn" value="Submit">
                       </div>
                   </form>
               </div>
           </div>
       </div>
   
       <!-- <button id="setBasicProf">Set Profile</button>
       <button id="getBasicProf">Get Profile</button> -->
       <script src="dist/bundle.js" type="module"></script>
   </body>
   
   </html>
   ```

3. 下一步，在`getting-started-with-ceramic` 文件夹的根目录新建 `style.css` 文件. 包含以下内容：

   ```css
   * {
       margin: 0;
       padding: 0;
   }
   
   .SiteHeader {
       display: flex;
       justify-content: space-between;
       padding: 10px;
       background-color: orange;
   }
   
   .HeaderContainer {
       display: flex;
       align-items: center;
   }
   
   
   .MainCont {
       display: flex;
       justify-content: space-around;
       padding: 10px;
   }
   
   .DataBlock {
   
       margin-bottom: 10px;
   
   }
   
   .BodyContainer {
       background-color: lightsalmon;
       border: 1px solid black;
       border-radius: 30px;
       padding: 20px;
       min-width: 250px;
   }
   
   .ProfileForm {
       min-width: 400px;
   }
   
   
   
   .formfield {
       display: flex;
       justify-content: space-between;
       margin-bottom: 10px;
   }
   
   .forminput {
       min-width: 150px;
   
   }
   
   #submitBtn {
       display: block;
       margin: auto;
       width: auto;
   }
   
   .ProfileData {
       font-weight: bold;
   }
   ```

   很好！现在如果您在浏览器中打开 `index.html` 文件，或使用 [LiveShare](https://visualstudio.microsoft.com/services/live-share/) 等实用程序，您应该会看到如下内容：

   ![](https://i.imgur.com/ZH2egjl.png)

## 添加 JavaScript 和 Ceramic

现在你的应用程序不能做任何事情。它没有内置的逻辑，只是一个带有一些内容和一些样式的静态页面。

在这一步中，我将向您展示如何使用提供者、解析器和 Ceramic 来把此应用程序从静态站点变成 web3 dapp!

1. 首先，使用 [NPM](https://www.npmjs.com/) 或 [Yarn](https://yarnpkg.com/) 初始化一个新的 [NodeJS](https://www.nodejs.org/) 项目：

   **NPM**

   ```
   npm init -y
   ```

   **Yarn**

   ```
   yarn init -y
   ```

2. 接下来，安装前文所述依赖项：

   **NPM**

   开发依赖 Dev dependencies

   ```
   npm install -D buffer dids key-did-provider-ed25519 key-did-resolver webpack webpack-cli
   ```

   普通依赖 Regular dependencies

   ```
   npm install @ceramicnetwork/blockchain-utils-linking @ceramicnetwork/http-client @glazed/did-datastore @glazed/did-session
   ```

   **Yarn**

   开发依赖 Dev dependencies

   ```
   yarn add -D buffer dids key-did-provider-ed25519 key-did-resolver webpack webpack-cli
   ```

   普通依赖 Regular dependencies

   ```
   yarn add @ceramicnetwork/blockchain-utils-linking @ceramicnetwork/http-client @glazed/did-datastore @glazed/did-session
   ```

3. 现在，在 `getting-started-with-ceramic` 根目录下创建 `main.js` 文件。

4. 从引入普通依赖开始：

   ```javascript
   //main.js 
   
   import { CeramicClient } from '@ceramicnetwork/http-client'
   import { EthereumAuthProvider } from '@ceramicnetwork/blockchain-utils-linking'
   import { DIDDataStore } from '@glazed/did-datastore'
   import { DIDSession } from '@glazed/did-session'
   ```

   > 您是否注意到有些包来自`@ceramicnetwork`，而另一些来自`@glazed`?
   >
   > 来自 @ceramicnetwork 的包是核心 Ceramic 协议的一部分。它们帮助将应用程序连接到 Ceramic 节点。
   >
   > 来自 @glazed 的包不是核心 Ceramic 协议的一部分，它们被称为`middleware`，为开发人员提供一些附加功能和便利。
   
5. 导入依赖项后，您应该设置一系列 DOM 元素选择器。这不仅能让我们编写的代码更易于阅读，而且在更大的应用程序中，这种技术可以增加性能优势。将以下内容添加到`main.js`.

   ```javascript
   import { CeramicClient } from '@ceramicnetwork/http-client'
   import { EthereumAuthProvider } from '@ceramicnetwork/blockchain-utils-linking'
   import { DIDDataStore } from '@glazed/did-datastore'
   import { DIDSession } from '@glazed/did-session'
   
   const profileForm = document.getElementById('profileForm')
   const walletBtn = document.getElementById('walletBtn')
   const profileName = document.getElementById('profileName')
   const profileGender = document.getElementById('profileGender')
   const profileCountry = document.getElementById('profileCountry')
   const submitBtn = document.getElementById('submitBtn')
   
   ```

6. 使用刚刚引入的 `CeramiClient` , 创建一个新的 Ceramic 客户端实例：

   ```javascript
   //main.js
   
   import { CeramicClient } from '@ceramicnetwork/http-client'
   import { EthereumAuthProvider } from '@ceramicnetwork/blockchain-utils-linking'
   import { DIDDataStore } from '@glazed/did-datastore'
   import { DIDSession } from '@glazed/did-session'
   
   const profileForm = document.getElementById('profileForm')
   const walletBtn = document.getElementById('walletBtn')
   const profileName = document.getElementById('profileName')
   const profileGender = document.getElementById('profileGender')
   const profileCountry = document.getElementById('profileCountry')
   const submitBtn = document.getElementById('submitBtn')
   
   const ceramic = new CeramicClient("https://ceramic-clay.3boxlabs.com")
   ```

   > 目前有 4 个网络可供 Ceramic HTTP 客户端连接。点击链接了解各个网络的详情。
   >
   > - 主网 [Mainnet](https://developers.ceramic.network/learn/networks/#mainnet)
   > - Clay 测试网 [Clay Testnet](https://developers.ceramic.network/learn/networks/#clay-testnet) (推荐，我们的程序正在使用)
   > - Dev 测试网 [Dev Unstable](https://developers.ceramic.network/learn/networks/#dev-unstable)
   > - 本地网络 [Local](https://developers.ceramic.network/learn/networks/#local)

7. 接下来创建一个名为 `aliases` 的变量，它将保存 `BasicProfile` 数据模型的参考信息：

   ```javascript
   //main.js
   
   import { CeramicClient } from '@ceramicnetwork/http-client'
   import { EthereumAuthProvider } from '@ceramicnetwork/blockchain-utils-linking'
   import { DIDDataStore } from '@glazed/did-datastore'
   import { DIDSession } from '@glazed/did-session'
   
   const profileForm = document.getElementById('profileForm')
   const walletBtn = document.getElementById('walletBtn')
   const profileName = document.getElementById('profileName')
   const profileGender = document.getElementById('profileGender')
   const profileCountry = document.getElementById('profileCountry')
   const submitBtn = document.getElementById('submitBtn')
   
   const ceramic = new CeramicClient("https://ceramic-clay.3boxlabs.com")
   
   const aliases = {
       schemas: {
           basicProfile: 'ceramic://k3y52l7qbv1frxt706gqfzmq6cbqdkptzk8uudaryhlkf6ly9vx21hqu4r6k1jqio',
   
       },
       definitions: {
           BasicProfile: 'kjzl6cwe1jw145cjbeko9kil8g9bxszjhyde21ob8epxuxkaon1izyqsu8wgcic',
       },
       tiles: {},
   }
   ```

   > **数据模型的组成**
   >
   > `schemas`: 定义数据模型的 JSON 模式。
   >
   > `definitions`: 将用户友好的模型名称和描述链接到特定模式。
   >
   > `tiles`: 基于模式内设置的参数的单个数据记录 (records)
   >
   > ![](https://i.imgur.com/WDKidX1.png)

8.  `DIDDataStore` 允许应用程序从 Ceramic 中读写数据。 `DIDDataStore` 基于数据模型。 添加以下内容以配置 `DIDDataStore` 使用前文定义的 `aliases` 和 `ceramic instance`：

   ```javascript
   //main.js
   
   import { CeramicClient } from '@ceramicnetwork/http-client'
   import { EthereumAuthProvider } from '@ceramicnetwork/blockchain-utils-linking'
   import { DIDDataStore } from '@glazed/did-datastore'
   import { DIDSession } from '@glazed/did-session'
   
   const profileForm = document.getElementById('profileForm')
   const walletBtn = document.getElementById('walletBtn')
   const profileName = document.getElementById('profileName')
   const profileGender = document.getElementById('profileGender')
   const profileCountry = document.getElementById('profileCountry')
   const submitBtn = document.getElementById('submitBtn')
   
   const ceramic = new CeramicClient("https://ceramic-clay.3boxlabs.com")
   
   const aliases = {
       schemas: {
           basicProfile: 'ceramic://k3y52l7qbv1frxt706gqfzmq6cbqdkptzk8uudaryhlkf6ly9vx21hqu4r6k1jqio',
   
        },
        definitions: {
            BasicProfile: 'kjzl6cwe1jw145cjbeko9kil8g9bxszjhyde21ob8epxuxkaon1izyqsu8wgcic',
        },
        tiles: {},
   }
   
   const datastore = new DIDDataStore({ ceramic, model: aliases })
   ```

   > 根据您的 dapp 的需要，您可以通过添加必要的`schema`, `definition` 和 `tiles`来向`aliases`变量中添加更多数据模型！

   很好！您已经具备了启动和运行此应用程序所需的基本基础。Ceramic 客户端和数据模型的所有配置均已完成。


## 使用区块链进行身份验证

下一部分将指导您使用以太坊提供者 [Metamask](https://metamask.io/) 通过以太坊区块链对用户进行身份验证。

将要使用的身份验证流程称为 [使用以太坊登录 Sign-In With Ethereum](https://login.xyz/), 但从这里开始我将其简称为 SIWE。

> 查看这篇精彩的文章以了解更多信息：[为什么 Sign-In With Ethereum 是游戏规则改变者](https://blog.spruceid.com/sign-in-with-ethereum-is-a-game-changer-part-1/).

让我们将 SIWE 添加到此应用程序中！

1. 这个应用程序需要一个[异步函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function)，我将命名它`authenticateWithEthereum`，它使用提供者(Provider)、解析器 (Resovler)，最后将 DID 分配给您之前创建的 Ceramic 客户端。在`main.js`添加此代码以完成这项任务：

   ```javascript
   //main.js
   
   async function authenticateWithEthereum(ethereumProvider) {
   
       const accounts = await ethereumProvider.request({
       method: 'eth_requestAccounts',
       })
   
       const authProvider = new EthereumAuthProvider(ethereumProvider, accounts[0])
   
       const session = new DIDSession({ authProvider })
   
       const did = await session.authorize()
   
       ceramic.did = did
   }
   ```

   > `DIDSession`将为您处理 SIWE 身份验证流程。

2. 在启动身份验证流程之前，我们的应用程序通常需要进行一些逻辑检查。在开发 dapps 时，一个常见的检查是确保提供者可用。在本例中，[Metamask](https://metamask.io/) 作为提供者，将自己添加为我们的浏览器`window`对象中，可通过`window.ethereum`进行引用。如果应用程序的用户没有安装 [Metamask](https://metamask.io/)，或其他提供者，那么我们的应用程序将无法连接到区块链。懂了这些，让我们将这条知识应用到一个新的异步函数`auth`. 将以下代码添加到`main.js`：

   ```javascript
   //main.js
   
   async function authenticateWithEthereum(ethereumProvider) {
   
       const accounts = await ethereumProvider.request({
       method: 'eth_requestAccounts',
       })
   
       const authProvider = new EthereumAuthProvider(ethereumProvider, accounts[0])
   
       const session = new DIDSession({ authProvider })
   
       const did = await session.authorize()
   
       ceramic.did = did
   }
   
   // 新添加的函数:
   async function auth() {
   if (window.ethereum == null) {
       throw new Error('No injected Ethereum provider found')
   }
   await authenticateWithEthereum(window.ethereum)
   }
   ```

   在尝试调用 `authenticateWithEthereum()`之前，`auth()` 首先检查 `window.ethereum` 是否存在。这可以防止程序在用户没有注入提供者 (injected provider) 时处于悬空状态！

如果您想检查您的工作，完整的`main.js`文件当前应该如下所示：

```javascript
//main.js

// 引入所有依赖
import { CeramicClient } from '@ceramicnetwork/http-client'
import { EthereumAuthProvider } from '@ceramicnetwork/blockchain-utils-linking'
import { DIDDataStore } from '@glazed/did-datastore'
import { DIDSession } from '@glazed/did-session'

// 引用 DOM 元素
const profileForm = document.getElementById('profileForm')
const walletBtn = document.getElementById('walletBtn')
const profileName = document.getElementById('profileName')
const profileGender = document.getElementById('profileGender')
const profileCountry = document.getElementById('profileCountry')
const submitBtn = document.getElementById('submitBtn')

// 创建新 CeramicClient 实例
const ceramic = new CeramicClient("https://ceramic-clay.3boxlabs.com")

// 引用数据模型 data model，将在本应用程序中使用
const aliases = {
    schemas: {
        basicProfile: 'ceramic://k3y52l7qbv1frxt706gqfzmq6cbqdkptzk8uudaryhlkf6ly9vx21hqu4r6k1jqio',

    },
    definitions: {
        BasicProfile: 'kjzl6cwe1jw145cjbeko9kil8g9bxszjhyde21ob8epxuxkaon1izyqsu8wgcic',
    },
    tiles: {},
}

// 使用 ceramic 实例和数据模型配置数据存储 datastore
const datastore = new DIDDataStore({ ceramic, model: aliases })

// 这个函数使用 SIWE 对用户做验证
async function authenticateWithEthereum(ethereumProvider) {

    const accounts = await ethereumProvider.request({
    method: 'eth_requestAccounts',
    })

    const authProvider = new EthereumAuthProvider(ethereumProvider, accounts[0])

    const session = new DIDSession({ authProvider })

    const did = await session.authorize()

    ceramic.did = did
}

// 检查提供者, 如果存在, 则对用户进行验证
async function auth() {
    if (window.ethereum == null) {
    throw new Error('No injected Ethereum provider found')
    }
    await authenticateWithEthereum(window.ethereum)
} 
```

---

## 使用 Ceramic 读取数据

您编写的下一个函数将使用`DIDDatastore`来从 Ceramic 网络获取数据，我称之为`getProfileFromCeramic`. 类似前面的函数，它将是异步的。

该函数将在`main.js`文件中声明。

1. 将`getProfileFromCeramic`函数添加到`main.js`：

   ```javascript
   //main.js
   
   async function getProfileFromCeramic() {
       try {
       
       //使用 DIDDatastore 从 Ceramic 获取 profile 数据
       const profile = await datastore.get('BasicProfile')
       
       //向 DOM 渲染 profile 数据 (未修改)
       renderProfileData(profile)
       } catch (error) {
       console.error(error)
       }
   }
   ```

   如您所见，通过调用`datastore.get()`方法，您可以简单地引用您希望从中读取数据的数据模型的`definition`.

   DIDDatastore 使用分配给 Ceramic 客户端的 DID 来执行此调用。它返回 profile 对象并保存在 `profile` 变量中。

2. 您将需要创建`renderProfileData`函数来提取此配置文件数据并将其显示在浏览器窗口中。由于本教程不是 Web 开发指南，因此我不会详细介绍此功能的作用。将以下内容添加到您的`main.js`文件中：

   ```javascript
   function renderProfileData(data) {
       if (!data) return
       data.name ? profileName.innerHTML = "Name:     " + data.name : profileName.innerHTML = "Name:     "
       data.gender ? profileGender.innerHTML = "Gender:     " + data.gender : profileGender.innerHTML = "Gender:     "
       data.country ? profileCountry.innerHTML = "Country:     " + data.country : profileCountry.innerHTML = "Country:     "
   }
   ```

   > 我想指出，`data`是 `datastore.get()` 函数调用返回的`profile`对象。`data`的属性在`BasicProfile`数据模型中定义。查看  [Ceramic 数据模型仓库](https://github.com/ceramicstudio/datamodels) 以获取[完整属性列表](https://github.com/ceramicstudio/datamodels/tree/main/models/identity-profile-basic)。

就是这样！这就是使用`DIDDataStore`从 Ceramic 网络读取数据的全部内容！

目前，完整的`main.js`应该像这样：

```javascript
//main.js

// 引入所有依赖
import { CeramicClient } from '@ceramicnetwork/http-client'
import { EthereumAuthProvider } from '@ceramicnetwork/blockchain-utils-linking'
import { DIDDataStore } from '@glazed/did-datastore'
import { DIDSession } from '@glazed/did-session'

// 引用 DOM 元素
const profileForm = document.getElementById('profileForm')
const walletBtn = document.getElementById('walletBtn')
const profileName = document.getElementById('profileName')
const profileGender = document.getElementById('profileGender')
const profileCountry = document.getElementById('profileCountry')
const submitBtn = document.getElementById('submitBtn')

// 创建新 CeramicClient 实例
const ceramic = new CeramicClient("https://ceramic-clay.3boxlabs.com")

// 引用数据模型 data model，将在本应用程序中使用
const aliases = {
    schemas: {
        basicProfile: 'ceramic://k3y52l7qbv1frxt706gqfzmq6cbqdkptzk8uudaryhlkf6ly9vx21hqu4r6k1jqio',

    },
    definitions: {
        BasicProfile: 'kjzl6cwe1jw145cjbeko9kil8g9bxszjhyde21ob8epxuxkaon1izyqsu8wgcic',
    },
    tiles: {},
}

// 使用 ceramic 实例和数据模型配置数据存储 datastore
const datastore = new DIDDataStore({ ceramic, model: aliases })

// 这个函数使用 SIWE 对用户做验证
async function authenticateWithEthereum(ethereumProvider) {

    const accounts = await ethereumProvider.request({
    method: 'eth_requestAccounts',
    })

    const authProvider = new EthereumAuthProvider(ethereumProvider, accounts[0])

    const session = new DIDSession({ authProvider })

    const did = await session.authorize()

    ceramic.did = did
}

// 检查提供者, 如果存在, 则对用户进行验证
async function auth() {
    if (window.ethereum == null) {
    throw new Error('No injected Ethereum provider found')
    }
    await authenticateWithEthereum(window.ethereum)
} 

// 使用 DIDDatastore 从 Ceramic 获取 BasicProfile 数据
async function getProfileFromCeramic() {
    try {
    
    //使用 DIDDatastore 从 Ceramic 获取 profile 数据
    const profile = await datastore.get('BasicProfile')
    
    //向 DOM 渲染 profile 数据 (未修改)
    renderProfileData(profile)
    } catch (error) {
    console.error(error)
    }
}

// 做一些有趣的 web 开发者工作，在 DOM 中展示 BasicProfile
function renderProfileData(data) {
    if (!data) return
    data.name ? profileName.innerHTML = "Name:     " + data.name : profileName.innerHTML = "Name:     "
    data.gender ? profileGender.innerHTML = "Gender:     " + data.gender : profileGender.innerHTML = "Gender:     "
    data.country ? profileCountry.innerHTML = "Country:     " + data.country : profileCountry.innerHTML = "Country:     "
}
```

## 使用 Ceramic 写入数据

下一个要实现的部分是使用`DIDDatastore`向 Ceramic 网络写入数据。

1. 与已编写的其他一些函数一样，`updateProfileOnCeramic`函数也应是异步的。将以下内容添加到`main.js`：

   ```javascript
   async function updateProfileOnCeramic() {
       try {
       const updatedProfile = getFormProfile()
       submitBtn.value = "Updating..."
   
       //使用 DIDDatastore 合并 Ceramic 中的 profile 数据
       await datastore.merge('BasicProfile', updatedProfile)
   
       //使用 DIDDatastore 从 Ceramic 获取 profile 数据
       const profile = await datastore.get('BasicProfile')
   
       renderProfileData(profile)
   
       submitBtn.value = "Submit"
       } catch (error) {
       console.error(error)
       }
   }
   ```

   > 在继续之前，有两件重要的事情要谈。
   >
   > 首先， `DIDDatastore` 有两种写入数据模型的方法：
   >
   > - `merge()`，仅写入已更改的字段
   > - `set()`，它会覆盖**所有**字段，包括那些未更改的。这可能会导致数据被不必要地删除。出于这个原因，建议使用`merge`而不是`set`。
   >
   > 其次， 在这种情况下，使用`renderProfileData()`从 DIDDatastore 读取数据，仅为了将其渲染到 DOM，其实是次优的。在这个阶段从 Ceramic 读取数据并没有必要。这是为了向您展示读取和写入可以多么简单，因为在使用 DIDDatastore 时这两种操作都仅占一行。

2. 您可能已经注意到，上述代码块中出现了`getFormProfile()`的调用。该函数目前尚不存在。让我们现在添加它。将以下代码添加到`main.js`：

   ```javascript
   function getFormProfile() {
   
       const name = document.getElementById('name').value
       const country = document.getElementById('country').value
       const gender = document.getElementById('gender').value
   
       return {
           name,
           country,
           gender
       }
   }
   ```

   > 如果您好奇我是如何想出`name`, `country`, `gender`这些属性的，它们都可以在 [BasicProfile](https://github.com/ceramicstudio/datamodels/tree/main/models/identity-profile-basic) 数据模型中找到。此项目中未引用BasicProfile 的其他属性。您应该您自己的项目中探索使用这些属性！

哇！你做到了！这就是入门 Ceramic 所需的全部内容。您现在知道的足够多，能够创建令人惊叹的 dapps.

不过，现在还没有完成。为了让这个应用程序完全工作，还要做其他一些小事情。

## 让按钮工作

本节和下一节“配置Webpack”，和 Ceramic 并不相关。这两节涵盖了一些必须执行的任务，让应用程序的按钮正常工作，并将服务器端转换为浏览器可以理解的内容。

**按钮的工作原理**

此应用程序的按钮元素将使用[事件侦听器](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener)以在被单击时执行函数。

将下面所有代码加入 `main.js`中。

1. 让我们首先创建一个函数，当用户单击“连接钱包”按钮时，事件侦听器可以调用该函数。

   ```javascript
   async function connectWallet(authFunction, callback) {
       try {
       walletBtn.innerHTML = "Connecting..."
       await authFunction()
       await callback()
       walletBtn.innerHTML = "Wallet Connected"
   
       } catch (error) {
       console.error(error)
       }
   
   }
   ```

2. 当前按钮元素不显示任何 `innerHTML`（译注：`innerHTML`属性表示元素的后代，设置 `innerHTML` 的值可以让你轻松地将当前元素的内容替换为新的内容。参考MDN文档 [innerHTML](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/innerHTML)），让我们在继续进行前修复它。在那些 DOM 元素引用的后面添加这一行：

   ```javascript
   walletBtn.innerHTML = "Connect Wallet"
   ```

3. 另一个缺少的东西是文本占位符，它们应该在 profile 数据被渲染的地方。 在 `walletBtn.innerHTML` 这一行下面添加这些代码以设置占位符：

   ```javascript
   walletBtn.innerHTML = "Connect Wallet"
   profileName.innerHTML = "Name: "
   profileGender.innerHTML = "Gender: "
   profileCountry.innerHTML = "Country: "
   ```

4. 最后一件事是添加两个事件侦听器。一个加在“连接钱包”按钮上，它会调用上面定义的`connectWallet`函数。另一个加在`ProfileForm`元素的按钮上。将以下这些行添加到`main.js`：

   ```javascript
   walletBtn.addEventListener('click', async () => await connectWallet(auth, getProfileFromCeramic))
   
   profileForm.addEventListener('submit', async (e) => {
   e.preventDefault()
   await updateProfileOnCeramic()
   
   })
   ```

   

好了！这就是应用程序需要的所有 JavaScript！请参考下面的`main.js`完整文件仔细检查您的工作：


```javascript
//main.js

// 引入所有依赖
import { CeramicClient } from '@ceramicnetwork/http-client'
import { EthereumAuthProvider } from '@ceramicnetwork/blockchain-utils-linking'
import { DIDDataStore } from '@glazed/did-datastore'
import { DIDSession } from '@glazed/did-session'

// 引用 DOM 元素
const profileForm = document.getElementById('profileForm')
const walletBtn = document.getElementById('walletBtn')
const profileName = document.getElementById('profileName')
const profileGender = document.getElementById('profileGender')
const profileCountry = document.getElementById('profileCountry')
const submitBtn = document.getElementById('submitBtn')

// 给钱包按钮赋初始值
walletBtn.innerHTML = "Connect Wallet"
// 设置 profile 占位文本
walletBtn.innerHTML = "Connect Wallet"
profileName.innerHTML = "Name: "
profileGender.innerHTML = "Gender: "
profileCountry.innerHTML = "Country: "

// 创建新 CeramicClient 实例
const ceramic = new CeramicClient("https://ceramic-clay.3boxlabs.com")

// 引用数据模型 data model，将在本应用程序中使用
const aliases = {
    schemas: {
        basicProfile: 'ceramic://k3y52l7qbv1frxt706gqfzmq6cbqdkptzk8uudaryhlkf6ly9vx21hqu4r6k1jqio',

    },
    definitions: {
        BasicProfile: 'kjzl6cwe1jw145cjbeko9kil8g9bxszjhyde21ob8epxuxkaon1izyqsu8wgcic',
    },
    tiles: {},
}

// 使用 ceramic 实例和数据模型配置数据存储 datastore
const datastore = new DIDDataStore({ ceramic, model: aliases })

// 这个函数使用 SIWE 对用户做验证
async function authenticateWithEthereum(ethereumProvider) {

    const accounts = await ethereumProvider.request({
    method: 'eth_requestAccounts',
    })

    const authProvider = new EthereumAuthProvider(ethereumProvider, accounts[0])

    const session = new DIDSession({ authProvider })

    const did = await session.authorize()

    ceramic.did = did
}

// 检查提供者, 如果存在, 则对用户进行验证
async function auth() {
    if (window.ethereum == null) {
    throw new Error('No injected Ethereum provider found')
    }
    await authenticateWithEthereum(window.ethereum)
} 

// 使用 DIDDatastore 从 Ceramic 获取 BasicProfile 数据
async function getProfileFromCeramic() {
    try {
    
    //使用 DIDDatastore 从 Ceramic 获取 profile 数据
    const profile = await datastore.get('BasicProfile')
    
    //向 DOM 渲染 profile 数据 (未修改)
    renderProfileData(profile)
    } catch (error) {
    console.error(error)
    }
}

// 做一些有趣的 web 开发者工作，在 DOM 中展示 BasicProfile
function renderProfileData(data) {
    if (!data) return
    data.name ? profileName.innerHTML = "Name:     " + data.name : profileName.innerHTML = "Name:     "
    data.gender ? profileGender.innerHTML = "Gender:     " + data.gender : profileGender.innerHTML = "Gender:     "
    data.country ? profileCountry.innerHTML = "Country:     " + data.country : profileCountry.innerHTML = "Country:     "
}

// 这个函数使用 datastore 向 Ceramic 网络写入数据，并在向 DOM 中应用更改前从 Ceramic 网络读取(修改后的)数据
async function updateProfileOnCeramic() {
    try {
    const updatedProfile = getFormProfile()
    submitBtn.value = "Updating..."

    //使用 DIDDatastore 合并 Ceramic 中的 profile 数据
    await datastore.merge('BasicProfile', updatedProfile)

    //使用 DIDDatastore 从 Ceramic 获取 profile 数据
    const profile = await datastore.get('BasicProfile')

    renderProfileData(profile)

    submitBtn.value = "Submit"
    } catch (error) {
    console.error(error)
    }
}

// 解析表单并返回值, 让 BasicProfile 能够更新
function getFormProfile() {

    const name = document.getElementById('name').value
    const country = document.getElementById('country').value
    const gender = document.getElementById('gender').value

    // 对象需要与数据模型相一致
    // name -> 存在
    // hair-color -> **不存在**
    return {
        name,
        country,
        gender
    }
}

// 一个简单的功能函数，会被 附加到"连接钱包"按钮的事件侦听器 调用
async function connectWallet(authFunction, callback) {
    try {
    walletBtn.innerHTML = "Connecting..."
    await authFunction()
    await callback()
    walletBtn.innerHTML = "Wallet Connected"

    } catch (error) {
    console.error(error)
    }

}

// 将事件侦听器附加到按钮
walletBtn.addEventListener('click', async () => await connectWallet(auth, getProfileFromCeramic))

profileForm.addEventListener('submit', async (e) => {
e.preventDefault()
await updateProfileOnCeramic()

})
```

## 配置 Webpack

本节将为此应用程序配置 [Webpack](https://webpack.js.org/).

1. 在 `getting-started-with-ceramic` 文件夹的根目录中创建`webpack.config.js`文件 ，写入以下内容：

   ```javascript
   const path = require('path');
   module.exports = {
       entry: './main.js',
       output: {
           path: path.resolve(__dirname, 'dist'),
           filename: 'bundle.js'
       },
       mode: 'development',
       resolve: {
           fallback: { buffer: require.resolve('buffer') }
       }
   }
   ```

   > 如果您想知道这段代码在做什么，请务必查看 [Webpack](https://webpack.js.org/).

2. 接下来，您需要编辑**当前存在**于根目录中的`package.json`文件。您只需要修改 `scripts` 部分。 

   ```json
   "scripts": {
       "test": "echo \"Error: no test specified\" && exit 1",
       "build": "webpack"
   }
   ```

   > 清楚起见，这里所做的更改是添加了一个名为 build 的 script, 它调用 webpack。

   完整的 `package.json` 如下所示：

   ```json
   {
       "name": "getting-started-ceramic",
       "version": "1.0.0",
       "description": "",
       "main": "utils.js",
       "scripts": {
           "test": "echo \"Error: no test specified\" && exit 1",
           "build": "webpack"
       },
       "keywords": [],
       "author": "",
       "license": "ISC",
       "devDependencies": {
           "buffer": "^6.0.3",
           "dids": "^3.1.0",
           "key-did-provider-ed25519": "^2.0.0",
           "key-did-resolver": "^2.0.4",
           "webpack": "^5.72.1",
           "webpack-cli": "^4.9.2"
       },
       "dependencies": {
           "@ceramicnetwork/blockchain-utils-linking": "^2.0.4",
           "@ceramicnetwork/http-client": "^2.0.4",
           "@glazed/did-datastore": "^0.3.1",
           "@glazed/did-session": "^0.0.1"
       }
   }
   ```

   > 根据您完成本指南的时间，此文件中可能存在小的版本差异。这是正常现象，无需担心。

3. 最后一步是从终端或命令行运行这个新添加的脚本。运行此脚本会将所有之前的 JavaScript 打包成您的浏览器可以解释的版本。无论操作系统如何，命令都是相同的：

   **NPM**

   ```bash
   npm run build
   ```

   **Yarn**

   ```bash
   yarn run build
   ```

## 恭喜！

恭喜！您现在可以在浏览器中或使用 [LiveShare](https://visualstudio.microsoft.com/services/live-share/) 重新打开`index.html`文件。

使用您的 [Metamask](https://metamask.io/) 钱包，您将能够[使用以太坊登录](https://login.xyz/)，从 Ceramic 获取您的`BasicProfile`并更改该 profile 的一组有限属性！

> 如果您未在 Ceramic 网络上配置过`BasicProfile`，最初将不会收到任何数据。您需要使用您的钱包帐户，在 [Self.id](https://clay.self.id/) 或直接利用此应用程序的表单来创建个人资料！

请务必加入 Ceramic [Discord](https://chat.ceramic.network/) 以获得更多帮助并与开发团队交流！

祝您好运，**happy building!**
