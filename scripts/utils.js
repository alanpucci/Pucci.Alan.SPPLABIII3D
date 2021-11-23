import {URL_BASE, URL_MASCOTAS} from './const.js';

export const $ = elemento => {
    return document.getElementById(elemento);
}

export const create = elemento => {
    return document.createElement(elemento);
}

export const createAnuncio = anuncio => {
    const xhr = new XMLHttpRequest();
    cargando(true);
    xhr.onreadystatechange = () => {
        if(xhr.readyState == 4){
            if(xhr.status >= 200 && xhr.status < 300){
                cargando(false);
            }else{
                cargando(false);
                throw new Error(xhr.statusText);
            }
        }
    }
    xhr.open("POST", URL_BASE+URL_MASCOTAS);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(anuncio));
}

export const updateAnuncio = (anuncio) => {
    const xhr = new XMLHttpRequest();
    cargando(true);
    xhr.onreadystatechange = () => {
        if(xhr.readyState == 4){
            if(xhr.status >= 200 && xhr.status < 300){
                cargando(false);
            }else{
                cargando(false);
                throw new Error(xhr.statusText);
            }
        }
    }
    xhr.open("PUT", URL_BASE+URL_MASCOTAS+"/"+anuncio.id);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(anuncio));
}

export const deleteAnuncio = (id) => {
    const xhr = new XMLHttpRequest();
    cargando(true);
    xhr.onreadystatechange = () => {
        if(xhr.readyState == 4){
            if(xhr.status >= 200 && xhr.status < 300){
                cargando(false);
            }else{
                cargando(false);
                throw new Error(xhr.statusText);
            }
        }
    }
    xhr.open("DELETE", URL_BASE+URL_MASCOTAS+"/"+id);
    xhr.send();
}

export const getAnuncios = (callback) => {
    const xhr = new XMLHttpRequest();
    cargando(true);
    xhr.onreadystatechange = () => {
        if(xhr.readyState == 4){
            if(xhr.status >= 200 && xhr.status < 300){
                const data = JSON.parse(xhr.responseText);
                cargando(false);
                callback(data);
            }else{
                cargando(false);
                throw new Error("Ha ocurrido un error");
            }
        }
    }
    xhr.open("GET", URL_BASE+URL_MASCOTAS);
    xhr.send();
}

export const getAnunciosFetch = async () => {
    cargando(true);
    try {
        const response = await fetch(URL_BASE+URL_MASCOTAS);
        if(!response.ok){
            throw new Error(`Error: ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }finally{
        cargando(false);
    }
}


export const getAnuncio = (id,callback) => {
    const xhr = new XMLHttpRequest();
    cargando(true);
    xhr.onreadystatechange = () => {
        if(xhr.readyState == 4){
            if(xhr.status >= 200 && xhr.status < 300){
                const data = JSON.parse(xhr.responseText);
                cargando(false);
                callback(data);
            }else{
                cargando(false);
                throw new Error("Ha ocurrido un error");
            }
        }
    }
    xhr.open("GET", URL_BASE+URL_MASCOTAS+"/"+id);
    xhr.send();
}

const cargando = (estaCargando) => {
    if(estaCargando){
        $('spinner').style.display = "flex";
    }else{
        $('spinner').style.display = "none";
    }
}