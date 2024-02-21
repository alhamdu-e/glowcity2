import "../../assets/styles/Admin/editService.css";
import { useEffect, useState } from "react";
function EditService(props) {
	const [serviceData, setServiceData] = useState([]);
	const nameRegx = /^[a-z]+$/i;
	const numberRegex = /^\d+(\.\d+)?$/;

	const [errName, showErrName] = useState(false);
	const [errDesc, showErrDesc] = useState(false);
	const [errPrice, showErrPrice] = useState(false);
	const [errImg, showErrImg] = useState(false);
	const [errCat, showErrCat] = useState(false);

	useEffect(() => {
		// Function to retrieve data from local storage
		const retrieveServiceDataFromLocalStorage = () => {
			const storedData = localStorage.getItem("serviceData");
			if (storedData) {
				setServiceData(JSON.parse(storedData));
			}
		};
		// Call the function when component mounts
		retrieveServiceDataFromLocalStorage();
	}, []);

	const [serviceName, setServiceName] = useState("");
	const [serviceDesc, setServiceDesc] = useState("");
	const [servicePrice, setServicePrice] = useState("");
	const [serviceImage, setServiceImage] = useState("");
	const [serviceCatagory, setServiceCatagory] = useState("");

	useEffect(() => {
		// Update state with local storage data
		if (serviceData.length > 0) {
			setServiceName(serviceData[0].servicename);
			setServiceDesc(serviceData[0].servicedesc);
			setServicePrice(serviceData[0].serviceprice);
			setServiceCatagory(serviceData[0].servicecatagory);
		}
	}, [serviceData]);

	const handleServiceName = (event) => {
		setServiceName(event.target.value);
	};
	const handleServiceDesc = (event) => {
		setServiceDesc(event.target.value);
	};
	const handleServicePrice = (event) => {
		setServicePrice(event.target.value);
	};
	const handleServiceCatagory = (event) => {
		setServiceCatagory(event.target.value);
	};
	const handleServiceImage = (event) => {
		setServiceImage(event.target.files[0]);
	};
	const handleSubmit = async (event) => {
		event.preventDefault();
		if (!nameRegx.test(serviceName)) {
			showErrName(true);
			return;
		}
		if (nameRegx.test(serviceName)) {
			showErrName(false);
		}
		if (!nameRegx.test(serviceDesc)) {
			showErrDesc(true);
			return;
		}
		if (nameRegx.test(serviceDesc)) {
			showErrDesc(false);
		}
		if (!numberRegex.test(servicePrice)) {
			showErrPrice(true);
			return;
		}
		if (numberRegex.test(servicePrice)) {
			showErrPrice(false);
		}
		if (!serviceImage) {
			showErrImg(true);
			return;
		}
		if (serviceImage) {
			showErrImg(false);
		}
		if (!serviceCatagory) {
			showErrCat(true);
			return;
		}
		if (serviceCatagory) {
			showErrCat(false);
		}
		const formData = new FormData();
		formData.append("serviceName", serviceName);
		formData.append("serviceDesc", serviceDesc);
		formData.append("serviceCatagory", serviceCatagory);
		formData.append("servicePrice", servicePrice);
		formData.append("serviceImage", serviceImage);
		formData.append("serviceId", serviceData[0].id);

		try {
			const response = await fetch("http://127.0.0.1:5000/editService", {
				method: "PUT",
				body: formData,
			});
			if (response.ok) {
				const responseData = await response.json();
				console.log(responseData);
			} else {
				console.log("Failed to add product:", response.statusText);
			}
		} catch (error) {
			console.log(error, "error when Adding Service");
		}
	};
	return (
		<div>
			<div className="conatnerforeditservice">
				{/* <button className="add">&#43;</button> */}
				<button className="manage-service-button" onClick={props.handleService}>
					Manage Service
				</button>
			</div>
			<form onSubmit={handleSubmit} encType="multipart/form-data">
				<div className="editservice container">
					<div>
						<label htmlFor="servicename">Service Name</label>
						<input
							type="text"
							name="servicename"
							id="servicename"
							placeholder="Service Name"
							onChange={handleServiceName}
							value={serviceName}
						/>
						<p
							className={`${
								errName ? "block erro-message" : "none erro-message"
							}`}>
							only charcter are allowed!
						</p>
					</div>

					<div>
						<label htmlFor="servicedesc">Service Description</label>
						<input
							type="text"
							name="servicedesc"
							id="servicedesc"
							placeholder="Service Description"
							onChange={handleServiceDesc}
							value={serviceDesc}
						/>
						<p
							className={`${
								errDesc ? "block erro-message" : "none erro-message"
							}`}>
							only charcter are allowed!
						</p>
					</div>

					<div>
						<label htmlFor="serviceprice">Service Price</label>
						<input
							type="text"
							name="serviceprice"
							id="serviceprice"
							placeholder="Service Price"
							onChange={handleServicePrice}
							value={servicePrice}
						/>
						<p
							className={`${
								errPrice ? "block erro-message" : "none erro-message"
							}`}>
							only Positive Number are allowed!
						</p>
					</div>
					<div>
						<label htmlFor="adress">Service Catagory</label>
						<select
							id="servicecatagory"
							name="servicecatagory"
							className="serviceform-select"
							onChange={handleServiceCatagory}
							value={serviceCatagory}>
							<option selected disabled>
								Select Service Catagory
							</option>
							<option value="makeup">Makeup</option>
							<option value="nail">Nail</option>
							<option value="hair">Hair</option>
						</select>
						<p
							className={`${
								errCat ? "block erro-message" : "none erro-message"
							}`}>
							Please select a service Catagory.
						</p>
					</div>
					<div>
						<label htmlFor="serviceimage">Service Image</label>
						<input
							type="file"
							name="serviceimage"
							id="serviceimage"
							onChange={handleServiceImage}
						/>
						<p
							className={`${
								errImg ? "block erro-message" : "none erro-message"
							}`}>
							Please select a service image.
						</p>
					</div>
					<div>
						<button className="editservice-a">Edit Service </button>
					</div>
				</div>
			</form>
		</div>
	);
}
export default EditService;
