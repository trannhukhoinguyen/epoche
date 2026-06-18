import type { CollectionEntry } from 'astro:content';

/**
 * Master post schema - matches the schema defined in content/config.ts
 * This is the OUTPUT type after Zod transforms are applied.
 */
export interface MasterSchema {
  title: string;
  description?: string;
  link?: string;
  date: Date;
  updated?: Date;
  cover?: string;
  tags?: string[];
  subtitle?: string;
  catalog?: boolean;
  categories?: string[] | string[][];
  sticky?: boolean;
  draft?: boolean;
  tocNumbering?: boolean;
  /** Exclude this post from AI summary generation */
  excludeFromSummary?: boolean;
  /** Enable KaTeX math rendering for this post */
  math?: boolean;
  /** Enable quiz interaction for this post */
  quiz?: boolean;
  /** Password for encrypting the entire post content */
  password?: string;
  /** Keywords for SEO */
  keywords?: string[];
}

/**
 * Master post schema INPUT type - before Zod transforms.
 * gray-matter parses YAML dates as Date objects, so date fields accept both.
 */
export interface MasterSchemaInput extends Omit<MasterSchema, 'date' | 'updated'> {
  date: string | Date;
  updated?: string | Date;
}

/**
 * Master post type from Astro content collections
 */
export type MasterPost = CollectionEntry<'master'>;

/**
 * 最小文章引用 - 用于导航（3 字段）
 */
export interface PostRef {
  slug: string;
  link?: string;
  title: string;
}

/**
 * 带分类的文章引用 - 用于列表展示（4 字段）
 */
export interface PostRefWithCategory extends PostRef {
  categoryName?: string;
}

/**
 * 文章卡片数据 - 用于卡片展示
 */
export interface PostCardData {
  slug: string;
  link?: string;
  title: string;
  description?: string;
  date: Date;
  cover?: string;
  tags?: string[];
  categories?: string[] | string[][];
  draft?: boolean;
  wordCount: number; // 预计算的字数
  readingTime: string; // 预计算的阅读时间
  postLocale?: string; // 文章的原始语言代码（用于 fallback 标记）
}
