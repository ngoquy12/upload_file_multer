// Khai báo thư viện
const mysql = require("mysql");

// Khởi tạo kết nối đến MySQL
const connect = mysql.createConnection({
  host: "localhost",
  password: "22121944",
  database: "upload_multer", // Tên database của bạn
  user: "root",
  port: 3306,
});

// Kiểm tra kết nối
connect.connect((error) => {
  if (error) {
    console.log("Kết nối thất bại", error);
  } else {
    console.log("Kết nối thành công");
  }
});

module.exports = connect; // export modle ra bên ngoài để sử dụng
