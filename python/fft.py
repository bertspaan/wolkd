#!/usr/bin/env python

# 8 bar Audio equaliser using MCP2307

import alsaaudio as aa
from time import sleep
from struct import unpack
import numpy as np

ADDR   = 0x20         #The I2C address of MCP23017
DIRA   = 0x00         #PortA I/O direction, by pin. 0=output, 1=input
DIRB   = 0x01         #PortB I/O direction, by pin. 0=output, 1=input
BANKA  = 0x12         #Register address for Bank A
BANKB  = 0x13         #Register address for Bank B

# Set up audio
sample_rate = 44100
no_channels = 2
chunk = 512 # Use a multiple of 8
data_in = aa.PCM(aa.PCM_CAPTURE, aa.PCM_NORMAL)
data_in.setchannels(no_channels)
data_in.setrate(sample_rate)
data_in.setformat(aa.PCM_FORMAT_S16_LE)
data_in.setperiodsize(chunk)

def calculate_levels(data, chunk,sample_rate):
   # Convert raw data to numpy array
   data = unpack("%dh"%(len(data)/2),data)
   data = np.array(data, dtype='h')
   # Apply FFT - real data so rfft used
   fourier=np.fft.rfft(data)
   # Remove last element in array to make it the same size as chunk
   fourier=np.delete(fourier,len(fourier)-1)
   # Find amplitude
   power = np.log10(np.abs(fourier))**2
   # Araange array into 8 rows for the 8 bars on LED matrix
   power = np.reshape(power,(8,chunk/8))
   matrix= np.int_(np.average(power,axis=1)/4)
   return matrix

print "Processing....."

while True:
   # Read data from device
   l,data = data_in.read()
   data_in.pause(1) # Pause capture whilst RPi processes data
   if l:
      # catch frame error
      try:
         matrix=calculate_levels(data, chunk,sample_rate)
         # for i in range (0,8):
         #    Set_Column((1<<matrix[i])-1,0xFF^(1<<i))

      except audioop.error, e:
         if e.message !="not a whole number of frames":
            raise e
   sleep(0.001)
   data_in.pause(0) # Resume capture
