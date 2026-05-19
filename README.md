# cron-fe-lib

Frontend library for the cron module. Consumed by hub (and any future app
that needs the cron scheduler UI) via git submodule.

## Layout

- **`lib/`** — generated TypeScript client (models + services) for the cron
  OpenAPI spec. Wiped and regenerated on every `make openapi` run in
  [`cron-lib`](https://github.com/cto-up/cron-lib). **Do not edit by hand.**
- Everything outside `lib/` is hand-authored Vue feature source: pages,
  composables, routes, nav links, i18n, the `createCronModule` factory.

## Regenerating the client

```sh
cd ../cron-lib
make openapi
```

That target writes into `../cron-fe-lib/lib/` (sibling checkout). Commit the
result here, then bump the submodule pointer in the consumer app.
