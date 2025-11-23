document.addEventListener('DOMContentLoaded', function() {
    const matrix = document.getElementById('matrix');
    const dashCount = 150;
    const dashes = [];
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    
    // Crear los guiones
    for (let i = 0; i < dashCount; i++) {
        const dash = document.createElement('div');
        dash.classList.add('dash');
        
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const rotation = Math.random() * 360;
        
        dash.style.left = `${x}px`;
        dash.style.top = `${y}px`;
        dash.style.transform = `rotate(${rotation}deg)`;
        dash.style.opacity = 0.7 + Math.random() * 0.3;
        
        matrix.appendChild(dash);
        dashes.push({
            element: dash,
            x: x,
            y: y,
            rotation: rotation,
            speed: 0.03 + Math.random() * 0.04,
            baseOpacity: 0.7 + Math.random() * 0.3
        });
    }
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animate() {
        dashes.forEach(dash => {
            const dx = mouseX - dash.x;
            const dy = mouseY - dash.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 250) {
                const targetRotation = Math.atan2(dy, dx) * 180 / Math.PI;
                let rotationDiff = targetRotation - dash.rotation;
                
                if (rotationDiff > 180) rotationDiff -= 360;
                if (rotationDiff < -180) rotationDiff += 360;
                
                dash.rotation += rotationDiff * dash.speed;
                dash.element.style.opacity = Math.min(1, dash.baseOpacity + (250 - distance) / 250 * 0.3);
                
                dash.x += dx * 0.015;
                dash.y += dy * 0.015;
            } else {
                dash.rotation += (Math.random() - 0.5) * 1.5;
                dash.element.style.opacity = dash.baseOpacity;
                
                dash.x += (Math.random() - 0.5) * 1.2;
                dash.y += (Math.random() - 0.5) * 1.2;
            }
            
            dash.element.style.transform = `rotate(${dash.rotation}deg)`;
            
            if (dash.x < -10) dash.x = -10;
            if (dash.x > window.innerWidth + 10) dash.x = window.innerWidth + 10;
            if (dash.y < -10) dash.y = -10;
            if (dash.y > window.innerHeight + 10) dash.y = window.innerHeight + 10;
            
            dash.element.style.left = `${dash.x}px`;
            dash.element.style.top = `${dash.y}px`;
        });
        
        requestAnimationFrame(animate);
    }
    
    window.addEventListener('resize', function() {
        dashes.forEach(dash => {
            if (dash.x > window.innerWidth) dash.x = window.innerWidth * 0.8;
            if (dash.y > window.innerHeight) dash.y = window.innerHeight * 0.8;
        });
    });
    
    animate();
});