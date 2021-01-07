const mongoose = require("mongoose");

const calculatorSchema = mongoose.Schema({
    calculation: String
}, {
    timestamps: true
});

// module.exports.calculatorSchema = calculatorSchema;

// module.exports.calculator = mongoose.model("calculator", calculatorSchema);

module.exports = mongoose.model("calculator", calculatorSchema, "calculator");