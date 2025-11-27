document.addEventListener('DOMContentLoaded', function () {
    const matrix = document.getElementById('matrix');
    const dashes = [];
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentAngleMode = 'cursor';

    const cols = 50;
    const rows = 25;
    const cellWidth = window.innerWidth / cols;
    const cellHeight = window.innerHeight / rows;

    // Inicializar controles de interfaz
    initializeAngleControls();

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const dash = document.createElement('div');
            dash.classList.add('dash');

            const x = j * cellWidth + cellWidth / 2;
            const y = i * cellHeight + cellHeight / 2;

            dash.style.left = `${x}px`;
            dash.style.top = `${y}px`;

            const sizeVariation = cellWidth - (cellWidth / 4);
            dash.style.height = `${sizeVariation}px`;
            dash.style.opacity = 0.6 + Math.random() * 0.4;

            matrix.appendChild(dash);
            dashes.push({
                element: dash,
                x: x,
                y: y,
                baseHeight: sizeVariation,
                randomAngle: Math.random() * 360
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
            let angle;
            const dx = mouseX - dash.x;
            const dy = mouseY - dash.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            switch (currentAngleMode) {
                case 'cursor':
                    angle = Math.atan2(dy, dx) * 180 / Math.PI + 90;
                    break;

                case 'logaritmica':
                    const baseAngleLog = Math.atan2(dy, dx) * 180 / Math.PI;
                    const spiralFactorLog = Math.log(distance + 1) * 50;
                    angle = baseAngleLog + spiralFactorLog + 90;
                    break;

                case 'arquimediana':
                    const baseAngleArq = Math.atan2(dy, dx) * 180 / Math.PI;
                    const spiralFactorArq = distance * 0.5;
                    angle = baseAngleArq + spiralFactorArq + 90;
                    break;

                case 'espiralCircular':
                    const baseAngleCirc = Math.atan2(dy, dx) * 180 / Math.PI;
                    const spiralFactorCirc = distance * 0.3;
                    const waveFactor = Math.sin(distance * 0.02) * 90;
                    angle = baseAngleCirc + spiralFactorCirc + waveFactor + 90;
                    break;

                case 'vortex':
                    const baseAngleVortex = Math.atan2(dy, dx) * 180 / Math.PI;
                    const vortexFactor = Math.pow(distance, 1.2) * 0.8;
                    angle = baseAngleVortex + vortexFactor + 90;
                    break;

                case 'vectorial':
                    const time = Date.now() * 0.001;
                    const baseAngleVec = Math.atan2(dy, dx) * 180 / Math.PI;
                    const spiralVec = distance * 0.4;
                    const waveVec = Math.sin(distance * 0.01 - time) * 45;
                    const swirl = Math.cos(dash.x * 0.01) * Math.sin(dash.y * 0.01) * 30;
                    angle = baseAngleVec + spiralVec + waveVec + swirl + 90;
                    break;

                case 'random':
                    angle = dash.randomAngle;
                    break;

                case 'center':
                    const centerX = window.innerWidth / 2;
                    const centerY = window.innerHeight / 2;
                    const dxCenter = centerX - dash.x;
                    const dyCenter = centerY - dash.y;
                    angle = Math.atan2(dyCenter, dxCenter) * 180 / Math.PI + 90;
                    break;

                default:
                    angle = Math.atan2(dy, dx) * 180 / Math.PI + 90;
                    break;
            }

            dash.element.style.transform = `rotate(${angle}deg)`;
        });
    }

    function initializeAngleControls() {
        const angleButtons = document.querySelectorAll('.angle-button');
        const modeDisplay = document.getElementById('currentModeDisplay');
        
        const modeLabels = {
            'cursor': 'Apuntar al Cursor',
            'logaritmica': 'Espiral Logarítmica',
            'arquimediana': 'Espiral Arquimediana',
            'espiralCircular': 'Espiral Circular',
            'vortex': 'Espiral Vortex',
            'vectorial': 'Campo Vectorial',
            'random': 'Ángulo Aleatorio',
            'center': 'Hacia el Centro'
        };

        angleButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remover clase active de todos los botones
                angleButtons.forEach(btn => btn.classList.remove('active'));
                // Agregar clase active al botón clickeado
                this.classList.add('active');
                
                // Cambiar modo
                currentAngleMode = this.dataset.angle;
                modeDisplay.textContent = modeLabels[currentAngleMode];
                
                // Actualizar rotaciones
                updateAllRotations();
            });
        });
    }

    updateAllRotations();

    // Animación continua para modos que necesitan actualización temporal
    function animate() {
        if (currentAngleMode === 'vectorial') {
            updateAllRotations();
        }
        requestAnimationFrame(animate);
    }
    animate();

    window.addEventListener('resize', function () {
        location.reload();
    });
});