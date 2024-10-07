import axios from "axios";
import { useEffect, useState } from "react";

export default function Weather() {
    const [query, setQuery] = useState("");
    const [weather, setWeather] = useState(null);  // Holds weather data

    const api = {
        key: "81777bbe903b4cecaf7164920240410",
        base: "http://api.weatherapi.com/v1/current.json?"
    };

    useEffect(() => {
        async function fetchData() {
            try {
                if (query) {  // Only fetch if query is not empty
                    const response = await axios.get(`${api.base}key=${api.key}&q=${query}`);
                    setWeather(response.data);  // Save the API response in the state
                } else {
                    setWeather(null);  // Clear weather data if query is empty
                }
            } catch (error) {
                console.error("Error fetching weather data", error);
            }
        }

        if (query) {  // Only fetch if a query exists
            fetchData();
        }
    }, [query]);

    let d = new Date().getDate()

    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let w = daysOfWeek[weather.current.is_day]

    return (
        <div className="h-screen flex justify-center bg-white">
            <div className="flex flex-col justify-center">
                <div className="shadow-xl border-2 rounded-lg bg-sky-100 w-full text-center p-2 h-max px-4">
                    <div className="text-4xl font-bold pt-6 w-96">
                        Weather App
                    </div>
                    <div className="m-3">
                        <div className="flex justify-center">
                            <input 
                                onChange={(e) => setQuery(e.target.value)} 
                                placeholder="search" 
                                className="w-full px-2 py-1 border rounded border-slate-200"
                            />
                        </div>
                    </div>

                    {/* Conditional rendering of weather data */}
                    {weather && weather.location && weather.current ? (
                        <div className="text-4xl font-medium pt-2 w-full">
                            <h3>{d}, {w}</h3>
                            <h2>{weather.location.name},{weather.location.country}</h2>  {/* Display the city name */}
                            <p>Temperature: {weather.current.temp_c}°C</p>  {/* Display temperature */}
                            <p>Condition: {weather.current.condition.text}</p>  {/* Display weather condition */}
                        </div>
                    ) : (
                        <p className="text-xl">Enter a city to get weather data</p>
                    )}
                </div>
            </div>
        </div>
    );
}
