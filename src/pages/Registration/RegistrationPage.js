import React from 'react';

import {
	Row, Col, Container,
	Button,
	Card, CardImg,
	FormGroup, Label, Input
} from 'reactstrap';

import Page from 'components/Page';
import { message } from 'antd';

import './RegistrationPage.css'
import "antd/dist/antd.css";

const api = require('./api');


class RegistrationPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			ownerData: {},
		};

		this.handleFrom = this.handleFrom.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

	}

	handleFrom(event) {
		const name = event.target.name;
		const value = event.target.value;

		this.setState({
			ownerData: {
				...this.state.ownerData,
				[name]: value
			}
		});
	}

	handleSubmit() {
		console.log(this.state.ownerData);
		let key = 'asq1'
		message.loading({ content: 'Loading...', key });
		api.createOwner(this.state.ownerData, (err, result) => {
			if (err) {
				message.error({ content: 'Failed!', key, duration: 2 });
				return console.log(err);
			}
			console.log(result);
			message.success({ content: 'Successful!', key, duration: 2 });
		});
	}

	render() {
		return (
			<Page>
				<Container>
					<Row className="justify-content-center">
						<h4 className="py-3">Thông tin cá nhân</h4>
					</Row>
					<Row>
						<Col lg={2} md={4} xs={12}>
							<Card style={{ width: "150px" }}>
								<CardImg
									src="https://picsum.photos/150/200"
									style={{ height: "200px" }}
								/>
							</Card>
						</Col>
						<Col lg={8} md={8} xs={12}>
							<Row>
								<Col lg={6} md={6} xs={12}>
									<FormGroup>
										<Label htmlFor="fullName">Họ và tên <span className="field-required">*</span></Label>
										<Input type="text" name="fullName" id="fullName" placeholder="Họ và tên"
											onChange={this.handleFrom}
										/>
									</FormGroup>
								</Col>
								<Col lg={4} md={4} xs={12}>
									<Label htmlFor="gender" >Giới tính <span className="field-required">*</span></Label>
									<div className="d-inline-block pt-2">
										<div className="custom-control custom-radio custom-control-inline">
											<input type="radio" className="custom-control-input" id="gender-M" name="gender" value="M" onChange={this.handleFrom} />
											<label className="custom-control-label" htmlFor="gender-M">Nam</label>
										</div>
										<div className="custom-control custom-radio custom-control-inline">
											<input type="radio" className="custom-control-input" id="gender-F" name="gender" value="F" onChange={this.handleFrom} />
											<label className="custom-control-label" htmlFor="gender-F">Nữ</label>
										</div>
										<div className="custom-control custom-radio custom-control-inline">
											<input type="radio" className="custom-control-input" id="gender-O" name="gender" value="O" onChange={this.handleFrom} />
											<label className="custom-control-label" htmlFor="gender-O">Khác</label>
										</div>
									</div>

								</Col>
							</Row>
							<Row>
								<Col lg={4} md={4} xs={12}>
									<FormGroup>
										<Label htmlFor="dateOfBirth">Ngày sinh <span className="field-required">*</span></Label>
										<Input type="date" name="dateOfBirth"
											onChange={this.handleFrom}
										/>
									</FormGroup>
								</Col>
								<Col lg={8} md={4} xs={12}>
									<FormGroup>
										<Label htmlFor="placeOfBirth">Nơi sinh <span className="field-required">*</span></Label>
										<Input type="text" name="placeOfBirth" placeholder="Nơi sinh"
											onChange={this.handleFrom}
										/>
									</FormGroup>
								</Col>
							</Row>
							<hr></hr>
							<Row>
								<Col lg={8} md={8} xs={12}>
									<FormGroup>
										<Label htmlFor="phoneNumber">Số điện thoại</Label>
										<Input type="text" name="phoneNumber" placeholder="Số điện thoại"
											onChange={this.handleFrom}
										/>
									</FormGroup>
								</Col>
								<Col lg={4} md={4} xs={12}>
									<FormGroup>
										<Label htmlFor="plateNumber">Biển số <span className="field-required">*</span></Label>
										<Input type="text" name="plateNumber" placeholder="Biển số"
											onChange={this.handleFrom}
										/>
									</FormGroup>
								</Col>
							</Row>
							<Row>
								<Col lg={12}>
									<FormGroup>
										<Label htmlFor="vehicleType">Loại xe <span className="field-required">*</span></Label>
										<Input type="text" name="vehicleType" placeholder="Loại xe"
											onChange={this.handleFrom}
										/>
									</FormGroup>
								</Col>
							</Row>
						</Col>
					</Row>
					<Row className="justify-content-center">
						<Button outline color="primary" onClick={this.handleSubmit}>
							Submit
						</Button>
					</Row>
				</Container>
			</Page >
		);
	}
};

export default RegistrationPage;
