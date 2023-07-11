import { useState } from "react";
import axios from "axios";

function App() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [images, setImages] = useState(null);
  const [password, setPassword] = useState("");

  // Lấy giá trị từ input
  const handleChange = (e) => {
    setImages(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("Image", images);
    formData.append("UserName", username);
    formData.append("Email", email);
    formData.append("Passwords", password);

    // Gọi API upload
    axios
      .post("http://localhost:8080/api/v1/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <form action="" onSubmit={handleSubmit}>
        <h3>UPLOAD SINGLE FILE</h3>
        <label htmlFor="">Username</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
        />
        <br></br>
        <label htmlFor="">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
        />
        <br></br>
        <label htmlFor="">Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="text"
        />
        <br></br>
        <label htmlFor="">Image</label>
        <input type="file" multiple onChange={(e) => handleChange(e)} />
        <button type="submit">Upload</button>
      </form>
    </>
  );
}

export default App;
