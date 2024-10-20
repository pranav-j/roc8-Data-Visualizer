import "./../../styles/dashboard.css";
import React from 'react';
import { useSelector } from 'react-redux';
import HorizontalBarChart from '../../components/horizontalBarChart';
import LineGraph from '../../components/lineGraph';
import DataFilter from '../../components/dataFilter';
import Header from "../../components/header";

function Dashboard() {
    const data = useSelector((state) => state.dataReducer.data);
    const dataStatus = useSelector((state) => state.dataReducer.status);

    return (
        <div className="dashboard-parent">
            <Header />
            <div className="dashboard">
                <DataFilter />
                <h2>Filtered Data</h2>
                {dataStatus === 'loading' ? (
                    <p>Loading...</p>
                ) : data.length > 0 ? (
                    <div className='graphs'>
                        <HorizontalBarChart />
                        <LineGraph />
                    </div>
                ) : (
                    <p>Please filter data to display.</p>
                )}
            </div>
        </div>
    );
}

export default Dashboard;
