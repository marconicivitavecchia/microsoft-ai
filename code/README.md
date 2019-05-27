# Architecture
We used a client-server approach for this project, to easily test the code, to share tasks among the team and to support future improvements.

<p align="center">
<img title="Code architecture" alt="Code architecture" src='./arch.png' width='70%'>
</p>

## Back-end
We used Node.js as language for the back-end because JavaScript is a language already studied by the students of the forth year and for similiarity with the front-end.

We used:
- [express](https://expressjs.com/) for the web server
- [pi-camera-connect](https://github.com/servall/pi-camera-connect) to read pictures from the Raspberry camera

## Front-end
We used Angular to develop the front-end. This is beyond the common knowledge of students of the forth year, but since there are several parts of the UI that are repeated, we thought that the effort of studying and using a new tool based on the concept of "components" has paid off.

## Microsoft Azure Cloud Services

We used the [Microsoft Azure Cognitive Services](https://azure.microsoft.com/en-us/services/cognitive-services) to analyze and recognize the emotions in the picture. 

We didn't make a comparative benchmark with other similiar services, but we found the service well documented and with a good accuracy. Overall we are very satisfied with it.

