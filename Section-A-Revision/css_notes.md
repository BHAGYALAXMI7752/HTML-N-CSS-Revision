
## 🎯 CSS Selectors

Selectors define which elements a set of styles applies to.

| Selector Type     | Example                      | Description                                         |
|-------------------|------------------------------|-----------------------------------------------------|
| **Element**       | `p { }`                      | Selects all `<p>` elements.                         |
| **Class**         | `.btn { }`                   | Selects elements with `class="btn"`.                |
| **ID**            | `#header { }`                | Selects the element with `id="header"` (unique).    |
| **Attribute**     | `[type="text"] { }`          | Selects elements with a specific attribute value.   |
| **Pseudo-class**  | `a:hover { }`                | Selects elements in a specific state (e.g., hover). |
| **Pseudo-element**| `p::first-line { }`          | Selects a part of an element (e.g., first line).    |

### Common pseudo-classes
- `:hover`, `:focus`, `:active` – user interaction.
- `:first-child`, `:last-child`, `:nth-child(n)` – structural.
- `:not(selector)` – negation.

### Common pseudo-elements
- `::before` / `::after` – insert generated content (used with `content` property).
- `::first-letter`, `::first-line` – style first letter or line.

---

## ⚖️ Specificity and Cascade

When multiple rules conflict, the browser uses **specificity** and the **cascade** to decide which style wins.

### Specificity Calculation
Specificity is a four-part value (a,b,c,d) often represented as:
- **Inline styles** – `1,0,0,0`
- **ID selectors** – `0,1,0,0`
- **Class, attribute, pseudo-class** – `0,0,1,0`
- **Element, pseudo-element** – `0,0,0,1`

Example:
```css
#nav .item a:hover { }   /* specificity: 1 (id) + 1 (class) + 1 (element) + 1 (pseudo-class) → 0,1,2,1 */
```

### Cascade Order
1. **Importance** – `!important` overrides everything (use sparingly).
2. **Specificity** – Higher specificity wins.
3. **Source Order** – If specificity is equal, the last declared rule wins.

---

## 📦 Box Model

Every element is a rectangular box with the following layers (from inside out):

- **Content** – actual text or child elements.
- **Padding** – space between content and border (transparent).
- **Border** – line around padding (if any).
- **Margin** – space outside the border (transparent, separates elements).

Visual:
```
+-----------------------+
|       Margin          |
|  +-----------------+  |
|  |    Border       |  |
|  |  +-----------+  |  |
|  |  | Padding   |  |  |
|  |  |  Content  |  |  |
|  |  +-----------+  |  |
|  +-----------------+  |
+-----------------------+
```

---

## 🔧 `box-sizing`

Controls how the total width/height of an element is calculated.

- **`content-box`** (default) – `width` / `height` only include content. Padding and border add to the total size.
  ```css
  box-sizing: content-box;
  width: 200px; padding: 10px; border: 5px;
  /* total width = 200 + 20 + 10 = 230px */
  ```

- **`border-box`** – `width` / `height` include content, padding, and border. Total size stays as set.
  ```css
  box-sizing: border-box;
  width: 200px; padding: 10px; border: 5px;
  /* total width = 200px (content width shrinks to 170px) */
  ```
  *`border-box` is often preferred for easier layout.*

---

## 🖥️ Display Properties

- **`block`** – Takes full width, starts on a new line (`div`, `p`, `h1`).
- **`inline`** – Only takes as much width as needed, no line breaks, cannot set width/height (`span`, `a`).
- **`inline-block`** – Like inline but you can set width/height and margins.
- **`none`** – Element is completely removed from the layout (not visible and not taking space).

---

## 📌 Position

- **`static`** – Default. Element follows normal document flow.
- **`relative`** – Positioned relative to its normal position; can use `top`, `left`, etc. It still occupies its original space.
- **`absolute`** – Removed from flow; positioned relative to the nearest positioned ancestor (or initial containing block). Other elements act as if it doesn't exist.
- **`fixed`** – Removed from flow; positioned relative to the viewport; stays fixed on scroll.
- **`sticky`** – Hybrid of relative and fixed. Toggles between relative and fixed based on scroll position.

---

## 🤸 Flexbox Basics

**Flexbox** is a one‑dimensional layout method for arranging items in rows or columns.

### Flex Container
```css
.container {
    display: flex;           /* or inline-flex */
    flex-direction: row;     /* row | column | row-reverse | column-reverse */
    justify-content: center; /* main‑axis alignment: flex-start, center, space-between, etc. */
    align-items: stretch;    /* cross‑axis alignment: flex-start, center, stretch, baseline */
    flex-wrap: wrap;         /* nowrap | wrap | wrap-reverse */
}
```

### Flex Items
- **`flex-grow`** – Ability to grow (default 0).
- **`flex-shrink`** – Ability to shrink (default 1).
- **`flex-basis`** – Initial size before growing/shrinking.
- Shorthand: `flex: 1 1 auto;`

---

## 🧩 Grid Basics

**CSS Grid** is a two‑dimensional layout system.

### Grid Container
```css
.container {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;   /* three columns */
    grid-template-rows: auto 100px;        /* two rows */
    gap: 10px;                             /* gap between rows/columns */
}
```

### Grid Areas
```css
.container {
    grid-template-areas: 
        "header header"
        "sidebar main"
        "footer footer";
}
.item-header { grid-area: header; }
.item-sidebar { grid-area: sidebar; }
/* etc. */
```

---

## 📏 CSS Units

| Unit | Description | Relative to |
|------|-------------|-------------|
| `px` | pixels | absolute (1px = 1/96th of 1 inch) |
| `%`  | percentage | parent element’s size |
| `em` | font-size | parent’s font-size (for font) or current element’s font-size (for other properties) |
| `rem` | root em | root (`<html>`) font-size (usually 16px) |
| `vh` | viewport height | 1% of viewport height |
| `vw` | viewport width | 1% of viewport width |

- **`em`** can compound; **`rem`** is more predictable for spacing.

---

## 📱 Responsive Design & Media Queries

**Media queries** apply styles based on device characteristics (width, orientation, etc.).

```css
/* Mobile‑first approach: base styles for small screens */
body { font-size: 16px; }

/* Tablet and up */
@media (min-width: 768px) {
    body { font-size: 18px; }
}

/* Desktop and up */
@media (min-width: 1024px) {
    body { font-size: 20px; }
}
```

### Mobile‑First Approach
- Start with styles for the smallest screen, then use `min-width` media queries to add styles for larger screens.
- Makes pages faster and easier to maintain.

---

## 🧮 Specificity Quick Reference

Remember the hierarchy:
- **Inline style** – `1000`
- **ID** – `100`
- **Class, attribute, pseudo-class** – `10`
- **Element, pseudo-element** – `1`

Example breakdown:
```css
#main .card p::first-line   /* 1 ID (100) + 1 class (10) + 1 element (1) + 1 pseudo-element (1) = 0,1,1,2? Actually in the 4-number notation: ID (0,1,0,0), class (0,0,1,0), element (0,0,0,1), pseudo-element (0,0,0,1) → total 0,1,1,2 */
```
But simpler: think **IDs > Classes > Elements**.

---

### Section A.2: CSS Fundamentals

**1. Explain the CSS box model with a diagram.**

- **Quick Note:** The CSS box model is a rectangular box that wraps around every HTML element, consisting of: content, padding, border, and margin.

- **Well-Explained Answer:**
    "The CSS box model is the foundation of layout on the web. Every element is represented as a rectangular box, and its size and spacing are determined by four layers, working from the inside out:

    **(Imagine a diagram here)**
    [Diagram Description:
    - **Center (Content):** The inner-most area, where your text, images, or other content live.
    - **Surrounding Content (Padding):** A transparent area that clears space around the content, inside the border. It inherits the background of the element.
    - **Wrap around Padding (Border):** A line that goes around the padding and content.
    - **Outer-most layer (Margin):** A transparent area that clears space outside the border, separating the element from its neighbors. It is always transparent and does not show the background.]

    The actual width and height of an element on the page depends on the `box-sizing` property.
    - `box-sizing: content-box` (default): The `width` and `height` properties only set the **content** area's dimensions. The total width becomes `width + padding-left + padding-right + border-left + border-right`.
    - `box-sizing: border-box`: The `width` and `height` properties set the total visible dimensions, including **content, padding, and border**. This is almost always the preferred model because it makes layout math much easier."

**2. What is CSS specificity and how is it calculated?**

- **Quick Note:** Specificity is the algorithm browsers use to determine which CSS rule to apply when multiple rules conflict. It's calculated as a 4-part score: inline styles, IDs, classes/pseudo-classes/attributes, elements/pseudo-elements.

- **Well-Explained Answer:**
    "CSS specificity is a weighting system that determines which style declaration is ultimately applied to an element when there are conflicting rules. It's a core part of the cascade.
    It's typically represented as a 4-part value, like (0,0,0,0). The calculation works like this:
    1.  **Inline styles:** An inline `style` attribute on an element adds 1 to the first, most significant column. (e.g., `(1,0,0,0)`).
    2.  **IDs:** For every ID selector (`#my-id`), you add 1 to the second column. (e.g., `(0,1,0,0)`).
    3.  **Classes, pseudo-classes, attribute selectors:** For every class (`.my-class`), pseudo-class (`:hover`), or attribute selector (`[type="text"]`), you add 1 to the third column. (e.g., `(0,0,1,0)`).
    4.  **Elements and pseudo-elements:** For every element (`div`, `p`) and pseudo-element (`::before`, `::after`), you add 1 to the fourth column. (e.g., `(0,0,0,1)`).
    The universal selector (`*`), combinators (`+`, `>`, `~`), and `:not()` do not add any specificity. When comparing selectors, you compare left to right. The selector with the higher score in the most significant column wins. For example, `#header .nav li a` has a specificity of (0,1,1,3) which is more specific than `ul li a` which is (0,0,0,3)."

**3. Difference between margin and padding with visual examples.**

- **Quick Note:** Padding is the space *inside* an element, between its content and its border. Margin is the space *outside* an element, separating it from other elements.

- **Well-Explained Answer:**
    "The difference is best understood by looking at an element's box model.
    - **Padding** is the inner space. If you have a `<div>` with a background color, padding increases the amount of that background color you see, pushing the content away from the edges. For example, if you have a box with a light blue background, adding `padding: 20px;` will create 20 pixels of light blue space between the text and the border of the box.
    - **Margin** is the outer space. It's the invisible 'buffer' around the element. Using the same light blue box, adding `margin: 20px;` will create 20 pixels of empty, transparent space *around* the box, pushing other page elements (like a paragraph below it) further away. It does not affect the element's background area.

    A simple analogy: A picture in a frame.
    - The **content** is the picture itself.
    - The **padding** is the matting (the border inside the frame) that separates the picture from the frame.
    - The **border** is the frame itself.
    - The **margin** is the space on the wall between this picture frame and the next one."

**4. How does position: relative vs absolute work?**

- **Quick Note:** `position: relative` positions an element relative to its normal position. `position: absolute` positions an element relative to its nearest positioned ancestor.

- **Well-Explained Answer:**
    "These two positioning schemes are often used together.
    - **`position: relative`:** When you set an element to `relative`, it stays in the normal document flow, meaning its original space is preserved. However, you can then use the offset properties (`top`, `right`, `bottom`, `left`) to move it *relative to where it would normally be*. The space it 'would have' occupied remains empty. It's often used as a positioning context for absolutely positioned children.
    - **`position: absolute`:** Setting an element to `absolute` removes it completely from the normal document flow—no space is created for it. It is then positioned relative to its closest **positioned ancestor**. A positioned ancestor is any element whose `position` is set to `relative`, `absolute`, `fixed`, or `sticky`. If no positioned ancestor exists, it positions itself relative to the `<html>` element (the initial containing block). This is incredibly useful for creating overlays, tooltips, or placing a 'close' button in the corner of a card."

**5. What is the difference between display: none and visibility: hidden?**

- **Quick Note:** `display: none` removes the element from the document flow, making it take up no space. `visibility: hidden` hides the element but its space remains occupied.

- **Well-Explained Answer:**
    "The key difference is how they affect the page layout.
    - **`display: none;`** : This property completely removes the element from the document flow. It's as if the element never existed in the HTML. The browser will render the page as if that element isn't there, so other elements will shift to fill its space. It is not accessible to screen readers.
    - **`visibility: hidden;`** : This property makes the element invisible, but it *still occupies its original space* in the layout. The browser leaves a blank hole where the element would have been. Other elements will not shift to fill the gap. It's like the element has turned invisible but its ghost is still there, reserving its spot on the page.
    Use `display: none` when you want to completely show/hide an element and allow the layout to re-flow. Use `visibility: hidden` when you want to hide something temporarily but keep the layout stable, like a hidden placeholder."

**6. How do you center elements horizontally and vertically?**

- **Quick Note:** The method depends on the display and context. Common techniques: `text-align: center` for inline, `margin: 0 auto` for block, Flexbox, and Grid.

- **Well-Explained Answer:**
    "There are several ways to center elements, and the best approach depends on whether the element is inline or block, and if you need horizontal or vertical centering.
    1.  **Horizontally:**
        - **Inline or Inline-block elements (like text or links):** Set `text-align: center;` on the **parent** container.
        - **Block-level element (like a div):** Set `margin: 0 auto;` on the element itself. It must have a defined width.
        - **Flexbox (on parent):** Set `display: flex;` and `justify-content: center;`.
    2.  **Vertically:**
        - **Single line of text:** Set the `line-height` to equal the container's `height`.
        - **Flexbox (most common):** On the parent, set `display: flex;` and `align-items: center;`. This centers the child vertically.
    3.  **Horizontally and Vertically (the 'perfect' center):**
        - **Grid:** On the parent, set `display: grid;` and `place-items: center;`. This is a one-line solution for centering the child both ways.
        - **Flexbox with both properties:** On the parent, set `display: flex;`, `justify-content: center;` (horizontal), and `align-items: center;` (vertical). Don't forget to set a height on the parent for vertical centering to work."

