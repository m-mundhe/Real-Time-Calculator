const mongoose = require("mongoose");

const calculatorSchema = mongoose.Schema({
    calculation: String
}, {
    timestamps: true
});

module.exports = mongoose.model("calculator", calculatorSchema, "calculator");