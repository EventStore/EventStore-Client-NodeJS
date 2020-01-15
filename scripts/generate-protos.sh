#!/usr/bin/env bash

# generate js codes via grpc-tools
grpc_tools_node_protoc \
    --js_out="import_style=commonjs,binary:../src/generated" \
    --grpc_out="../src/generated" \
    --plugin="protoc-gen-grpc=`which grpc_tools_node_protoc_plugin`" \
    -I ../protos \
    streams.proto

protoc \
    --plugin="protoc-gen-ts=../node_modules/.bin/protoc-gen-ts" \
    --js_out="import_style=commonjs,binary:../src/generated" \
    --ts_out="service=grpc-node:../src/generated" \
    -I ../protos \
    streams.proto