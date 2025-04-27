# Boardify

**An Extendable React + Tauri Desktop App for Organizing Media on an Infinite Board**

<img src="app-icon.png" width="100" height="100" alt="Boardify Icon">

![GitHub last commit](https://img.shields.io/github/last-commit/bluepixeldev/boardify)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/BluePixelDev/boardify)
![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/bluepixeldev/boardify/release.yml?branch=release)
![GitHub Release](https://img.shields.io/github/v/release/bluepixeldev/boardify)

## Overview

**Boardify** is a cross-platform desktop application that lets you sort, arrange, and manage reference material such as **images**, **videos**, and other media files on a limitless, zoomable canvas. Built with **React** and powered by **Tauri**, it offers a lightweight yet powerful interface for creative professionals, researchers, and digital collectors.

Whether you're designing a moodboard, organizing research, or managing project assets—Boardify turns your screen into an intuitive infinite whiteboard.

## Features

- **Infinite Canvas** — A boundless space to visually arrange media just how you want it.
- **Drag & Drop Media** — Quickly import images, videos, and more with intuitive controls.
- **Modular & Extendable** — Designed with a plugin-ready architecture for future expansions.
- **Lightweight & Fast** — Built with Tauri for native speed and low system resource usage.
- **React UI** — Clean and customizable interface using modern web technologies.

## Tech Stack

- **Frontend:** React
- **Backend/Container:** Tauri (Rust + WebView)
- **Build System:** Cross-platform support for Windows, macOS, and Linux

## Use Cases

- Moodboards and inspiration boards
- Visual planning and project scoping
- Academic and research media references
- Design asset organization
- Collecting and curating creative resources

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/BluePixelDev/boardify.git
cd boardify
```

2. Install dependencies:

```bash
npm install -g pnpm
pnpm install
```

3. Run the app:

```bash
npm run tauri dev
```

> **Note**: Make sure you have all [Tauri prerequisites](https://tauri.app/v1/guides/getting-started/prerequisites) installed.

## Roadmap

- Support for more file types (PDF, audio, documents)
- Search and tagging system
- Plugin API for custom tools
- Markdown notes

## Contributing

We welcome contributions from the community! Whether it's a bug fix, feature request, or documentation update—feel free to fork the repo and submit a pull request.

---

## License

[License](https://github.com/BluePixelDev/boardify/blob/main/LICENSE)

---

> "Boardify is a desktop app for organizing reference material such as images, videos, and other media on an infinite board."
