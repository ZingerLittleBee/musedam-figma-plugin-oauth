FROM denoland/deno:latest

# 设置工作目录
WORKDIR /app

# 设置环境变量
ENV DENO_DIR=/deno-dir

# 复制依赖配置文件
COPY deno.json deno.lock ./

# 缓存依赖项
RUN deno install --entrypoint main.tsx

# 复制项目文件
COPY . .

# 暴露端口
EXPOSE 8080

# 设置默认环境变量
ENV PORT=8080
ENV HOST=0.0.0.0

# 运行应用
CMD ["deno", "run", "--allow-net", "--allow-env", "--allow-read", "main.tsx"]

