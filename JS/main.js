let imagenProducto = document.querySelectorAll(`.contentProducts__products-img`)
let imagenup = document.querySelector(`.contentProducts__imagenUp-img`)
let moduloDeVista = document.querySelector(`.imagenUp`)
let contenedorImagenes = document.querySelector(`.imagenUp__contenedor`)
let ModeloZapato = document.querySelector(`#ModeloZapato`)
let tallaDeZapato = document.querySelector(`#tallas`)
let infoProduct = document.querySelector(`.contentProducts__products`)
let x = document.querySelector(`.close`)
let precioViejo = document.querySelector(`#precioViejo`)
let precio = document.querySelector(`#precio`)
let centrado = document.querySelector(`.centrado`)

imagenProducto.forEach(elemento => {
    elemento.addEventListener(`click`,(e)=>{
        e.preventDefault()
        let direccionImagen = e.target.src
        agregarImagen(direccionImagen)

        let nombreZapato = elemento.nextElementSibling.nextElementSibling.firstElementChild.textContent
        let tallas = elemento.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling.firstElementChild.firstElementChild.nextElementSibling.textContent
        let subPrecio = elemento.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.firstElementChild .textContent
        let preciocrack = elemento.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.textContent
        
        ModeloZapato.textContent = nombreZapato
        tallaDeZapato.textContent= tallas
        precioViejo.textContent = subPrecio
        precio.textContent = preciocrack
        // console.log(elemento.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.firstElementChild)


        
    })
})

moduloDeVista.addEventListener(`click`,(e)=>{
    if(e.target == moduloDeVista || e.target == x){
        moduloDeVista.classList.toggle(`none`)
        contenedorImagenes.classList.toggle(`showImage`)
    }
})


function agregarImagen(img){
    imagenup.src = img
    moduloDeVista.classList.toggle(`none`)
    contenedorImagenes.classList.toggle(`showImage`)
}

window.onload = function(){
    centrado.style.display = `none`
    document.body.classList.remove(`h`)
    document.querySelector(`.navegacion`).style.display = `block`
    document.querySelector(`.content-centrado`).style.display = `none`
    
}

let carrito = document.querySelector(`#carrito`)
let modulo = document.querySelector(`.contenedorContentCar`)

carrito.addEventListener(`click`,(e)=>{
    modulo.classList.toggle(`noVisible`)
})

// agregar elementos al carrito de compra

// variables
const addCarrito = document.querySelector(`#addCarrito`)
const cursos = document.querySelector(`#cursos`)
const listaDeCursos = document.querySelector(`.ListProductos`)
const listaDeCursosModal = document.querySelector(`.contentProducts__products-description-up`)
const vaciarCarrito = document.querySelector(`.vaciarCarrito`)

// addeventlistener
cargarEventListener()
function cargarEventListener(){
    // disparra cuando se preciona agregar carrito
    cursos.addEventListener(`click`,comprarCurso)

    // cuando de click un curso del carrito
    addCarrito.addEventListener(`click`,elmininarElCurso)

    // evento para vaciar carrito
    vaciarCarrito.addEventListener(`click`,funcvaciarCarrito)

    // al cargar elemento mostrar local storage
    document.addEventListener(`DOMContentLoaded`,leerLocalStorage)
}

// funciones

// funcion que añade el curso al carrito
function comprarCurso(e){
    e.preventDefault()
    // delegation para agregar al carrito
    if(e.target.classList == `button-compra`){
        const curso = e.target.parentElement.parentElement
        // enviamos el curso seleccionado para tomar sus datos
        leerDatosCursos(curso)
    }
}

// lee los datos del curso
function leerDatosCursos(curso){
    const infoCurso = {
        imagen:curso.querySelector(`.contentProducts__products-img`).src,
        titulo: curso.querySelector(`h3`).textContent,
        tallaZapato: curso.querySelector(`.description-talla p`).textContent,
        precioRemate: curso.querySelector(`.description-precio p`).innerText,
        id: curso.querySelector(`a`).getAttribute(`data-id`)
    }

    insertarInfoCurso(infoCurso)
}

// muestra el curso seleccionado en el carrito
function insertarInfoCurso(curso){
    const contenedorDeLista = document.createElement(`div`)
    contenedorDeLista.className = `ListProductos__productos`
    contenedorDeLista.innerHTML = `
    <div class="ListProductos__productos-img">
    <img src="${curso.imagen}" alt="" class="img-productoCar">
</div>
<div class="infoProductoCar">
    <h4>${curso.titulo}</h4>
    <small>tallas</small>
    <p>${curso.tallaZapato}</p>
</div>
<div class="precioProductoCard">
    <p>${curso.precioRemate}</p>
</div>
<div class="ButtonXdelete">
    <i class='bx bx-x xdelete' data-id="${curso.id}"></i>
</div>
    `
    listaDeCursos.appendChild(contenedorDeLista)
    guardarCursosLocalStorage(curso)
}

// elimina el curso del carrito en el dom
function elmininarElCurso(e){
    e.preventDefault()
    let curso,
        cursoID
    if(e.target.classList.contains(`xdelete`)){
        e.target.parentElement.parentElement.remove()
        curso = e.target.parentElement.parentElement
        cursoID = curso.querySelector(`i`).getAttribute(`data-id`)
        // console.log(cursoID)
    }

    eliminarCursoLocalStorage(cursoID)
}

// funcion para vaciar el carrito
function funcvaciarCarrito(){
    while(listaDeCursos.firstChild){
        listaDeCursos.removeChild(listaDeCursos.firstChild)
    }

    vaciarLocalStorage()
}

// almacena cursos en el carrito a local storage
function guardarCursosLocalStorage(curso){
    let cursos
    // toma el valor con datos del localstorage
    cursos = obtenerCursosDeLocalStorage()
    // el curso seleccionado se agrega al arreglo
    cursos.push(curso)

    localStorage.setItem(`cursos`,JSON.stringify(cursos))
}

// comprueba que alla elementos en local storage
function obtenerCursosDeLocalStorage(){
    let cursoLS

    // comprovamos si hay algo en local storage
    if(localStorage.getItem(`cursos`) === null){
        cursoLS = []
    }else{
        cursoLS = JSON.parse(localStorage.getItem(`cursos`))
    }

    return cursoLS
}


// imprime los cursos de local storage en el carrito 
function leerLocalStorage(){
    let cursosLS

    cursosLS = obtenerCursosDeLocalStorage()

    cursosLS.forEach(function(curso){
        // construir el template
        const contenedorDeLista = document.createElement(`div`)
        contenedorDeLista.className = `ListProductos__productos`
        contenedorDeLista.innerHTML = `
        <div class="ListProductos__productos-img">
        <img src="${curso.imagen}" alt="" class="img-productoCar">
    </div>
    <div class="infoProductoCar">
        <h4>${curso.titulo}</h4>
        <small>tallas</small>
        <p>${curso.tallaZapato}</p>
    </div>
    <div class="precioProductoCard">
        <p>${curso.precioRemate}</p>
    </div>
    <div class="ButtonXdelete">
        <i class='bx bx-x xdelete' data-id="${curso.id}"></i>
    </div>
        `
        listaDeCursos.appendChild(contenedorDeLista)
    })
}



// elimina el curso de local storage
function eliminarCursoLocalStorage(curso){
    // console.log(curso)
    let cursosLS

    // console.log(curso)
    cursosLS = obtenerCursosDeLocalStorage()

    cursosLS.forEach(function(cursoLS,index){
        if(cursoLS.id === curso){
            cursosLS.splice(index,1)
        }
    })
    localStorage.setItem(`cursos`,JSON.stringify(cursosLS))
    
}

function vaciarLocalStorage(){
    localStorage.clear()
}