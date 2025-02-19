# Smart Car Web App

## Overview

This is a web-based smart car application built with Next.js and TypeScript. It allows users to monitor and control various car devices through a REST API. The gateway server, responsible for handling requests, is managed in a [separate repository](https://github.com/gabrielfruet/gateway-iot).

## Features

- **Car Location**: View the car's real-time location on an interactive map.
- **Car Lock Status**: Check whether the car is locked or unlocked.
- **Temperature Sensor**: Monitor the car's current temperature.
- **Air Conditioner Control**: Turn the AC on or off, with temperature feedback.
- **Light Control**: Adjust the light brightness level (0-100).
- **Theme Support**: Light and dark mode support.

## Prerequisites

To run the application, ensure you have the following:

- Node.js
- A valid **Google Maps API Key**
- Access to the gateway REST API

## Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/kelvinleandro/smart-something-site.git
   cd smart-something-site
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Configure Environment Variables**:

   - Create a `.env` file in the root directory.
   - Add the following:
     ```env
     NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
     ```

4. **Run the Application**:
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:3000`.

## Usage

1. Open the web application in your browser.
2. Use the interactive dashboard to monitor and control car devices:
   - View the car's location on Google Maps.
   - Check and toggle the car lock status.
   - Monitor the temperature sensor.
   - Turn the air conditioner on or off.
   - Adjust the light brightness.
3. The UI automatically updates based on data from the gateway.

## Technologies Used

- **Next.js**
- **TypeScript**
- **Google Maps API** (for car location tracking)
- **Tailwind CSS** (for styling)
- **REST API** (for backend communication)
- **Axios** (for API requests)
- **ShadCN UI** (for UI components)

## Notes

- Ensure the gateway server is running and accessible.
- For further details on the gateway setup, refer to the [gateway repository](https://github.com/gabrielfruet/gateway-iot).

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
