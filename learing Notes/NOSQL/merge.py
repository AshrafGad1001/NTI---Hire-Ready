import os
import re

dir_path = r"d:\NTI - Hire Ready\learing Notes\NOSQL"
files_to_merge = [
    "nosql_mongodb_summary.html",
    "nosql_database_design.html",
    "mongodb_aggregation_users_example.html",
    "mongodb_reference_en.html"
]

combined_html = """<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
<meta charset="UTF-8">
<title>NoSQL & MongoDB — All Notes Combined</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Source+Serif+Pro:wght@400;600;700&family=Source+Sans+Pro:wght@400;600;700&display=swap');

  * { box-sizing: border-box; }
  body { font-family: 'Source Serif Pro', 'Georgia', serif; color: #000; background: #fff; margin: 0; padding: 0; font-size: 12pt; line-height: 1.65; }
  .cover { height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; border-bottom: 3px double navy; }
  .cover .kicker { font-family: 'Source Sans Pro', sans-serif; font-size: 11pt; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 18px; color: #001f3f; }
  .cover h1 { font-size: 28pt; margin: 0 0 10px 0; font-weight: 700; border-bottom: 2px solid navy; padding-bottom: 18px; display: inline-block; color: navy; }
  .cover h2 { font-size: 14pt; font-weight: 400; color: #001f3f; margin-top: 22px; font-family: 'Source Sans Pro', sans-serif; }
  .cover .meta { margin-top: 50px; font-size: 10pt; color: #555; font-family: 'Source Sans Pro', sans-serif; }
  
  .toc { padding: 60px 55px; }
  .toc h1 { font-size: 18pt; border-bottom: 2px solid navy; padding-bottom: 10px; margin-bottom: 20px; color: navy; }
  .toc ol { font-family: 'Source Sans Pro', sans-serif; font-size: 11.5pt; padding-left: 20px; }
  .toc li { margin-bottom: 8px; }

  section.topic, section.category { padding: 60px 55px 40px 55px; }
  .topic-header, .cat-header { margin-bottom: 24px; border-bottom: 2px solid navy; padding-bottom: 12px; }
  .topic-number, .cat-number { font-family: 'Source Sans Pro', sans-serif; font-size: 10.5pt; letter-spacing: 1px; color: #003366; margin: 0 0 4px 0; text-transform: uppercase; }
  .topic-title, .cat-title { font-size: 19pt; font-weight: 700; margin: 0; color: navy; }

  h3.sub { font-size: 13pt; font-weight: 700; margin-top: 22px; margin-bottom: 8px; font-family: 'Source Sans Pro', sans-serif; color: navy; }
  p { margin: 8px 0; }
  ul, ol.plain { margin: 8px 0; padding-left: 22px; }
  li { margin-bottom: 4px; }

  table { width: 100%; border-collapse: collapse; margin: 12px 0; }
  thead th { font-family: 'Source Sans Pro', sans-serif; font-size: 10.5pt; font-weight: 700; text-align: left; border-top: 1.5px solid navy; border-bottom: 1.5px solid navy; padding: 8px 9px; color: navy; }
  tbody td { padding: 8px 9px; border-bottom: 0.75px solid #999; vertical-align: top; font-size: 11pt; }
  tbody tr:last-child td { border-bottom: 1.5px solid navy; }
  td.func-name { font-family: 'Consolas', 'Courier New', monospace; font-weight: 700; white-space: nowrap; width: 24%; color: navy; }

  pre { background: #f4f6f9; border: 0.75px solid #999; border-left: 3px solid navy; padding: 10px 14px; font-family: 'Consolas', 'Courier New', monospace; font-size: 10pt; overflow-x: auto; margin: 10px 0; white-space: pre-wrap; }
  code { font-family: 'Consolas', 'Courier New', monospace; font-size: 10.5pt; color: navy; }

  .note, .scenario { font-family: 'Source Sans Pro', sans-serif; font-size: 10pt; border-top: 0.75px dotted navy; border-bottom: 0.75px dotted navy; padding: 8px 0; margin-top: 14px; color: #001f3f; }
  .scenario strong { font-weight: 700; color: navy; }

  .tip-box { border: 1px solid navy; padding: 12px 16px; margin-top: 16px; font-family: 'Source Sans Pro', sans-serif; font-size: 10.3pt; }
  .tip-box .tip-label { font-weight: 700; text-transform: uppercase; font-size: 9.5pt; letter-spacing: 1px; margin-bottom: 6px; display: block; border-bottom: 1px solid navy; padding-bottom: 4px; color: navy; }
  .tip-box ul { margin: 6px 0 0 0; padding-left: 18px; }
  .tip-box li { margin-bottom: 5px; }

  .warning-box { border-left: 3px solid #800000; background: #fff0f0; padding: 10px 14px; margin-top: 14px; font-family: 'Source Sans Pro', sans-serif; font-size: 10.3pt; }
  .warning-box strong { text-transform: uppercase; font-size: 9.5pt; letter-spacing: 0.5px; color: #800000; }

  .page-footer { font-family: 'Source Sans Pro', sans-serif; font-size: 9pt; color: #666; text-align: center; margin-top: 30px; border-top: 0.5px solid navy; padding-top: 8px; }
  
  .file-separator { text-align: center; font-size: 20px; font-weight: bold; color: white; background-color: navy; margin: 60px 0 0 0; font-family: 'Source Sans Pro', sans-serif; padding: 15px; }
</style>
</head>
<body>

<div class="cover">
  <p class="kicker">Complete Reference Compilation</p>
  <h1>NoSQL & MongoDB</h1>
  <h2>All Original Study Notes Combined</h2>
  <p class="meta">Contains the full, unedited content of all 4 original files, unified with a Navy design.</p>
</div>
"""

for fname in files_to_merge:
    fpath = os.path.join(dir_path, fname)
    if os.path.exists(fpath):
        with open(fpath, "r", encoding="utf-8") as f:
            content = f.read()
            
            # Extract everything between <body> and </body>
            match = re.search(r"<body.*?>(.*)</body>", content, re.DOTALL | re.IGNORECASE)
            if match:
                body_content = match.group(1)
                
                # Optionally, we can remove the individual cover/TOC from each file to make it cleaner,
                # but the user asked to "combine all files", so keeping them with a clear separator is safe.
                
                combined_html += f'\n<div class="file-separator">File: {fname}</div>\n'
                combined_html += body_content

combined_html += "\n</body>\n</html>"

with open(os.path.join(dir_path, "NOSQL_All_Files_Combined.html"), "w", encoding="utf-8") as f:
    f.write(combined_html)

print("Created NOSQL_All_Files_Combined.html")
