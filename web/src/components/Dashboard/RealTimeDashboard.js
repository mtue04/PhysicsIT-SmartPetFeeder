import React, { useState, useEffect } from 'react';
import MQTTService from '../../services/mqttService';
import DeviceControl from './DeviceControl';

const RealTimeDashboard = () => {
    const [sensorData, setSensorData] = useState({
        foodLevel: 0,
        waterLevel: 0,
        temperature: 0,
        lastFed: null
    });

    useEffect(() => {
        // Subscribe to sensor data
        MQTTService.subscribeSensorData((data) => {
            setSensorData(data);
        });

        return () => {
            // Cleanup subscription if needed
        };
    }, []);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6">Smart Pet Feeder Dashboard</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Sensor Status Cards */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-4">Device Status</h2>
                    <div className="space-y-4">
                        <div>
                            <span>Food Level: </span>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div 
                                    className="bg-blue-600 h-2.5 rounded-full" 
                                    style={{width: `${sensorData.foodLevel}%`}}
                                ></div>
                            </div>
                        </div>
                        <div>
                            <span>Water Level: </span>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div 
                                    className="bg-blue-600 h-2.5 rounded-full" 
                                    style={{width: `${sensorData.waterLevel}%`}}
                                ></div>
                            </div>
                        </div>
                        <p>Temperature: {sensorData.temperature}°C</p>
                        <p>Last Fed: {sensorData.lastFed ? new Date(sensorData.lastFed).toLocaleString() : 'Not yet'}</p>
                    </div>
                </div>

                {/* Device Control */}
                <DeviceControl />
            </div>
        </div>
    );
};

export default RealTimeDashboard;