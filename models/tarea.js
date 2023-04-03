import { v4 as uuidv4 } from 'uuid';

export class Tarea {

    id=''
    descripcion=''
    completadoEn=null
    constructor(descripcion){
        this.descripcion=descripcion
        this.id=uuidv4()
        this.completadoEn=null
    }
}

// const tarea=new Tarea('sdfsd')
// console.log(tarea)