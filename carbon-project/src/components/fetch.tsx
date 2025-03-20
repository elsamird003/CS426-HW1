import { useState, useEffect } from "react";
import "./fetch.css";
const apiUrl = "https://api.api-ninjas.com/v1/quotes";
const apiKey = "ZxGOe+KJv5SmlSdnVrswfQ==A311wlLd9vmgnYuW";

export default function FetchQuote() {
  const [quote, setQuote] = useState<string>("");
  const [author, setAuthor] = useState<string>("");

  useEffect(() => {
    async function getQuote() {
      try {
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "X-Api-Key": apiKey,
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${await response.text()}`);
        }

        const data = await response.json();
        setQuote(data[0].quote);
        setAuthor(data[0].author);
      } catch (error) {
        console.error(error);
        setQuote("Failed to load quote.");
      }
    }

    getQuote();
  }, []);

  return (
    <div className="quote-container">
         <h1 > Quote of the day </h1>
      <blockquote>"{quote}"</blockquote>
      <p>- {author}</p>
    </div>
  );
}
