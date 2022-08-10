"use strict";(self.webpackChunkceramic_docs_zh=self.webpackChunkceramic_docs_zh||[]).push([[345],{3905:(e,t,n)=>{n.d(t,{Zo:()=>s,kt:()=>d});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c=r.createContext({}),p=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},s=function(e){var t=p(e.components);return r.createElement(c.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},u=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,c=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),u=p(n),d=a,k=u["".concat(c,".").concat(d)]||u[d]||m[d]||o;return n?r.createElement(k,i(i({ref:t},s),{},{components:n})):r.createElement(k,i({ref:t},s))}));function d(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=u;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l.mdxType="string"==typeof e?e:a,i[1]=l;for(var p=2;p<o;p++)i[p]=n[p];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}u.displayName="MDXCreateElement"},1173:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>m,frontMatter:()=>o,metadata:()=>l,toc:()=>p});var r=n(7462),a=(n(7294),n(3905));const o={sidebar_position:4,title:"\u5728\u5f00\u53d1\u73af\u5883\u8fd0\u884c\u8282\u70b9"},i="\u542f\u52a8\u672c\u5730 Ceramic \u8282\u70b9",l={unversionedId:"run/installation",id:"run/installation",title:"\u5728\u5f00\u53d1\u73af\u5883\u8fd0\u884c\u8282\u70b9",description:"---",source:"@site/docs/run/installation.md",sourceDirName:"run",slug:"/run/installation",permalink:"/ceramic-docs-zh/run/installation",draft:!1,tags:[],version:"current",sidebarPosition:4,frontMatter:{sidebar_position:4,title:"\u5728\u5f00\u53d1\u73af\u5883\u8fd0\u884c\u8282\u70b9"},sidebar:"tutorialSidebar",previous:{title:"\u53ef\u7528\u7684 Ceramic \u8282\u70b9",permalink:"/ceramic-docs-zh/run/available"},next:{title:"\u5728\u751f\u4ea7\u73af\u5883\u8fd0\u884c\u8282\u70b9",permalink:"/ceramic-docs-zh/run/nodes"}},c={},p=[{value:"<strong>\u5148\u51b3\u6761\u4ef6</strong>",id:"\u5148\u51b3\u6761\u4ef6",level:2},{value:"<strong>\u5b89\u88c5\u548c\u4f7f\u7528</strong>",id:"\u5b89\u88c5\u548c\u4f7f\u7528",level:2},{value:"<strong>\u5b89\u88c5 Ceramic CLI</strong>",id:"\u5b89\u88c5-ceramic-cli",level:3},{value:"<strong>\u542f\u52a8 Ceramic \u8282\u70b9</strong>",id:"\u542f\u52a8-ceramic-\u8282\u70b9",level:3},{value:"<strong>\u914d\u7f6e\u60a8\u7684\u7f51\u7edc</strong>",id:"\u914d\u7f6e\u60a8\u7684\u7f51\u7edc",level:3},{value:"<strong>\u914d\u7f6e\u8282\u70b9 URL</strong>",id:"\u914d\u7f6e\u8282\u70b9-url",level:3}],s={toc:p};function m(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,r.Z)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"\u542f\u52a8\u672c\u5730-ceramic-\u8282\u70b9"},"\u542f\u52a8\u672c\u5730 Ceramic \u8282\u70b9"),(0,a.kt)("hr",null),(0,a.kt)("p",null,"Ceramic \u547d\u4ee4\u884c\u754c\u9762 (CLI) \u63d0\u4f9b\u4e86\u4e00\u4e2a\u7b80\u5355\u7684\u65b9\u6cd5\u6765\u542f\u52a8\u672c\u5730 Node.js \u73af\u5883\u4e2d\u7684 JS Ceramic \u8282\u70b9\u3002\u8fd9\u662f\u5f00\u59cb\u4f7f\u7528 Ceramic \u8fdb\u884c\u5f00\u53d1\u7684\u597d\u65b9\u6cd5\uff0c\u7136\u540e\u518d\u8f6c\u79fb\u5230\u751f\u4ea7\u7528\u4f8b\u7684\u4e91\u6258\u7ba1\u8282\u70b9\u4e0a\u3002"),(0,a.kt)("h2",{id:"\u5148\u51b3\u6761\u4ef6"},(0,a.kt)("strong",{parentName:"h2"},"\u5148\u51b3\u6761\u4ef6")),(0,a.kt)("hr",null),(0,a.kt)("p",null,"\u5b89\u88c5 CLI \u9700\u8981\u63a7\u5236\u53f0(\u7ec8\u7aef?)\u3001",(0,a.kt)("a",{parentName:"p",href:"https://nodejs.org/en/"},"Node.js")," v14 \u548c ",(0,a.kt)("a",{parentName:"p",href:"https://www.npmjs.com/get-npm"},"npm")," v6\u3002\u8bf7\u786e\u4fdd\u4f60\u7684\u673a\u5668\u4e0a\u5df2\u5b89\u88c5\u5b83\u4eec\u3002"),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"\u867d\u7136 npm v7 \u8fd8\u672a\u5f97\u5230\u5b98\u65b9\u652f\u6301\uff0c\u4f46\u60a8\u4ecd\u7136\u53ef\u4ee5\u4f7f\u7528\u5b83\u3002\u60a8\u5c06\u9700\u8981\u5168\u5c40\u5b89\u88c5 ",(0,a.kt)("inlineCode",{parentName:"p"},"node-pre-gyp")," \u5305\u3002\u5728 IPFS \u6240\u4f9d\u8d56\u7684 ",(0,a.kt)("inlineCode",{parentName:"p"},"node-webrtc")," ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/node-webrtc/node-webrtc/pull/694"},"\u88ab\u5347\u7ea7"),"\u4e4b\u524d\uff0c\u8fd9\u662f\u5fc5\u987b\u7684\u3002"),(0,a.kt)("pre",{parentName:"blockquote"},(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"npm install -g node-pre-gyp\n"))),(0,a.kt)("admonition",{type:"caution"},(0,a.kt)("p",{parentName:"admonition"},"  ",(0,a.kt)("strong",{parentName:"p"},"\u5f03\u7528\u63d0\u793a\uff1a"),"\u4e0e \u6d41(Streams) \u548c TileDocuments \u7684\u4ea4\u4e92\u5df2\u7ecf\u8f6c\u79fb\u5230\u6211\u4eec\u7684 ",(0,a.kt)("a",{parentName:"p",href:"../../../tools/glaze/development#cli"},"Glaze CLI"),". \u5982\u679c\u60a8\u5728\u4f7f\u7528\u4e0b\u9762\u7684\u547d\u4ee4\u65f6\u9047\u5230\u4efb\u4f55\u9519\u8bef\uff0c\u8bf7\u5148\u4f7f\u7528 Glaze CLI \u91cd\u65b0\u5c1d\u8bd5\u3002")),(0,a.kt)("h2",{id:"\u5b89\u88c5\u548c\u4f7f\u7528"},(0,a.kt)("strong",{parentName:"h2"},"\u5b89\u88c5\u548c\u4f7f\u7528")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"\u5b89\u88c5-ceramic-cli"},(0,a.kt)("strong",{parentName:"h3"},"\u5b89\u88c5 Ceramic CLI")),(0,a.kt)("p",null,"\u6253\u5f00\u60a8\u7684\u63a7\u5236\u53f0\uff0c\u7528 npm \u5b89\u88c5 CLI:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"npm install -g @ceramicnetwork/cli\n")),(0,a.kt)("h3",{id:"\u542f\u52a8-ceramic-\u8282\u70b9"},(0,a.kt)("strong",{parentName:"h3"},"\u542f\u52a8 Ceramic \u8282\u70b9")),(0,a.kt)("p",null,"\u4f7f\u7528 ",(0,a.kt)("inlineCode",{parentName:"p"},"ceramic daemon")," \u547d\u4ee4\u542f\u52a8\u4e00\u4e2a\u8fde\u63a5\u5230 ",(0,a.kt)("a",{parentName:"p",href:"./networks#clay-testnet"},"Clay Testnet")," \u7684\u672c\u5730 JS Ceramic \u8282\u70b9\uff0c\u8282\u70b9\u8fd0\u884c\u5728 ",(0,a.kt)("inlineCode",{parentName:"p"},"https://localhost:7007"),"."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"ceramic daemon\n")),(0,a.kt)("h3",{id:"\u914d\u7f6e\u60a8\u7684\u7f51\u7edc"},(0,a.kt)("strong",{parentName:"h3"},"\u914d\u7f6e\u60a8\u7684\u7f51\u7edc")),(0,a.kt)("p",null,"(\u53ef\u9009) \u9ed8\u8ba4\u60c5\u51b5\u4e0b\uff0cJS CLI\u4f1a\u5728Clay Testnet\u4e0a\u542f\u52a8\u4e00\u4e2a\u8282\u70b9\u3002\u5982\u679c\u60a8\u60f3\u4f7f\u7528\u4e0d\u540c\u7684\u7f51\u7edc\uff0c\u53ef\u4ee5\u4f7f\u7528",(0,a.kt)("inlineCode",{parentName:"p"},"--network"),"\u9009\u9879\u6765\u6307\u5b9a\u5b83\u3002\u67e5\u770b",(0,a.kt)("a",{parentName:"p",href:"/ceramic-docs-zh/run/networks"},"\u53ef\u7528\u7684\u7f51\u7edc"),"\u3002\u6ce8\u610f\uff0cCLI \u4e0d\u80fd\u4e0e Mainnet \u4e00\u8d77\u4f7f\u7528\u3002"),(0,a.kt)("h3",{id:"\u914d\u7f6e\u8282\u70b9-url"},(0,a.kt)("strong",{parentName:"h3"},"\u914d\u7f6e\u8282\u70b9 URL")),(0,a.kt)("p",null,"(\u53ef\u9009) \u9664\u672c\u5730\u8282\u70b9\u5916\uff0c\u8fd8\u53ef\u4ee5\u901a\u8fc7 HTTP \u4e0e\u8fdc\u7a0b Ceramic \u8282\u70b9\u4f7f\u7528 CLI\u3002\u8981\u505a\u5230\u8fd9\u4e00\u70b9\uff0c\u4f7f\u7528",(0,a.kt)("inlineCode",{parentName:"p"},"config set"),"\u547d\u4ee4\u8bbe\u7f6e",(0,a.kt)("inlineCode",{parentName:"p"},"ceramicHost"),"\u53d8\u91cf\u4e3a\u60a8\u60f3\u4f7f\u7528\u7684\u8282\u70b9 URL."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"ceramic config set ceramicHost 'https://yourceramicnode.com'\n")))}m.isMDXComponent=!0}}]);