import "../../assets/styles/admin.css";
import { FaUser } from "react-icons/fa";
import { useState } from "react";
import { MdProductionQuantityLimits } from "react-icons/md";
import { MdDesignServices } from "react-icons/md";
import { FaBookOpen } from "react-icons/fa";
import { FcRating } from "react-icons/fc";
import { IoMdHome } from "react-icons/io";
import Manageemployee from "../manageEmployeeAndCustomer";
import ManageProduct from "../manageServiceAndProduct";
import AddEmployee from "../addEmployee";
import AddProduct from "../addProduct";
import AddService from "../addService";

function Admin() {
	const [isEmployee, setEmployee] = useState(true);
	const [isCustomer, setCustomer] = useState(false);
	const [isProduct, setProduct] = useState(false);
	const [isService, setService] = useState(false);
	const [showProduct, setShowProduct] = useState(false);
	const [showEmploye, setShowEmploye] = useState(true);
	const [showAddEmployee, setshowAddEmployee] = useState(false);
	const [showAddProduct, setShowAddProduct] = useState(false);
	const [showAddService, setShowAddService] = useState(false);
	const handleEmployee = (e) => {
		e.preventDefault();
		setEmployee(true);
		setCustomer(false);
		setShowEmploye(true);
		setShowProduct(false);
		setshowAddEmployee(false);
		setShowAddProduct(false);
		setShowAddService(false);
	};
	const handleCustomer = (e) => {
		e.preventDefault();
		setEmployee(false);
		setCustomer(true);
		setShowEmploye(true);
		setShowProduct(false);
		setshowAddEmployee(false);
		setShowAddProduct(false);
		setShowAddService(false);
	};
	const handleProduct = (e) => {
		e.preventDefault();
		setProduct(true);
		setService(false);
		setShowProduct(true);
		setShowEmploye(false);
		setshowAddEmployee(false);
		setShowAddProduct(false);
		setShowAddService(false);
	};

	const handleService = (e) => {
		e.preventDefault();
		setService(true);
		setProduct(false);
		setShowProduct(true);
		setShowEmploye(false);
		setshowAddEmployee(false);
		setShowAddProduct(false);
		setShowAddService(false);
	};
	const handleAddEmployee = (e) => {
		e.preventDefault();
		setshowAddEmployee(true);
		setShowProduct(false);
		setShowEmploye(false);
		setShowAddProduct(false);
		setShowAddService(false);
	};
	const handleAddProduct = (e) => {
		e.preventDefault();
		setShowAddProduct(true);
		setshowAddEmployee(false);
		setShowProduct(false);
		setShowEmploye(false);
		setShowAddService(false);
	};
	const handleAddService = (e) => {
		e.preventDefault();
		setShowAddService(true);
		setShowAddProduct(false);
		setshowAddEmployee(false);
		setShowProduct(false);
		setShowEmploye(false);
	};

	return (
		<div>
			<div className="admin-conatiner">
				<div className="admin-sidebar">
					<div className="admin-menu">
						<div>
							<h2 className="admin-h2">Admin</h2>
						</div>
						<div>
							<div>
								<h3 className="admin-h3">Data</h3>
							</div>
							<div>
								<ul>
									<li>
										<a href="#" onClick={handleProduct}>
											{" "}
											<MdProductionQuantityLimits /> Manage Product
										</a>
									</li>
									<li>
										<a href="#" onClick={handleService}>
											{" "}
											<MdDesignServices /> Manage Service
										</a>
									</li>
									<li>
										<a href="#" onClick={handleEmployee}>
											{" "}
											<FaUser /> Manage employee
										</a>
									</li>
									<li>
										<a href="#">
											{" "}
											<FaBookOpen /> View Appointment{" "}
										</a>
									</li>
									<li>
										<a href="#" onClick={handleCustomer}>
											<FcRating /> View Reviwes
										</a>
									</li>
								</ul>
							</div>
							<div>
								<h3 className="admin-h3">Pages</h3>
							</div>
							<div>
								<ul>
									<li>
										<a href="#">
											<IoMdHome /> Home
										</a>
									</li>
									<li>
										<a href="#">
											{" "}
											<MdDesignServices /> Service
										</a>
									</li>
									<li>
										<a href="#">
											{" "}
											<MdProductionQuantityLimits /> Product
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				{showEmploye && (
					<>
						<Manageemployee
							isEmployee={isEmployee}
							isCustomer={isCustomer}
							handleEmployee={handleEmployee}
							handleAddEmployee={handleAddEmployee}
						/>
					</>
				)}

				{showProduct && (
					<>
						<ManageProduct
							isService={isService}
							isProduct={isProduct}
							handleAddProduct={handleAddProduct}
							handleAddService={handleAddService}
						/>
					</>
				)}
				{showAddEmployee && (
					<>
						<AddEmployee handleEmployee={handleEmployee} />
					</>
				)}
				{showAddProduct && (
					<>
						<AddProduct handleProduct={handleProduct} />
					</>
				)}

				{showAddService && (
					<>
						<AddService handleService={handleService} />
					</>
				)}
			</div>
		</div>
	);
}
export default Admin;