#!/usr/bin/env bash
protoc \
--plugin="protoc-gen-ts=../src/node_modules/ts-protoc-gen/bin/protoc-gen-ts" \
--ts_out="service=grpc-web:../src/generated" \
--js_out="import_style=commonjs,binary:../src/generated" \
--proto_path="../protos" \
streams.proto \
persistent.proto \
projections.proto \
users.proto
