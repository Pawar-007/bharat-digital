import DistrictData from "../model/DistrictDataSchema.js";

const API_KEY = process.env.DATA_GOV_API_KEY;
const RESOURCE_ID =process.env.RESOURCE_ID;

export const getMGNREGAData = async (req, res) => {
  const state = req.query.state_name?.toUpperCase() || "MAHARASHTRA"; // normalize state name
  console.log(`\n[INFO] MGNREGA API called for state: ${state}`);

  try {
    // Fetch API data for the specific state
    const apiUrl = `https://api.data.gov.in/resource/${RESOURCE_ID}?api-key=${API_KEY}&format=json&limit=1000&filters[state_name]=${encodeURIComponent(state)}`;
    const response = await fetch(apiUrl, { headers: { Accept: "application/json" } });

    if (!response.ok) {
      console.error("API Error:", response.status, response.statusText);
      throw new Error(`API failed with status ${response.status}`);
    }

    const data = await response.json();
    const records = data.records || [];

    if (records.length > 0) {
      console.log(`[SUCCESS] Fetched ${records.length} records for ${state}`);

      // Upsert into MongoDB (state-wise)
      const bulkOps = records.map((rec) => ({
        updateOne: {
          filter: { state_name: state, district_name: rec.district_name },
          update: {
            $set: {
              state_name: state,
              district_name: rec.district_name,
              approved_labour_budget: Number(rec.Approved_Labour_Budget) || 0,
              total_no_of_active_workers: Number(rec.Total_No_of_Active_Workers) || 0,
              total_expenditure: Number(rec.Total_Exp) || 0,
              average_wage_rate_per_day_per_person: Number(rec.Average_Wage_rate_per_day_per_person) || 0,
              total_persondays_generated: Number(rec.Total_Persondays_Generated) || 0,
              women_persondays_percentage: Number(rec.Women_Persondays) || 0,
              raw_data: rec,
              last_updated: new Date(),
            },
          },
          upsert: true,
        },
      }));

      await DistrictData.bulkWrite(bulkOps);
      console.log(`[DB] Updated/Inserted ${records.length} records for ${state}`);

      return res.status(200).json({ source: "api", state, count: records.length, data: records });
    }

    // If API returns no data, return only cached records for this state
    const cached = await DistrictData.find({ state_name: state }).lean();
    if (cached.length > 0) {
      console.warn(`[WARN] API empty. Returning cached data for ${state}`);
      return res.status(200).json({ source: "cache", state, data: cached });
    }

    return res.status(404).json({ message: `No data found for state: ${state}` });
  } catch (error) {
    console.error("[ERROR] API Fetch Failed:", error.message);

    const cached = await DistrictData.find({ state_name: state }).lean();
    if (cached.length > 0) {
      console.log(`[FALLBACK] Returning cached data for ${state}`);
      return res.status(200).json({ source: "cache-on-error", state, data: cached });
    }

    return res.status(500).json({ error: "Failed to fetch data from API and no cache available" });
  }
};


export const getDistrictData = async (req, res) => {

  const { stateName, districtName } = req.params; // state and district from URL
console.log("params ",stateName,districtName);
  if (!stateName || !districtName) {
    return res.status(400).json({ message: "State name and district name are required" });
  }

  try {
    // Search for district in MongoDB
      const district = await DistrictData.findOne({
      state_name: stateName.toUpperCase(),
      $or: [
        { district_name: { $regex: `^${districtName}$`, $options: "i" } },
        { "raw_data.district_name": { $regex: `^${districtName}$`, $options: "i" } }
      ]
    });


    if (!district) {
      return res.status(404).json({ message: "District data not found" });
    }

    // Return district data
    res.status(200).json({ data: district });
  } catch (error) {
    console.error("Error fetching district data:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};