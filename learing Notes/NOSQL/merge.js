const fs = require('fs');
const path = require('path');

const dirPath = 'd:\\NTI - Hire Ready\\learing Notes\\NOSQL';

// Logical order of files (Base -> Design -> Validation -> Mongoose -> Transactions -> Aggregation -> Reference)
const files = [
  'nosql_mongodb_summary.html',
  'nosql_database_design.html',
  'mongodb_schema_validation.html',
  'Mongoose In Depth.html',
  'mongodb_transactions.html',
  'mongodb_aggregation_users_example.html',
  'mongodb_reference_en.html'
];

let combinedHTML = `<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
<meta charset="UTF-8">
<title>Ultimate NoSQL & MongoDB Reference</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Source+Serif+Pro:wght@400;600;700&family=Source+Sans+Pro:wght@400;600;700&display=swap');

  * { box-sizing: border-box; }

  /* A4 Print & Screen styling */
  body {
    font-family: 'Source Serif Pro', 'Georgia', serif;
    color: #000;
    background: #e0e0e0;
    margin: 0;
    padding: 20px;
    font-size: 12pt;
    line-height: 1.65;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  /* Wrap main sections in an A4 container for screen preview */
  .a4-page {
    background: #fff;
    width: 210mm;
    min-height: 297mm;
    margin: 0 auto 20px auto;
    padding: 20mm;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    position: relative;
    page-break-after: always;
  }

  @media print {
    body {
      background: none;
      padding: 0;
    }
    .a4-page {
      margin: 0;
      box-shadow: none;
      width: auto;
      min-height: auto;
      padding: 0;
    }
    @page {
      size: A4;
      margin: 20mm;
    }
  }

  /* Navy Design Variables */
  :root {
    --primary: navy;
    --secondary: #001f3f;
    --accent: #003366;
    --border: #999;
  }

  .cover {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    border-bottom: 3px double var(--primary);
    min-height: 220mm;
  }
  .cover .kicker {
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 12pt;
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-bottom: 18px;
    color: var(--secondary);
  }
  .cover h1 {
    font-size: 30pt;
    margin: 0 0 10px 0;
    font-weight: 700;
    border-bottom: 2px solid var(--primary);
    padding-bottom: 18px;
    display: inline-block;
    color: var(--primary);
  }
  .cover h2 {
    font-size: 16pt;
    font-weight: 400;
    color: var(--secondary);
    margin-top: 22px;
    font-family: 'Source Sans Pro', sans-serif;
  }
  .cover .meta {
    margin-top: 50px;
    font-size: 11pt;
    color: #555;
    font-family: 'Source Sans Pro', sans-serif;
  }

  .toc h1 {
    font-size: 18pt;
    border-bottom: 2px solid var(--primary);
    padding-bottom: 10px;
    margin-bottom: 20px;
    color: var(--primary);
  }
  .toc ol {
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 12pt;
    padding-left: 20px;
  }
  .toc li { margin-bottom: 10px; }

  .topic-header, .cat-header {
    margin-bottom: 24px;
    border-bottom: 2px solid var(--primary);
    padding-bottom: 12px;
  }
  .topic-number, .cat-number {
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 11pt;
    letter-spacing: 1px;
    color: var(--accent);
    margin: 0 0 4px 0;
    text-transform: uppercase;
  }
  .topic-title, .cat-title {
    font-size: 20pt;
    font-weight: 700;
    margin: 0;
    color: var(--primary);
  }

  h3.sub {
    font-size: 14pt;
    font-weight: 700;
    margin-top: 24px;
    margin-bottom: 8px;
    font-family: 'Source Sans Pro', sans-serif;
    color: var(--primary);
  }

  p { margin: 10px 0; }
  ul, ol.plain { margin: 10px 0; padding-left: 24px; }
  li { margin-bottom: 6px; }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 16px 0;
    page-break-inside: auto;
  }
  tr { page-break-inside: avoid; page-break-after: auto; }
  thead { display: table-header-group; }
  thead th {
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 11pt;
    font-weight: 700;
    text-align: left;
    border-top: 1.5px solid var(--primary);
    border-bottom: 1.5px solid var(--primary);
    padding: 10px;
    color: var(--primary);
  }
  tbody td {
    padding: 10px;
    border-bottom: 0.75px solid var(--border);
    vertical-align: top;
    font-size: 11.5pt;
  }
  tbody tr:last-child td { border-bottom: 1.5px solid var(--primary); }

  pre {
    background: #f4f6f9;
    border: 0.75px solid var(--border);
    border-left: 3px solid var(--primary);
    padding: 12px 16px;
    font-family: 'Consolas', 'Courier New', monospace;
    font-size: 10.5pt;
    overflow-x: auto;
    margin: 14px 0;
    white-space: pre-wrap;
    page-break-inside: avoid;
  }
  code {
    font-family: 'Consolas', 'Courier New', monospace;
    font-size: 11pt;
    color: var(--primary);
  }

  .note, .scenario {
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 10.5pt;
    border-top: 0.75px dotted var(--primary);
    border-bottom: 0.75px dotted var(--primary);
    padding: 10px 0;
    margin-top: 16px;
    color: var(--secondary);
    page-break-inside: avoid;
  }
  .scenario strong { font-weight: 700; color: var(--primary); }

  .tip-box {
    border: 1px solid var(--primary);
    padding: 14px 18px;
    margin-top: 18px;
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 11pt;
    page-break-inside: avoid;
  }
  .tip-box .tip-label {
    font-weight: 700;
    text-transform: uppercase;
    font-size: 10pt;
    letter-spacing: 1px;
    margin-bottom: 8px;
    display: block;
    border-bottom: 1px solid var(--primary);
    padding-bottom: 4px;
    color: var(--primary);
  }

  .warning-box {
    border-left: 3px solid #800000;
    background: #fff0f0;
    padding: 12px 16px;
    margin-top: 16px;
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 11pt;
    page-break-inside: avoid;
  }
  .warning-box strong { color: #800000; }

  .page-footer {
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 9.5pt;
    color: #666;
    text-align: center;
    margin-top: 40px;
    border-top: 0.5px solid var(--primary);
    padding-top: 10px;
  }

  .module-title {
    font-family: 'Source Sans Pro', sans-serif;
    text-align: center;
    font-size: 24pt;
    font-weight: 700;
    color: var(--primary);
    margin: 0;
    padding: 40px 0;
    border-bottom: 4px solid var(--primary);
  }
</style>
</head>
<body>
`;

function wrapInA4(html) {
  // Find top level logical blocks and wrap them in .a4-page div
  const regex = /(<div class="cover">[\s\S]*?<\/div>|<div class="toc">[\s\S]*?<\/div>|<section[^>]*>[\s\S]*?<\/section>)/g;
  return html.replace(regex, '<div class="a4-page">\n$1\n</div>');
}

let allBodyContent = "";

// A global cover page
allBodyContent += `
<div class="a4-page">
  <div class="cover">
    <p class="kicker">Ultimate Reference Guide</p>
    <h1>NoSQL & MongoDB Mastery</h1>
    <h2>The Complete Course Notes (A4 Format)</h2>
    <p class="meta">Optimized for PDF Printing</p>
    
    <div class="tip-box" style="margin-top: 50px; max-width: 400px; text-align: left;">
      <span class="tip-label">PDF Export Tip</span>
      <p>When printing or saving to PDF from your browser:</p>
      <ul>
        <li>Set Paper Size to <strong>A4</strong></li>
        <li>Set Margins to <strong>None</strong> (the CSS handles it)</li>
        <li>Ensure <strong>Background graphics</strong> is checked</li>
      </ul>
    </div>
  </div>
</div>
`;

files.forEach((file, index) => {
  const filePath = path.join(dirPath, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    const bodyMatch = content.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    if (bodyMatch) {
      let bodyContent = bodyMatch[1];
      
      let moduleName = file.replace('.html', '').replace(/_/g, ' ').toUpperCase();
      let moduleHeader = `
<div class="a4-page">
  <div class="cover" style="min-height: 100mm;">
    <p class="kicker">Module ${index + 1}</p>
    <h1 class="module-title" style="border: none; padding-bottom: 0;">${moduleName}</h1>
  </div>
</div>`;
      
      allBodyContent += moduleHeader + wrapInA4(bodyContent);
    }
  }
});

combinedHTML += allBodyContent;
combinedHTML += "\n</body>\n</html>";

fs.writeFileSync(path.join(dirPath, "NOSQL_Master_A4.html"), combinedHTML);
console.log("Merge completed successfully.");
