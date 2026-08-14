/**
 * Shared shapes for everything in /content.
 *
 * These are JSDoc typedefs, not TypeScript — you get autocomplete and
 * red squiggles in VS Code with zero build step. Each content file
 * imports the relevant typedef in a comment above its export.
 */

/**
 * @typedef {Object} Job
 * @property {string}   company
 * @property {string}   role
 * @property {string}   location
 * @property {string}   start      Display string, e.g. "Feb 2024"
 * @property {string}   end        Display string, or "Present"
 * @property {boolean} [current]   Pins the job to the top and shows a live dot
 * @property {string}  [url]       Company website — omit if none
 * @property {string}  [summary]   One line on what the work was
 * @property {string[]} highlights Bullet points. Plain sentences, no leading "•"
 * @property {string[]} [stack]    Technologies, rendered as chips
 */

/**
 * @typedef {Object} School
 * @property {string}  qualification
 * @property {string}  institution
 * @property {string}  location
 * @property {string}  start
 * @property {string}  end
 * @property {string} [note]
 */

/**
 * @typedef {Object} Project
 * @property {string}   slug        Stable id, also the React key
 * @property {string}   name
 * @property {string}   category    Must exist in projects.js `categories`
 * @property {string}   description
 * @property {string}   image
 * @property {string}  [github]
 * @property {string}  [live]       Deployed URL, if there is one
 * @property {string[]} [tags]
 * @property {boolean} [featured]   Surfaces it on the homepage
 */

/**
 * @typedef {Object} SkillGroup
 * @property {string}   title
 * @property {{ name: string, icon?: string }[]} items
 */

/**
 * @typedef {Object} Social
 * @property {string} label
 * @property {string} href
 * @property {string} icon   Key resolved in components/Socials.jsx
 */

export {};
