"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function Login() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(response);
      if (!data) {
        throw new Error("Invalid email or password.");
      }
    } catch (error) {
      console.log("Error: ", error);
      setErrorMessage(error.message);
    }

    setIsLoading(false);
    router.push("/home");
  };

  return (
    <div className="login-wrapper">
      <h1>Login</h1>
      {errorMessage && <p>{errorMessage}</p>}
      <form onSubmit={handleSubmit} className="login-form">
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Login"}
        </button>
      </form>
      <Link href="register">Don't have an account? Sign Up</Link>
    </div>
  );
}
