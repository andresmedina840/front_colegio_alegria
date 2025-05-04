// estructura.js
const fs = require('fs');
const path = require('path');

// Colores ANSI sin dependencias
const colors = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  underline: '\x1b[4m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  magenta: '\x1b[35m',
  gray: '\x1b[90m'
};

function generateTree(dir, prefix = '', isLast = false, isRoot = true) {
  try {
    const items = getSortedItems(dir);
    
    items.forEach((item, index) => {
      const itemPath = path.join(dir, item);
      const isLastItem = index === items.length - 1;
      const stat = fs.statSync(itemPath);
      const isDirectory = stat.isDirectory();
      
      const itemType = getItemType(item, isDirectory);
      printItem(prefix, isLastItem, item, itemType, isRoot);
      
      if (isDirectory) {
        const newPrefix = prefix + (isLast ? '    ' : '│   ');
        generateTree(itemPath, newPrefix, isLastItem, false);
      }
    });
  } catch (error) {
    console.error(`${colors.red}Error reading directory ${dir}:${colors.reset}`, error.message);
  }
}

function getSortedItems(dir) {
  return fs.readdirSync(dir)
    .filter(item => !['node_modules', '.git', '.next', '.DS_Store'].includes(item))
    .sort((a, b) => {
      const aIsDir = fs.statSync(path.join(dir, a)).isDirectory();
      const bIsDir = fs.statSync(path.join(dir, b)).isDirectory();
      return aIsDir === bIsDir ? a.localeCompare(b) : aIsDir ? -1 : 1;
    });
}

function getItemType(item, isDirectory) {
  if (isDirectory) {
    if (item === 'src') return 'source';
    if (item === 'app') return 'route';
    if (item === 'components') return 'component';
    if (item === 'lib') return 'library';
    return 'folder';
  }
  
  if (item.endsWith('.ts')) return 'typescript';
  if (item.endsWith('.tsx')) return 'react';
  if (item.endsWith('.css') || item.endsWith('.scss')) return 'style';
  if (item.endsWith('.json')) return 'config';
  return 'file';
}

function printItem(prefix, isLastItem, item, type, isRoot) {
  const connector = isLastItem ? '└── ' : '├── ';
  const line = isRoot ? '' : prefix;
  
  let coloredItem;
  switch(type) {
    case 'source': coloredItem = `${colors.cyan}${item}${colors.reset}`; break;
    case 'route': coloredItem = `${colors.green}${item}${colors.reset}`; break;
    case 'component': coloredItem = `${colors.yellow}${item}${colors.reset}`; break;
    case 'library': coloredItem = `${colors.magenta}${item}${colors.reset}`; break;
    case 'typescript': coloredItem = `${colors.blue}${item}${colors.reset}`; break;
    case 'react': coloredItem = `${colors.cyan}${item}${colors.reset}`; break;
    case 'style': coloredItem = `${colors.yellow}${item}${colors.reset}`; break;
    case 'config': coloredItem = `${colors.gray}${item}${colors.reset}`; break;
    case 'folder': coloredItem = `${colors.gray}${item}${colors.reset}`; break;
    default: coloredItem = item;
  }
  
  console.log(line + connector + coloredItem);
}

// Encabezado
console.log(`${colors.bold}${colors.underline}Estructura del Proyecto FRONT_COLEGIO_ALEGRIA${colors.reset}\n`);
console.log(`${colors.gray}Tipos: ${colors.cyan}src ${colors.green}routes ${colors.yellow}components ` +
  `${colors.magenta}lib ${colors.blue}.ts ${colors.cyan}.tsx ${colors.yellow}styles ${colors.gray}config${colors.reset}\n`);

generateTree('./src');
console.log(`${colors.gray}\nEjecuta con --full para ver toda la estructura del proyecto${colors.reset}\n`);