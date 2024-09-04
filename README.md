# Stocktaking

## Overview

Stocktaking is an angular-based web application designed to help bussiness owners manage their inventory efficiently. This a application provides features such as adding items, updating items, deleting items, and searching for items. The application also provides a dashboard to display the current stock levels of the items.

## Features

- Dashboard: Displays inventory statistics for each item, including the current stock level, average stock level, and total sales.

- Item Management: Allows users to add, update, and delete items. Users can also search for items by name or category.

- Order Management: Allows users to create and manage orders for items. Users can also search for orders by status or date.

- Stocks Levels: Monitor and update the stock levels of items in real-time.

- Reports: Generate reports on inventory levels, sales, and other statistics.

- User Management: Allow users to create, update, and delete user accounts.

- Responsive Design: Optimized for mobile devices.

## Technologies

- Front-end: Angular

- Back-end: Node.js, Express.js

- Database: MySQL

- Testing: Jest

- Documentation: Swagger

- Version Control: Git

- Code Quality: ESLint, Prettier

- Security: JWT

## Installation

1. Prerequisites
   - Node.js
   - MySQL
   - Git

2. Clone the repository
   ```bash
   git clone https://github.com/Ardacun/stocktaking.git
   ```

3. Install dependencies
   ```bash
   npm install
   ```

### Configuration

1. API Endpoint : Update the API endpoint in the `src/environments/environment.ts` file.
   
```typescript
export const environment = {
  production: false,
  apiEndpoint: 'http://localhost:3000/api',
};
```
Environment variables can be set in the `.env` file.

### Running the Application

1. Start the server
   ```bash
   ng serve
   ```

### Running the Tests

1. Run the tests
   ```bash
   ng test
   ```

### Running End-to-End Tests

End-to-end tests are written using Protractor. To run the tests, first start the server and then run the tests using the following command:
```bash
ng e2e
```

## Deployment

The application can be deployed to a server using the following steps:

1. Build the application
   ```bash
   ng build --prod
   ```

## License

This project is open source software.

## Contact

For any questions or issues, please contact the author.