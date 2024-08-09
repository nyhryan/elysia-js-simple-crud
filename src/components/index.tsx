import html from "@elysiajs/html";
import Elysia from "elysia";

export default new Elysia()
  .use(html())
  .get("/", () => (
    <>
      <head>
        <meta charset="UTF-8" />
        <title>sample sqlite</title>
        <script src="https://unpkg.com/htmx.org@2.0.1/dist/htmx.js" crossorigin="anonymous"></script>
        <link rel="stylesheet" href="/style.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="annonymous" />
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap" rel="stylesheet" />
      </head>
      <body>
        <h1>Add User record!</h1>
        <form hx-post="/user"
          hx-target="#user-list"
          hx-swap="beforeend">
          <div class="name-input">
            <label for="name">Name</label>
            <input type="text" name="name" id="name" />
          </div>
          <div class="email-input">
            <label for="email">Email</label>
            <input type="email" name="email" id="email" />
          </div>
          <button type="submit">Enter</button>
        </form>
        <table>
          <thead>
            <th>id</th>
            <th>name</th>
            <th>email</th>
            <th colspan={2}> - </th>
          </thead>
          <tbody hx-get="/user"
            hx-trigger="load"
            hx-swap="innerHTML"
            id="user-list">
          </tbody>
        </table>
      </body>
    </>
  ));