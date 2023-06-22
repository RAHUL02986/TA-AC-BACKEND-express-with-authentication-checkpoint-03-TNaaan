var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var expenseSchema = new Schema(
  {
    expname: { type: String, required: true },
    category: { type: [String], required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

expenseSchema.index({ category: 1 });
expenseSchema.index({ date: 1 });

var Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;