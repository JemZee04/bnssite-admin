import type { ConfigFile } from '@rtk-query/codegen-openapi'

const config: ConfigFile = {
  schemaFile: './openapi.json',
  apiFile: './store/emptyApi.ts',
  apiImport: 'emptyApi',
  outputFile: './store/beekneesApi.ts',
  exportName: 'beekneesApi',
  hooks: true,
}

export default config