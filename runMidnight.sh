#!/bin/bash
# Script to run the program continuously between 23:59 and 00:01

# Set the start and end time for the desired range
PREVIOUS_DAY_END_TIME="23:59"
START_TIME="00:01"

# Function to run the program
run_program() {
    npm start | tee -a logfile
}

# Loop until the current time is outside the specified range
while true; do
    CURRENT_TIME=$(date +"%H:%M")
    if [[ "$CURRENT_TIME" < "$PREVIOUS_DAY_END_TIME" || "$CURRENT_TIME" > "$START_TIME" ]]; then
        sleep 0.1
        continue
    fi

    # Run the program
    run_program
    sleep 20
done
