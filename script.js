const $ = (s, p=document) => p.querySelector(s);
const $$ = (s, p=document) => [...p.querySelectorAll(s)];

const nav = $("#nav");
$(".menu-btn")?.addEventListener("click", () => nav.classList.toggle("open"));
$$("nav a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));

const glow = $(".cursor-glow");
window.addEventListener("pointermove", e => {
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("show");
  });
}, {threshold:.12});
$$(".reveal").forEach(el => observer.observe(el));

const terminalText = "sudo build --future";
let t = 0;
function typeTerminal(){
  const el = $(".typing");
  if (!el) return;
  el.textContent = terminalText.slice(0, t++);
  if (t > terminalText.length) { t = 0; setTimeout(typeTerminal, 1400); return; }
  setTimeout(typeTerminal, 85);
}
typeTerminal();

const projects = {
  ospf: {
    type:"NETWORKING LAB",
    title:"OSPF Multi Area",
    text:"Simulasi routing OSPF untuk memahami pertukaran route antar-area dengan Area 0 sebagai backbone dan beberapa area jaringan.",
    tech:["Cisco Packet Tracer","OSPF","IPv4","Routing"],
    note:"Project lab / pembelajaran networking."
  },
  vlan: {
    type:"NETWORKING LAB",
    title:"VLAN & Router-on-a-Stick",
    text:"Implementasi segmentasi jaringan menggunakan VLAN, trunking, DHCP, dan inter-VLAN routing agar beberapa jaringan dapat berkomunikasi melalui satu interface router.",
    tech:["VLAN","802.1Q","DHCP","Routing"],
    note:"Project lab / pembelajaran networking."
  },
  ftth: {
    type:"FIBER OPTIC",
    title:"FTTH Troubleshooting",
    text:"Praktik troubleshooting jaringan fiber optic dengan pengukuran OTDR, VFL, dan power meter untuk membantu menemukan indikasi loss serta titik gangguan.",
    tech:["FTTH","OTDR","VFL","Power Meter","ODP"],
    note:"Field-oriented project / pengalaman praktik."
  },
  portfolio: {
    type:"WEB DEVELOPMENT",
    title:"Personal Portfolio",
    text:"Website portfolio responsif yang menggabungkan profil profesional, pengalaman, skill, dan project dengan animasi ringan menggunakan HTML, CSS, dan JavaScript vanilla.",
    tech:["HTML","CSS","JavaScript","Responsive UI"],
    note:"Website ini adalah versi 2 dari personal portfolio."
  }
};

const modal = $("#projectModal");
function openProject(key){
  const p = projects[key];
  $("#modalType").textContent = p.type;
  $("#modalTitle").textContent = p.title;
  $("#modalText").textContent = p.text;
  $("#modalTech").innerHTML = p.tech.map(x => `<span>${x}</span>`).join("");
  $("#modalNote").textContent = p.note;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden","false");
  document.body.classList.add("modal-open");
}
function closeProject(){
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden","true");
  document.body.classList.remove("modal-open");
}
$$(".project-card").forEach(card => card.addEventListener("click", () => openProject(card.dataset.project)));
$(".modal-close").addEventListener("click", closeProject);
$(".modal-backdrop").addEventListener("click", closeProject);
window.addEventListener("keydown", e => { if(e.key === "Escape") closeProject(); });

$("#year").textContent = new Date().getFullYear();
