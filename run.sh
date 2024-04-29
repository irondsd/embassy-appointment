#!/bin/bash

# Check if an argument is provided
if [ $# -ne 1 ]; then
    echo "Usage: $0 <sleep_interval_in_seconds>"
    exit 1
fi

# Assign the argument to a variable
sleep_interval=$1

# Infinite loop
while true; do
    # Run npm start and append output to logfile
    npm start | tee -a logfile
    # Sleep for the specified interval
    sleep $sleep_interval
done
