document.addEventListener('DOMContentLoaded', () => {
    // Seleccionamos los elementos de nuestro HTML
    const elementosArrastrables = document.querySelectorAll('.elemento');
    const platilloIzquierdo = document.getElementById('platilloIzquierdo');
    const platilloDerecho = document.getElementById('platilloDerecho');
    const balanza = document.querySelector('.balanza');
    
    // Variables para contar los elementos en cada platillo
    let pesoIzquierdo = 0;
    let pesoDerecho = 0;

    // Sonidos que usaremos (asegúrate de tener los archivos en tu carpeta)
    // const sonidoPoner = new Audio('uno.mp3');
    // const sonidoQuitar = new Audio('dos.mp3');

    // Función para actualizar la balanza
    const actualizarBalanza = () => {
        const diferencia = pesoDerecho - pesoIzquierdo;
        balanza.style.transform = `rotate(${diferencia * 5}deg)`;
    };

    // ----------------- Lógica para arrastrar y soltar -----------------

    let elementoArrastrado = null;

    elementosArrastrables.forEach(elemento => {
        elemento.addEventListener('dragstart', (e) => {
            console.log ("El evento de arrastre ha comenzado")
            // Guardamos el elemento que se está arrastrando
            elementoArrastrado = e.target;
            // Guardamos el peso del elemento para poder sumarlo o restarlo
            e.dataTransfer.setData('text/plain', elementoArrastrado.dataset.peso);
        });
    });

    // Eventos para el platillo izquierdo
    platilloIzquierdo.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    platilloIzquierdo.addEventListener('drop', (e) => {
        e.preventDefault();
        if (elementoArrastrado) {
            // Si el elemento ya estaba en un platillo, primero restamos su peso
            if (elementoArrastrado.parentElement.id === 'platilloDerecho') {
                pesoDerecho -= parseInt(elementoArrastrado.dataset.peso);
            }
            // Movemos el elemento al nuevo platillo
            platilloIzquierdo.appendChild(elementoArrastrado);
            
            // Actualizamos el peso del platillo izquierdo
            pesoIzquierdo += parseInt(elementoArrastrado.dataset.peso);
            
            // sonidoPoner.play();
            actualizarBalanza();
            elementoArrastrado = null;
        }
    });

    // Eventos para el platillo derecho
    platilloDerecho.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    platilloDerecho.addEventListener('drop', (e) => {
        e.preventDefault();
        if (elementoArrastrado) {
            // Si el elemento ya estaba en un platillo, primero restamos su peso
            if (elementoArrastrado.parentElement.id === 'platilloIzquierdo') {
                pesoIzquierdo -= parseInt(elementoArrastrado.dataset.peso);
            }
            // Movemos el elemento al nuevo platillo
            platilloDerecho.appendChild(elementoArrastrado);
            
            // Actualizamos el peso del platillo derecho
            pesoDerecho += parseInt(elementoArrastrado.dataset.peso);
            
            // sonidoPoner.play();
            actualizarBalanza();
            elementoArrastrado = null;
        }
    });

    // Evento para regresar el elemento a su lugar original
    const elementosContenedor = document.querySelector('.elementos-contenedor');
    elementosContenedor.addEventListener('dragover', (e) => {
        e.preventDefault();
    });
    
    elementosContenedor.addEventListener('drop', (e) => {
        e.preventDefault();
        if (elementoArrastrado) {
            if (elementoArrastrado.parentElement.id === 'platilloIzquierdo') {
                pesoIzquierdo -= parseInt(elementoArrastrado.dataset.peso);
            } else if (elementoArrastrado.parentElement.id === 'platilloDerecho') {
                pesoDerecho -= parseInt(elementoArrastrado.dataset.peso);
            }
            // Regresamos el elemento a su lugar
            elementosContenedor.appendChild(elementoArrastrado);
            // sonidoQuitar.play();
            actualizarBalanza();
            elementoArrastrado = null;
        }
    });
});