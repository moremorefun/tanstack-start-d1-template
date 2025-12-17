# TanStack Start + D1 Template

基于 TanStack Start 的全栈 React 应用模板，部署在 Cloudflare Workers 上。

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/moremorefun/tanstack-start-d1-template)

<!-- dash-content-start -->

## 特性

- React 19 + TanStack Start 全栈框架
- TanStack Router 类型安全文件路由
- Cloudflare D1 边缘数据库 + Drizzle ORM
- Cloudflare KV 分布式缓存
- TanStack Query 服务端状态管理
- Zustand 客户端状态管理
- Tailwind CSS 4 + Radix UI
- Vitest + Playwright 测试

<!-- dash-content-end -->

## 快速开始

### 1. 创建项目

```bash
pnpm create cloudflare@latest --template=github:moremorefun/tanstack-start-d1-template
cd my-app
```

### 2. 创建 Cloudflare 资源

```bash
wrangler login

# 创建 D1 数据库
wrangler d1 create my-db
# 复制输出的 database_id

# 创建 KV 命名空间
wrangler kv:namespace create KV
# 复制输出的 id
```

### 3. 配置 wrangler.jsonc

将上一步获取的 ID 填入配置文件：

```jsonc
"d1_databases": [{
  "database_id": "你的 database_id"
}],
"kv_namespaces": [{
  "id": "你的 KV id"
}]
```

### 4. 配置环境变量

```bash
# 本地开发
cp .dev.vars.example .dev.vars
# 编辑 .dev.vars，设置 JWT_SECRET（至少 32 字符）

# 生产环境
wrangler secret put JWT_SECRET
```

### 5. 初始化数据库

```bash
pnpm db:generate        # 生成迁移
pnpm db:migrate:local   # 应用到本地
```

### 6. 启动开发

```bash
pnpm dev
# 访问 http://localhost:3001
# 端口可在 config.ts 或 PORT 环境变量中修改
```

## 常用命令

| 命令 | 说明 |
|------|------|
| `pnpm dev` | 启动开发服务器 |
| `pnpm build` | 构建生产版本 |
| `pnpm deploy` | 部署到 Cloudflare |
| `pnpm test` | 运行测试 |
| `pnpm db:generate` | 生成数据库迁移 |
| `pnpm db:migrate:local` | 本地应用迁移 |
| `pnpm db:migrate:remote` | 生产应用迁移 |

## 项目结构

```
src/
├── components/ui/    # UI 组件
├── db/               # 数据库 schema 和连接
├── lib/              # 工具函数
├── routes/           # 页面和 API 路由
│   ├── __root.tsx    # 根布局
│   ├── index.tsx     # 首页
│   └── api/          # API 端点
└── styles.css        # Tailwind 入口
```

## 相关文档

- [TanStack Start](https://tanstack.com/start/latest)
- [Cloudflare D1](https://developers.cloudflare.com/d1/)
- [Drizzle ORM](https://orm.drizzle.team/)

## License

MIT