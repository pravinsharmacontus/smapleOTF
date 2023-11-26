import React from 'react';
import "./Analytics.scss";

function Analytics(props = {}) {
    return (
        <div className='ContentWrapper analytics_wraper'>
            <div className='analytics_inner'>
                <div className='analytics_col'>
                    <div className='static_table'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Invited by</th>
                                    <th>Invited User</th>
                                    <th>Role</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td rowSpan={4}>Pugaz</td>
                                </tr>
                                <tr>
                                    <td>Alex</td>
                                    <td>Admin</td>
                                    <td><span className='positive'>Accepted</span></td>
                                </tr>
                                <tr>
                                    <td>Rajagopal</td>
                                    <td>Admin</td>
                                    <td><span className='pending'>Pending</span></td>
                                </tr>
                                <tr>
                                    <td>Pravin</td>
                                    <td>Cohost</td>
                                    <td><span className='pending'>Pending</span></td>
                                </tr>
                                <tr>
                                    <td rowSpan={3}>Pugaz</td>
                                </tr>
                                <tr>
                                    <td>Selva</td>
                                    <td>Admin</td>
                                    <td><span className='positive'>Accepted</span></td>
                                </tr>
                                <tr>
                                    <td>Rajagopal</td>
                                    <td>Cohost</td>
                                    <td><span className='positive'>Pending</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='analytics_col'>
                    <div className='static_table'>
                        <table>
                            <thead>
                                <tr>
                                    <th>No. of Broadcast</th>
                                    <th>Host</th>
                                    <th>Cohost</th>
                                    <th>Live Status</th>
                                    <th>Live Duration</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td rowSpan={6}>3</td>
                                </tr>
                                <tr>
                                    <td>Pugaz</td>
                                    <td>Hariram</td>
                                    <td>Yes</td>
                                    <td>20m</td>
                                </tr>
                                <tr>
                                    <td>Rajagopal</td>
                                    <td>Hariram</td>
                                    <td>Yes</td>
                                    <td>20m</td>
                                </tr>
                                <tr>
                                    <td rowSpan={4}>Pugaz</td>
                                    <td>Rajagopal</td>
                                    <td>Yes</td>
                                    <td>20m</td>
                                </tr>
                                <tr>
                                    <td>Hariram</td>
                                    <td>Yes</td>
                                    <td>20m</td>
                                </tr>
                                <tr>
                                    <td>Pravin</td>
                                    <td>Yes</td>
                                    <td>20m</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Analytics;
