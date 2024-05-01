//variables o selectores
const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
let articulosCarrito = [];


//eventos o Listeners

cargarEventListeners();

document.addEventListener('DOMContentLoaded', ()=>{
        articulosCarrito = JSON.parse(localStorage.getItem('articulosCarrito')) || [];
        carritoHTML();

})


function cargarEventListeners() {
    //captura un evento cuando hacemos click en el boton "Agregar Carrito"
    listaCursos.addEventListener('click', agregarCurso);

    //eliminar un curso del carrito
    carrito.addEventListener('click', eliminarCurso)

    //vaciar carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = [];
        vaciarCarrito();
    });

}


//funciones

function agregarCurso(e) {
    //agrega el curso al carrito
    e.preventDefault();
    //console.log("ingrese a la funcion agregar curso")

    if (e.target.classList.contains('agregar-carrito')) {
        console.log("haciendo click en el boton")
        // console.log(e.target.parentElement.parentElement)
        const curso = e.target.parentElement.parentElement;
        //console.log(curso);

        leerDatosCurso(curso);

    }
}

function leerDatosCurso(curso) {
    //lee los datos del curso
    //creando el objeto//

    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1

    }

    if (articulosCarrito.some(curso => curso.id === infoCurso.id)) {
        //existe el curso

        const cursos = articulosCarrito.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso;
            } else {
                return curso;
            }
        })

        articulosCarrito = [...cursos];

    } else {
        articulosCarrito = [...articulosCarrito, infoCurso]
    }



    //console.log(articulosCarrito)

    carritoHTML();

}

function carritoHTML() {
    vaciarCarrito();
    //Generando el carrito con HTML
    articulosCarrito.forEach(curso => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>
                <img src="${curso.imagen}" width=100>
            </td>

            <td>${curso.titulo}</td>
            <td>${curso.precio}</td>
            <td>${curso.cantidad}</td>

            <td>
                <a href="#" class="borrar-curso" data-id=${curso.id}>X</a>
            </td>
        `; //no olvidar el punto y coma para cerrar las comillas invertidas//

        contenedorCarrito.appendChild(row)
        //permite agregar nodos a la estructura//
    })

    sincronizarStorage();
}

function vaciarCarrito() {
    //elimina los cursos del carrito
    //forma lenta
    //contenedorCarrito.innerHTML = "";

    //forma rapida o formal
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}

function eliminarCurso(e) {
    //elimina el curso del carrito
    e.preventDefault();

    if (e.target.classList.contains('borrar-curso')) {
        const CursoId = e.target.getAttribute('data-id');
        //console.log("cursoid" + cursoId)
        console.log("boton borrar")

        const existe = articulosCarrito.some(cursos => cursos.id === CursoId);
        //existe el curso

        if (existe) {
            const cursos = articulosCarrito.map(cursos => {
                if (cursos.id === CursoId) {
                    if (cursos.cantidad > 1) {
                        cursos.cantidad--;
                        return cursos;
                    } else {

                        articulosCarrito = articulosCarrito.filter(curso => curso.id != CursoId);
                        console.log(articulosCarrito)
                        return cursos;
                    }
                }

            })
        }

        carritoHTML();

    }
}

//agregando los items al localstorage
function sincronizarStorage(){
    localStorage.setItem('articulosCarrito',JSON.stringify(articulosCarrito));
}