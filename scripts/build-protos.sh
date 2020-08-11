#!/bin/bash

BASEDIR=$(dirname "$0")
cd ${BASEDIR}/../

# Path to this plugin, Note this must be an abolsute path on Windows (see #15)
PROTOC_GEN_TS_PATH="./node_modules/.bin/protoc-gen-ts"
PROTOC_GEN_GRPC_PATH="./node_modules/.bin/grpc_tools_node_protoc_plugin"

# Directory to write generated code to (.js and .d.ts files)
OUT_DIR="./generated"

mkdir -p ${OUT_DIR}

#yarn grpc_tools_node_protoc \
#    --plugin="protoc-gen-grpc=${PROTOC_GEN_GRPC_PATH}" \
#    --js_out="import_style=commonjs,binary:${OUT_DIR}" \
#    -I ./protos \
#    protos/*.proto

grpc_tools_node_protoc \
    --js_out="import_style=commonjs,binary:${OUT_DIR}" \
    --grpc_out="${OUT_DIR}" \
    --plugin="protoc-gen-grpc=${PROTOC_GEN_GRPC_PATH}" \
    -I ./protos \
    ./protos/*.proto

./node_modules/grpc-tools/bin/protoc \
    --plugin="protoc-gen-ts=${PROTOC_GEN_TS_PATH}" \
    --ts_out="${OUT_DIR}" \
    -I ./protos \
    ./protos/*.proto
