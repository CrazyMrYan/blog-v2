import fs from 'fs';
import path from 'path';

// 获取用户输入的标题
const title = process.argv[2];
if (!title) {
  console.error('请提供标题，示例: yarn create "我的新文章"');
  process.exit(1);
}

// 生成掘金风格数字 ID（使用时间戳）
const postId = Date.now();

// 创建 posts 目录（如果不存在）
const postsDir = path.join(process.cwd(), 'posts');
if (!fs.existsSync(postsDir)) {
  fs.mkdirSync(postsDir, { recursive: true });
}

// 生成文件路径
const filePath = path.join(postsDir, `${postId}.md`);

// 生成 ISO 格式时间
const currentDate = new Date().toISOString();

// 转义标题中的双引号
const escapedTitle = title.replace(/"/g, '\\"');

// 生成文件内容模板
const frontMatter = `---
title: "${escapedTitle}"
date: ${currentDate}
tags: 
head:
  - - meta
    - name: headline
      content: "${escapedTitle}"
  - - meta
    - name: description
      content: ""
  - - meta
    - name: keywords
      content: ""
  - - meta
    - name: datePublished
      content: ${currentDate}
---`;

// 写入文件
fs.writeFileSync(filePath, frontMatter);

console.log(`✅ 文章已创建于: ${filePath}`);

