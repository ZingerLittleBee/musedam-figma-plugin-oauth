# ============================================
# Build stage - 构建阶段
# ============================================
FROM denoland/deno:latest AS builder

WORKDIR /app

COPY deno.json deno.lock ./

COPY . .

RUN deno cache main.tsx

# ============================================
# Production stage - 生产阶段
# ============================================
FROM denoland/deno:latest

WORKDIR /app

# 从 builder 阶段复制应用文件
COPY --from=builder /app .

# 暴露端口
EXPOSE 8080

# 运行应用，包含所有必要的权限
CMD ["deno", "run", "--allow-net", "--allow-env", "--allow-read", "main.tsx"]
