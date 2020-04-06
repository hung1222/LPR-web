import React from 'react';
import classNames from 'classnames';
// import moment from 'moment';

import { Container, Row, Col } from 'reactstrap';
import { Table, Input, Card, Checkbox, DatePicker, Drawer, message, Button, Icon } from 'antd';

import Page from 'components/Page';

import "antd/dist/antd.css";
import "./ViolationPage.css"

const api = require('./api/index');

const { Search } = Input;
const { RangePicker } = DatePicker;


class ViolationPage extends React.Component {
    state = {
        violationData: [],
        searchParams: {},
        currentSelect: {},

        loadingTable: true,
        currentPage: 1, // Table page
        visible: false
    };

    UNSAFE_componentWillMount() {
        let data = {
            // startDate: moment().format('YYYY-MM-DD'),
            // endDate: moment().format('YYYY-MM-DD')
        }
        api.searchViolation(data, (err, result) => {
            if (err || result.status !== 200) {
                this.setState({ loadingTable: false });
                return message.error({ content: 'Disconnected!', duration: 2 });
            }
            console.log(result);
            this.setState({
                loadingTable: false,
                violationData: result.data
            });
        });
    }

    onPaginationChange = (page) => {
        this.setState({ currentPage: page });
    };

    handleDatePicker = (dateArray) => {
        this.setState({
            searchParams: {
                startDate: dateArray[0],
                endDate: dateArray[1]
            }
        });
    };

    handlePlateSearch = (data) => {
        let params = {
            ...this.state.searchParams,
            param: data
        }
        this.setState({
            loadingTable: true,
            searchParams: params
        });

        api.searchViolation(params, (err, result) => {
            if (err || result.status !== 200) {
                this.setState({ loadingTable: false });
                return message.error({ content: 'Disconnected!', duration: 2 });
            }
            console.log(result);
            this.setState({
                loadingTable: false,
                violationData: result.data
            });
        });
    };

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    render() {
        const columns = [
            {
                title: 'Biển số',
                dataIndex: 'plateNumber',
                key: 'plateNumber'
            },
            {
                title: 'Chủ xe',
                dataIndex: 'owner.fullName',
                key: 'fullName',
                align: "center",
                render: (text, record) => (
                    <span>
                        {(record.ownerId && record.owner.fullName) || '-'}
                    </span>
                ),
            },
            {
                title: 'Ngày',
                dataIndex: 'createdDate',
                key: 'createdDate',
                align: "center"
            },
            {
                title: 'Trạng thái',
                dataIndex: 'alertStatus',
                key: 'alertStatus',
                align: "center",
                render: (text, record) => (
                    <span>
                        <Icon type="mail"
                            style={{ fontSize: '20px' }}
                            className={classNames({ opaque: record.alertStatus === "0" }, { 'd-none': record.alertStatus === "2" })}
                        />
                        <Icon type="minus-circle"
                            style={{ fontSize: '18px' }}
                            className={classNames({ 'd-none': record.alertStatus !== "2" })}
                        />
                    </span>
                ),
            },
            {
                title: 'Chi tiết',
                align: "center",
                render: (text, record) => (
                    <span>
                        <Button type="primary" shape="circle" onClick={this.showDrawer} disabled>i</Button>
                    </span>
                )
            }
        ];

        const pagination = {
            showSizeChanger: true,
            current: this.state.currentPage,
            onChange: this.onPaginationChange,
            total: this.state.violationData.length,
            pageSizeOptions: ['10', '20', '30', '50']
        };

        return (
            <Page>
                <Container>
                    <Row>
                        <Col lg={4} md={4} xs={12}>
                            <Card title="Search">
                                <Search
                                    placeholder="Nhập biển xe cần tìm"
                                    enterButton
                                    onSearch={value => this.handlePlateSearch(value)}
                                />
                                <div className="my-2" style={{ borderBottom: '1px solid #E9E9E9' }}>From ~ to:</div>
                                <RangePicker onChange={(date, dateString) => this.handleDatePicker(dateString)} />

                                <div className="my-2" style={{ borderBottom: '1px solid #E9E9E9' }}>Options:</div>
                                <ul style={{ listStyle: 'none' }}>
                                    <li><Checkbox defaultChecked >Quick search</Checkbox></li>
                                    <li><Checkbox defaultChecked disabled >Most relavent</Checkbox></li>
                                    <li><Checkbox defaultChecked disabled >...</Checkbox></li>
                                </ul>
                            </Card>
                        </Col>
                        <Col lg={8} md={8} xs={12}>
                            <Card title="Violation records" >
                                <Table
                                    rowKey="id"
                                    loading={this.state.loadingTable}
                                    columns={columns}
                                    dataSource={this.state.violationData}
                                    pagination={pagination}
                                />
                            </Card>
                        </Col>
                        <Drawer
                            width={"70vw"}
                            title="Detailed information"
                            placement="right"
                            closable={false}
                            onClose={this.onClose}
                            visible={this.state.visible}
                        >
                            <p>Some contents...</p>
                        </Drawer>
                    </Row>
                </Container>
            </Page>
        );
    }
};

export default ViolationPage;
