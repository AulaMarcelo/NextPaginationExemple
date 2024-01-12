"use client"
import { getUsuarios } from "@/api/pagination/routes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { UsuarioI } from "@/interfaces/usuario/interface";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { useState } from "react";

function Pagination() {
    const [skip,setSikp] = useState(0);
    const [filter,setFilter] = useState('');
    const [search,setSearch] = useState('');


    const {data,isPending} = useQuery({ 
    queryKey: ['usuarios',skip,search   ], 
    queryFn: ()=>getUsuarios(skip,search)
    })
    function handeleFilter(event:React.ChangeEvent<HTMLInputElement>){
         event.preventDefault();
         const value = event.target.value;
         setFilter(value)
    }
    
   
   if(isPending){
    return <h1 className="flex items-center justify-center">Loading</h1>
   }
    return (  
        <div className="p-12">
           <div className="flex w-2/3 ms-1">
            <div className="relative w-full">
              <Input 
               type="text"
               id="filter"
               onChange={handeleFilter}
               value={filter}
              />
             <span className="absolute inset-y-1 right-0 pr-3 cursor-pointer flex items-center">
                <Search onClick={() => setSearch(filter)}/>
             </span>
           </div>
           </div>
            <Table>
            <TableCaption>Lista de usuarios.</TableCaption>
            <TableHeader>
                <TableRow>
                <TableHead className="w-[100px]">Nome</TableHead>
                <TableHead>Email</TableHead>
             
                </TableRow>
            </TableHeader>
            <TableBody>
                {data?.map((usuario:UsuarioI) =>(
                    <TableRow>
                    <TableCell className="font-medium">{usuario.nome}</TableCell>
                    <TableCell>{usuario.email}</TableCell>
                  
                    </TableRow>
                ))
                }
               

            
            </TableBody>
            </Table>
            <div className="flex items-center justify-center gap-6  mt-8">
            <Button 
            variant="outline" className="w-20" 
       
            onClick={()=>setSikp(old=>Math.max(old-1,0))}
            >
                Previus</Button>
            <p>PAGE:{skip}</p>
            <Button 
            variant="outline" className="w-20"
            disabled={data.length === 0}
            onClick={ ()=>setSikp((old) => ((data.length)  > 0 ) ? old+1 : old)}
            >
             Next
           </Button>
            </div>
        </div>
        );
}

export default Pagination;
