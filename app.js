let data = JSON.parse(localStorage.getItem("desamor")) || [];
let grave = JSON.parse(localStorage.getItem("grave")) || [];
let editIndex = null;

function colorTox(v){
  let r = Math.min(255, v*2.5);
  let g = Math.max(0, 255 - v*2.5);
  return `rgb(${r},${g},80)`;
}

function render(){

  const list = document.getElementById("list");
  list.innerHTML = "";

  data.forEach((i,index)=>{

    const div = document.createElement("div");
    div.className="timeline-item";

    div.innerHTML=`
      <div class="timeline-left">
        <h4>${i.nombre}</h4>
        <small>${i.fecha}</small>
        <p>${i.historia}</p>

        <div class="tox-wrap">
          <div class="tox-bar">
            <div class="tox-fill" style="width:${i.tox}%;background:${colorTox(i.tox)}"></div>
          </div>
        </div>

        <button class="small-btn" onclick="edit(${index})">Editar</button>
        <button class="delete-btn" onclick="del(${index})">Borrar</button>
      </div>

      <div class="timeline-right">
        ${i.beso?"<span class='badge'>💋 beso</span>":""}
        ${i.ghost?"<span class='badge'>👻 ghosting</span>":""}
        ${i.red?"<span class='badge'>🚩 red flag</span>":""}
        ${i.cama?"<span class='badge'>🛏️ dormir</span>":""}
        ${i.tonteo?"<span class='badge'>😏 tonteo</span>":""}
        ${i.carrichoche?"<span class='badge'>🐾 carrichoche</span>":""}
      </div>
    `;

    list.appendChild(div);
  });

  const g = document.getElementById("graveyard");
  g.innerHTML = grave.map(x=>`💀 ${x.nombre} (${x.fecha})`).join("<br>");
}

function openModal(){
  document.getElementById("modal").classList.add("active");
}

function closeModal(){
  document.getElementById("modal").classList.remove("active");
}

function resetForm(){
  nombre.value="";
  fecha.value="";
  historia.value="";
  beso.checked=false;
  ghost.checked=false;
  red.checked=false;
  cama.checked=false;
  tonteo.checked=false;
  carrichoche.checked=false;
  tox.value=0;
}

function save(){

  const item={
    nombre:nombre.value,
    fecha:fecha.value,
    historia:historia.value,
    beso:beso.checked,
    ghost:ghost.checked,
    red:red.checked,
    cama:cama.checked,
    tonteo:tonteo.checked,
    carrichoche:carrichoche.checked,
    tox:tox.value
  };

  if(editIndex!==null){
    data[editIndex]=item;
  }else{
    data.unshift(item);
  }

  localStorage.setItem("desamor",JSON.stringify(data));

  editIndex = null;

  render();
  resetForm();
  closeModal();
}

function edit(i){

  const item=data[i];
  editIndex=i;

  nombre.value=item.nombre;
  fecha.value=item.fecha;
  historia.value=item.historia;

  beso.checked=item.beso;
  ghost.checked=item.ghost;
  red.checked=item.red;
  cama.checked=item.cama;
  tonteo.checked=item.tonteo;
  carrichoche.checked=item.carrichoche;
  tox.value=item.tox;

  openModal();
}

function del(i){

  grave.push(data[i]);
  data.splice(i,1);

  localStorage.setItem("grave",JSON.stringify(grave));
  localStorage.setItem("desamor",JSON.stringify(data));

  render();
}

render();
