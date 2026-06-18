// Import YAML config directly - processed by @rollup/plugin-yaml

import type { MasterLink, MastersIntro } from '@lib/config/types';
import yamlConfig from '../../config/site.yaml';

// Re-export type for backwards compatibility
export type { MasterLink };

export const mastersData: MasterLink[] = yamlConfig.masters?.data ?? [];

export const mastersIntro: MastersIntro = yamlConfig.masters?.intro ?? {
  title: 'Masters',
  subtitle: '',
  applyTitle: 'Apply for master link',
  applyDesc: 'Leave a comment with the following format',
};
