#!/bin/bash

# Check if a port number is provided as an argument
if [ -z "$1" ]; then
    echo "Error: Please provide a port number as an argument"
    echo "Usage: $0 <port_number>"
    exit 1
fi

# Store the port number from the first argument
PORT=$1

# Find the process ID (PID) listening on the specified port
PID=$(netstat -lntp 2>/dev/null | grep ":$PORT" | awk '{print $7}' | cut -d'/' -f1)

# Check if a PID was found
if [ -z "$PID" ]; then
    echo "No process found listening on port $PORT"
    exit 1
fi

# Kill the process
echo "Killing process $PID listening on port $PORT"
sudo kill -9 $PID

# Verify if the process was killed
if [ $? -eq 0 ]; then
    echo "Process $PID terminated successfully"
else
    echo "Failed to terminate process $PID"
    exit 1
fi