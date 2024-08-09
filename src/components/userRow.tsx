import { Html } from "@elysiajs/html";
import { UserType } from "../database/schema";

export const UserRow = ({ id, name, email }: UserType) => (
  <tr hx-target="this" hx-swap="outerHTML">
    <td>{id}</td>
    <td>{Html.escapeHtml(name)}</td>
    <td>{Html.escapeHtml(email)}</td>
    <td>
      <button hx-get={`/edit/${id}`} class="btn">Edit</button>
    </td>
    <td>
      <button hx-delete={`/user/${id}`}
              hx-target="closest tr"
              hx-swap="outerHTML"
              class="btn">❌</button>
    </td>
  </tr>
);