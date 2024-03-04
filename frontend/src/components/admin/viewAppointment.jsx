import { useEffect, useState } from "react";

function ViewAppointment() {
	const [appointmentInfo, setAppointmentInfo] = useState([]);
	useEffect(() => {
		fetch("http://127.0.0.1:5000/appointmentinformation", {
			method: "GET",
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				setAppointmentInfo(data);
			});
	}, []);

	return (
		<div className="view-appointment">
			<div className="first">
				<table>
					<thead>
						<tr>
							<th>Appointment Date</th>
							<th>Start Time</th>
							<th>End time</th>
							<th>profesional Name</th>
							<th>customer Name</th>
							<th>Service Name</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{appointmentInfo.map((data) => (
							<tr>
								<td>{data.appointmentDate}</td>
								<td>{data.startTime}</td>
								<td>{data.endTime}</td>
								<td>{data.profFname + " " + data.profLname}</td>
								<td>{data.userFname + " " + data.userLname}</td>
								<td>{data.servicename}</td>

								<td>
									<button className="action">Details</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default ViewAppointment;