## HTML Interview Questions – Detailed Answers

### Basic Level

#### 1. What is HTML and what does it stand for?
HTML stands for **HyperText Markup Language**. It is the standard markup language used to create and structure web pages. HTML describes the content of a page using a system of tags and attributes, defining elements such as headings, paragraphs, links, images, forms, and more. It forms the foundation of web development, which can then be styled with CSS and made interactive with JavaScript.

#### 2. What is the purpose of `<!DOCTYPE html>`?
The `<!DOCTYPE html>` declaration informs the web browser which version of HTML the page is written in. In HTML5, it is a simple declaration that ensures the browser renders the page in **standards mode**, following modern web specifications. It must be the very first line in an HTML document, before the `<html>` tag. Without it, browsers may switch to **quirks mode**, emulating old, non‑standard rendering, which can cause inconsistent layout and behavior.

#### 3. What is the difference between HTML elements and HTML tags?
- **HTML tag** – The markup that defines the start or end of an element, enclosed in angle brackets (e.g., `<p>`, `</p>`).  
- **HTML element** – The complete structure consisting of an opening tag, its content, and a closing tag (if applicable). For example, `<p>This is a paragraph.</p>` is an element; the `<p>` and `</p>` are tags.  
In short, **tags** are the building blocks, while **elements** are the complete units.

#### 4. What is the difference between `<div>` and `<span>`?
- **`<div>`** – A **block‑level** container used to group larger sections of content. It starts on a new line and takes the full width available. It is typically used for layout and styling.
- **`<span>`** – An **inline** container used to group small pieces of text or other inline elements within a line. It does not cause line breaks and only takes up as much width as necessary.  
Both are generic, non‑semantic elements, but they serve different layout purposes.

#### 5. What are semantic HTML elements? Give 5 examples.
Semantic HTML elements are tags that clearly describe their meaning and the type of content they contain, both to humans and machines (browsers, search engines, screen readers).  
Examples:
- `<article>`
- `<section>`
- `<nav>`
- `<header>`
- `<footer>`  
Other examples: `<main>`, `<aside>`, `<figure>`, `<mark>`. Using semantic elements improves accessibility, SEO, and code maintainability.

#### 6. What is the difference between `<section>` and `<article>`?
- **`<section>`** – Represents a thematic grouping of content, typically with a heading. It is a generic container for related content, such as chapters, tabbed content, or parts of a page.
- **`<article>`** – Represents a self‑contained composition that could be distributed independently (e.g., a blog post, news story, forum post).  
An `<article>` can contain multiple `<section>`s, and a `<section>` can contain multiple `<article>`s. The key distinction is that the content of an `<article>` should make sense on its own.

#### 7. When should you use `<header>`, `<main>`, and `<footer>`?
- **`<header>`** – Contains introductory content or navigational aids for its nearest ancestor. It can appear at the top of the page or within sections/articles, often holding headings, logos, or search forms.
- **`<main>`** – Represents the dominant content of the `<body>`. It should be unique to the document and not repeated across pages (e.g., sidebars, navigation). There must be only one `<main>` per page.
- **`<footer>`** – Contains information about its section, such as author, copyright, links, or related documents. It can be used for the whole page or inside sections/articles.

#### 8. What is the purpose of the `<nav>` element?
The `<nav>` element defines a section of the page intended for navigation links, either within the current document or to external pages. It is used for major navigation blocks (menus, tables of contents) and helps screen readers and search engines quickly identify the primary navigation area.

#### 9. What is the difference between block-level and inline elements?
- **Block‑level elements** – Occupy the full width available, start on a new line, and stack vertically. They can contain other block or inline elements. Examples: `<div>`, `<h1>`, `<p>`, `<section>`.
- **Inline elements** – Occupy only as much width as necessary, do not start on a new line, and flow within text. They can contain only data and other inline elements. Examples: `<span>`, `<a>`, `<img>`, `<strong>`.  
The display behavior can be altered with CSS (e.g., `display: block` or `inline`).

#### 10. What are void elements or self-closing tags in HTML? Give examples.
**Void elements** (also called empty or self‑closing tags) are HTML elements that cannot have any content. They do not have a closing tag. In HTML5, they are written as a single tag, optionally with a trailing slash (e.g., `<br>` or `<br />`).  
Examples: `<br>`, `<img>`, `<input>`, `<hr>`, `<meta>`, `<link>`.

---

### Intermediate Level

#### 11. What is the difference between `id` and `class` attributes?
- **`id`** – A unique identifier for a single element. No two elements on the same page may share the same `id`. It is used for CSS styling, JavaScript (`getElementById`), and anchor links.
- **`class`** – A non‑unique identifier that can be used on multiple elements. It is used to apply common styles or behaviors. An element can have multiple classes (space‑separated).  
`id` is specific and unique; `class` is reusable and general.

#### 12. What are data attributes (`data-*`) and when would you use them?
**Data attributes** are custom attributes that store extra information on HTML elements. They are prefixed with `data-` and can be named anything (e.g., `data-user-id`, `data-toggle`). They are purely for metadata and do not affect rendering.  
Use them to embed hidden data that can be accessed via JavaScript (using the `dataset` property) for dynamic interactions, such as storing configuration values, identifiers for AJAX calls, or state for UI components.

#### 13. What is the purpose of the `alt` attribute in images?
The `alt` attribute provides alternative text for an image. It is displayed if the image fails to load and is read by screen readers for visually impaired users, making it essential for accessibility. Search engines also use it to understand image content. For purely decorative images, use `alt=""` (empty) to avoid distracting assistive technology.

#### 14. What is the difference between `<strong>` and `<b>`, `<em>` and `<i>`?
- **`<strong>`** – Indicates strong importance or urgency. It is semantic and is typically rendered as bold.
- **`<b>`** – Only applies bold styling without any semantic meaning. It is presentational.
- **`<em>`** – Denotes emphasis, usually rendered as italic. It conveys stress or importance.
- **`<i>`** – Represents italic text for stylistic purposes (e.g., foreign words, technical terms) without added emphasis.  
Use semantic tags (`<strong>`, `<em>`) for meaning and CSS for purely visual styling.

#### 15. What are meta tags and why are they important?
**Meta tags** are HTML elements placed in the `<head>` section that provide metadata about the document. They define information such as character set, description, keywords, author, viewport settings, and more. They are important because they:
- Help search engines index and display pages (SEO).
- Control browser behavior (e.g., `viewport` for responsive design, `charset` for encoding).
- Enable social media platforms to display rich previews (Open Graph tags).  
Common meta tags: `<meta charset="UTF-8">`, `<meta name="description" content="...">`, `<meta name="viewport" content="width=device-width, initial-scale=1.0">`.

#### 16. What is the viewport meta tag and why is it crucial for responsive design?
The **viewport meta tag** controls how a webpage is displayed on mobile devices. It sets the width and scaling of the viewport. For example:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```
This tells the browser to set the viewport width to the device’s width and use an initial zoom level of 1. Without it, mobile browsers may render the page at a desktop width and then shrink it, making text tiny and requiring zooming. It is essential for responsive design to ensure pages are readable and properly scaled across all devices.

#### 17. What is the difference between `<link>` and `<script>` tags?
- **`<link>`** – Used to link external resources, most commonly CSS stylesheets. It is placed in the `<head>` and has attributes like `rel`, `href`, and `type`. Example: `<link rel="stylesheet" href="styles.css">`.
- **`<script>`** – Used to embed or reference JavaScript code. It can be placed in the `<head>` or `<body>`. It can contain inline code or link to an external file via the `src` attribute. Example: `<script src="script.js"></script>`.  
`<link>` is primarily for stylesheets and other resource linking; `<script>` is for scripting.

#### 18. What are the different input types in HTML5? List at least 8.
HTML5 introduced several new input types to improve form handling. At least eight examples:
- `text`
- `email`
- `password`
- `number`
- `date`
- `checkbox`
- `radio`
- `file`
- `range`
- `color`
- `tel`
- `url`
- `search`

#### 19. What is the purpose of the `name` attribute in form inputs?
The `name` attribute identifies the form control when the form is submitted. The browser sends the **name‑value pair** of each input to the server. The `name` becomes the key in the submitted data (e.g., in the query string for GET or in the POST body). It is also used by JavaScript to reference elements (e.g., `getElementsByName()`). It is essential for server‑side processing to know what each input represents.

#### 20. What is the difference between GET and POST methods in forms?
- **GET** – Appends form data to the URL as a query string. It is suitable for non‑sensitive, idempotent requests (e.g., search forms). Data is visible in the URL, limited in length, and can be bookmarked.
- **POST** – Sends form data in the HTTP request body. It is more secure for sensitive information (though still requires HTTPS), has no size limits, and can handle file uploads. It is used for actions that change server state (e.g., submitting registration). Data is not visible in the URL and cannot be bookmarked.

#### 21. What is the purpose of `<label>` and how should it be associated with inputs?
The `<label>` element defines a label for a form control, improving accessibility and usability. Clicking the label focuses/activates the associated input (especially useful for checkboxes and radio buttons). Association can be done in two ways:
- **Implicit** – Wrap the input inside the label: `<label>Name: <input type="text"></label>`.
- **Explicit** – Use the `for` attribute matching the input’s `id`: `<label for="name">Name:</label> <input type="text" id="name">`.  
Explicit association is often preferred for layout flexibility.

#### 22. What are `required`, `pattern`, `min`, and `max` attributes used for?
These are HTML5 form validation attributes:
- **`required`** – Specifies that the input must be filled out before submission.
- **`pattern`** – Defines a regular expression the input’s value must match (e.g., `pattern="[A-Za-z]{3}"` for exactly three letters).
- **`min`** / **`max`** – Set the minimum and maximum allowed values for numeric or date inputs.  
They provide client‑side validation, reducing server load and giving immediate feedback.

#### 23. What is the purpose of `placeholder` vs `value` attributes?
- **`placeholder`** – Displays a short hint inside the input (e.g., “Enter your name”). It disappears when the user starts typing and reappears if the field is empty. It is **not submitted** with the form.
- **`value`** – Sets the initial (default) value of the input, which is pre‑filled and can be edited. This value **is submitted** with the form if unchanged.  
`placeholder` guides the user; `value` provides actual data.

#### 24. What is the difference between `<button>`, `<input type="button">`, and `<input type="submit">`?
- **`<button>`** – A versatile container that can hold HTML content (text, images, etc.). Its default `type` inside a form is `submit`, causing form submission. It can also be `type="button"` for generic JavaScript buttons.
- **`<input type="button">`** – A simple button with text defined by the `value` attribute. It has no default behavior and is mainly used with JavaScript. It cannot contain HTML.
- **`<input type="submit">`** – A button that submits the form. Its text is set by the `value` attribute. It behaves like `<button type="submit">` but without inner HTML.  
Use `<button>` for richer content; use `<input type="submit">` for simple form submission.

#### 25. What is the `target` attribute in anchor tags? What is `target="_blank"` and what security concern does it have?
The `target` attribute specifies where to open the linked document. Common values:
- `_self` – Same frame (default).
- `_blank` – New window or tab.
- `_parent` – Parent frame.
- `_top` – Full body of the window.

**`target="_blank"`** opens the link in a new tab.  
**Security concern:** When used without `rel="noopener"` or `rel="noreferrer"`, the new page gains access to the original page’s `window.opener` object, which can lead to **tabnabbing** – the new page may redirect the original page to a malicious site.  
**Fix:** Always include `rel="noopener noreferrer"` in the link: `<a href="..." target="_blank" rel="noopener noreferrer">`. This prevents the new page from accessing `window.opener`.