const fs = require('fs');
const path = require('path');

// Read the CSV file
const csvPath = path.join(__dirname, '../../../../OneDrive/Desktop/Secret Project - Sheet1.csv');
const csvContent = fs.readFileSync(csvPath, 'utf8');

// Parse CSV
export const lines = csvContent.split('\n').filter(line => line.trim());
let categories = [];
let currentCategory = null;

console.log('Parsing CSV data...');

for (const line of lines) {
  const trimmedLine = line.trim();
  
  // Skip empty lines
  if (!trimmedLine) continue;
  
  // Check if this is a category header
  if (trimmedLine.startsWith('---')) {
    const categoryMatch = trimmedLine.match(/---\s*(.+?)\s*---/);
    if (categoryMatch) {
      const categoryName = categoryMatch[1];
      currentCategory = {
        name: categoryName,
        slug: categoryName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
        techniques: []
      };
      categories.push(currentCategory);
    }
    continue;
  }
  
  // Skip header row
  if (trimmedLine.startsWith('Technique,Primary,Secondary,Tertiary')) continue;
  
  // Parse technique line
  if (currentCategory && trimmedLine.includes(',')) {
    const [technique, primary, secondary, tertiary] = trimmedLine.split(',');
    
    if (technique && technique.trim()) {
      const techniqueData = {
        name: technique.trim(),
        slug: technique.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
        primary: primary.trim() === 'X',
        secondary: secondary.trim() === 'X',
        tertiary: tertiary.trim() === 'X',
        description: '',
        images: [],
        videos: []
      };
      
      currentCategory.techniques.push(techniqueData);
    }
  }
}

// Filter out empty categories
categories = categories.filter(cat => cat.techniques.length > 0);

// Write to JSON file
const outputPath = path.join(__dirname, '../src/data/techniques.json');
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(categories, null, 2));

console.log(`✅ Converted ${categories.length} categories with ${categories.reduce((total, cat) => total + cat.techniques.length, 0)} techniques`);
console.log(`📁 Output: ${outputPath}`);