#!/usr/bin/env node
/**
 * Script to validate icon names in astro.config.mjs against icon_names.json
 * 
 * Usage: node scripts/validate-icons.js
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

// Read icon names JSON
const iconsJsonPath = join(projectRoot, 'icon_names.json');
const iconsData = JSON.parse(readFileSync(iconsJsonPath, 'utf-8'));

// Create a Set of valid icon names for fast lookup
const validIconNames = new Set(iconsData.map(icon => icon.name));

// Read astro.config.mjs
const configPath = join(projectRoot, 'astro.config.mjs');
const configContent = readFileSync(configPath, 'utf-8');

// Extract icon names from the config file
// Find the mdi array section
const mdiArrayStart = configContent.indexOf("mdi: [");
const mdiArrayEnd = configContent.indexOf("],", mdiArrayStart);

if (mdiArrayStart === -1 || mdiArrayEnd === -1) {
  console.error('❌ Could not find mdi array in astro.config.mjs');
  process.exit(1);
}

// Extract the mdi array content
const mdiArrayContent = configContent.substring(mdiArrayStart, mdiArrayEnd);

// Extract all quoted strings (single or double quotes) that look like icon names
// Pattern: matches strings like 'icon-name' or "icon-name"
const iconNamePattern = /['"]([a-z0-9]+(?:-[a-z0-9]+)*)['"]/g;
const configIcons = [];
let match;

while ((match = iconNamePattern.exec(mdiArrayContent)) !== null) {
  const iconName = match[1];
  // Filter out obvious non-icon strings (very short, common words, etc.)
  if (iconName.length >= 2 && 
      !['user', 'account', 'alerts', 'status', 'arrows', 'navigation', 
        'business', 'analytics', 'communication', 'data', 'technology',
        'documents', 'files', 'time', 'calendar', 'elements', 'location',
        'maps', 'social', 'media', 'categories', 'features', 'actions',
        'tools', 'utilities', 'finance', 'theme', 'display', 'additional',
        'useful', 'ui'].includes(iconName.toLowerCase())) {
    configIcons.push(iconName);
  }
}

// Remove duplicates and sort
const uniqueConfigIcons = [...new Set(configIcons)].sort();

console.log(`\n📊 Icon Validation Report\n`);
console.log(`Total icons in config: ${uniqueConfigIcons.length}`);
console.log(`Total icons in icon_names.json: ${validIconNames.size}\n`);

// Validate each icon
const invalidIcons = [];
const validIcons = [];

for (const iconName of uniqueConfigIcons) {
  if (validIconNames.has(iconName)) {
    validIcons.push(iconName);
  } else {
    invalidIcons.push(iconName);
  }
}

// Report results
console.log(`✅ Valid icons: ${validIcons.length}`);
console.log(`❌ Invalid icons: ${invalidIcons.length}\n`);

if (invalidIcons.length > 0) {
  console.log('❌ Invalid icon names found:\n');
  invalidIcons.forEach(icon => {
    console.log(`   - ${icon}`);
    
    // Try to find similar icon names
    const similar = Array.from(validIconNames)
      .filter(name => {
        const similarity = calculateSimilarity(icon, name);
        return similarity > 0.6;
      })
      .sort((a, b) => calculateSimilarity(icon, b) - calculateSimilarity(icon, a))
      .slice(0, 3);
    
    if (similar.length > 0) {
      console.log(`     💡 Did you mean: ${similar.join(', ')}`);
    }
  });
  console.log('');
  process.exit(1);
} else {
  console.log('✅ All icon names are valid!\n');
  process.exit(0);
}

// Simple similarity calculation (Levenshtein distance based)
function calculateSimilarity(str1, str2) {
  const longer = str1.length > str2.length ? str1 : str2;
  const shorter = str1.length > str2.length ? str2 : str1;
  
  if (longer.length === 0) return 1.0;
  
  const distance = levenshteinDistance(longer, shorter);
  return (longer.length - distance) / longer.length;
}

function levenshteinDistance(str1, str2) {
  const matrix = [];
  
  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }
  
  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }
  
  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  
  return matrix[str2.length][str1.length];
}

