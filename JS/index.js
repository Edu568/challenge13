const API_URL = "https://my-json-server.typicode.com/joseluisgs/APIRESTFake/users";

const apiUser = "https://my-json-server.typicode.com/joseluisgs/APIRESTFake/users";

const apiPhotos = "https://my-json-server.typicode.com/joseluisgs/APIRESTFake/photos";

const apiPost = "https://my-json-server.typicode.com/joseluisgs/APIRESTFake/posts"


const contenedor = document.querySelector('tbody');
let results = ""


let modalUser = new bootstrap.Modal(document.getElementById('modalUser'))

let formArtitulo = document.querySelector('form')

const nombre = document.getElementById('nombre')
const email = document.getElementById('email')


let save = ''

btnCreate.addEventListener('click', () => {
    nombre.value = ""
    email.value = ""    
    modalUser.show()
    save = "add"
})

let show =  (nombre) => {
    nombre.forEach(nombres => {
        
        results += `
        <tr>
            <td>${nombres.name}</td>
            <td>${nombres.username}</td>
            <td>${nombres.email}</td>
            <td>${nombres.phone}</td>
            <td>${nombres.website}</td>
            <td class="text-center"><a class="btnEdit btn btn-primary">Edit</a><a class="btnDelete btn btn-danger">Delete</a></td>
            
        </tr>
        `
    });
    contenedor.innerHTML = results
}

fetch(API_URL)
.then(response => response.json())
.then(data => show(data))
.catch(error => console.log(error))

const on = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if(e.target.closest(selector)){
            handler(e)
        }
    })
}

on(document, 'click', '.btnDelete',  e => {
    const fila = e.target.parentNode.parentNode
    const user = fila.firstElementChild.innerHTML
    
    alertify.confirm("This is a confirm dialog.",
  function(){
    fetch(API_URL + user,{
        method: "DELETE"
    })
    .then( response => response.json())
    .then (() => location.reload())
  },
  function(){
    alertify.error('Cancel');
  });
})

let idForm = 0

on(document, 'click', '.btnEdit',  e => {
    const fila = e.target.parentNode.parentNode
    idForm =  fila.children[0].innerHTML
    
    const nombreUsuario = fila.children[0].innerHTML
    const correo = fila.children[1].innerHTML
    const telefono = fila.children[2].innerHTML
    const paginaweb = fila.children[3].innerHTML
    
    nombre.value = nombreUsuario
    email.value = correo
    save = 'edit'
    modalUser.show()
    
})

formArtitulo.addEventListener('submit', (e) => {
    e.preventDefault()
    if(save == 'add'){
        fetch(API_URL, {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                nombre:nombre.value,
                email: email.value
            })
        })
        .then(response => response.json())
        .then (data => {
            const newUser = []
            newUser.push(data)
            show(newUser)
        })
    }
    if(save == 'editar'){
        console.log('editar')
    }
    modalUser.hide()
})