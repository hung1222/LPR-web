import React from 'react';
import {
    // Col,
    // Row,
} from 'reactstrap';
import { List, Avatar, Icon } from 'antd';
import io from 'socket.io-client';

import "antd/dist/antd.css";

const { BASE_IMG, BASE_SOCKET } = require('../../config/index');

class PlateSidebar extends React.Component {
    state = {
        plateArray: []
    };


    UNSAFE_componentWillMount() {
        this.socket = io(BASE_SOCKET);
        this.socket.on('violation_plate', plateData => {
            this.updatePlateList(plateData);
        });

        // this.updatePlateList();
    }

    updatePlateList(data) {
        console.log('ok');
        let plateArray = this.state.plateArray;
        // let test = require('./plateInfo');
        // plateArray.unshift(test);
        plateArray.unshift({
            id: data.id,
            plateNumber: data.plateNumber,
            vehicleImg: data.vehicleImg,
            plateImg: data.plateImg,
            overview: data.overview,
            cameraName: data.cameraName,
            createdDate: data.createdDate
        });

        this.setState({ plateArray })

        setInterval(() => {
            this.setState(preState => {
                var plateArray = preState.plateArray;
                if (preState.plateArray.length > 7)
                    plateArray = preState.plateArray.pop();

                return plateArray;
            });
        }, 1000);
    }

    handleClickItem(item) {
        this.props.moveContent(item);
    }


    render() {
        return (
            <List
                itemLayout="horizontal"
                dataSource={this.state.plateArray}
                renderItem={item => (
                    <List.Item
                        actions={[
                            <span>
                                <Icon type="info-circle" style={{ fontSize: '16px', color: '#f39c12' }} onClick={() => this.handleClickItem(item)} />
                            </span>
                        ]}
                    >
                        <List.Item.Meta
                            avatar={<Avatar shape="square" size={64} src={`${BASE_IMG}/${item.vehicleImg}`} />}
                            title={
                                <span>
                                    <span><Icon type="idcard" style={{ fontSize: '26px', color: '#0f0f0f0' }} />  </span>
                                    Biển số: {item.plateNumber}
                                </span>
                            }
                            description={
                                <span>
                                    <Icon type="clock-circle" style={{ fontSize: '24px', color: '#0f0f0f0' }} />
                                    <span style={{paddingTop: "10px"}}>    {item.createdDate}</span>
                                </span>
                            }
                        />
                    </List.Item>
                )}
            />
        );
    }

}

export default PlateSidebar;