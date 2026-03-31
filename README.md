# vmaas-as-service

Monorepo with two frontend apps:
- `@vmaas-as-service/demo`
- `@vmaas-as-service/standalone`

## Prerequisites

- Node.js `>=18` (npm `>=9`)
- Go `>=1.21` (required for `standalone` proxy)

## Install

From the repository root:

```bash
npm install
```

## Run

From the repository root:

```bash
# Runs the demo UI
npm run demo

# Runs standalone (UI + local proxy)
npm run standalone
```

## Useful workspace commands

```bash
# Build demo
npm run build -w @vmaas-as-service/demo

# Build standalone
npm run build -w @vmaas-as-service/standalone

# Lint demo
npm run lint -w @vmaas-as-service/demo

# Lint standalone
npm run lint -w @vmaas-as-service/standalone
```

## Troubleshooting

- If `npm install` fails, confirm you are in the repo root: `vmaas-as-service/`.
- If `npm run standalone` fails with proxy errors, verify Go is installed and available in `PATH`.
