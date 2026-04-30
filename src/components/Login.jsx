import { useState } from "react";
import { useAuth } from "../context/auth.context";
import { Link } from "react-router";

export const Login = () => {
  const { loginHandler } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={(e) => loginHandler(e, formData)}>
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
      <button type="submit" type="submit">
        Login
      </button>
      <div>
        Don't have an account? <Link to="/signup">Sign up!</Link>
      </div>
    </form>
  );
};
