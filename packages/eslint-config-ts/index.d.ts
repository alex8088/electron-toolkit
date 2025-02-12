import { config, parser, plugin } from 'typescript-eslint';
import type { ConfigArray } from 'typescript-eslint';

declare const _default: {
  config: typeof config
  configs: {
    base: ConfigArray[],
    recommended: ConfigArray[]
    recommendedTypeChecked: ConfigArray[]
  }
  parser: typeof parser
  plugin: typeof plugin
};

export = _default;
