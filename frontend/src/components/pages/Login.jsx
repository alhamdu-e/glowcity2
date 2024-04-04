import React from "react";

import "../../assets/styles/login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegEyeSlash } from "react-icons/fa6";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/Autcontext";
import { useProfesionalContext } from "../../context/profesionalcontext";
import { useUserContext } from "../../context/UserContext";
import { useCartContext } from "../../context/cartcontext";
function Login() {
	const { setUserType, setToken } = useAuthContext();
	const { setProfesionaId } = useProfesionalContext();
	const { setUserId, setUserName, setUserData } = useUserContext();
	const { setCartLength, setItems } = useCartContext();
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const handleChangeEmail = (event) => {
		setEmail(event.target.value);
	};
	const handleChangePassword = (event) => {
		setPassword(event.target.value);
	};
	const handleShwoPassword = () => {
		setShowPassword(!showPassword);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const loginform = {
			email,
			password,
		};

		try {
			const response = await fetch("http://127.0.0.1:5000/login", {
				method: "POST",
				body: JSON.stringify(loginform),
				headers: { "Content-Type": "application/json" },
			});

			if (response) {
				const data = await response.json();

				if (response.ok) {
					localStorage.setItem("token", data.isAut);
					setToken(data.isAut);
					setUserType(data.userType);
					localStorage.setItem("userType", data.userType);

					if (data.userType === "admin") {
						navigate("/admin");
					}
					if (data.userType === "user") {
						setUserId(data.usersResult[0].id);
						setUserName(data.usersResult[0].fname);
						localStorage.setItem("userName", data.usersResult[0].fname);
						setUserData(data.usersResult);
						localStorage.setItem("userid", data.usersResult[0].id);
						localStorage.setItem("email", data.usersResult[0].email);

						const handleAddtocart = async () => {
							const useridd = data.usersResult[0].id;

							const response = await fetch(
								`http://127.0.0.1:5000/getCart/${useridd}`,
								{
									method: "get",
								}
							);

							if (response.ok) {
								const cart = await response.json();
								localStorage.setItem("cart", JSON.stringify(cart));
								// setCartLength(cart.length);
								// setItems(cart);
							}
						};
						handleAddtocart();

						navigate("/");
					}
					if (data.userType === "profesional") {
						setProfesionaId(data.profesionalResult[0].id);
						setUserName(data.usersResult[0].fname);
						navigate("/Professionalappoin");
					}
				}
				if (!data) {
					navigate("/signup");
				}
			} else {
				navigate("/signup");
			}
		} catch (error) {
			console.log("error", error);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className="fullsign">
				<div className="login-container">
					<div className="loginform container">
						<div>
							<h3 className="login-h3">Login to GlowCity</h3>
						</div>
						<div>
							<label htmlFor="username">Email</label>
							<input
								type="email"
								placeholder="Email"
								name="email"
								id="username"
								onChange={handleChangeEmail}
							/>
							<br />
						</div>
						<div className="password-cont">
							<label htmlFor="password">Password</label>
							<input
								placeholder="Password"
								type={showPassword ? "text" : "password"}
								name="password"
								id="password"
								onChange={handleChangePassword}
							/>

							{password && (
								<button
									className="off-eye"
									type="button"
									onClick={handleShwoPassword}>
									{" "}
									{!showPassword && <FaRegEyeSlash />}
									{showPassword && <MdOutlineRemoveRedEye />}
								</button>
							)}

							<br />
						</div>

						<div>
							<button className="login-button">Login </button>
						</div>
						<div>
							<span>
								Don't have an account? <Link to="/signup">Signup here.</Link>
							</span>
						</div>

						<div>
							<Link className="forget-button" to="/resetemail">
								Forget Password?
							</Link>
						</div>
					</div>
				</div>
			</div>
		</form>
	);
}
export default Login;
