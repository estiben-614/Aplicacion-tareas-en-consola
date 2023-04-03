import * as fs from 'node:fs'

const listado =[]
const archivo='./database/BD.json'
export const guardarDB=(listado)=>{
    fs.writeFileSync(archivo,JSON.stringify(listado),{encoding:'utf-8'})
}

export const leerDB=()=>{

    if(!fs.existsSync(archivo)){
        return null
    }

    else{
        const infoArchivo=fs.readFileSync(archivo)
        if(infoArchivo.length != 0){
            const datosArchivo=JSON.parse(infoArchivo)
            return datosArchivo
        }
        
    }
    
}

// if(leerDB){
//     const p=leerDB(archivo)
//     console.log(p)
// }
