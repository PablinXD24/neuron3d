let scale = 1;
let targetScale = 1;

document.addEventListener('mousemove', function (e) {
    const posterContainer = document.querySelector('.poster-container');
    const rect = posterContainer.getBoundingClientRect();
    const xAxis = (e.clientX - rect.left - rect.width / 2) / 10;
    const yAxis = -(e.clientY - rect.top - rect.height / 2) / 10;
    posterContainer.dataset.xAxis = xAxis;
    posterContainer.dataset.yAxis = yAxis;
    posterContainer.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg) scale(${scale})`;
});

document.addEventListener('mouseleave', function () {
    const posterContainer = document.querySelector('.poster-container');
    posterContainer.dataset.xAxis = 0;
    posterContainer.dataset.yAxis = 0;
    posterContainer.style.transform = 'rotateY(0deg) rotateX(0deg) scale(1)';
});

document.addEventListener('wheel', function (e) {
    e.preventDefault();
    targetScale += e.deltaY * -0.001;
    targetScale = Math.min(Math.max(1, targetScale), 2); // Limita o zoom entre 1x e 2x
});

function animate() {
    const posterContainer = document.querySelector('.poster-container');
    scale += (targetScale - scale) * 0.05; // Suaviza a transição do zoom
    posterContainer.style.transform = `rotateY(${posterContainer.dataset.xAxis || 0}deg) rotateX(${posterContainer.dataset.yAxis || 0}deg) scale(${scale})`;
    requestAnimationFrame(animate);
}

animate();
