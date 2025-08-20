import fs from 'fs';
import path from 'path';

const docsPath = 'docs/';

function writeSidebarFile(dir, sidebar) {
  fs.writeFileSync(
    path.join(dir, 'typedoc_sidebar.json'),

    JSON.stringify(sidebar),
  );
}

function formatText(text) {
  return text.charAt(0).toUpperCase() + text.replaceAll('-', ' ').slice(1);
}

function generateDirectoryObject(dir, exclude) {
  const dirPath = path.join(docsPath, dir);
  const items = [];

  const files = fs.readdirSync(dirPath);
  let indexFile = '';
  files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);

    // eslint-disable-next-line no-console
    console.log(exclude, dir, file, exclude.indexOf(file));

    if (exclude.indexOf(file) !== -1) return;

    if (stat.isFile()) {
      const fileName = file.substring(0, file.lastIndexOf('.'));

      if (!file.endsWith('.md')) return;
      if (file === 'index.md') {
        indexFile = 'index.md';
        return;
      }
      if (file === 'README.md') {
        indexFile = 'README.md';
        return;
      }

      items.push(`/${dir}/${fileName}`);
      // items.push({
      //   collapsed: true,
      //   text: formatText(fileName),
      //   link: `/${dir}/${fileName}`,
      // });
    }

    if (stat.isDirectory()) {
      items.push(generateDirectoryObject(path.join(dir, file), exclude));
    }
  });

  const dirName = path.basename(dirPath);
  return {
    text: formatText(dirName),
    children: items,
    items: items,
    collapsed: true,
    link: indexFile ? `/${dir}/${indexFile}` : '',
  };
}

function createMenu(dir, exclude = []) {
  const dirPath = path.join(docsPath, dir);

  const items = generateDirectoryObject(dir, exclude);

  writeSidebarFile(dirPath, items.items);
}

const searchMdFiles = (dir, depth, currentDepth) => {
  let mdFiles = [];
  const files = fs.readdirSync(dir);

  if (depth <= currentDepth) return mdFiles;

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      mdFiles = mdFiles.concat(
        searchMdFiles(filePath, depth, currentDepth + 1),
      );
    } else if (file.endsWith('.md')) {
      mdFiles.push(filePath);
    }
  });
  return mdFiles;
};

const copyReadme = (from, to, depth = Number.MAX_SAFE_INTEGER) => {
  // Search for the readme files ...
  const searchFiles = searchMdFiles(path.join(from), depth, 0);
  const toDir = path.join(docsPath, to);

  searchFiles.forEach((file) => {
    const toFile = file.replace(from, toDir);
    const dir = path.dirname(toFile);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    if (file.endsWith('README.md')) {
      console.log(`Copying ${file} to ${toFile}`);
      fs.copyFileSync(file, toFile);
    }
  });
};

copyReadme('libs/authentication', 'authentication');
copyReadme('libs/tools', 'tools');
copyReadme('libs/ui', 'ui');
copyReadme('libs/json-forms', 'json-forms');

createMenu('tools');
createMenu('components');
createMenu('ui');
createMenu('json-forms');
// createMenu('api', ['_media', 'globals.md']);
