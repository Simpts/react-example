# Example React App

A toy expense tracker application example (in Swedish) built with React, Tailwind, Express and MySQL.

**Please note** that the server assumes the existence of a MySQL database containing an `expenses` table with an auto-incrementing PK `expense_id`, an `amount` column of type `DECIMAL(13,2)`, and a `description` column of type `VARCHAR(140)`.

## Running it locally

To run the project locally, start by cloning the project:

```bash
  git clone https://github.com/Simpts/react-example.git
```

Change directory to the project directory:

```bash
  cd react-example
```

Install the dependencies for both the client and server packages:

```bash
  cd server && npm i && cd ../client && npm i
```

Build the React app:

```bash
  npm run build
```

In the server directory, set up the required environment variables using the example file:

```bash
  cd ../server && mv .env.example .env && "${EDITOR:-vi}" $_
```

Finally, start the server:

```bash
  npm run start
```

## Improvements

The application is quite rudimentary and lacks several basic features, including:

- Full CRUD capabilities (only creation is currently possible)
- Server-side pagination
- User authentication & management
- Adding date stamps to expenses
- Grouping expenses by arbitrary categories
- Sorting by category, amount, date, et c.

## License

[MIT](https://choosealicense.com/licenses/mit/)
