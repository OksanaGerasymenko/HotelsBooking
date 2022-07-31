  function generateUserData(role) {
    return {
      role,
      image: `https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1)
        .toString(36)
        .substring(7)}.svg`,
      discount: 50,
      discountPersonalPercent: 0
    }
  }
  
  module.exports = {
    generateUserData
  }