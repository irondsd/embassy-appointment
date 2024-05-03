#!/bin/bash
# Script to run the program continuously between 17:59 and 18:01

# Set the start and end time
START_TIME="23:59"
END_TIME="00:01"

# Function to run the program
run_program() {
    npm start | tee -a logfile
}

# Loop until the current time is outside the specified range
while true; do
    CURRENT_TIME=$(date +"%H:%M")
    if [[ "$CURRENT_TIME" < "$START_TIME" || "$CURRENT_TIME" > "$END_TIME" ]]; then
        break
    fi
    # Run the program
    run_program
    # Wait for the program to finish before running again
    sleep 1
done
