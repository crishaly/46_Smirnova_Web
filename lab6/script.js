document.addEventListener("DOMContentLoaded", () => {
  const COIND_API = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd";
  const IPIFY_API = "https://api.ipify.org?format=json";
  let usersData = [];
  document.getElementById("load-users-form").addEventListener("click", getUsers);
  document.getElementById("create-user-form").addEventListener("submit", handleCreateUser);
  document.getElementById("update-user-form").addEventListener("submit", handleUpdateUser);
  document.getElementById("delete-user-form").addEventListener("submit", handleDeleteUser);
  document.getElementById("refresh-users").addEventListener("click", showLocalUsers);

  document.getElementById("load-btc").addEventListener("click", async () => {
    setState("btc-state", "Загрузка...");
    clearContainer("btc-result");
    try {
      const res = await fetch(COIND_API);
      const data = await res.json();
      document.getElementById("btc-result").textContent = `BTC/USD: ${data.bitcoin.usd}`;
      setState("btc-state", "");
    } catch {
      setState("btc-state", "Ошибка загрузки");
    }
  });

  document.getElementById("load-ip").addEventListener("click", async () => {
    setState("ip-state", "Загрузка...");
    clearContainer("ip-result");
    try {
      const res = await fetch(IPIFY_API);
      const data = await res.json();
      setState("ip-state", "");
      document.getElementById("ip-result").textContent = `Ваш публичный IP: ${data.ip}`;
    } catch {
      setState("ip-state", "Ошибка загрузки");
    }
  });

  async function getUsers() {
    setState("users-result", "Загрузка...");
    try {
      const res = await fetch("https://dummyjson.com/users?limit=6");
      const data = await res.json();
      usersData = data.users.map(u => ({
        id: u.id,
        firstName: u.firstName,
        lastName: u.lastName,
        username: u.username || u.firstName.toLowerCase()
      }));
      renderUsers(usersData);
    } catch {
      setState("users-result", "Ошибка GET");
    }
  }

  function handleCreateUser(e) {
    e.preventDefault();
    const firstName = document.getElementById("new-user-name").value.trim();
    const lastName = document.getElementById("new-user-lastname").value.trim();
    if (!firstName || !lastName) {
      setState("users-result", "Введите имя и фамилию");
      return;
    }

    const newUser = {
      id: Date.now(),
      firstName,
      lastName,
      username: firstName.toLowerCase()
    };
    usersData.push(newUser);
    renderUsers(usersData);
    setState("users-result", "Пользователь добавлен локально");
    e.target.reset();
  }

  function handleUpdateUser(e) {
    e.preventDefault();
    const id = parseInt(document.getElementById("update-id").value.trim());
    const newName = document.getElementById("update-name").value.trim();
    if (!id || !newName) {
      setState("users-result", "Введите ID и новое имя");
      return;
    }

    const user = usersData.find(u => u.id === id);
    if (user) {
      user.firstName = newName;
      renderUsers(usersData);
      setState("users-result", "Пользователь обновлён локально");
      e.target.reset();
    } else {
      setState("users-result", "Пользователь с таким ID не найден");
    }
  }

  function handleDeleteUser(e) {
    e.preventDefault();
    const id = parseInt(document.getElementById("delete-id").value.trim());
    if (!id) {
      setState("users-result", "Введите ID для удаления");
      return;
    }

    const exists = usersData.some(u => u.id === id);
    if (exists) {
      usersData = usersData.filter(u => u.id !== id);
      renderUsers(usersData);
      setState("users-result", "Пользователь удалён локально");
      e.target.reset();
    } else {
      setState("users-result", "Пользователь с таким ID не найден");
    }
  }

  function showLocalUsers() {
    renderUsers(usersData);
  }

  function renderUsers(users) {
    const container = document.getElementById("users-result");
    if (!users || users.length === 0) {
      container.innerHTML = "Пользователей нет.";
      return;
    }
    container.innerHTML = "<b>список пользователей:</b><br>" +
      users.map(u => `ID: ${u.id} ${u.firstName} ${u.lastName} (username: ${u.username})`).join("<br>");
  }

  function setState(id, text) {
    document.getElementById(id).textContent = text;
  }

  function clearContainer(id) {
    document.getElementById(id).innerHTML = "";
  }
});