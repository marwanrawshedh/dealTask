const { hashSync, genSaltSync } = require("bcryptjs");

const user = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "name",
      },

      phone: {
        type: DataTypes.STRING,
        unique: "phone",
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        unique: "email",
        allowNull: false,
      },
      gender: {
        type: DataTypes.STRING,
        type: DataTypes.ENUM("Male", "Female"),
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM("User", "Admin"),
        defaultValue: "User",
      },
      status: {
        type: DataTypes.ENUM("Active", "Inactive"),
        defaultValue: "Active",
      },
      lastLogin: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "last_login",
      },
      dateOfBirth: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "birth_date",
      },
    },
    {
      tableName: "users",
      createdAt: "created_date",
      updatedAt: "updated_date",
    }
  );

  User.associate = (models) => {
    User.hasMany(models.ClaimedDeal, {
      foreignKey: "user_id",
      targetKey: "id",
      onDelete: "CASCADE",
    });
  };
  User.sync().then(() => {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = hashSync(process.env.ADMIN_PASSWORD, genSaltSync(7));

    User.findOne({ where: { email: adminEmail, role: "Admin" } }).then(
      (adminUser) => {
        if (adminUser) {
          console.log("Admin user already exists.");
        } else {
          User.create({
            name: "Admin",
            email: adminEmail,
            password: adminPassword,
            role: "Admin",
            gender: "Male",
          })
            .then(() => {
              console.log("Admin user created successfully.");
            })
            .catch((error) => {
              console.error("Error creating admin user:", error);
            });
        }
      }
    );
  });
  return User;
};

module.exports = user;
