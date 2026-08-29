<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>CHAMBAGO - Servicios al toque</title>
<style>
  body{font-family:Arial,sans-serif;background:#0a0a0a;color:#fff;margin:0;padding:20px}
  .card{background:#1a1a1a;padding:20px;border-radius:12px;margin-bottom:15px;border:1px solid #333}
  input,select,button{width:100%;padding:12px;margin:8px 0;border-radius:8px;border:1px solid #444;background:#222;color:#fff}
  button{background:#00ff88;color:#000;font-weight:bold;border:none;cursor:pointer}
  button:hover{background:#00cc66}
  h1{color:#00ff88;text-align:center}
  .logo{font-size:28px;font-weight:bold}
  a{color:#00ff88;text-decoration:none}
</style>
</head>
<body>
  <h1 class="logo">CHAMBAGO</h1>
  <div class="card">
    <h2>Pide tu servicio</h2>
    <input type="text" id="nombre" placeholder="Tu nombre">
    <input type="text" id="cel" placeholder="Tu celular">
    <select id="servicio">
      <option>Plomería</option>
      <option>Electricidad</option>
      <option>Gasfitería</option>
      <option>Limpieza</option>
      <option>Carpintería</option>
    </select>
    <input type="text" id="direccion" placeholder="Tu dirección">
    <button onclick="pedir()">Pedir ahora</button>
  </div>
  <div id="estado" class="card" style="display:none"></div>
  <center><a href="pro.html">Soy Técnico</a> | <a href="admin.html">Admin</a></center>

<script>
function pedir(){
  const data = {
    nombre: document.getElementById('nombre').value,
    cel: document.getElementById('cel').value,
    servicio: document.getElementById('servicio').value,
    direccion: document.getElementById('direccion').value,
    estado: 'Pendiente',
    fecha: new Date().toLocaleString()
  };
  localStorage.setItem('pedido_'+Date.now(), JSON.stringify(data));
  document.getElementById('estado').style.display='block';
  document.getElementById('estado').innerHTML='<h3>✅ Pedido enviado</h3><p>Un técnico te contactará pronto</p>';
}
</script>
</body>
</html><!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>CHAMBAGO PRO</title>
<style>
  body{font-family:Arial,sans-serif;background:#0a0a0a;color:#fff;margin:0;padding:20px}
  .card{background:#1a1a1a;padding:15px;border-radius:12px;margin-bottom:12px;border:1px solid #333}
  button{padding:10px 15px;border-radius:8px;border:none;background:#00ff88;color:#000;font-weight:bold;cursor:pointer;margin-right:5px}
  h1{color:#00ff88}
  a{color:#00ff88}
</style>
</head>
<body>
  <h1>CHAMBAGO PRO</h1>
  <a href="index.html">Volver</a>
  <div id="lista"></div>

<script>
function cargar(){
  const lista = document.getElementById('lista');
  lista.innerHTML='';
  for(let i=0; i<localStorage.length; i++){
    const key = localStorage.key(i);
    if(key.startsWith('pedido_')){
      const data = JSON.parse(localStorage.getItem(key));
      lista.innerHTML += `
      <div class="card">
        <b>${data.servicio}</b><br>
        Cliente: ${data.nombre}<br>
        Cel: ${data.cel}<br>
        Dir: ${data.direccion}<br>
        Fecha: ${data.fecha}<br>
        Estado: <b>${data.estado}</b><br><br>
        <button onclick="aceptar('${key}')">Aceptar</button>
      </div>`;
    }
  }
}
function aceptar(key){
  let data = JSON.parse(localStorage.getItem(key));
  data.estado = 'Aceptado';
  localStorage.setItem(key, JSON.stringify(data));
  cargar();
}
cargar();
setInterval(cargar, 3000);
</script>
</body>
</html><!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>CHAMBAGO ADMIN</title>
<style>
  body{font-family:Arial,sans-serif;background:#0a0a0a;color:#fff;margin:0;padding:20px}
  .card{background:#1a1a1a;padding:15px;border-radius:12px;margin-bottom:12px;border:1px solid #00ff88}
  h1{color:#00ff88}
  .stat{font-size:24px;font-weight:bold;color:#00ff88}
  .stats{display:flex;gap:15px;flex-wrap:wrap}
  a{color:#00ff88}
</style>
</head>
<body>
  <h1>CHAMBAGO ADMIN</h1>
  <a href="index.html">Volver</a>
  <div class="card stats">
    <div>Total: <span id="total" class="stat">0</span></div>
    <div>Pendientes: <span id="pend" class="stat">0</span></div>
    <div>Aceptados: <span id="acep" class="stat">0</span></div>
  </div>
  <div id="lista"></div>

<script>
function cargar(){
  let total=0, pend=0, acep=0;
  const lista = document.getElementById('lista');
  lista.innerHTML='';
  for(let i=0; i<localStorage.length; i++){
    const key = localStorage.key(i);
    if(key.startsWith('pedido_')){
      total++;
      const data = JSON.parse(localStorage.getItem(key));
      if(data.estado=='Pendiente') pend++;
      if(data.estado=='Aceptado') acep++;
      lista.innerHTML += `<div class="card">${data.fecha}<br><b>${data.servicio}</b> - ${data.nombre} - ${data.estado}</div>`;
    }
  }
  document.getElementById('total').innerText=total;
  document.getElementById('pend').innerText=pend;
  document.getElementById('acep').innerText=acep;
}
cargar();
setInterval(cargar, 3000);
</script>
</body>
</html>
