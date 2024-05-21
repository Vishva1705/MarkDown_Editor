import React, { useState } from "react";


function MarkdownEditor() {
  const [markdown, setMarkdown] = useState("");
  const [html, setHtml] = useState("");

  const handleChange = async (event) => {
    setMarkdown(event.target.value);
    try {
      const response = await fetch(
        `http://localhost:5000/convert?markdown=${encodeURIComponent(event.target.value)}`
      );
      const html = await response.text();
      setHtml(html);
    } catch (error) {
      console.error("Error converting Markdown:", error);
    }
  };

  return (
    <div className="markdown-editor-container">
         <h1>MarkdownEditor</h1>
      <div className="markdown-instructions">
        <p>Markdown Symbols:</p>
        <ul>
          <li># - Heading 1</li>
          <li>## - Heading 2</li>
          <li>### - Heading 3</li>
          <li>**text** - Bold</li>
          <li>*text* - Italic</li>
          <li>1. - Ordered List</li>
          <li>- - Unordered List</li>
          <li>[Link Text](URL) - Link</li>
          <li>![Alt Text](Image URL) - Image</li>
        </ul>
      </div>

      <div className="markdown-input">
        <textarea value={markdown} onChange={handleChange} placeholder="Type your Markdown here..." />
      </div>

      <div className="preview" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}

export default MarkdownEditor;
