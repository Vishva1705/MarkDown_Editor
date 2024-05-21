const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const marked = require('marked');


const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

app.get("/convert", (req, res) => {
  const markdown = req.query.markdown;
  if (!markdown) {
    res.status(400).send("No markdown provided");
    return;
  }
  const html = convertMarkdownToHtml(markdown);
  res.send(html);
});

const convertMarkdownToHtml = (markdown) => {
  return markdown
    .replace(/^# (.+)$/gm, "<h1>$1</h1>") // Convert "# Heading" to <h1>Heading</h1>
    .replace(/^## (.+)$/gm, "<h2>$1</h2>") // Convert "## Heading" to <h2>Heading</h2>
    .replace(/^### (.+)$/gm, "<h3>$1</h3>") // Convert "### Heading" to <h3>Heading</h3>
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Convert "**Bold**" to <strong>Bold</strong>
    .replace(/\*(.*?)\*/g, "<em>$1</em>") // Convert "*Italic*" to <em>Italic</em>
    .replace(/^(\d+)\. (.+)$/gm, "<ol><li>$2</li></ol>") // Convert "1. Item" to <ol><li>Item</li></ol>
    .replace(/^(-|\*) (.+)$/gm, "<ul><li>$2</li></ul>") // Convert "- Item" to <ul><li>Item</li></ul>
    .replace(/\[(.+)\]\((.+)\)/g, "<a href=\"$2\">$1</a>") // Convert "[Link Text](URL)" to <a href="URL">Link Text</a>
    .replace(/!\[(.+)\]\((.+)\)/g, "<img src=\"$2\" alt=\"$1\">"); // Convert "![Alt Text](Image URL)" to <img src="Image URL" alt="Alt Text">
};





app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
