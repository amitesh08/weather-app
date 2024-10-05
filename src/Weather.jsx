import axios from "axios"
import { useEffect, useState } from "react"


export default function Weather(){
    const [query, setQuery]= useState("")
    const [weather, setWeather] = useState()

    const api = {
        key: "81777bbe903b4cecaf7164920240410",
        base: "http://api.weatherapi.com/v1/current.json?"
    }

    useEffect(()=> {
        async function fetchData(){
            try{
            const response = await axios.get(`${api.base}key=${api.key}&q=${query}`)
            setWeather(response.data.current.temp_c) 
            }catch(error){
                console.error("Error fetching weather data ",error)
            }
        }
        if (query) {  // Only fetch if there's a query
            fetchData();
        }
    },[query])
    

    return (
        <div className="h-screen flex justify-center bg-white">
            <div className="flex flex-col justify-center" >
                <div className="shadow-xl border-2 rounded-lg bg-sky-100 w-full text-center p-2 h-max px-4">
                    <div className="text-4xl font-bold pt-6 w-96 ">
                        Weather App
                    </div>
                    <div className="m-3">
                        <div className="flex justify-center">
                            <input 
                            onChange={(e)=> setQuery(e.target.value)} 
                            placeholder="search" className="w-full px-2 py-1 border rounded border-slate-200"/> 
                        </div>
                    </div>
                    <div className="text-4xl font-medium pt-2 w-96 ">
                        {weather}
                    </div>
                </div>
            </div>
        </div>
    )
}