import { baseUrl } from "@/config/baseUrl";
import { takeUsuarios } from "@/config/takeBase";

async function getUsuarios(skip:number,search:string){
  const url = `${baseUrl}/user/take/${takeUsuarios}/skip/${skip}/${search}`

  const respose = await fetch(url,{
    headers: { 'Accept': 'application/json' },
  })
  if(!respose.ok){
    throw new Error("Erro na conexão de rede")
  }

  const usuarios =await  respose.json();
  return usuarios;
}

export {getUsuarios}