import { Elysia } from "elysia";
import logixlysia from "logixlysia";
import { html } from "@elysiajs/html";
import { staticPlugin } from "@elysiajs/static";
import * as api from "./api/user";
import index from "./components/index";

// Create new Server instance
new Elysia()
  .use(html())
  .use(staticPlugin({
    prefix: "/",
    assets: "public"
  })) // static serve "./public" folder to "/" route
  .use(logixlysia())
  .use(index)           // GET / - returns the index page
  .use(api.getUser)     // GET /user - returns all users
  .use(api.postUser)    // POST /user - creates a new user
  .use(api.deleteUser)  // DELETE /user/:id - deletes a user by id
  .use(api.getEditUserForm)
  .use(api.updateUser)
  .use(api.getUserById)
  .listen(3000, ({ port, hostname }) => console.log(`🦊 Elysia is running at http://${hostname}:${port}`));