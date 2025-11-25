   document.addEventListener('DOMContentLoaded', function () {
            const matrix = document.getElementById('matrix');
            const dashes = [];
            let mouseX = window.innerWidth / 2;
            let mouseY = window.innerHeight / 2;
            let currentAngleMode = 'cursor'; // Modo por defecto
            const angleButtons = document.querySelectorAll('.angle-button');

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
                        baseHeight: sizeVariation,
                        // Para el modo aleatorio, guardamos un ángulo fijo
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
                    
                    switch(currentAngleMode) {
                        case 'cursor':
                            // Modo original: apuntar al cursor
                            const dx = mouseX - dash.x;
                            const dy = mouseY - dash.y;
                            angle = Math.atan2(dy, dx) * 180 / Math.PI + 90;
                            break;
                            
                        case 'opposite':
                            // Dirección opuesta al cursor
                            const dx2 = mouseX - dash.x;
                            const dy2 = mouseY - dash.y;
                            angle = Math.atan2(dy2, dx2) * 180 / Math.PI + 90 + 180;
                            break;
                            
                        case 'random':
                            // Ángulo aleatorio fijo para cada guión
                            angle = dash.randomAngle;
                            break;
                            
                        case 'center':
                            // Todos apuntan al centro de la pantalla
                            const centerX = window.innerWidth / 2;
                            const centerY = window.innerHeight / 2;
                            const dx3 = centerX - dash.x;
                            const dy3 = centerY - dash.y;
                            angle = Math.atan2(dy3, dx3) * 180 / Math.PI + 90;
                            break;
                    }

                    // Aplicamos la rotación
                    dash.element.style.transform = `rotate(${angle}deg)`;
                });
            }

            // Función para cambiar el modo de ángulo
            function setAngleMode(mode) {
                currentAngleMode = mode;
                
                // Actualizar botones activos
                angleButtons.forEach(button => {
                    if (button.dataset.angle === mode) {
                        button.classList.add('active');
                    } else {
                        button.classList.remove('active');
                    }
                });
                
                // Actualizar rotaciones
                updateAllRotations();
            }

            // Event listeners para los botones de ángulo
            angleButtons.forEach(button => {
                button.addEventListener('click', function() {
                    setAngleMode(this.dataset.angle);
                });
            });

            updateAllRotations();

            window.addEventListener('resize', function () {
                location.reload();
            });
        });