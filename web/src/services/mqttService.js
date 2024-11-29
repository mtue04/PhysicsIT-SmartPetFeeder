import mqtt from 'mqtt';

class MQTTService {
    constructor() {
        const brokerUrl = process.env.REACT_APP_MQTT_BROKER;
        const options = {
            username: process.env.REACT_APP_MQTT_USERNAME,
            password: process.env.REACT_APP_MQTT_PASSWORD,
            protocolVersion: 5, // Use MQTT 5.0
            clean: true,
            reconnectPeriod: 1000,
            connectTimeout: 30 * 1000
        };

        try {
            this.client = mqtt.connect(brokerUrl, options);

            this.client.on('connect', () => {
                console.log('MQTT connection successful');
                // Subscribe to necessary topics
                this.client.subscribe('pet-feeder/sensors');
                this.client.subscribe('pet-feeder/status');
            });

            this.client.on('error', (error) => {
                console.error('MQTT connection error:', error);
            });

        } catch (error) {
            console.error('MQTT initialization error:', error);
        }
    }

    // Method to control feeding
    feedPet() {
        this.client.publish('pet-feeder/command', JSON.stringify({
            action: 'feed',
            timestamp: new Date().toISOString()
        }));
    }

    // Method to dispense water
    dispenseWater() {
        this.client.publish('pet-feeder/command', JSON.stringify({
            action: 'water',
            timestamp: new Date().toISOString()
        }));
    }

    // Subscribe to sensor data
    subscribeSensorData(callback) {
        this.client.on('message', (topic, message) => {
            if (topic === 'pet-feeder/sensors') {
                try {
                    const sensorData = JSON.parse(message.toString());
                    callback(sensorData);
                } catch (error) {
                    console.error('Data parsing error:', error);
                }
            }
        });
    }

    // Disconnect
    disconnect() {
        if (this.client) {
            this.client.end();
        }
    }
}

export default new MQTTService();