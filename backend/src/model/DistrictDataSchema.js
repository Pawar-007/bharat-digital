import mongoose from "mongoose";

const DistrictDataSchema = new mongoose.Schema(
  {
    // Basic info
    district_name: {
      type: String,
      required: true,
      trim: true,
    },
    state_name: {
      type: String,
      required: true,
      trim: true,
    },

    approved_labour_budget: {
      type: Number,
      default: 0,
    },
    
    total_no_of_active_workers: {
      type: Number,
      default: 0,
    },
    total_expenditure: {
      type: Number,
      default: 0,
    },
    average_wage_rate_per_day_per_person: {
      type: Number,
      default: 0,
    },
    total_persondays_generated: {
      type: Number,
      default: 0,
    },
    women_persondays_percentage: {
      type: Number,
      default: 0,
    },

    // Caching and backup
    raw_data: {
      type: Object, // Store the full record from API
      required: true,
    },
    last_updated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, 
  }
);


DistrictDataSchema.index({ last_updated: 1 }, { expireAfterSeconds: 86400 });

export default mongoose.model("DistrictData", DistrictDataSchema);
