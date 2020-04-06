import Page from 'components/Page';
import React from 'react';
import {
	Col, Row,
	// CardImg,
	// Modal, ModalHeader, ModalBody
} from 'reactstrap';
import { Card, Select, Icon, Modal, Button, Input } from 'antd';
import classNames from 'classnames';
import moment from 'moment';
import io from 'socket.io-client';
import PlateSidebar from './PlateSidebar'

import "antd/dist/antd.css";
import "./CameraPage.css";

const { BASE_IMG, BASE_SOCKET } = require('../../config/index');

const { Option, OptGroup } = Select;


class CardPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: false,
			socketStatus: false,

			plateDetail: {}
		}

		this.socket = null;
		this.plateToggle = this.plateToggle.bind(this);
	}

	UNSAFE_componentWillMount() {
		this.socket = io(BASE_SOCKET);
		this.socket.on('connect', () => {
			this.setState({ socketStatus: true });
			console.log('Socket connected');
		});
		this.socket.on('disconnect', () => {
			this.setState({ socketStatus: false });
			console.log('Unable connect server');
		});
	}

	handleModal = () => {
		this.setState({
			visible: !this.state.visible,
		});
	};

	plateToggle(data) {
		console.log(data);
		if (!this.state.visible)
			this.setState({ plateDetail: data, visible: true });
	}

	render() {
		// const genderArr = [{'M': 'Nam'}, {'F': 'Nữ'}, {'O': 'Khác'}];
		const genderArr = [
			{ type: 'M', val: 'Nam' },
			{ type: 'F', val: 'Nữ' },
			{ type: 'O', val: 'Khác' }
		];

		return (
			<Page>
				<Row>
					<Col md={2} sm={2} xs={6}>
						<div className="camera-header">Camera name:</div>
					</Col>
					<Col md={2} sm={2} xs={6}>
						<Select defaultValue="Camera-01" style={{ width: "100%" }}>
							<OptGroup label="HN">
								<Option value="Camera-01">Camera-01</Option>
							</OptGroup>
							<OptGroup label="BG">
								<Option value="Yiminghe" disabled>Camera-20</Option>
							</OptGroup>
						</Select>
					</Col>
					<Col md={4} sm={4}>

					</Col>
					<Col md={2} sm={2} xs={6}>
						<div className="camera-header">Connection status:</div>
					</Col>
					<Col md={2} sm={2} xs={6}>
						<Icon type="api" style={{ fontSize: '23px', color: 'green' }} theme={'filled'} className={classNames({ 'd-none': !this.state.socketStatus })} />
						<Icon type="disconnect" style={{ fontSize: '23px', color: 'red' }} theme={'filled'} className={classNames({ 'd-none': this.state.socketStatus })} />
					</Col>
				</Row>

				<Row>
					<Col md={8} sm={8} xs={12} className="mb-9">
						<Card style={{ height: '600px' }} className="d-flex justify-content-center align-items-center border border-primary">
							<img
								src={"https://cdn2.iconfinder.com/data/icons/outlined-set-1/29/no_camera-512.png"}
								style={{ width: '100px', opacity: '.4' }}
								alt='Camera'
							/>
							{/* <CardImg
								onClick={this.cameraToggle}
								className="card-img-left"
								src={'https://picsum.photos/1000/500'}
								style={{ width: '100%', height: '500px' }}
							/> */}
						</Card>
					</Col>


					<Col md={4} sm={4} className="hidden-xs">
						<Card style={{ height: '600px', overflow: 'hidden' }}>
							<PlateSidebar
								moveContent={this.plateToggle}
							/>
						</Card>

						<Modal
							title="Details"
							centered
							visible={this.state.visible}
							onOk={this.handleModal}
							onCancel={this.handleModal}
							footer={[<Button key="back" onClick={this.handleModal}>Ok</Button>]}
							width={"60%"}
						>
							<Row>
								<Col md={6} sm={6}>
									<Row>
										<Col md={4} sm={6}>
											<img
												src={`${BASE_IMG}/media/avatar/default-avatar.png`}
												alt='avatar'
												style={{ width: "100%" }}
											/>
										</Col>
										<Col md={8} sm={6}>
											<div className="mb-2">
												<Input addonBefore="Chủ xe" placeholder="Unknown"
													prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
													value={this.state.plateDetail.ownerId ? this.state.plateDetail.owner.fullName : "Unknown"}
													disabled
												/>
											</div>
											<div className="mb-2">
												<Input.Group compact>
													<Input style={{ width: '40%' }}
														addonBefore="G"
														defaultValue="Unknown"
														value={
															this.state.plateDetail.ownerId
																? genderArr.find(x => x.type === this.state.plateDetail.owner.gender).val
																: "Unknown"
														}
														disabled
													/>
													<Input style={{ width: '60%' }}
														addonBefore="DoB"
														defaultValue="Unknown"
														value={
															this.state.plateDetail.ownerId
																? moment(this.state.plateDetail.owner.dateOfBirth, 'DD-MM-YYYY')
																: "Unknown"
														}
														disabled
													/>
													{/* <DatePicker
														style={{ width: '60%' }}
														defaultValue={this.state.plateDetail.ownerId ? moment(this.state.plateDetail.owner.dateOfBirth, 'DD-MM-YYYY') : "---"}
														disabled
													/> */}
												</Input.Group>
											</div>
											<div className="mb-2">
												<Input addonBefore="Số đt" placeholder="Unknown"
													prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
													value={this.state.plateDetail.ownerId ? this.state.plateDetail.owner.phoneNumber : "Unknown"}
													disabled
												/>
											</div>
											<div className="mb-2">
												<Input addonBefore="Loại xe" placeholder="Unknown"
													prefix={<Icon type="car" style={{ color: 'rgba(0,0,0,.25)' }} />}
													value={this.state.plateDetail.ownerId ? this.state.plateDetail.owner.vehicleType : "Unknown"}
													disabled
												/>
											</div>
											<div className="mb-2">
												<Input addonBefore="Biển số" placeholder="Unknown"
													prefix={<Icon type="idcard" style={{ color: 'rgba(0,0,0,.25)' }} />}
													value={this.state.plateDetail.ownerId ? this.state.plateDetail.owner.plateNumber : "Unknown"}
													disabled
												/>
											</div>
											<Row>
												<Col>
													<Card size="small" title="Xe vi phạm">
														<img
															src={`${BASE_IMG}/${this.state.plateDetail.vehicleImg}`}
															alt='vehicle'
															style={{ width: "100%" }}
														/>
													</Card>
												</Col>
											</Row>
										</Col>
									</Row>

								</Col>
								<Col md={6} sm={6}>
									<div>
										<Card size="small" title="Biển xe vi phạm" className="mb-3" >
											<img
												src={`${BASE_IMG}/${this.state.plateDetail.plateImg}`}
												alt='plateImg'
												style={{ width: "150px" }}
											/>
										</Card>
										<Card size="small" title="Toàn cảnh">
											<img
												src={`${BASE_IMG}/${this.state.plateDetail.overview}`}
												alt='overview'
												style={{ width: "100%" }}
											/>
										</Card>
									</div>
								</Col>
							</Row>
						</Modal>
					</Col>
				</Row>
			</Page>
		);
	};
}


export default CardPage;
