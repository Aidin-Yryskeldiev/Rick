import { useEffect, useState } from "react";
import styled from "styled-components";

const Rick = () => {
	const [tasks, setTasks] = useState([]);
	const [selectedTask, setSelectedTask] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");

	useEffect(() => {
		fetch("https://rickandmortyapi.com/api/character")
			.then((response) => response.json())
			.then((data) => {
				setTasks(data.results);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	const openModal = (task) => {
		setSelectedTask(task);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	const getStatusColor = (status) => {
		switch (status) {
			case "Alive":
				return "#18f000";
			case "Dead":
				return "#ff1900";
			default:
				return "#676767";
		}
	};

	const filteredTasks = tasks.filter((task) =>
		task.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<div>
			<SearchName
				type="text"
				placeholder="Введите имя"
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
			/>
			<RickPages>
				{filteredTasks.map((item) => (
					<RickCard key={item.id} onClick={() => openModal(item)}>
						<RickImage src={item.image} alt={item.name} />
						<h1>{item.name}</h1>
					</RickCard>
				))}
			</RickPages>

			{isModalOpen && (
				<ModalBackground onClick={closeModal}>
					<Modals>
						<h1>{selectedTask.name}</h1>
						<RickImage src={selectedTask.image} alt={selectedTask.name} />
						<p>
							Status:{" "}
							<Status color={getStatusColor(selectedTask.status)}>
								{selectedTask.status}
							</Status>
						</p>
						<p>Species: {selectedTask.species}</p>
						<p>Gender: {selectedTask.gender}</p>
					</Modals>
				</ModalBackground>
			)}
		</div>
	);
};

export default Rick;

const RickCard = styled.div`
	background-color: #ffffff;
	border: 1px solid #dddddd;
	border-radius: 10px;
	padding: 20px;
	margin: 10px;
	box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
	width: 300px;
	cursor: pointer;
`;

const RickImage = styled.img`
	width: 100%;
	margin-bottom: 10px;
	border-radius: 5px;
`;

const RickPages = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	background-color: #010134;
`;

const ModalBackground = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Modals = styled.div`
	background-color: #ffffff;
	border-radius: 10px;
	padding: 20px;
`;

const SearchName = styled.input`
	width: 200px;
	height: 30px;
	border-radius: 10px;
	padding-left: 10px;
	margin-left: 650px;
`;

const Status = styled.span`
	color: ${(props) => props.color};
`;
