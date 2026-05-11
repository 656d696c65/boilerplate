set shell := ["bash", "-cu"]

dev cmd:
    @just dev-{{cmd}}

dev-up:
    ./.workflows/dev/up.sh

dev-down:
    ./scripts/dev-down.sh

build:
    ./scripts/build.sh
