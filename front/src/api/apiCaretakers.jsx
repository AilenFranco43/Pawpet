import { isAxiosError } from "axios";
import api from "../lib/axios";

export default async function getCaretakers(filters={}){
  
   try {

     // Filtrar solo los valores definidos
     const validFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, value]) => value)
      );

    const queryParams = new URLSearchParams(validFilters).toString();
  
    // const request = await api.get(`/?${queryParams}`);
    const request = await api.get(`/api/caretaker/filter?${queryParams}`);

    console.log('Respuesta del servidor:', request.data);

    return request.data;
   } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
   }

}