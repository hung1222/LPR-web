import React from 'react';

import {
	Row, Col, Container,
	Card, CardImg,
	FormGroup, Label, Input
} from 'reactstrap';
import { Modal, Table, Divider, message, Button, Popconfirm } from 'antd';

import Page from 'components/Page';

import "antd/dist/antd.css";
import "./OwnerPage.css";

const api = require('./api/index');
const {BASE_IMG} = require('../../config/index');


class OwnerPage extends React.Component {
	state = {
		selectedRowKeys: [],
		ownerData: [],
		currentSelect: {},

		loadingTable: true,
		currentPage: 1, // Table page
		visible: false
	};

	UNSAFE_componentWillMount() {
		api.listOwner((err, result) => {
			if (err) {
				this.setState({ loadingTable: false });
				return message.error({ content: 'Disconnected!', duration: 2 });
			}
			this.setState({
				loadingTable: false,
				ownerData: result
			});
		});
	}

	onSelectChange = selectedRowKeys => {
		this.setState({ selectedRowKeys });
	};

	onPaginationChange = (page) => {
		this.setState({ currentPage: page });
	};

	onClickRow = record => {
		console.log(record);
		this.setState({
			currentSelect: record,
			visible: true,
		});
	};

	confirmDelete = record => {
		const key = 'deleteOwner'
		message.loading({ content: 'Loading...', key });
		api.delteteOwner(record, (err, result) => {
			if (err || result.status !== 204)
				return message.error({ content: 'Delete failed', key, duration: 1.5 });

			message.success({ content: 'Deleted!', key, duration: 1.5 });

			let tempArr = this.state.ownerData;
			let index = tempArr.findIndex(x => x.id === record.id);
			tempArr.splice(index, 1);
			this.setState({ ownerData: tempArr });
		});
	}

	handleOk = () => {
		const key = 'updateOwner'
		message.loading({ content: 'Loading...', key });
		api.editOwner(this.state.currentSelect, (err, result) => {
			if (err)
				return message.error({ content: 'Update failed', key, duration: 1.5 });

			message.success({ content: 'Saved!', key, duration: 1.5 });
			this.setState({
				currentSelect: result,
			});
		});

	};

	handleCancel = () => {
		this.setState({
			currentSelect: {},
			visible: false,
		});
	};

	handleFrom = event => {
		const name = event.target.name;
		const value = event.target.value;

		this.setState({
			currentSelect: {
				...this.state.currentSelect,
				[name]: value
			}
		});
	}

	render() {
		const columns = [
			{
				title: 'Tên',
				dataIndex: 'fullName',
				key: 'fullName'
			},
			{
				title: 'Ngày sinh',
				dataIndex: 'dateOfBirth',
				key: 'dateOfBirth'
			},
			{
				title: 'Giới tính',
				dataIndex: 'gender',
				key: 'gender',
				filters: [
					{ text: "Nam", value: "M" },
					{ text: "Nữ", value: "F" },
					{ text: "Khác", value: "O" }
				],
				onFilter: (value, record) => {
					return record.gender === value;
				},
				render: icon => {
					if (icon === 'M')
						return <div>Nam</div>
					else if (icon === 'F')
						return <div>Nữ</div>
					else
						return <div>Khác</div>
				}
			},
			{
				title: 'Số đt',
				dataIndex: 'phoneNumber',
				key: 'phoneNumber'
			},
			{
				title: 'Biển số',
				dataIndex: 'plateNumber',
				key: 'plateNumber'
			},
			{
				title: 'Action',
				key: 'action',
				fixed: 'right',
				width: 115,
				render: (text, record) => (
					<span>
						<Button shape="circle" icon="edit" onClick={() => this.onClickRow(record)} />
						<Divider type="vertical" />
						<Popconfirm
							title="Are you sure delete this?"
							onConfirm={() => this.confirmDelete(record)}
							// onCancel={cancel}
							okText="Yes"
							cancelText="No"
						>
							<Button type="danger" shape="circle" icon="delete" />
						</Popconfirm>
					</span>
				),
			}
		];

		const rowSelection = {
			selectedRowKeys: this.state.selectedRowKeys,
			onChange: this.onSelectChange,
		};

		const pagination = {
			showSizeChanger: true,
			current: this.state.currentPage,
			onChange: this.onPaginationChange,
			total: this.state.ownerData.length,
			pageSizeOptions: ['5', '10', '20', '50']
		};

		return (
			<Page>
				<Container>
					<Row>
						<Col lg={12} md={12} xs={12}>
							<Table
								rowKey="id"
								loading={this.state.loadingTable}
								columns={columns}
								dataSource={this.state.ownerData}
								pagination={pagination}
								rowSelection={rowSelection}
								scroll={{ x: 1000 }}
							/>;

						</Col>
						<Modal
							title="Owner detail"
							centered
							visible={this.state.visible}
							onOk={this.handleOk}
							onCancel={this.handleCancel}
							width={"800px"}
						>
							<Row>
								<Col lg={3} md={3} xs={12}>
									<Card style={{ width: "150px", margin: "0 auto" }}>
										<CardImg
											src={`${BASE_IMG}/media/avatar/default-avatar.png`}
											alt={'avatar'}
											style={{ width: "150px", height: "auto" }}
										/>
									</Card>
								</Col>
								<Col lg={9} md={9} xs={12}>
									<Row>
										<Col lg={6} md={6} xs={12}>
											<FormGroup>
												<Label htmlFor="fullName">Họ và tên <span className="field-required">*</span></Label>
												<Input type="text" name="fullName" id="fullName" placeholder="Họ và tên"
													value={this.state.currentSelect.fullName || undefined}
													onChange={this.handleFrom}
												/>
											</FormGroup>
										</Col>
										<Col lg={6} md={6} xs={12}>
											<Label htmlFor="gender">Giới tính <span className="field-required">*</span></Label>
											<br />
											<div className="d-inline-block pt-2">
												<div className="custom-control custom-radio custom-control-inline">
													<input type="radio" className="custom-control-input" id="gender-M" name="gender" value="M"
														checked={this.state.currentSelect.gender === 'M'}
														onChange={this.handleFrom}
													/>
													<label className="custom-control-label" htmlFor="gender-M">Nam</label>
												</div>
												<div className="custom-control custom-radio custom-control-inline">
													<input type="radio" className="custom-control-input" id="gender-F" name="gender" value="F"
														checked={this.state.currentSelect.gender === 'F'}
														onChange={this.handleFrom}
													/>
													<label className="custom-control-label" htmlFor="gender-F">Nữ</label>
												</div>
												<div className="custom-control custom-radio custom-control-inline">
													<input type="radio" className="custom-control-input" id="gender-O" name="gender" value="O"
														checked={this.state.currentSelect.gender === 'O'}
														onChange={this.handleFrom}
													/>
													<label className="custom-control-label" htmlFor="gender-O">Khác</label>
												</div>
											</div>
										</Col>
									</Row>
									<Row>
										<Col lg={5} md={5} xs={12}>
											<FormGroup>
												<Label htmlFor="dateOfBirth">Ngày sinh <span className="field-required">*</span></Label>
												<Input type="date" name="dateOfBirth"
													value={this.state.currentSelect.dateOfBirth}
													onChange={this.handleFrom}
												/>
											</FormGroup>
										</Col>
										<Col lg={7} md={7} xs={12}>
											<FormGroup>
												<Label htmlFor="placeOfBirth">Nơi sinh <span className="field-required">*</span></Label>
												<Input type="text" name="placeOfBirth" placeholder="Nơi sinh"
													value={this.state.currentSelect.placeOfBirth || undefined}
													onChange={this.handleFrom}
												/>
											</FormGroup>
										</Col>
									</Row>
									<hr></hr>
									<Row>
										<Col lg={6} md={6} xs={12}>
											<FormGroup>
												<Label htmlFor="phoneNumber">Số điện thoại</Label>
												<Input type="text" name="phoneNumber" placeholder="Số điện thoại"
													value={this.state.currentSelect.phoneNumber || undefined}
													onChange={this.handleFrom}
												/>
											</FormGroup>
										</Col>
										<Col lg={6} md={6} xs={12}>
											<FormGroup>
												<Label htmlFor="plateNumber">Biển số <span className="field-required">*</span></Label>
												<Input type="text" name="plateNumber" placeholder="Biển số"
													value={this.state.currentSelect.plateNumber || undefined}
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
													value={this.state.currentSelect.vehicleType || undefined}
													onChange={this.handleFrom}
												/>
											</FormGroup>
										</Col>
									</Row>
								</Col>
							</Row>
						</Modal>
					</Row>
				</Container>
			</Page >
		);
	}
};

export default OwnerPage;
