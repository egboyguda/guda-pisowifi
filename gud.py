import OPi.GPIO as GPIO
import time
#from urllib.request import urlopen
import socketio

#sio = socketio.Client()
#sio.connect('http://localhost:3000/')
sio = socketio.Client()
sio.connect('http://localhost:3000/')

GPIO.cleanup()
GPIO.setmode(GPIO.BOARD)
GPIO.setup(3, GPIO.IN, pull_up_down=GPIO.PUD_UP)

# Count the number of pulses on pin 3
# Create an empty list to store the pulse counts
pulse_counts = []

# Count the number of pulses on pin 3
pulse_count = 0
counter=0
# Define the increment_pulse_count function
def increment_pulse_count(channel):

    global pulse_count
    pulse_count += 1
    

# Detect rising edges (i.e., pulses) on pin 3
GPIO.add_event_detect(3, GPIO.RISING, callback=increment_pulse_count)

coin_inserted = False
while True:
    # Wait for a certain amount of time
    time.sleep(2)

    # check if pulse count is greater than zero
    if pulse_count > 0:
        coin_inserted = True
        # Record the pulse count and reset it
        pulse_counts.append(pulse_count)
        #print(pulse_count);
        counter +=pulse_count;
        pulse_count=0
    


    if coin_inserted:
        # Print the recorded pulse counts
        #print("Pulse counts:", pulse_counts)
        sio.emit('coins',counter)
        coin_inserted = False