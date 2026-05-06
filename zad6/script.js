// 77442 Volodymyr Doroshevych - zad6
fetch('data.json').then(r=>r.json()).then(data=>{skills.innerHTML=data.skills.map(s=>`<li>${s}</li>`).join('');projects.innerHTML=data.projects.map(p=>`<div class="card"><h4>${p.name}</h4><p>${p.description}</p></div>`).join('');}).catch(()=>{projects.innerHTML='<p class="error">Nie udało się pobrać danych JSON.</p>'});
