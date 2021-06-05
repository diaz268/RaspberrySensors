#!/usr/bin/env python3
import serial
import requests

if __name__ == '__main__':
    data = serial.Serial('/dev/ttyACM0', 9600, timeout=1)
    data.flush()

    headers = {"Content-Type": "application/json"}
    url = "http://8b329a5ab0e2.ngrok.io/sensors"

    while True:
        if data.in_waiting > 0:
            register = data.readline().decode('utf-8').rstrip().split(",")

            body = {"value": register[0], "voltage": register[1]}

            response = requests.post(url, json=body, headers=headers)
            print(response.text)