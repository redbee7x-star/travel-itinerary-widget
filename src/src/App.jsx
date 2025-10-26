import React, { useState } from "react";
const sampleItinerary = (destination, startDate, endDate) => {
  const s = new Date(startDate);
  const e = new Date(endDate);
  let dayCount = Math.max(1, Math.round((e - s) / (24*60*60*1000)) + 1);
  const days = [];
  for (let i=0;i<dayCount;i++){
    const d = new Date(s);
    d.setDate(s.getDate()+i);
    days.push({
      date: d.toISOString().slice(0,10),
      items: [
        {time:"09:00", title:`Explore ${destination} downtown`, type:"Activity", desc:"Walking tour & local museum"},
        {time:"12:00", title:"Lunch — local food", type:"Restaurant", desc:"Try a popular local dish"},
        {time:"15:00", title:"Afternoon: park or market", type:"Activity", desc:"Relax and explore"},
        {time:"19:00", title:"Dinner suggestion", type:"Restaurant", desc:"Well-rated popular spot"}
      ]
    })
  }
  return {
    summary:`${dayCount}-day ${destination} trip`,
    days,
    restaurants:[
      {name:"Local Favorite", cuisine:"Regional", address:"Near center"}
    ],
    logistics:[
      "Use local ride apps for short trips",
      "Carry small cash for street food"
    ]
  };
};

export default function App(){
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [itinerary, setItinerary] = useState(null);

  function generate(e){
    e && e.preventDefault();
    if(!destination || !startDate || !endDate){
      alert("Please fill destination, start and end date.");
      return;
    }
    const data = sampleItinerary(destination, startDate, endDate);
    setItinerary(data);
  }

  return (
    <div style={{fontFamily:"Arial, sans-serif",padding:20,maxWidth:820,margin:"0 auto"}}>
      <h2>Travel Itinerary Generator</h2>
      <form onSubmit={generate} style={{display:"grid",gap:10}}>
        <label>
          Destination
          <input style={{width:"100%",padding:8}} value={destination} onChange={e=>setDestination(e.target.value)} placeholder="e.g. Yogyakarta, Indonesia" />
        </label>
        <div style={{display:"flex",gap:10}}>
          <label style={{flex:1}}>
            Start date
            <input type="date" style={{width:"100%",padding:8}} value={startDate} onChange={e=>setStartDate(e.target.value)} />
          </label>
          <label style={{flex:1}}>
            End date
            <input type="date" style={{width:"100%",padding:8}} value={endDate} onChange={e=>setEndDate(e.target.value)} />
          </label>
        </div>
        <div style={{display:"flex",gap:10}}>
          <button style={{padding:"10px 16px"}} type="submit">Generate Itinerary</button>
          <button type="button" style={{padding:"10px 16px"}} onClick={() => { setDestination(""); setStartDate(""); setEndDate(""); setItinerary(null); }}>Reset</button>
        </div>
      </form>

      {itinerary && (
        <div style={{marginTop:20,border:"1px solid #ddd",padding:12,borderRadius:8,background:"#fff"}}>
          <h3>{itinerary.summary}</h3>
          {itinerary.days.map((day, idx)=>(
            <div key={idx} style={{marginTop:10}}>
              <strong>Day {idx+1} — {day.date}</strong>
              <ul>
                {day.items.map((it,i)=>(
                  <li key={i} style={{marginTop:6}}>
                    <div><strong>{it.time} — {it.title}</strong></div>
                    <div style={{fontSize:13,color:"#555"}}>{it.type} • {it.desc}</div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div style={{marginTop:12}}>
            <strong>Restaurants</strong>
            <ul>
              {itinerary.restaurants.map((r,i)=>(<li key={i}>{r.name} — {r.cuisine} — {r.address}</li>))}
            </ul>
          </div>
          <div style={{marginTop:12}}>
            <strong>Logistics & Tips</strong>
            <ul>
              {itinerary.logistics.map((l,i)=>(<li key={i}>{l}</li>))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
