import React, { useState } from "react";

export default function App() {
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [interests, setInterests] = useState("");
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState("");

  async function generateItinerary(e) {
    e.preventDefault();
    setLoading(true);
    setItinerary("");

    const params = new URLSearchParams({
      destination,
      startDate,
      endDate,
      interests,
    });

    const res = await fetch(`/api/generateItinerary?${params}`);
    const data = await res.json();

    setItinerary(data.itinerary || "Something went wrong. Try again.");
    setLoading(false);
  }

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: 20, maxWidth: 820, margin: "0 auto" }}>
      <h2>AI Travel Itinerary Generator</h2>
      <form onSubmit={generateItinerary} style={{ display: "grid", gap: 10 }}>
        <label>
          Destination
          <input
            style={{ width: "100%", padding: 8 }}
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="e.g. Kyoto, Japan"
            required
          />
        </label>
        <div style={{ display: "flex", gap: 10 }}>
          <label style={{ flex: 1 }}>
            Start date
            <input type="date" style={{ width: "100%", padding: 8 }} value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
          </label>
          <label style={{ flex: 1 }}>
            End date
            <input type="date" style={{ width: "100%", padding: 8 }} value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
          </label>
        </div>
        <label>
          Interests
          <input
            style={{ width: "100%", padding: 8 }}
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            placeholder="e.g. art, nature, local food"
          />
        </label>
        <button type="submit" style={{ padding: "10px 16px" }}>
          {loading ? "Generating..." : "Generate Itinerary"}
        </button>
      </form>

      {itinerary && (
        <div style={{ marginTop: 20, border: "1px solid #ddd", padding: 12, borderRadius: 8, whiteSpace: "pre-wrap" }}>
          {itinerary}
        </div>
      )}
    </div>
  );
}

