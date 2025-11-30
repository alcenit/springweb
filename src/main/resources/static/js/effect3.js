document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    
    // Ajustar el canvas al tamaño de la ventana
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Configuración
    const circles = [];
    const numCircles = 8; // Número de círculos concéntricos
    const dotsPerCircle = 1; // Número de puntos por círculo
    const trailLength = 60; // Longitud de la estela
    const baseRadius = 30; // Radio del círculo más interno
    const radiusStep = 50; // Incremento del radio por cada círculo
    
    // Colores para los diferentes círculos
    const colors = ['#237373', '#294E4F', '#2E282A', '#7E3E2F', '#CD5334', '#DD3B1C', '#FA0F19', '#EFBE96'];
    
    // Inicializar círculos y puntos
    for (let i = 0; i < numCircles; i++) {
        const radius = baseRadius + i * radiusStep;
       // const speed = 0.002 + i * 0.001; // Velocidad angular, diferente por círculo
       // const speed = 0.005 - (i * 0.0005); // Velocidad decreciente
        const speed = 0.005 * (baseRadius + (numCircles * radiusStep)) / radius;
        const color = colors[i % colors.length];
        
        for (let j = 0; j < dotsPerCircle; j++) {
            const angle = (j / dotsPerCircle) * Math.PI * 2;
            circles.push({
                radius: radius,
                angle: angle,
                speed: speed,//* (Math.random() > 0.5 ? 1 : -1), // Sentido aleatorio
                color: color,
                trail: [] // Array para almacenar las posiciones de la estela
            });
        }
    }
    
    // Función de animación
    function animate() {
        // Limpiar el canvas con un fondo semi-transparente para el efecto de estela
        ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Centro del canvas
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        
        // Actualizar y dibujar cada punto
        circles.forEach(circle => {
            // Actualizar ángulo
            circle.angle += circle.speed;
            
            // Calcular posición actual
            const x = centerX + Math.cos(circle.angle) * circle.radius;
            const y = centerY + Math.sin(circle.angle) * circle.radius;
            
            // Agregar posición actual al inicio del trail
            circle.trail.unshift({ x: x, y: y });
            
            // Mantener el trail con la longitud máxima
            if (circle.trail.length > trailLength) {
                circle.trail.pop();
            }
            
            // Dibujar el trail
            circle.trail.forEach((point, index) => {
                // La opacidad disminuye a medida que el punto es más antiguo
                const opacity = 1 - (index / trailLength);
                const size = 3 * (1 - (index / trailLength) * 0.7); // Tamaño también disminuye
                
                ctx.beginPath();
                ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
                ctx.fillStyle = circle.color.replace(')', `, ${opacity})`).replace('rgb', 'rgba');
                ctx.fill();
                
                // Efecto de brillo
                ctx.shadowBlur = 15;
                ctx.shadowColor = circle.color;
                ctx.fill();
                ctx.shadowBlur = 0;
            });
            
            // Dibujar el punto principal (más brillante)
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, Math.PI * 2);
            ctx.fillStyle = circle.color;
            ctx.shadowBlur = 20;
            ctx.shadowColor = circle.color;
            ctx.fill();
            ctx.shadowBlur = 0;
        });
        
        // Dibujar círculos concéntricos (opcional, líneas tenues)
        ctx.strokeStyle = 'rgba(241, 201, 169, 0.1)';
        ctx.lineWidth = 1;
        for (let i = 0; i < numCircles; i++) {
            const radius = baseRadius + i * radiusStep;
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            ctx.stroke();
        }
        
        requestAnimationFrame(animate);
    }
    
    // Iniciar animación
    animate();
    
    // Redimensionar canvas cuando cambia el tamaño de la ventana
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
});

