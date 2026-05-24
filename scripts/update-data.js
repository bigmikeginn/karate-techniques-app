const fs = require('fs');
const path = require('path');

console.log('📊 Updating technique data from CSV...');

const csvPath = path.join(process.env.USERPROFILE, 'OneDrive/Desktop/Secret Project - Sheet1.csv');

try {
  const csvContent = fs.readFileSync(csvPath, 'utf8');
  const lines = csvContent.split('\n').filter(line => line.trim());
  let categories = [];
  let currentCategory = null;

  for (const line of lines) {
    const trimmedLine = line.trim();
    if (!trimmedLine) continue;
    
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
    
    if (trimmedLine.startsWith('Technique,Primary,Secondary,Tertiary')) continue;
    
    if (currentCategory && trimmedLine.includes(',')) {
      const [technique, primary, secondary, tertiary] = trimmedLine.split(',');
      
      if (technique && technique.trim()) {
        currentCategory.techniques.push({
          name: technique.trim(),
          slug: technique.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
          primary: primary?.trim() === 'X',
          secondary: secondary?.trim() === 'X',
          tertiary: tertiary?.trim() === 'X',
          description: ''
        });
      }
    }
  }

  categories = categories.filter(cat => cat.techniques.length > 0);

  const outputPath = path.join(__dirname, '../src/data/techniques.json');
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(categories, null, 2));

  console.log('✅ Data updated successfully!');
  console.log(`📁 Categories: ${categories.length}`);
  console.log(`🥋 Techniques: ${categories.reduce((total, cat) => total + cat.techniques.length, 0)}`);
  console.log(`📄 Output: ${outputPath}`);
  
} catch (error) {
  console.error('❌ Error updating data:', error.message);
  process.exit(1);
}