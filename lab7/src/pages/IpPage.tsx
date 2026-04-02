import React, { useState } from "react";
import { IpResponse } from "../types";

const IPIFY_API = "https://api.ipify.org?format=json";

const IpPage: React.FC = () => {
  const [ip, setIp] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchIp = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(IPIFY_API);
      const data: IpResponse = await res.json();
      setIp(data.ip);
    } catch {
      setError("Ошибка загрузки IP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="panel" style={{ textAlign: "center" }}>
      <h2>ipify</h2>
      <button className="button button-primary" onClick={fetchIp}>
        Показать IP
      </button>
      <div className="state-box">
        {loading && "Загрузка..."}
        {error && error}
      </div>
      {ip && (
        <div className="result-box" style={{ fontSize: "18px", fontWeight: 600 }}>
          Ваш публичный IP: {ip}
        </div>
      )}
    </div>
  );
};

export default IpPage;