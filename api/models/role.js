module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define("Role", {
        RoleName: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    return Role;
};
