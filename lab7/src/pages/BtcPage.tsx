import React, { useState } from "react";
import { BtcResponse } from "../types";

const COIND_API = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd";

const BtcPage: React.FC = () => {
  const [btc, setBtc] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchBtc = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(COIND_API);
      const data: BtcResponse = await res.json();
      setBtc(data.bitcoin.usd);
    } catch {
      setError("Ошибка загрузки курса BTC");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="panel" style={{ textAlign: "center" }}>
      <h2>CoinGecko</h2>
      <button className="button button-primary" onClick={fetchBtc}>
        Загрузить курс
      </button>
      <div className="state-box">
        {loading && "Загрузка..."}
        {error && error}
      </div>
      {btc !== null && (
        <div className="result-box" style={{ fontSize: "18px", fontWeight: 600 }}>
          BTC/USD: {btc}
        </div>
      )}
    </div>
  );
};

export default BtcPage;