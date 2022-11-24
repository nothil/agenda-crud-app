import axios from "axios";

export const event = axios.create({
  baseURL: "http://localhost:5000/events",

  validateStatus: (status) => {
    let correct = false;

    if (status >= 200 && status <= 403) {
      correct = true;
    } else if (status === 422) {
      correct = true;
    }

    return correct;
  },
});

export function post(url, data) {
  return event.post(url, data);
}
