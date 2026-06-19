/**
 * Translation dictionaries barrel export
 *
 * Each locale maps to its UI string dictionary.
 * The default locale (vi) provides the complete set of keys;
 * other locales can be partial and will fall back to vi.
 */

import type { DefaultUIStrings, UIStrings } from '../types';
import { uiStrings as en } from './en';
import { uiStrings as ja } from './ja';
import { uiStrings as ko } from './ko';
import { uiStrings as vi } from './vi';
import { uiStrings as zh } from './zh';

/** All translation dictionaries indexed by locale code */
export const translations: Record<string, DefaultUIStrings | UIStrings> = {
  vi,
  zh,
  en,
  ja,
  ko,
};
