// scripts/pull-img.js
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { marked } from 'marked';

// 解析命令行参数
const { filePath } = yargs(hideBin(process.argv))
  .option('filePath', {
    alias: 'f',
    description: 'Path to the markdown file',
    type: 'string',
    demandOption: true,
  })
  .help()
  .alias('help', 'h').argv;

// 读取Markdown文件内容
const markdownContent = fs.readFileSync(filePath, 'utf-8');

// 解析Markdown中的图片URL
const images = [];
const renderer = new marked.Renderer();
renderer.image = (href, title, alt) => {
  // 确保href是一个对象
  if (typeof href === 'object' && href !== null && href.href) {
    images.push({ href: href.href, title, alt });
  } else {
    console.error(`Invalid href type: ${typeof href}, value: ${JSON.stringify(href)}`);
  }
  return `<img src="${href}" alt="${alt}" title="${title}">`;
};

marked(markdownContent, { renderer });

// 下载图片并保存到/public目录下
const publicDir = path.join(process.cwd(), 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}

const downloadImage = async (url, filePath) => {
  const writer = fs.createWriteStream(filePath);
  try {
    const response = await axios({
      url,
      method: 'GET',
      responseType: 'stream',
    });
    response.data.pipe(writer);
    return new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });
  } catch (error) {
    console.error(`Failed to download image from ${url}:`, error);
    return Promise.reject(error);
  }
};

const updateMarkdownContent = async () => {
  let updatedMarkdownContent = markdownContent;

  for (const image of images) {
    const { href, title, alt } = image;

    // 检查href是否为字符串
    if (typeof href !== 'string') {
      console.error(`Invalid href type: ${typeof href}, value: ${JSON.stringify(href)}`);
      continue;
    }

    // 判断是否为远程图片
    let isRemote = false;
    try {
      const url = new URL(href);
      if (url.protocol === 'http:' || url.protocol === 'https:') {
        isRemote = true;
      }
    } catch (error) {
      // 如果不是有效的URL，则认为是本地路径
      console.log(`Skipping local image: ${href}`);
      continue;
    }

    if (!isRemote) {
      console.log(`Skipping non-remote image: ${href}`);
      continue;
    }

    // 处理远程图片
    try {
      const url = new URL(href);
      const fileName = path.basename(url.pathname);
      const localPath = path.join(publicDir, fileName);
      const relativePath = path.relative(path.dirname(filePath), localPath);

      await downloadImage(href, localPath);

      // 替换Markdown中的图片路径
      const regex = new RegExp(`!\\[${alt || ''}\\]\\(${href}\\)`, 'g');
      updatedMarkdownContent = updatedMarkdownContent.replace(regex, `![${alt || ''}](${relativePath})`);
    } catch (error) {
      console.error(`Failed to update Markdown for image: ${href}`, error);
    }
  }

  // 保存更新后的Markdown文件
  fs.writeFileSync(filePath, updatedMarkdownContent);
};

updateMarkdownContent().then(() => {
  console.log('Images downloaded and Markdown updated successfully.');
}).catch(err => {
  console.error('Error:', err);
});