
## 📄 HTML Document Structure

Every HTML document follows a basic skeleton:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Page Title</title>
</head>
<body>
    <!-- visible content goes here -->
</body>
</html>
```

- **`<!DOCTYPE html>`** – Declares the document as HTML5 (must be the very first line).
- **`<html>`** – The root element. The `lang` attribute is recommended for accessibility.
- **`<head>`** – Contains meta-information about the page (not displayed).
- **`<body>`** – Contains all visible content.

---

## 🏷️ Meta Tags

Meta tags live inside the `<head>` and provide metadata to browsers and search engines.

- **`<meta charset="UTF-8">`** – Specifies the character encoding (almost always UTF-8).
- **`<meta name="viewport" content="width=device-width, initial-scale=1.0">`** – Controls layout on mobile devices (essential for responsive design).
- **`<meta name="description" content="A brief description of the page">`** – Used by search engines in search results.
- **`<meta name="keywords" content="HTML, CSS, JavaScript">`** – Historically for SEO, but now largely ignored by major search engines.

---

## 🧱 Semantic HTML5 Elements

Semantic elements give meaning to the structure of a webpage, improving accessibility and SEO.

- **`<header>`** – Introductory content or navigational links (can be used multiple times).
- **`<nav>`** – Section with navigation links.
- **`<main>`** – The dominant content of the `<body>` (only one per page).
- **`<section>`** – A thematic grouping of content, usually with a heading.
- **`<article>`** – Self-contained content that could be distributed independently (e.g., blog post, news story).
- **`<aside>`** – Content indirectly related to the main content (sidebars, pull quotes).
- **`<footer>`** – Footer for its nearest sectioning root or section (copyright, contact info).

---

## 📝 Forms

### Common Input Types
- `text`, `email`, `password`, `number`, `tel`, `url`, `checkbox`, `radio`, `file`, `submit`, `reset`, `button`, `date`, `range`, `color`, etc.

### Labels
```html
<label for="username">Username:</label>
<input type="text" id="username" name="username">
```
The `for` attribute links the label to an input’s `id`, improving accessibility and click area.

### Validation Attributes (HTML5)
- `required` – Field must be filled.
- `pattern="[A-Za-z]{3}"` – Regular expression the value must match.
- `min` / `max` – Minimum and maximum values (for number, date, range).
- `minlength` / `maxlength` – Minimum/maximum number of characters.

Example:
```html
<input type="text" required minlength="3" pattern="[A-Za-z]+">
```

---

## 🔧 Form Attributes

- **`action`** – URL where form data is sent.
- **`method`** – HTTP method (`GET` or `POST`).
- **`name`** – Key used when sending form data (important for server‑side processing).
- **`id`** – Unique identifier for the element (used by labels, CSS, JavaScript).
- **`placeholder`** – Short hint inside the input field (disappears when typing).

---

## 📊 Tables

Tables are built with rows and cells.

```html
<table>
    <thead>
        <tr>
            <th>Header 1</th>
            <th>Header 2</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Data 1</td>
            <td>Data 2</td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <td>Footer 1</td>
            <td>Footer 2</td>
        </tr>
    </tfoot>
</table>
```

- **`<table>`** – Container.
- **`<thead>`** – Header rows.
- **`<tbody>`** – Body rows (one or more).
- **`<tfoot>`** – Footer rows.
- **`<tr>`** – Table row.
- **`<th>`** – Table header cell (usually bold and centered).
- **`<td>`** – Table data cell.

---

## 📋 Lists

### Unordered List
```html
<ul>
    <li>Item</li>
    <li>Another item</li>
</ul>
```

### Ordered List
```html
<ol>
    <li>First</li>
    <li>Second</li>
</ol>
```

### Description List
```html
<dl>
    <dt>Term</dt>
    <dd>Description of the term</dd>
</dl>
```

- **`<ul>`** – Bulleted list.
- **`<ol>`** – Numbered list (can use `type` and `start` attributes).
- **`<li>`** – List item.
- **`<dl>`** – Description list.
- **`<dt>`** – Term/name.
- **`<dd>`** – Description/value.

---

## 🎬 Media Elements

### Image
```html
<img src="image.jpg" alt="Description of image">
```
- `src` – Path to the image.
- `alt` – Alternative text (critical for accessibility and if image fails to load).

### Audio
```html
<audio controls>
    <source src="audio.mp3" type="audio/mpeg">
    Your browser does not support the audio element.
</audio>
```
Attributes: `controls`, `autoplay`, `loop`, `muted`, `preload`.

### Video
```html
<video controls width="640" height="360">
    <source src="video.mp4" type="video/mp4">
    Your browser does not support the video tag.
</video>
```
Attributes: `controls`, `autoplay`, `loop`, `muted`, `poster`, `width`, `height`.

---

## 🔗 Links and Navigation

The `<a>` (anchor) element creates hyperlinks.

```html
<a href="https://example.com" target="_blank" rel="noopener noreferrer">Visit Example</a>
```

- **`href`** – URL or page fragment (e.g., `#section`).
- **`target`** – Where to open the link:
  - `_self` (default) – same tab.
  - `_blank` – new tab/window.
- **`rel`** – Relationship to the linked document:
  - `noopener` / `noreferrer` – security measures when using `target="_blank"`.
  - Other values: `nofollow`, `external`, etc.

---

## 🆔 Attributes: `class` vs `id` and `data-*`

### `class` vs `id`
- **`class`** – Can be used on multiple elements; primarily for CSS styling and JavaScript selection.
- **`id`** – Must be **unique** on the page; used for fragment identifiers, label associations, and JavaScript.

```html
<div class="box highlight">...</div>
<div id="main-content">...</div>
```

### `data-*` Attributes
Custom attributes that store extra information (accessible via JavaScript).

```html
<button data-user-id="12345" data-role="admin">Click me</button>
```
In JavaScript: `element.dataset.userId` → `"12345"`, `element.dataset.role` → `"admin"`.

---

## ♿ Accessibility Basics

### ARIA Attributes
ARIA (Accessible Rich Internet Applications) enhances accessibility when native HTML is insufficient.

- **`role`** – Defines the type of element (e.g., `role="navigation"`, `role="button"`).
- **`aria-label`** – Provides an accessible name.
- **`aria-labelledby`** – References another element that provides the label.
- **`aria-hidden="true"`** – Hides an element from screen readers.

### Alt Text
Always provide meaningful `alt` text for images. If an image is purely decorative, use `alt=""` (empty) so screen readers skip it.

### Semantic Structure
Using semantic HTML5 elements (`<header>`, `<nav>`, `<main>`, etc.) helps screen readers understand the page layout. Headings (`<h1>`–`<h6>`) should be used in a logical order to outline the content.

--- 

### Section A.1: HTML Fundamentals

**1. What is the purpose of DOCTYPE and why is it important?**

- **Quick Note:** `<!DOCTYPE html>` is an instruction to the browser to render the page in **standards mode**, ensuring consistent styling and behavior across modern browsers.

- **Well-Explained Answer:**
    "The `DOCTYPE`, short for 'document type declaration,' isn't an HTML tag itself. It's an instruction that tells the web browser which version of HTML (or XML) the page is written in.
    Its primary purpose is to trigger the browser's **standards mode**. In the early days of the web, browsers had two rendering modes: 'quirks mode' for old, non-standard web pages, and 'standards mode' for modern, standards-compliant code. Without a `DOCTYPE`, browsers will default to 'quirks mode,' which mimics the buggy layout of older browsers like IE5.
    For modern web development, we always use `<!DOCTYPE html>`. This simple declaration ensures that the browser renders the page using the latest HTML5 standards, leading to predictable CSS layout and consistent behavior across all major browsers. It's the first line of code that makes the web work reliably."

**2. Explain semantic HTML and give 5 examples of semantic tags.**

- **Quick Note:** Semantic HTML uses tags that clearly describe their meaning and content to both the browser and the developer. Examples: `<header>`, `<nav>`, `<main>`, `<article>`, `<footer>`.

- **Well-Explained Answer:**
    "Semantic HTML means using HTML markup to reinforce the meaning of the information in webpages, rather than just defining its appearance. A classic non-semantic example is using a `<div>` for everything. A `<div>` is just a block; it doesn't tell you anything about what's inside it.
    Semantic tags like `<header>`, `<footer>`, or `<article>` clearly describe their role.
    Here are 5 examples:
    1.  `<header>`: Defines introductory content or a set of navigational links for its section.
    2.  `<nav>`: Defines a section of navigation links.
    3.  `<main>`: Specifies the main content of the document. There should be only one per page.
    4.  `<article>`: Represents a self-contained composition, like a forum post, magazine article, or blog entry.
    5.  `<footer>`: Defines a footer for its nearest section, usually containing information about its author, copyright data, or related links.
    Using semantic HTML is crucial for SEO (search engines understand your content better), accessibility (screen readers can navigate the page more intelligently), and developer maintainability (your code is easier to read and understand)."

**3. What is the difference between block and inline elements in HTML?**

- **Quick Note:** Block-level elements start on a new line and take up the full width available. Inline elements sit within the flow of text and only take up as much width as necessary.

- **Well-Explained Answer:**
    "This is a fundamental concept in HTML and CSS.
    - **Block-level elements** always start on a new line. By default, they stretch to fill the entire width of their parent container. They can contain other block elements or inline elements. Think of them as the 'structural' building blocks of a page. Examples: `<div>`, `<p>`, `<h1>`, `<section>`, `<ul>`.
    - **Inline elements**, on the other hand, do not start on a new line. They only take up as much width as their content requires. They sit within the flow of a block of text. You typically cannot nest block-level elements inside inline ones. Think of them as 'formatting' elements within text. Examples: `<span>`, `<a>`, `<strong>`, `<em>`, `<img>`.
    This default behavior can, of course, be completely changed using the CSS `display` property."

**4. How do you make forms accessible and user-friendly?**

- **Quick Note:** Make forms accessible by using semantic structure, explicit labels, proper field grouping, clear validation, and thoughtful keyboard navigation.

- **Well-Explained Answer:**
    "Building accessible forms is a key part of user-centered design. I focus on several key areas:
    1.  **Semantic Structure and Labels:** Every form input (`<input>`, `<select>`, `<textarea>`) must have an associated `<label>`. You can either wrap the input in the label (`<label>Name: <input type="text"></label>`) or use the `for` attribute to link the label to the input's `id` (`<label for="name">Name:</label> <input id="name">`). This is crucial for screen readers and also improves usability by making the label clickable to focus the input.
    2.  **Grouping Related Elements:** Use the `<fieldset>` element to group related inputs (like a set of radio buttons or checkboxes) and the `<legend>` element to provide a caption for that group. This gives context to screen reader users.
    3.  **Clear Instructions and Validation:** Use `placeholder` text as hints, not as a replacement for labels. Provide clear, persistent instructions. For validation, use HTML5 attributes like `required`, `type="email"`, and `pattern`. Importantly, never rely solely on color to indicate an error. Display clear text error messages and, using ARIA attributes like `aria-describedby`, associate the error message with the specific input.
    4.  **Keyboard Navigation:** Ensure the form can be navigated logically using the `Tab` key. The `tabindex="0"` attribute can be used to make a non-focusable element focusable, but I generally let the natural source order dictate the tab flow. Focus styles (like the `:focus` pseudo-class) should be clearly visible to help keyboard users know where they are."

**5. What are data attributes and when would you use them?**

- **Quick Note:** Data attributes (`data-*`) are custom attributes that allow you to store extra information directly in standard HTML elements. They are accessed via JavaScript.

- **Well-Explained Answer:**
    "Data attributes are a way to embed custom data, or 'private' information, directly into HTML elements. They always start with `data-` followed by a lowercase name, like `data-user-id="123"` or `data-product-color="blue"`.
    They are incredibly useful for storing extra state or information that doesn't have a visual representation but is needed for interactivity. I use them frequently for:
    1.  **Storing Configuration:** Hooking up a JavaScript plugin. For example, a `<button data-modal-target="#signup-modal">` might tell a JavaScript function which modal to open.
    2.  **Storing Data for Manipulation:** In a to-do list app, each list item might have a `data-task-id="456"`. When a user clicks a 'delete' button, the JavaScript can read that ID and know which item to remove from the database.
    3.  **Simplifying Front-end Logic:** They can be used to store transient state, like `data-expanded="true"` or `data-visible="false"`, which can be easily checked and updated by CSS or JavaScript.
    You access them in JavaScript using the `element.dataset` property. For example, `element.dataset.userId` would give you '123'. This is much cleaner than using class names or IDs to store arbitrary data."


