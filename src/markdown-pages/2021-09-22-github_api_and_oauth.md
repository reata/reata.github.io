---
slug: "/blog/github-api-and-oauth/"
date: "2021-09-22"
title: "GitHub API与OAuth认证"
excerpt: "选择适合你的认证方式"
image: "../images/github_api.png"
---

GitHub的API可以说是Web API设计的典范，仅仅是阅读文档就让人获益良多，时刻为你的Web知识及HTTP协议查漏补缺。

GitHub API大部分接口都需要认证，而其主要推荐的认证方式是OAuth。OAuth的接入也分好几种，根据不同的应用场景：

- 如果你的应用允许/需要用户登录自己的GitHub账号
  - 对于Web应用：[基于OAuth的Web application flow](https://docs.github.com/en/developers/apps/building-oauth-apps/authorizing-oauth-apps#web-application-flow)
  - 对于命令行或其他设备：[基于OAuth的Device flow](https://docs.github.com/en/developers/apps/building-oauth-apps/authorizing-oauth-apps#device-flow)
- 如果你的应用只需要单一/固定的GitHub账号的权限，比如你自己的账号：
  - 适用于服务端：[OAuth and personal access tokens](https://docs.github.com/en/rest/overview/other-authentication-methods#via-oauth-and-personal-access-tokens)


## Web Application Flow
1. 应用将用户重定向到GitHub登录页，用户在GitHub上登录
2. GitHub将用户重定向回应用站点，重定向回来时候会带上一个code。应用可以通过这个临时code，在10分钟内兑换access_token。
3. 应用站点保存access_token，并在之后所有针对GitHub API的请求带上该token

## Device Flow
1. 命令行应用调用Github拿到认证链接和用于识别当前应用的验证码，验证码15分钟失效。
2. 命令行应用将验证码展示给用户，并提示用户去认证链接输入该验证码。
3. 命令行应用轮询GitHub检查用户是否已经输入了验证码（命令行授权）。用户输入成功后，即可拿到access_token。

## OAuth and Personal Access Tokens
按照[教程](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)，
在Settings - Developer settings - personal access tokens页面自主添加即可。注意添加成功后，只有在当时token可见，
一旦页面关闭之后就再也拿不到这个token了，一定记得保存好。

Personal Access Token相比直接用登录密码的好处在于：
- 更细粒度的权限控制，可以勾选该Token可以访问的API，读写控制
- Token随时可以删除，也可以设置失效时间，到期自动失效

## 有了Token之后怎么用

### 方案一：Basic Authentication
```bash
curl -u username:token https://api.github.com
```

### 方案二：OAuth token (sent in a header)
```bash
curl -H "Authorization: token OAUTH-TOKEN" https://api.github.com
```
