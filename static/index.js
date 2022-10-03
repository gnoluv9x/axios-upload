const inputEl = document.getElementById("upload");
const form = document.getElementById("form");

// create instance axios
const instance = axios.create({
  timeout: 3 * 1000,
  baseUrl: "/",
  headers: {
    "Content-type": "multipart/form-data",
  },
});

if (inputEl) {
  inputEl.addEventListener("change", async e => {
    const file = e.target.files[0];
    const data = await instance.post("/profile", { avatar: file });
    console.log("data :", data);
  });
}

if (form) {
  form.addEventListener("submit", e => {
    e.preventDefault();
    const formData = new FormData(form);
    instance.post("/profile", formData);
  });
}
