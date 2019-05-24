# Official example from https://projects.raspberrypi.org/en/projects/getting-started-with-picamera

from picamera import PiCamera
from time import sleep

camera = PiCamera()
camera.rotation = 180
camera.start_preview()
sleep(5)
camera.capture('/home/pi/Desktop/image.jpg')
camera.stop_preview()
