import { Html } from "@elysiajs/html";
import { UserType } from "../database/schema";

export const EditUser = ({ id, name, email }: UserType) => (
  <tr hx-put={`/user/${id}`}
      hx-trigger={`click from:#submit-${id}`}
      hx-target="this"
      hx-swap="outerHTML"
      hx-include={`#edit-${id}-name, #edit-${id}-email`}>
    <td>{id}</td>
    <td>
      <input class="edit-cell" id={`edit-${id}-name`} type="text" name="name" value={name} />
    </td>
    <td>
      <input class="edit-cell" id={`edit-${id}-email`} type="email" name="email" value={email} />
    </td>
    <td>
      <button hx-get={`/user/${id}`}
              hx-target="closest tr"
              hx-swap="outerHTML"
              hx-params="none"
              id="cancel"
              class="btn btn-cancel">Cancel</button>
    </td>
    <td>
      <button type="submit" id={`submit-${id}`} class="btn btn-submit">Done</button>
    </td>
  </tr>
)