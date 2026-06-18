// Import YAML config directly - processed by @rollup/plugin-yaml

import type { AncestorLink, AncestorsIntro } from '@lib/config/types';
import yamlConfig from '../../config/site.yaml';

// Re-export type for backwards compatibility
export type { AncestorLink };

export const ancestorsData: AncestorLink[] = yamlConfig.ancestors?.data ?? [];

export const ancestorsIntro: AncestorsIntro = yamlConfig.ancestors?.intro ?? {
  title: 'Ancestors',
  subtitle: '',
  applyTitle: 'Apply for ancestor link',
  applyDesc: 'Leave a comment with the following format',
};
