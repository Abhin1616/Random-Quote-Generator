import RandomQuoteNav from "./RandomQuoteNav";
import "./RandomQuoteGenerator.css"
import { useState, useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner";
const randomQuoteApi = "https://inspo-quotes-api.herokuapp.com/quotes/random";

export default function RandomQuoteGenerator() {
    async function fetchQuote() {
        const response = await fetch(randomQuoteApi);
        const jsonResponse = await response.json();
        const randomQuote = jsonResponse.quote;
        setQuote(randomQuote);
        setIsLoading(false);

    }
    const [quote, setQuote] = useState({ text: "", author: "" });
    const [isLoading, setIsLoading] = useState(true);
    const handlefetch = () => {
        setIsLoading(true)
        fetchQuote()
    }

    useEffect(() => {
        fetchQuote();
    }, []);

    return (

        <>
            <RandomQuoteNav />
            <div className="mt-5">
                <div className="RandomQuoteGenerator card text-center">
                    <div className="card-body">
                        {isLoading && <LoadingSpinner />}
                        {!isLoading && <div><h1 className="card-title">{quote.text}</h1><h3 className="card-text">{quote.author}</h3></div>}

                        <button onClick={handlefetch} className="btn btn-primary mt-3" disabled={isLoading}>Generate Quote</button></div>

                </div>
            </div>


        </>
    );
}
