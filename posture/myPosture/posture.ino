/*
Created by :Jeffin Philip
Description: Code to read 3 digital sensors and send the recieved data to adafruit IO
*/

#include "config.h"

int postVal;
long lastSend;
int sendDelay = 20;
int sensorVals[2];
int p5Data[2];
int userStatus;
int sendRate = 1000;
int preStatus;

AdafruitIO_Feed *myPosture = io.feed("myPosture");

void setup() {

  Serial.begin(115200);
  while (! Serial);
  Serial.print("Connecting to Adafruit IO");
  io.connect();
  while (io.status() < AIO_CONNECTED) {
    Serial.print(".");
    delay(500);
  }
  Serial.println();
  Serial.println(io.statusText());
  pinMode(14, INPUT);
  pinMode(12, INPUT);
  pinMode(13, INPUT);

}

void loop() {
  io.run();
  readSerialData();
  sensorVals[0] = digitalRead(14);
  sensorVals[1] = digitalRead(12);
  sensorVals[2] = digitalRead(13);

  if (  sensorVals[0] == 0 && sensorVals[1] == 0 && sensorVals[2] == 0)userStatus = 0;
  else if (  sensorVals[0] == 1 && sensorVals[1] == 0 && sensorVals[2] == 0)userStatus = 1;
  else if (  sensorVals[0] == 1 && sensorVals[1] == 1 && sensorVals[2] == 0)userStatus = 2;
  else if (  sensorVals[0] == 1 && sensorVals[1] == 1 && sensorVals[2] == 1)userStatus = 3;
  else userStatus = 4;
  postVal = userStatus;
  //Serial.println(userStatus);

  if ((millis() - lastSend >= sendRate)&&(preStatus!=postVal)&&(postVal!=4))
  { preStatus=postVal;
    myPosture->save(postVal);
    Serial.print("sending -> ");
    Serial.println(postVal);
    lastSend = millis();
  }
}

void readSerialData()
{

  if (Serial.available() > 0)
  {
    int value = Serial.read();
    int index = Serial.read();
    p5Data[index] = value;
  }
  delay(30);
}
