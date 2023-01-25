import OPi.GPIO as GPIO
import time
#from urllib.request import urlopen
import socketio
import os
import sys
import os
import sys

def check_and_kill_duplicate():
    script_name = sys.argv[0]
    pid = os.getpid()
    process_name = os.path.basename(script_name)
    command = "ps -ef | grep {} | grep -v grep | grep -v {}".format(process_name, pid)
    output = os.popen(command).read()

    if output:
        print("Duplicate program is running! Killing the duplicate process...")
        pid_to_kill = int(output.split()[1])
        os.kill(pid_to_kill, 9)
    else:
        print("No duplicate program is running.")

check_and_kill_duplicate()
class rate:
    def __init__(self, name, roll):
        self.price = name
        self.time = roll
# creating list
rates = []
 
# appending instances to list
rates.append(rate(1, 10))
rates.append(rate(5, 60))
rates.append(rate(10,150))
rates.append(rate(50, 4320))


#sio = socketio.Client()
#sio.connect('http://localhost:3000/')
sio = socketio.Client()
sio.connect('http://localhost:3000/')

GPIO.cleanup()
GPIO.setmode(GPIO.BOARD)
GPIO.setup(3, GPIO.IN, pull_up_down=GPIO.PUD_UP)

# Count the number of pulses on pin 3
# Create an empty list to store the pulse counts
#pulse_counts = []

# Count the number of pulses on pin 3
pulse_count = 0
totalCoin=0
timeToadd=0
# Define the increment_pulse_count function
def increment_pulse_count(channel):

    global pulse_count
    pulse_count += 1
    
def calculateTime():
    totalTime = 0
    currentValidity = 0
    currentDataLimit = 0
    remainingCoin = totalCoin
    highestPrice = 0
    while(remainingCoin>0):
        candidatePrice = 0;
        candidateIndex = -1;
        for i,x in enumerate(rates):
            if(rates[i].price<=remainingCoin):
                if(candidatePrice< rates[i].price):
                    candidatePrice=rates[i].price
                    candidateIndex= i
        if(candidateIndex!= -1):
            if(highestPrice<rates[candidateIndex].price):
                highestPrice=rates[candidateIndex].price
            totalTime+=rates[candidateIndex].time
            remainingCoin-=rates[candidateIndex].price
        else:
            break
    return totalTime
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
        #pulse_counts.append(pulse_count)
        #print(pulse_count);
        totalCoin +=pulse_count;
        timeToadd = calculateTime()
        pulse_count=0
    


    if coin_inserted:
        # Print the recorded pulse counts
        #print("Pulse counts:", pulse_counts)
        print(timeToadd)
        data=[totalCoin,timeToadd]
        sio.emit('coins',data)
        coin_inserted = False


