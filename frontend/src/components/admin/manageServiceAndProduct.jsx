import "../../assets/styles/Admin/manageproduct.css";
import { useEffect, useState } from "react";
function ManageProduct(props) {
	const [product, setProduct] = useState([]);
	const [service, setService] = useState([]);
	useEffect(() => {
		fetch("http://127.0.0.1:5000/product", {
			method: "Get",
		})
			.then((response) => response.json())
			.then((data) => {
				setProduct(data);
			});
		fetch("http://127.0.0.1:5000/service", {
			method: "Get",
		})
			.then((response) => response.json())
			.then((data) => {
				setService(data);
				console.log(service);
			});
	}, []);

	const handleDeleteService = async (serviceid) => {
		const response = await fetch(`http://127.0.0.1:5000/service/${serviceid}`, {
			method: "Delete",
		});
		if (response.ok) {
			const data = await response.json();
			setService(data);
		} else {
			console.error("Failed to fetch product data");
		}
	};
	const handleDeleteProduct = async (productid) => {
		const response = await fetch(`http://127.0.0.1:5000/product/${productid}`, {
			method: "Delete",
		});
		if (response.ok) {
			const data = await response.json();
			setProduct(data);
		} else {
			console.error("Failed to fetch product data");
		}
	};
	return (
		<div>
			{/* <div className="welcome-container">
				<h1 className="welcome">Welcome Alhamdu</h1>
			</div> */}
			<div className="employedata-conatiner">
				{props.isService && (
					<>
						<button className="add" onClick={props.handleAddService}>
							&#43;
						</button>
						<button className="manage-employe-button">Manage Service</button>
					</>
				)}

				{props.isProduct && (
					<>
						<button className="add" onClick={props.handleAddProduct}>
							&#43;
						</button>
						<button className="manage-employe-button">Manage Product</button>
					</>
				)}
				<table>
					{props.isService && (
						<>
							<tr>
								<th>Service Name</th>
								<th>Service Desc</th>
								<th>Service Price</th>
								<th>Service Catagory</th>
								<th>Service Image</th>

								<th colSpan={2}>Action</th>
							</tr>

							{service.map((service) => (
								<tr key={service.id}>
									<td>{service.servicename}</td>

									<td>{service.servicedesc}</td>

									<td>{service.serviceprice}</td>
									<td>{service.servicecatagory}</td>
									<td>
										<img
											src={service.serviceimage}
											alt=""
											className="image-admin"
										/>
									</td>
									<td>
										<button
											className="action"
											onClick={() => {
												props.handleEditService(service.id);
												props.handleShowEditService();
											}}>
											Edit
										</button>
									</td>
									<td>
										<button
											className="action delete"
											onClick={() => {
												handleDeleteService(service.id);
												props.handleShowPopup();
											}}>
											Delete
										</button>
									</td>
								</tr>
							))}
						</>
					)}

					{props.isProduct && (
						<>
							<tr>
								<th>Product Name</th>
								<th>Product Desc</th>
								<th>Product Price</th>
								<th>Product Image</th>
								<th colSpan={2}>Action</th>
							</tr>
							{product.map((product) => (
								<tr key={product.id}>
									<td>{product.productname}</td>
									<td>{product.productdesc}</td>
									<td>{product.productprice}</td>
									<td>
										<img
											src={product.productimage}
											alt=""
											className="image-admin"
										/>
									</td>
									<td>
										<button
											className="action"
											onClick={() => {
												props.handleShowEditProduct();
												props.handleEditProduct(product.id);
											}}>
											Edit
										</button>
									</td>
									<td>
										<button
											className="action delete"
											onClick={() => {
												handleDeleteProduct(product.id);
												props.handleShowPopup();
											}}>
											Delete
										</button>
									</td>
								</tr>
							))}
						</>
					)}
				</table>
			</div>
		</div>
	);
}
export default ManageProduct;
