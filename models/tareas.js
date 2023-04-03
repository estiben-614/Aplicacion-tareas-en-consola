
import { Tarea } from "./tarea.js"
import * as color from 'colors'

export class Tareas {

    listado={}
    constructor(){
        this._listado={}
    }

    get mostrarListado(){

        let  listadoArray=[]
        Object.keys(this._listado).forEach((key)=>{
            //console.log(key)
            listadoArray.push(this._listado[key])
        })
        return listadoArray
    }
    crearTarea(descripcion)
    {
        const tarea=new Tarea(descripcion)
        this._listado[tarea.id]=tarea
        //console.log(this._listado)
    }

    borrarTarea(id){
        if(this._listado[id]){
            delete this._listado[id]
        }
    }

    agregarDataDelDB(data){
        
        data.forEach(tarea=>{
            this._listado[tarea.id]=tarea
        })
        
    }

    listadoCompleto(){

        this.mostrarListado.forEach((tarea,id)=>{
            const idx=id+1
            const {descripcion,completadoEn}=tarea

            const estado=(completadoEn) ? 'Completado'.green : 'Pendiente'.red
            console.log(`${idx.toString().green} ${descripcion} ${estado}`)
        })

    }

    listadoCompletadoPendiente(completado=true){
        let contador=0
        this.mostrarListado.forEach((tarea)=>{
            
            const {descripcion,completadoEn}=tarea

            const estado=(completadoEn) ? 'Completado'.green : 'Pendiente'.red

            if(completado){
                if(completadoEn){
                    contador+=1
                    console.log(`${contador.toString().green}  ${descripcion} :: ${completadoEn.green}`)
                }
            }
            else{
                if(!completadoEn){
                    contador+=1
                    console.log(`${contador.toString().green} ${descripcion} ${estado}`)

                }
            }
            
        })
    }

    marcarCompletada(ids){

        ids.forEach(id=>{
            const tarea=this._listado[id]
            tarea.completadoEn=new Date().toISOString()
        })

        this.mostrarListado.forEach(tarea=>{
            //Los elementos tarea.id que no están en ids
            if(!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn=null
            }
        })
    }


}


// const tareas=new Tareas()

// tareas.crearTarea('Hola')
// tareas.crearTarea('Buernas')

// console.log(tareas._listado)