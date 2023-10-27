# OlympicGames

This project was made with [Angular CLI](https://github.com/angular/angular-cli) version 16

## Description

This project is designed to display a list of countries participating in the Olympic Games, along with relevant data and statistics.

## Usage

To visualize the data, we are using the ngx-charts library. ngx-charts is a powerful charting library that makes it easy to create stunning, interactive charts and graphs. You can find the documentation for ngx-charts [here](https://swimlane.github.io/ngx-charts/#/ngx-charts/bar-vertical).

## Installation

1. Clone the repository to your local machine.
2. Install the required dependencies using npm or yarn:
   ```bash
   npm install
   # or
   yarn install
   ```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Architecture

The architecture includes (in addition to the default angular architecture) the following:

- `components` folder: contains every reusable components
- `pages` folder: contains components used for routing
- `core` folder: contains the business logic (`services` and `models` folders)
