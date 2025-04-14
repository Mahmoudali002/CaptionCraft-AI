{# CaptionCraft AI

## Project Description

CaptionCraft AI is a mobile application designed to generate high-quality social media captions using the Google Gemini Flash 2 API. The application supports multiple platforms, including Instagram, X (formerly Twitter), LinkedIn, and Facebook. Users can input a theme, target audience, and desired tone (e.g., funny, professional, persuasive), and the app will produce 3–5 caption variations optimized for engagement.

## Core Features

-   **Input Configuration**: Simple input fields for theme, target audience, tone, and platform (Instagram, X, LinkedIn, Facebook).
-   **AI Caption Generation**: Generates 3-5 caption variations using the Google Gemini Flash 2 API based on user input.
-   **Caption Display and Actions**: Displays generated captions in a scrollable list with options to copy, save, and regenerate.
-   **Save Captions**: Allows users to save favorite captions for later use, organized by platform and theme.
-   **Performance Feedback**: AI-powered tool that analyzes caption performance and provides suggestions for improvement.

## Getting Started

Follow these instructions to get your development environment set up:

### Prerequisites

-   Node.js (v18 or higher)
-   npm (v8 or higher) or yarn
-   A Google Gemini API key

### Installation

1.  Clone the repository:

    ```bash
    git clone <repository-url>
    cd nextn
    ```

2.  Install the dependencies:

    ```bash
    npm install
    # or
    yarn install
    ```

3.  Set up your environment variables:

    -   Create a `.env` file in the root directory.
    -   Add your Google Gemini API key:

        ```
        GOOGLE_GENAI_API_KEY=YOUR_API_KEY
        ```

### Running the Application

1.  Start the development server:

    ```bash
    npm run dev
    # or
    yarn dev
    ```

2.  Open your browser and navigate to `http://localhost:9002`.

## Environment Variables

Make sure to set the following environment variables in your `.env` file:

-   `GOOGLE_GENAI_API_KEY`: Your Google Gemini API key.

## Available Scripts

-   `dev`: Runs the Next.js development server with turbopack on port 9002.
-   `genkit:dev`: Starts the Genkit development server.
-   `genkit:watch`: Starts the Genkit development server with file watching.
-   `build`: Builds the Next.js application for production.
-   `start`: Starts the Next.js production server.
-   `lint`: Runs the linter.
-   `typecheck`: Runs TypeScript type checking.

## Contributing

We welcome contributions to CaptionCraft AI! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch with a descriptive name.
3.  Make your changes and commit them with clear, concise messages.
4.  Submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
