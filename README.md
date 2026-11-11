# My TypeTasks

A small, type-safe task tracker built with plain HTML, CSS and TypeScript. There are no frameworks or bundlers.

**Live demo:** https://typetasks-six.vercel.app/

## Features

- Add tasks (click Add or press Enter)
- Move a task forward: `todo` → `in-progress` → `done`
- Delete tasks
- Filter by `all`, `todo`, `in-progress` or `done`, with a count on each filter

## How it works

The app has two layers:

1. **Typed model (`model.ts`)** holds all the logic. Every task has this shape:

   ```ts
   type TaskStatus = "todo" | "in-progress" | "done";

   interface Task {
     id: number;
     title: string;
     status: TaskStatus;
   }
   ```

   Because `status` is a union of three exact values, something like `"finished"` is a compile error.

2. **Thin UI (`app.ts`)** connects the model to the page. Every click calls a model function, saves the new list, and redraws the page.

Model functions never change the old array. They return a new one.

| Function | What it does |
|---|---|
| `addTask` | Adds a new task with a unique id and status `todo` |
| `completeTask` | Sets a task's status to `done` |
| `filterByStatus` | Returns only tasks with a given status |
| `advanceTask` | Moves a task one step forward |
| `deleteTask` | Removes a task |
| `countByStatus` | Counts tasks with a given status |

## Project structure

```
├── index.html     page structure
├── style.css      styling
├── model.ts       typed data model and operations
├── app.ts         connects the model to the page
├── model.js       compiled output (committed for deployment)
├── app.js         compiled output (committed for deployment)
└── tsconfig.json  TypeScript settings (strict mode, ES modules)
```

## Run it locally

```bash
npm install --save-dev typescript   # first time only
npx tsc                             # compiles model.ts and app.ts
npx serve .                         # starts a local server
```

Then open the link it prints. Don't open `index.html` by double-clicking, because browsers block ES modules on `file://`.

## Deployment

Deployed with GitHub Pages. The compiled `model.js` and `app.js` are committed so the site can serve them directly.

## Built with

- TypeScript (strict mode)
- HTML and CSS