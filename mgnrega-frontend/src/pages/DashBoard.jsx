import { useState, useEffect } from "react";
import axios from "axios";
import DistrictCard from "../components/DistrictSelector.jsx";
import StateSelector from "../components/StateSelector.jsx";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const [state, setState] = useState("MAHARASHTRA");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const fetchData = async (selectedState) => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:3000/api/mgnrega?state_name=${selectedState}`);
      console.log("fetched data",res.data);
      setData(res.data?.data || []);
    } catch (err) {
      console.error(err);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(state);
  }, [state]);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center" }}>MGNREGA District Data</h1>
      <StateSelector state={state} setState={setState} />
      {loading ? (
        <p>Loading data...</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px", marginTop: "20px" }}>
          {data?.length > 0 ? (
            data?.map((district) => (
              <DistrictCard
                key={district._id}
                district={district}
                onClick={() =>
                  navigate(`/state/${state}/district/${district.district_name}`)
                }
              />
            ))
          ) : (
            <p>No data available for the selected state.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
