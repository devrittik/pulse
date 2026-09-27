# Sanity operations

Copy `.env.example` to `.env.local`, add the project ID and dataset, then authenticate once:

```bash
npx sanity login
```

## Studio

- `npm run studio` — standalone local Studio
- `npm run studio:build` — production Studio build
- `npm run studio:deploy` — deploy Studio to Sanity hosting
- `npm run sanity:schema` — extract the deployable schema to `schema.json`

The Studio is also embedded in the Next.js app at `/studio`.

## Data

- `npm run sanity:seed` — create missing sample documents without overwriting data
- `npm run sanity:seed:replace` — replace documents owned by the seed script
- `npm run sanity:migrate:dry` — preview the idempotent event normalization migration
- `npm run sanity:migrate` — apply it using revision guards
- `npm run sanity:dataset:export` — back up `production` to `backups/production.tar.gz`
- `npm run sanity:dataset:import` — restore that backup into `production`

Always export a backup and run the dry migration before applying changes to production. Change the dataset names in `package.json` when targeting a staging dataset.
