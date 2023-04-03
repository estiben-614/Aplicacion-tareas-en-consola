import inquirer  from "inquirer";
import { asyncScheduler } from "rxjs";
import { validate } from "uuid";

const opciones=[
    {
        type: 'list',
        name:'opcion',
        message:'Por favor seleccione una opción',
        choices:[{
            name:`1.Crear tarea`,
            value:'1'
        },
        {
            name:'2.Listar tareas',
            value:'2'
        },
        {
            name:'3.Tareas completadas',
            value:'3'
        },
        {
            name:'4.Tareas pendientes',
            value:'4'
        },
        {
            name:'5.Completar tareas',
            value:'5'
        },
        {
            name:'6.Borrar tareas',
            value:'6'
        },
        {
            name:'0.Salir',
            value:'0'
        },]
    
    }
    
]
export const mostrarMenu=async()=>{
    console.clear()
    console.log('************\n')
    console.log('   TAREAS  \n ')
    console.log('************ \n')
    

    const {opcion}=await inquirer.prompt(opciones)


    return opcion

}

export const inputTarea=async()=>{
    const {tarea}=await inquirer.prompt([{
        type:'input',
        name:'tarea',
        message:'Introduzca una tarea',
        validate(value){
            if(value.length==0){
                console.log('\n Por favor agrege una tarea')
                return null
            }
    
            return true
        }
    }])

    

    return tarea
}

export const pausa=async()=>{

    const opcion=await inquirer.prompt([{
        type:'input',
        name:'pausa',
        message:'Presione ENTER para continuar'
    }])

    return opcion
}

export const menuBorrar=async (listadoArray=[])=>{
    const choices=listadoArray.map((tarea,i)=>{

        let idx=i+1
        const id=tarea.id
        const descripcion=tarea.descripcion

        return {
            name:`${idx.toString().green} ${descripcion}`,
            value:id
        }
    })

    choices.unshift({
        name:`${'0.'.green} Cancelar`,
        value:'0'
    })

    const question={
        type:'list',
        name:'id',
        message:'Seleccione la tarea a borrar',
        choices
    }

    const {id}=await inquirer.prompt(question)

    return id
}

export const confirmarBorrar=async()=>{
    const question={
        type:'confirm',
        name:'confirmacion',
        message:'Está seguro que desea eliminar la tarea?'
    }

    const {confirmacion}=await inquirer.prompt(question)

    return confirmacion
}

export const menuCompletarTareas=async (listadoArray=[])=>{
    const choices=listadoArray.map((tarea,i)=>{

        let idx=i+1
        const id=tarea.id
        const descripcion=tarea.descripcion

        return {
            name:`${idx.toString().green} ${descripcion}`,
            value:id,
      
            checked:(tarea.completadoEn) ? true:false
        }
    })

    

    const question={
        type:'checkbox',
        name:'ids',
        message:'Seleccione la tarea a completar',
        choices
    }

    const {ids}=await inquirer.prompt(question)

    return ids
}