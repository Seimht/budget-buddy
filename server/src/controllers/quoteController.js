

const fetch = require("node-fetch"); 

exports.getQuote = async (req, res) => {
  try {
    // Use a reliable quote API
    const response = await fetch("https://zenquotes.io/api/random");

    if (!response.ok) {
      throw new Error(`Status: ${response.status}`);
    }

    const data = await response.json();

    const quote = Array.isArray(data) ? data[0] : data;

    res.json({
      content: quote.q || "The best investment you can make is in yourself.",
      author: quote.a || "Budget Buddy",
    });
  } catch (error) {
    console.error("Quote API error:", error.message || error);

    res.json({
      content: "The best investment you can make is in yourself.",
      author: "Budget Buddy",
    });
  }
};
