// 77442 Volodymyr Doroshevych - zad4
const themeBtn=document.querySelector('#themeBtn');const toggleBtn=document.querySelector('#toggleProjects');const projects=document.querySelector('#projects');themeBtn.addEventListener('click',()=>document.body.classList.toggle('red'));toggleBtn.addEventListener('click',()=>projects.classList.toggle('hidden'));
