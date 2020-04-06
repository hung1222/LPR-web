import Page from 'components/Page';
import { NumberWidget } from 'components/Widget';
import {
    chartjs
} from 'demos/dashboardPage';
import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
    MdDone,
    MdCancel,
    MdPriorityHigh,
    MdAnnouncement
} from 'react-icons/md';
import {
    Badge,
    Card,
    CardBody,
    CardHeader,
    Col,
    ListGroup,
    ListGroupItem,
    Row,
} from 'reactstrap';
import { getColor } from 'utils/colors';
import io from 'socket.io-client';

const { BASE_SOCKET } = require('../../config/index');
const api = require('./api/index');

// const today = new Date();
// const lastWeek = new Date(
//     today.getFullYear(),
//     today.getMonth(),
//     today.getDate() - 7,
// );

class DashboardPage extends React.Component {
    state = {
        statistic_violation: {},
        statistic_owner: {},
        statistic_sms: {},
        lineData_thisYear: [],
        lineData_lastYear: [15, 44, 27, 68, 40, 50, 51, 48, 33, 35, 41, 48],
        barData: {
            done: [],
            aband: []
        },
    }

    UNSAFE_componentWillMount() {
        // this is needed, because InfiniteCalendar forces window scroll
        window.scrollTo(0, 0);
        this.updateStatistic();

        this.socket = io(BASE_SOCKET);
        this.socket.on('monthly_statistic', data => {
            this.updateLineChart(data);
        });
    }

    updateStatistic() {
        api.statisticViolation((err, result) => {
            if (err || result.status !== 200)
                return;

            this.setState({
                statistic_violation: result.data
            });
        });

        api.statisticOwner((err, result) => {
            if (err || result.status !== 200) return;

            this.setState({
                statistic_owner: result.data
            });
        });

        api.statisticSMS((err, result) => {
            if (err || result.status !== 200) return;
            console.log(result.data);
            this.setState({
                statistic_sms: result.data
            });
        });

        // api.statisticViolationTime((err, result) => {
        //     if (err || result.status !== 200) return;
        //     console.log(result.data);
        //     this.setState(pre => {
        //         return {
        //             lineData: {
        //                 thisYear: pre.thisYear,
        //                 lastYear: result.data.lastYearVio
        //             }
        //         }
        //     });
        // });

        api.statisticSMSTime((err, result) => {
            if (err || result.status !== 200) return;
            console.log(result.data);
            this.setState({ barData: result.data });
        });
    }

    updateLineChart(data) {
        this.setState({ lineData_thisYear: data });
    }

    render() {
        const primaryColor = getColor('primary');
        // const successColor = getColor('success');
        var lineChartData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            datasets: [
                {
                    label: 'Violation straffic this year',
                    borderColor: '#6a82fb',
                    // backgroundColor: '#6a82fb',
                    data: this.state.lineData_thisYear,
                },
                {
                    label: 'Violation straffic last year',
                    borderColor: '#fc5c7d',
                    // backgroundColor: '#fc5c7d',
                    data: this.state.lineData_lastYear,
                },
            ],
        };

        var barChartData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            datasets: [
                {
                    label: 'Done SMS this year',
                    backgroundColor: '#6a82fb',
                    stack: 'Expense',
                    data: this.state.barData.done
                },
                {
                    label: 'Reject SMS this year',
                    backgroundColor: '#fc5c7d',
                    stack: 'Expense',
                    data: this.state.barData.aband
                },
            ],
        }

        return (
            <Page
                className="DashboardPage"
                title="Dashboard"
                breadcrumbs={[{ name: 'Dashboard', active: true }]}
            >
                <Row>
                    <Col lg={3} md={6} sm={6} xs={12}>
                        <NumberWidget
                            title="Total Violation"
                            subtitle="This month"
                            number={this.state.statistic_violation ? this.state.statistic_violation.total : 0}
                            color="secondary"
                            progress={{
                                value: Math.round(this.state.statistic_violation.thisMonth / this.state.statistic_violation.lastMonth * 100),
                                label: 'Last month',
                            }}
                        />
                    </Col>

                    <Col lg={3} md={6} sm={6} xs={12}>
                        <NumberWidget
                            title="Monthly SMS"
                            subtitle="This month"
                            number={this.state.statistic_sms ? this.state.statistic_sms.total : 0}
                            color="secondary"
                            progress={{
                                value: Math.round(this.state.statistic_sms.thisMonth / this.state.statistic_sms.lastMonth * 100),
                                label: 'Last month',
                            }}
                        />
                    </Col>

                    <Col lg={3} md={6} sm={6} xs={12}>
                        <NumberWidget
                            title="Abadoned Rate"
                            subtitle="This month"
                            number="38%"
                            color="secondary"
                            progress={{
                                value: 60,
                                label: 'Last month',
                            }}
                        />

                    </Col>

                    <Col lg={3} md={6} sm={6} xs={12}>
                        <NumberWidget
                            title="New Owners"
                            subtitle="This month"
                            number={this.state.statistic_owner.total}
                            color="secondary"
                            progress={{
                                value: Math.round(this.state.statistic_owner.thisMonth / this.state.statistic_owner.lastMonth * 100),
                                label: 'Last month',
                            }}
                        />
                    </Col>
                </Row>

                <Row>
                    <Col lg="8" md="12" sm="12" xs="12">
                        <Card>
                            <CardHeader>
                                Statistic{' '}
                                <small className="text-muted text-capitalize">This year</small>
                            </CardHeader>
                            <CardBody>
                                <Line data={lineChartData} options={chartjs.line.options} />
                            </CardBody>
                        </Card>
                    </Col>

                    <Col lg="4" md="12" sm="12" xs="12">
                        <Card>
                            <CardHeader>Total message</CardHeader>
                            <CardBody>
                                <Bar data={barChartData} options={chartjs.bar.options} />
                            </CardBody>
                            <ListGroup flush>
                                <ListGroupItem>
                                    <MdDone size={25} color={primaryColor} /> SMS sent this year {' '}
                                    <Badge color="success">{this.state.barData ? this.state.barData.done.reduce((a, b) => a + b, 0) : 0} SMS</Badge>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <MdCancel size={25} color={primaryColor} /> SMS reject this year {' '}
                                    <Badge color="warning">{this.state.barData ? this.state.barData.aband.reduce((a, b) => a + b, 0) : 0} SMS</Badge>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <MdPriorityHigh size={25} color={primaryColor} /> Unsolve SMS {' '}
                                    <Badge color="secondary">{this.state.barData.aband.reduce((a, b) => a + b, 0)} SMS</Badge>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <MdAnnouncement size={25} color={primaryColor} /> Total alert {' '}
                                    <Badge color="info">{this.state.statistic_violation ? this.state.statistic_violation.total : 0} time</Badge>
                                </ListGroupItem>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>

                {/* <CardGroup style={{ marginBottom: '1rem' }}>
                    <IconWidget
                        bgColor="white"
                        inverse={false}
                        icon={MdThumbUp}
                        title="50+ Likes"
                        subtitle="People you like"
                    />
                    <IconWidget
                        bgColor="white"
                        inverse={false}
                        icon={MdRateReview}
                        title="10+ Reviews"
                        subtitle="New Reviews"
                    />
                    <IconWidget
                        bgColor="white"
                        inverse={false}
                        icon={MdShare}
                        title="30+ Shares"
                        subtitle="New Shares"
                    />
                </CardGroup> */}

            </Page>
        );
    }
}
export default DashboardPage;
