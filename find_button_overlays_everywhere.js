const fs = require('fs');
const path = require('path');

const workspace_dir = "c:/Users/DELL/Downloads/_public_html (5)";

function checkFile(filepath) {
  const content = fs.readFileSync(filepath, 'utf8');
  const rel = path.relative(workspace_dir, filepath);
  
  // Check if title or filename contains 'consult'
  const titleMatch = content.match(/<title>([^<]*)<\/title>/i);
  const title = titleMatch ? titleMatch[1] : '';
  const isConsultPage = rel.toLowerCase().includes('consult') || title.toLowerCase().includes('consult');
  if (!isConsultPage) return;
  
  // Strip comments
  const cleanContent = content.replace(/<!--[\s\S]*?-->/g, '');
  if (cleanContent.includes('http-equiv="refresh"') || cleanContent.includes("http-equiv='refresh'")) {
    return; // Redirected page
  }
  
  // Find any section or div with class containing hero, int-01, or banner
  const regex = /<([a-z0-9]+)[^>]*class=["'][^"']*(hero|int-01|banner)[^"']*["'][\s\S]*?<\/\1>/gi;
  let match;
  let foundHero = false;
  while ((match = regex.exec(cleanContent)) !== null) {
    foundHero = true;
    console.log(`File: ${rel} | Title: ${title}`);
    console.log(match[0].trim());
    console.log('========================================');
  }
  
  if (!foundHero) {
    // Let's print the first 20 lines of the body to see how the top of the page is structured
    const bodyMatch = cleanContent.match(/<body[^>]*>([\s\S]*?)(?:<section|<div class="int-02"|<div class="i-02"|<div class="sec-02")/i);
    if (bodyMatch) {
      console.log(`File (No explicit hero class): ${rel} | Title: ${title}`);
      console.log(bodyMatch[1].trim());
      console.log('========================================');
    }
  }
}

function walk(curr) {
  const files = fs.readdirSync(curr);
  for (const file of files) {
    const full = path.join(curr, file);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (![".git", ".vscode", ".trash", "node_modules"].includes(file)) walk(full);
    } else if (file.endsWith(".html")) {
      checkFile(full);
    }
  }
}

walk(workspace_dir);
