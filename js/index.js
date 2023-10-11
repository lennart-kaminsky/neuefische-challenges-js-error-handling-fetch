console.clear();

const userElement = document.querySelector(".user");
const errorElement = document.querySelector(".error");

async function loadUser(url) {
  console.log(url);
  const response = await fetch(url);
  if (!response.ok) {
    errorElement.textContent = "Network Error!";
    userElement.innerHTML = "";
    // throw new Error("Network Error");
    // console.log("Network error");
    return null; //default
  }
  try {
    const json = await response.json();
    const user = json.data;
    userElement.innerHTML = `
    <h2>${user.first_name} ${user.last_name}</h2>
    <img alt="${user.first_name} ${user.last_name}" src="${user.avatar}"/>
    `;

    errorElement.innerHTML = "";
  } catch (error) {
    console.log(error);
    userElement.innerHTML = "";
    errorElement.textContent = "Error parsing JSON";
  }
}

document
  .querySelectorAll("button[data-url]")
  .forEach((button) =>
    button.addEventListener("click", (event) =>
      loadUser(event.target.dataset.url)
    )
  );
