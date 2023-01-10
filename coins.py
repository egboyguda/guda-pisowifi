import OPi.GPIO as GPIO
import time
#from urllib.request import urlopen
import socketio

sio = socketio.Client()
sio.connect('http://localhost:3000/')

GPIO.cleanup()
GPIO.setmode(GPIO.BOARD)

GPIO.setup(3, GPIO.IN, pull_up_down=GPIO.PUD_UP)
ts = time.time()
count =1
counter = 0



while True:
    if(count==1):
        GPIO.wait_for_edge(3,GPIO.RISING)
        counter +=1
        print(counter)
        #url = "http://127.0.0.1:3000/coins?php={}".format(counter)
        sio.emit('coins',counter)
        #urlopen(url)
        ts = time.time()