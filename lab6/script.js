const USERS_API = "https://dummyjson.com/users";
const COIND_API = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd";
const IPIFY_API = "https://api.ipify.org?format=json";

document.getElementById("load-users-form").addEventListener("click", getUsers);
document.getElementById("create-user-form").addEventListener("submit", createUser);
document.getElementById("update-user-form").addEventListener("submit", updateUser);
document.getElementById("delete-user-form").addEventListener("submit", deleteUser);

async function getUsers(){
  setState("users-result","Загрузка...");
  try{
    const res=await fetch(`${USERS_API}?limit=6`);
    const data=await res.json();
    renderUsers(data.users);
  }catch{
    setState("users-result","Ошибка GET");
  }
}

function renderUsers(users){
  const container=document.getElementById("users-result");
  container.innerHTML=users.map(u=>`ID:${u.id} ${u.firstName} ${u.lastName} (username: ${u.username})`).join("<br>");
}

async function createUser(e){
  e.preventDefault();
  const firstName=document.getElementById("new-user-name").value.trim();
  const lastName=document.getElementById("new-user-lastname").value.trim();
  if(!firstName || !lastName){ setState("users-result","Введите имя и фамилию"); return; }

  setState("users-result","Отправка POST...");
  try{
    const res=await fetch(`${USERS_API}/add`,{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({ firstName, lastName })
    });
    const data=await res.json();
    setState("users-result",`POST успешен: ID ${data.id}`);
    e.target.reset();
  }catch{
    setState("users-result","Ошибка POST");
  }
}

async function updateUser(e){
  e.preventDefault();
  const id=document.getElementById("update-id").value.trim();
  const newName=document.getElementById("update-name").value.trim();
  if(!id||!newName){ setState("users-result","Введите ID и новое имя"); return; }

  setState("users-result","Отправка PATCH...");
  try{
    const res=await fetch(`${USERS_API}/${id}`,{
      method:"PATCH",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({ firstName:newName })
    });
    const data=await res.json();
    setState("users-result",`PATCH успешен: ID ${id}`);
    e.target.reset();
  }catch{
    setState("users-result","Ошибка PATCH");
  }
}

async function deleteUser(e){
  e.preventDefault();
  const id=document.getElementById("delete-id").value.trim();
  if(!id){ setState("users-result","Введите ID для удаления"); return; }

  setState("users-result","Отправка DELETE...");
  try{
    await fetch(`${USERS_API}/${id}`,{method:"DELETE"});
    setState("users-result",`Пользователь ${id} удалён`);
    e.target.reset();
  }catch{
    setState("users-result","Ошибка DELETE");
  }
}

document.getElementById("load-btc").addEventListener("click", async()=>{
  setState("btc-state","Загрузка...");
  clearContainer("btc-result");
  try{
    const res=await fetch(COIND_API);
    const data=await res.json();
    document.getElementById("btc-result").textContent=`BTC/USD: ${data.bitcoin.usd}`;
    setState("btc-state","");
  }catch{
    setState("btc-state","Ошибка загрузки");
  }
});

document.getElementById("load-ip").addEventListener("click", async()=>{
  setState("ip-state","Загрузка...");
  clearContainer("ip-result");
  try{
    const res=await fetch(IPIFY_API);
    const data=await res.json();
    setState("ip-state","");
    document.getElementById("ip-result").textContent=`Ваш публичный IP: ${data.ip}`;
  }catch{
    setState("ip-state","Ошибка загрузки");
  }
});

function setState(id,text){document.getElementById(id).textContent=text;}
function clearContainer(id){document.getElementById(id).innerHTML="";}