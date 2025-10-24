const DistrictCard = ({ district, onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{
        border: "2px solid #4caf50",
        borderRadius: "12px",
        padding: "20px",
        backgroundColor: "#e8f5e9",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        transition: "transform 0.2s",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <h2 style={{ fontSize: "22px", fontWeight: "bold", color: "#2e7d32", marginBottom: "15px" }}>
        {district.district_name || "N/A"}
      </h2>

      <p style={{ fontSize: "16px", margin: "5px 0", color: "#2e7d32" }}>
        <strong>Financial Year:</strong> {district.fin_year || "N/A"}
      </p>

      <p style={{ fontSize: "16px", margin: "5px 0", color: "#2e7d32" }}>
        <strong>Month:</strong> {district..month || "N/A"}
      </p>

      <p style={{ fontSize: "18px", margin: "5px 0", color: "#1565c0" }}>
        <strong>Total Workers:</strong> {district.total_no_of_active_workers?.toLocaleString() || "N/A"}
      </p>

      <p style={{ fontSize: "18px", margin: "5px 0", color: "#ff6f00" }}>
        <strong>Total Households Worked:</strong> {district.Total_Households_Worked?.toLocaleString() || "N/A"}
      </p>

      <p style={{ fontSize: "16px", margin: "5px 0", color: "#ff6f00" }}>
        <strong>Average Wage/Day:</strong>{" "}
        <span style={{ color: "#d32f2f", fontWeight: "bold" }}>
          ₹{district.average_wage_rate_per_day_per_person?.toFixed(2) || "N/A"}
        </span>
      </p>

      <p style={{ fontSize: "16px", margin: "5px 0", color: "#6a1b9a" }}>
        <strong>Women Persondays:</strong> {district.women_persondays_percentage?.toLocaleString() || "N/A"}
      </p>

      {district.raw_data?.Remarks && district.raw_data.Remarks !== "NA" && (
        <p style={{ fontSize: "16px", marginTop: "10px", fontStyle: "italic", color: "#424242" }}>
          <strong>Remarks:</strong> {district.Remarks}
        </p>
      )}
    </div>
  );
};

export default DistrictCard;
