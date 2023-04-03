

import { guardarDB, leerDB } from "./helpers/guardarDB.js"
import { confirmarBorrar, inputTarea, menuBorrar, mostrarMenu, pausa, menuCompletarTareas } from "./helpers/inquirer.js"
import { Tarea } from "./models/tarea.js"
import { Tareas } from "./models/tareas.js"



const main=async ()=>{
    const tareas=new Tareas()
    let valor_Opcion=''
    const data=leerDB()
    if (data){
        tareas.agregarDataDelDB(data)
    }
    do {
        valor_Opcion=await mostrarMenu()

        switch(valor_Opcion) {
            case '1': 
            const descripcion= await inputTarea()
            console.log(descripcion)
            tareas.crearTarea(descripcion)
            
            break

            case '2':
                tareas.listadoCompleto()
            break
            case '3':
                tareas.listadoCompletadoPendiente(true)
            break
            case '4':
                tareas.listadoCompletadoPendiente(false)
            break
            case '5':
                const ids=await menuCompletarTareas(tareas.mostrarListado)
                tareas.marcarCompletada(ids)
            break
            case '6':
                const id=await menuBorrar(tareas.mostrarListado)
                

                if(id!='0'){
                    const confirm= await confirmarBorrar()
                    if(confirm){
                        tareas.borrarTarea(id)
                        console.log(`Su tarea ha sido borrada`)
                    }
                }
                
                //console.log(id)

            break

            }
        
        guardarDB(tareas.mostrarListado)
        await pausa()
    }

    while(valor_Opcion !='0')
    
    
}

main()