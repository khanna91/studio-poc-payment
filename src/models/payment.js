/* eslint-disable */
const uuidv4 = require('uuid/v4');

module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define('Payment', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: () => uuidv4()
    },
    orderId: DataTypes.UUID,
    currency: DataTypes.STRING,
    amountToPay: DataTypes.FLOAT,
    transactionId: DataTypes.STRING,
    status: DataTypes.STRING
  }, {});
  // Payment.associate = function(models) {
    // associations can be defined here
  // };
  return Payment;
};