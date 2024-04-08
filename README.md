# AImageQA

## 必要な.envファイルの例

POSTGRES_PASSWORD=postgres

POSTGRES_USER=postgres

POSTGRES_DB=qaimage

NODE_ENV = "development"

NEXT_BASE_URL = "http://localhost:3000"

PROXY_BASE_URL = "http://localhost:4000"

DATABASE_URL="postgresql://postgres:postgres@localhost:5432/qaimage?search_path=public"

## 起動手順

1. .envファイルを作成する．
2. docker-compose upでpostgresのコンテナを作成．
3. このディレクトリで，npm run build && npm run start を実行してnextを起動する．
4. proxyに移動して，npm run compile-startを実行してプロキシを起動する．
5. localhost:4000にアクセスする．
