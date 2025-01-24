import { Linter } from 'eslint';
import { config } from 'typescript-eslint';

declare const _default: {
  config: typeof config
  configs: {
    base: Linter.Config,
    recommended: Linter.Config
  }
};

export = _default
