
import mongoose from "mongoose";

const playerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        age: {
            type: Number,
            required: true,
            min: 16,
            max: 50
        },

        role: {
            type: String,
            required: true,
            enum: ["Batsman", "Bowler", "All-Rounder", "Wicket-Keeper"]
        },

        nationality: {
            type: String,
            required: true,
            trim: true
        },

        team: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Team",
            required: true
        },

        photo: {
            type: String,
            trim: true,
            default: ""
        },

        runs: {
            type: Number,
            default: 0,
            min: 0
        },

        wickets: {
            type: Number,
            default: 0,
            min: 0
        },

        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

const Player = mongoose.model("Player", playerSchema);

export default Player;