const StateSelector = ({ state, setState }) => {
  const states = [
    "ANDHRA PRADESH", "ARUNACHAL PRADESH", "ASSAM", "BIHAR", "CHHATTISGARH",
    "GOA", "GUJARAT", "HARYANA", "HIMACHAL PRADESH", "JHARKHAND",
    "KARNATAKA", "KERALA", "MADHYA PRADESH", "MAHARASHTRA", "MANIPUR",
    "MEGHALAYA", "MIZORAM", "NAGALAND", "ODISHA", "PUNJAB",
    "RAJASTHAN", "SIKKIM", "TAMIL NADU", "TELANGANA", "TRIPURA",
    "UTTAR PRADESH", "UTTARAKHAND", "WEST BENGAL", "DELHI", "JAMMU AND KASHMIR",
    "LADAKH", "PUDUCHERRY", "ANDAMAN AND NICOBAR ISLANDS", "CHANDIGARH", "DADRA AND NAGAR HAVELI AND DAMAN AND DIU",
    "LAKSHADWEEP"
  ];

  return (
    <div style={{ textAlign: "center", margin: "20px 0" }}>
      <label htmlFor="state" style={{ marginRight: "10px", fontWeight: "bold" }}>
        Select State:
      </label>
      <select
        id="state"
        value={state}
        onChange={(e) => setState(e.target.value)}
        style={{ padding: "5px 10px", fontSize: "16px" }}
      >
        {states?.map((s) => (
          <option key={s} value={s} >{s}</option>
        ))}
      </select>
    </div>
  );
};

export default StateSelector;
