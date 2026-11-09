// Replace this placeholder with your student email before submitting.
export const DEMO_USERNAME = "student@university.edu";
export const DEMO_PASSWORD = "demo123456";

export function login(username, password) {
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      if (username === DEMO_USERNAME && password === DEMO_PASSWORD) {
        resolve({ username });
      } else {
        reject(new Error("Invalid credentials"));
      }
    }, 500);
  });
}
