const express = require("express");
const app = express();
const multer = require("multer");
const cors = require("cors");
const path = require("path");
app.use(cors());
const database = require("./connection/connectMySQL");

const port = 8080;

// Thiết lập multer cho việc upload file
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "uploads/");
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname); // Lấy tên đường dẫn gốc "C:\Users\ngoq7\OneDrive\Hình ảnh\avatar\avata1.jpg"
  },
});

// Tiến hanh luuw trữ
const upload = multer({ storage: storage });

// Đường dẫn cho các tập tin ảnh
app.use("/images", express.static(path.join(__dirname, "uploads")));

// API thêm mới ảnh
app.post("/api/v1/register", upload.single("Image"), (req, res) => {
  // Lấy dữu liệu ở client
  const { UserName, Email, Passwords } = req.body;
  // Lấy  tên file
  const fileName = req.file
    ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    : null;

  // Khai báo câu lệnh query insert user
  const queryString =
    "insert into users(UserName, Email, Passwords, Image) values (?,? ,? ,?)";
  database.query(
    queryString,
    [UserName, Email, Passwords, fileName],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          err: err,
        });
      } else {
        return res.status(201).json({
          status: 200,
          message: "Insert success ",
        });
      }
    }
  );
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
