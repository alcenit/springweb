document.addEventListener('DOMContentLoaded', function () {
    const matrix = document.getElementById('matrix');
    const dashes = [];
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    const cols = 20;
    const rows = 10;
    const cellWidth = window.innerWidth / cols;
    const cellHeight = window.innerHeight / rows;

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const dash = document.createElement('div');
            dash.classList.add('dash');

            const x = j * cellWidth + cellWidth / 2;
            const y = i * cellHeight + cellHeight / 2;

            dash.style.left = `${x}px`;
            dash.style.top = `${y}px`;

            // Esta parte se mantiene para dar una variación inicial al tamaño
            const sizeVariation = cellWidth - (cellWidth / 4);//-celWidth/4 para restar un porcentaje de ancho de celda 
            dash.style.height = `${ sizeVariation}px`;
            dash.style.opacity = 0.6 + Math.random() * 0.4;

            matrix.appendChild(dash);
            dashes.push({
                element: dash,
                x: x,
                y: y,
                // Guardamos la altura inicial, pero ya no la usaremos para cambiarla dinámicamente
                baseHeight: sizeVariation
            });
        }
    }

    document.addEventListener('mousemove', function (e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        updateAllRotations();
    });

    // --- FUNCIÓN ROTACION ---
    function updateAllRotations() {
        dashes.forEach(dash => {
            const dx = mouseX - dash.x;
            const dy = mouseY - dash.y;
            //alternativa rotacion.los dash se orientan en forma circular
           // const angle = Math.atan2(dy, dx) * 180 / Math.PI;
                     
            const angle = Math.atan2(dy, dx) * 180 / Math.PI + 90;

            // Únicamente aplicamos la rotación
            dash.element.style.transform = `rotate(${angle}deg)`;

            // --- LÍNEAS ELIMINADAS ---
            // const distance = Math.sqrt(dx * dx + dy * dy);
            // const maxDistance = Math.sqrt(window.innerWidth * window.innerWidth + window.innerHeight * window.innerHeight);
            // const scale = 0.7 + (1 - distance / maxDistance) * 0.6;
            // dash.element.style.height = `${dash.baseHeight * scale}px`;
        });
    }

    updateAllRotations();

    window.addEventListener('resize', function () {
        location.reload();
    });
});