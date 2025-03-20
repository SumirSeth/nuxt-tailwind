# nuxt-tailwind

Automates Tailwind CSS v4 setup in Nuxt projects.

<u>Note</u>: Intended be used with freshly created Nuxt projects, even thought it can be used with existing projects.

## Usage

```bash
npx nuxt-tailwind
```

## Working

- Installs Tailwind CSS v4 dependencies.
- Modifies `nuxt.config.ts` to include Tailwind CSS v4 configuration.
- Creates a `main.css` file in the `assets/css` directory with proper imports.
- Avoid conflicts with existing Tailwind CSS configurations if found in `package.json`.

> After running the command, start or restart your Nuxt development server.

Made with ❤️ by [Sumir Seth](https://github.com/sumirseth).
