# My Deals App Documentation

## Overview

The "Deals Table" is developed using TypeScript and Vite. It is designed to manage and display deal-related information. Here we leverages technologies such as Pinia, Vue-i18n, and Tailwind.

## Project Structure

- **[src/](file:///Users/arka160/Development/Reorg/my-deals-app/src/modules/i18n.ts#1%2C4-1%2C4)**: Contains the source code of the application.
  - **[components/](file:///Users/arka160/Development/Reorg/my-deals-app/src/containers/Deals.vue#3%2C31-3%2C31)**: Reusable Vue components.
  - **[containers/](file:///Users/arka160/Development/Reorg/my-deals-app/src/App.vue#2%2C31-2%2C31)**: Larger Vue components that may contain multiple smaller components.
  - **[types/](file:///Users/arka160/Development/Reorg/my-deals-app/src/containers/DealDetails.vue#3%2C25-3%2C25)**: TypeScript interfaces and types.
  - **[modules/](file:///Users/arka160/Development/Reorg/my-deals-app/src/main.ts#10%2C22-10%2C22)**: JavaScript modules like Pinia stores and i18n setup.
  - **[assets/](file:///Users/arka160/Development/Reorg/my-deals-app/src/main.ts#8%2C11-8%2C11)**: Static assets like stylesheets and images.
- **`tests/`**: Contains test files.
- **`locales/`**: JSON files for internationalization.

## Setup and Running the Project

### Prerequisites

- Node.js.
- npm.

### Installation

To install the dependencies, navigate to the project directory and run:

```bash
npm install
```

### Development

To start the development server, run:

```bash
npm run dev
```

This command will start a local server with hot reloading.

### Building for Production

To create a production build, use:

```bash
npm run build
```

This will generate a `dist/` folder with optimized files ready to be deployed.

### Running Tests

Execute the following command to run the unit tests:

```bash
npm run test
```

## Additional Information

- **Vue 3 `<script setup>`**: The application uses the `<script setup>` syntax for SFCs, which provides a more concise and feature-rich way to write component logic.
- **TypeScript**: Enhances development by adding static type checking.
- **Tailwind CSS**: Utilized for rapid UI development with utility-first CSS classes.

For more information, refer to the official documentation:

- [Vue 3](https://v3.vuejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Pinia](https://pinia.vuejs.org/)
- [Vue-i18n](https://vue-i18n.intlify.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
