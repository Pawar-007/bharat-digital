import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DistrictDetails = () => {
  const { stateName, districtName } = useParams();
  const [district, setDistrict] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDistrictData = async () => {
      try {
        const res = await fetch(
          `https://bharat-digital.onrender.com/api/mgnrega/district/${stateName}/${districtName}`
        );
        const result = await res.json();

        if (res.ok) {
          setDistrict(result.data);
        } else {
          setError(result.message || "District data not found.");
        }
      } catch (err) {
        setError("Failed to fetch district data.");
      } finally {
        setLoading(false);
      }
    };

    fetchDistrictData();
  }, [stateName, districtName]);

  if (loading) return <p>Loading district data...</p>;
  if (error) return <p>{error}</p>;

  // Helper function to format numbers with commas
  const formatNumber = (num) => (num !== undefined ? num.toLocaleString() : "N/A");

  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "0 auto", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", color: "#2e7d32" }}>
        {district.district_name} ({district.state_name})
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "15px",
          marginTop: "20px",
        }}
      >
        <div style={cardStyle("#e3f2fd")}>
          <h3>Financial Info</h3>
          <p><strong>Financial Year:</strong> {district.raw_data.fin_year}</p>
          <p><strong>Month:</strong> {district.raw_data.month}</p>
          <p><strong>Approved Labour Budget:</strong> ₹{formatNumber(district.approved_labour_budget)}</p>
          <p><strong>Total Expenditure:</strong> ₹{formatNumber(district.total_expenditure)}</p>
          <p><strong>Average Wage / Day:</strong> ₹{parseFloat(district.average_wage_rate_per_day_per_person).toFixed(2)}</p>
        </div>

        <div style={cardStyle("#fff3e0")}>
          <h3>Employment Stats</h3>
          <p><strong>Total Workers:</strong> {formatNumber(district.total_no_of_active_workers)}</p>
          <p><strong>Total Households Worked:</strong> {formatNumber(district.raw_data.Total_Households_Worked)}</p>
          <p><strong>Total Persondays Generated:</strong> {formatNumber(district.total_persondays_generated)}</p>
          <p><strong>Women Persondays:</strong> {formatNumber(district.women_persondays_percentage)}</p>
        </div>

        <div style={cardStyle("#e8f5e9")}>
          <h3>Other Info</h3>
          <p><strong>Total Individuals Worked:</strong> {formatNumber(district.raw_data.Total_Individuals_Worked)}</p>
          <p><strong>Total No of Active Job Cards:</strong> {formatNumber(district.raw_data.Total_No_of_Active_Job_Cards)}</p>
          <p><strong>Remarks:</strong> {district.raw_data.Remarks !== "NA" ? district.raw_data.Remarks : "None"}</p>
        </div>
      </div>
    </div>
  );
};

// Card style helper
const cardStyle = (bgColor) => ({
  backgroundColor: bgColor,
  padding: "15px",
  borderRadius: "12px",
  boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
  fontSize: "16px",
  lineHeight: "1.6",
});

export default DistrictDetails;
