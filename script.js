const { ip, bedrock, discord } = document.body.dataset;
const $ = (id) => document.getElementById(id);

$("ip").textContent = ip;
$("port").textContent = bedrock;
if (discord) {
  $("discord").href = discord;
  $("discord").hidden = false;
}

$("copy").onclick = async () => {
  try {
    await navigator.clipboard.writeText(ip);
    $("hint").textContent = "copied!";
  } catch {
    $("hint").textContent = "copy it by hand: " + ip;
  }
  setTimeout(() => ($("hint").textContent = "tap to copy the IP"), 2500);
};

async function check() {
  const box = $("status"), text = box.querySelector("span");
  try {
    const s = await (await fetch("https://api.mcsrvstat.us/3/" + encodeURIComponent(ip))).json();
    box.className = "status " + (s.online ? "on" : "off");
    text.textContent = s.online ? `${s.players.online} playing right now` : "server is offline right now";
  } catch {
    box.className = "status";
    text.textContent = "couldn't check the server";
  }
}
check();
setInterval(check, 60000);
