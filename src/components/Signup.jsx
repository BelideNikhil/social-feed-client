import { useState } from "react";
import { useAuth } from "../context/auth.context";
import { Link } from "react-router";

export const Signup = () => {
  const { signupHandler } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <form onSubmit={(e) => signupHandler(e, formData)}>
      <div>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={onChangeHandler}
        />
      </div>
      <div>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={onChangeHandler}
        />
      </div>
      <div>
        Password:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={onChangeHandler}
        />
      </div>
      <button type="submit">Signup</button>
      <div>
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </form>
  );
};
