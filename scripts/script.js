import Anuncio_Mascota from "./anuncioMascota.js";
import {$, create, createAnuncio, deleteAnuncio, getAnuncio, getAnuncios, updateAnuncio} from './utils.js'

const $form = document.getElementsByTagName("form")[0];
const $filtros = document.getElementsByTagName("form")[1];

const onLoad = () => {
    handleForm();
    handleClick();
    getAnuncios(data => {
        calcularPromedio(data);
        actualizarTabla(data);
    });
}

const handleClick = () => {
    window.addEventListener('click', e => {
        if(e.target.matches("td")){
            $('btnEliminar').removeAttribute("hidden");
            $('btnCancelar').removeAttribute("hidden");
            const id = e.target.parentElement.id;
            getAnuncio(id, (anuncio) => {
                cargarForm(anuncio);
            })
        }
        else if(e.target.matches("#btnEliminar")){
            deleteAnuncio($form.txtId.value);
        }else if(e.target.matches("#btnCancelar")){
            $form.reset();
            $form.txtId.value = "";
            $('btnEliminar').setAttribute("hidden", true);
            $('btnCancelar').setAttribute("hidden", true);
        }
    })
}

const cargarForm = anuncio => {
    const {txtTitulo, txtDesc, txtPrecio, txtRaza, fecha, vacuna, rdoAnimal, txtId} = $form;
    txtId.value = anuncio.id;
    txtTitulo.value = anuncio.titulo;
    txtDesc.value = anuncio.descripcion;
    txtPrecio.value = anuncio.precio;
    rdoAnimal.value = anuncio.animal;
    txtRaza.value = anuncio.raza;
    fecha.value = anuncio.nacimiento;
    vacuna.value = anuncio.vacuna;
}

$filtros.onchange = (e) => {
    let filtros = {};
    const {cboFiltro, selAnimal} = $filtros;
    cboFiltro.forEach(cbo=> {filtros = {...filtros, [cbo.value]:cbo.checked}});
    getAnuncios(lista => {
        const listaFiltrada = selAnimal.value === "Todo" ? lista : lista.filter(elemento => elemento.animal == selAnimal.value);
        calcularPromedio(listaFiltrada);
        const nuevaLista = listaFiltrada.map(el => {
            for (const key in filtros) {
                !filtros[key] && delete el[key];
            }
            return el;
        });
        actualizarTabla(nuevaLista);
    })
}

const handleForm = () => {
    $form.addEventListener('submit', e => {
        e.preventDefault();
        const {txtTitulo, txtDesc, txtPrecio, rdoAnimal, txtId, txtRaza, fecha, vacuna} = $form;
        const anuncio = new Anuncio_Mascota(txtId.value,txtTitulo.value,null,txtDesc.value, txtPrecio.value, rdoAnimal.value, txtRaza.value, fecha.value, vacuna.value);
        if(anuncio.id==""){
            createAnuncio(anuncio);
        }else{
            anuncio.id = parseInt(anuncio.id);
            updateAnuncio(anuncio);
        }
        $form.reset();
    })
}

const crearThead = (item) => {
    const $thead = create("thead");
    const $tr = create("tr");
    for(const key in item){
        if(key!="id"){
            const $th = create("th");
            $th.textContent = key;
            $th.style.textTransform = "capitalize";
            $tr.appendChild($th);
        }
    }
    $thead.appendChild($tr);
    return $thead;
}

const crearTbody = (lista) => {
    const $tbody = create("tbody");
    lista.forEach((element,index) => {
        const $tr = create("tr");
        for(const key in element){
            if(key=="id"){
                $tr.setAttribute("id",element[key]);
            }else{
                const $td = create("td");
                $td.textContent = element[key];
                $tr.appendChild($td);
            }
        }
        if(index%2){
            $tr.style.opacity = "0.75"
        }
        $tbody.appendChild($tr);
    });
    return $tbody;
}

const crearTabla = (lista) => {
    const $tabla = $('tabla');
    $tabla.appendChild(crearThead(lista[0]));
    $tabla.appendChild(crearTbody(lista));
}

const actualizarTabla = (data) => {
    const $tabla = $('tabla');
    while($tabla.hasChildNodes()){
        $tabla.removeChild($tabla.firstElementChild);
    }
    if(data){
        data.sort((a,b) => (a.nombre > b.nombre) ? 1 : ((b.nombre > a.nombre) ? -1 : 0))
        crearTabla(data);
    }
}

const calcularPromedio = data => {
    const total = data.reduce((prev, actual) => prev + parseInt(actual.precio), 0);
    const promedio = total / data.length;
    $('promedio').value = promedio.toFixed(2);
}

onLoad();