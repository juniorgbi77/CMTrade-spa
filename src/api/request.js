import { makeRequest } from "./http";

export default {
  form: (data) => makeRequest("post", "/form", data),
};
