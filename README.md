# dbbikes
1.  # PROJECT OVERVIEW

    1.  ## INTRODUCTION

"Dublinbikes" is a public bicycle rental scheme that operates in the
city of Dublin. It is designed to provide users with real-time
information about the availability of bikes and bike stands at all
Dublin Bikes stations. Both the web and mobile versions of the app
includes a map of Dublin that allows users to locate the nearest bike
station with available bikes and stands. Users can also get directions
to their station of choice.

Limiting users to real-time data, however, presents a challenge for
those who need to first commute to bike stations, as they cannot know if
their destination station will have enough bikes or enough stands by the
time they arrive at that station. This is what this project aims to
accomplish; a web-application that allows users to plan their journey in
advance by providing them with an accurate prediction of the number of
bikes & parking available at a station at a particular date and time in
the future.

## OBJECTIVES

"NOW Dublinbikes" was created to promote the usage of sustainable modes
of transport in Dublin and to reduce the traffic in the city. By
creating an app that builds on top of the features of "NOW Dublinbikes",
it will be become much more convenient to use such methods of transport,
as users can plan their journey in advance without having to worry about
the availability of bikes & stands at a particular time. The objective
of this project is to create a web application that enhances the bike
rental experience. This app achieves this by adding several features,
such as current and future station information, weather forecast at the
time of the planned journey, and much more. Features will be discussed
in detail in subsequent sections.

## TARGET AUDIENCE

The target audience of this application is quite simply anyone who is
interested in cycling to navigate the city. The application will be
suitable for a wide range of users, from occasional cyclists such as
tourists, to frequent commuters such as students and employees, who rely
on cycling to reach their intended destinations. The app is also
designed with a minimalistic user-friendly UI to cater to all
age-groups, from kids to elders.

## APPLICATION DESCRIPTION

"dublinbikes" app is a convenient and user-friendly tool designed for
cyclists who use rental bikes from any "Dublin Bikes" stations. The app
includes a map of Dublin with color-coded markers for each station,
which users can click on to view real-time information such as station
name, number, address, current available bikes, and current available
stands. Markers are colored based on current number of bikes or stands,
depending on the chosen filter. Clicking on markers also displays two
column charts that show the average hourly and daily bike and stands
availability for that station. Additionally, the app features a weather
predictor that forecasts weather conditions for up to 5 days in advance,
allowing cyclists to plan their journeys accordingly.

The app also includes an interactive \"plan your journey\" feature that
allows users to fill in their starting and ending points, as well as the
intended date and time of travel. Submitting the user inputs will
generate four markers on the map: user\'s starting and ending points,
the nearest station to the starting point with more than 5 available
bikes, and the nearest destination station. The app will also draw a
route on the map from the starting to ending point to help users plan
their journey. All these features are designed to enhance the user
experience and provide a comprehensive tool for planning bike journeys
for users.

## APPLICATION STRUCTURE

The structure of this application, which is explained in detail in the
"Design" section, is briefly outlined below:

-   Navigation: Users can navigate the app by interacting with the
    markers, links, icons. For instance, clicking on the navigation bar
    home/plan labels will redirect the user to a different page, while
    clicking on map markers will display information about stations. The
    app is designed in a rather simple for users to explore and
    understand all features of the app fairly quickly.

-   Forms: In the "Plan" page, there exists a "Plan Your Journey" form
    for the user to fill out starting points, ending points, travel date
    and time. This form is then submitted to the backend for further
    processing.

-   Pages: This app is a Server-Side Rendered Application (SSR), where
    the server generates HTML dynamically using Flask's
    "render_template" function. The app consists of two simple
    pages/templates generated for the user: index.html & plan.html. The
    former is the app's homepage, and the latter opens upon clicking on
    "Plan" in the navbar. Using JavaScript, both pages are made to be
    interactive.

    1.  ## FEATURES

a. Get the latest available bikes and stands data from JCDecaux

![image](https://github.com/kcheaito/dbbikes/assets/31386972/5ea29ee3-e69b-48aa-a55a-7cfc8ce8f71c)

Use a scraper to obtain the latest data from the JCDecaux API and store it in a database. When the webpage is loaded, retrieve the data from the database and provide it to the browser via JavaScript.

b. Use a weather icon to display today's weather.

![image](https://github.com/kcheaito/dbbikes/assets/31386972/97bdeeb9-9a93-4764-a467-fdc02e8f015b)

Use a scraper to obtain today's weather icon ID from the OpenWeather API. Retrieve the corresponding weather icon based on the weather icon ID and provide it to the browser via JavaScript.

c. Hovering over weather icon, a dropdown menu pops up displaying the weather forecast for the next 5 days.	

![image](https://github.com/kcheaito/dbbikes/assets/31386972/bcd9b6ed-c361-42b7-9709-c5917900f3ce)	

Set up a hover effect in the frontend, so that when the user hovers over the weather icon, retrieve the corresponding icon ID from weather forecast JSON which is loaded from API when page initially open. Use the date() method to get today's weekday, and map the next 5 days' dates through a dictionary. Match the dates with the weather icons to provide users with clear and simple weather information for the future.

d. Display different color markers based on quantity.	

![image](https://github.com/kcheaito/dbbikes/assets/31386972/dcaa39ed-7b3e-4db7-aef3-a79f7a84a7f8)	

To provide users with a clear and intuitive visual representation of the density of available bikes or bike stands at each station, we have implemented a system of markers on the map. These markers are color-coded to indicate the number of available bikes or stands at each station.
The markers are primarily divided into three different types: red, yellow, and green. Each color has a specific meaning and is used to signify a different range of available bikes or bike stands.
The red markers are used to indicate stations with more than 10 bikes or stands available. This color is used to highlight stations with a high density of available bikes or stands, which makes it easy for users to find a station.
The yellow markers are used to indicate stations with between 5 and 9 bikes or stands available. This color is used to signify stations with a moderate density of available bikes or stands.

e. Switch button for display avaliable bikes or avaliable stands	

![image](https://github.com/kcheaito/dbbikes/assets/31386972/ab355df0-b508-4748-8012-a0381fcff438)
![image](https://github.com/kcheaito/dbbikes/assets/31386972/b30f49c0-b19f-4a5c-ad2f-bee7db655849)	

Set up a switch button in the frontend. When the page is initially loaded, the backend has already obtained real-time data on the availability of bicycles and stands for all stations through the API. When the user switches the button, load different data onto the markers provided by the Google API.

f. Set loading background as a bike icon	

![image](https://github.com/kcheaito/dbbikes/assets/31386972/3fe63aca-a780-4b71-85dd-23b5165bd1e3)	

Use CSS to play a scrolling bicycle icon while the user is waiting for information to be retrieved from the database or API, increasing the interactivity of the webpage.

g. A sliding window appears on the left when a station marker is clicked	

![image](https://github.com/kcheaito/dbbikes/assets/31386972/7cafb071-99b1-4060-897e-e58dc13e389d)	
Using CSS, set the initial display property of the left panel to none. Add a click event response function to the station markers. When a user clicks on a station marker, change the display property of the left panel to flex, and add an animation to slide the panel in from the left side of the window. At the same time, move the map to the right to prevent the panel from overlapping with the map. The left panel is used to display detailed information about the station, which can be obtained from a database or API. This approach ensures that only the necessary information is displayed when the user needs it, avoiding excessive information on the page and making it more concise and efficient.

f. Create plots to display hourly and weekly plots of bike and stand availability for user insights.

![image](https://github.com/kcheaito/dbbikes/assets/31386972/7ceab3c7-1f52-4ef1-9635-059aa351aa76)

g. Predict the number of available bikes at the departure station and the number of available stands at the destination station.	
![image](https://github.com/kcheaito/dbbikes/assets/31386972/d12e0c89-2951-4592-a637-e614cc06a25c)	

Build a predictive model based on the weather and bike data collected in the previous stage. Compare different models, mainly linear regression and random forest model, and select the optimized random forest model with the best performance. To improve accuracy, a separate model is built for each station, and the models are saved in the project as pkl files, reducing response time by avoiding rebuilding the models for each prediction. Retrieve the station ID and departure time from the front-end, and use the Weather API to obtain corresponding weather data for the given departure time. Input these data into the model to obtain the corresponding prediction.

f. Provide users with closet stations for the source and the destination	

![image](https://github.com/kcheaito/dbbikes/assets/31386972/3825ca20-0e73-4532-b7ef-681af12f86cf)	

Retrieve the user's location information from the frontend, compare it with the station location information in the database, use the Manhattan distance to calculate the nearest station, and provide feedback to the user.

g. Provide users with feedback on the route.	

![image](https://github.com/kcheaito/dbbikes/assets/31386972/108bb1b3-3e74-405e-82f3-acf65a88f4af)	

First, obtain the user's departure and destination locations from the frontend, and use the method mentioned above to find the nearest station for each location and display it with a marker. Then, use the Google Maps API to plan a bicycle route between the two stations, and plan a walking route for the user between their location and the nearest station.

h. Link to DublinBikes Twitter Ins and Linkdin	

![image](https://github.com/kcheaito/dbbikes/assets/31386972/036a2b6b-de23-43e0-8343-9d9df441b30c)	

Retrieve the social media links of Dublinbikes and place them in the footer, adding an animation to enhance interactivity when users hover over them.

i. Using ORM to map database info to a model instance	

![image](https://github.com/kcheaito/dbbikes/assets/31386972/e6204a19-8d8b-4fb6-bb07-617892fdd324)	

Using SqlAlchemy, extract the corresponding model classes from the database and store them in the Flask project. When inserting or querying the database, use the ORM-mapped objects to more conveniently and efficiently handle database data.

2.  # ARCHITECTURE

    1.  ## ARCHITECTURE DESCRIPTION

The overall application architecture application consists of the
following main components:

-   Scraper: The scraper collects weather and stations data from
    OpenWeather's API and JCDeceaux's API, respectively.

-   Database: The weather and station data collected from the scraper
    are stored in this database.

-   Machine Learning Model: Trains a machine learning model based on the
    scraped historical data stored in the database to predict station
    and weather occupancy information. The trained model is stored in a
    pickle file which is in turn loaded in the Flask application.

-   Flask: Acts as the interface between the user, database, and machine
    learning model. User requests, such as displaying the main web
    contents, predicting station occupancy, fetching real-time station
    data, etc\... are served by Flask.

-   User Interface: The interface between the users of the application
    and the application. User requests are served by Flask. This is what
    is displayed to the user when navigating the application and
    basically consists of HTML content.

    1.  ## ARCHITECTURE DIAGRAM

        1.  ### Overall Application Diagram

![image](https://github.com/kcheaito/dbbikes/assets/31386972/7be62e37-8771-429d-8bdc-4eef09f5b704)

Figure : Overall Application Architecture

### Data Flow Diagram

![image](https://github.com/kcheaito/dbbikes/assets/31386972/cf8759da-fc77-4d7d-a812-04146684fa91)

Figure : Data Flow Diagram

2.  ## TECH STACK

    1.  ### Front-end Technology 

HTML, CSS & JavaScript were mainly used as the front-end technology for
this app. HTML was dynamically generated using a templating-engine for
web frameworks called Jinja2. Vanilla JavaScript was used in this case,
and fetch was primarily used to interact with the backend technology.

A variety of libraries & APIs were used in the front-end, such as Google
Maps API to display the map & markers, Google Charts to display
occupancy visualizations, and Google Search which was integrated into
the form.

### Backend Technology

Python as the development language, Flask & MySQL were mainly used as
the back-end technology for this app. Flask was used to interact with
both the frontend and database: serving content to the frontend and
fetching data from the backend.

A variety of libraries were used in the back-end as well, most notably
requests, which is a Python library used to communicate with APIs
(JCDeceaux and OpenWeather) and websites using HTTP methods. SQLAlchemy
is another library used to establish a connection between the backend
and the database, querying the database, and even inserting tables in
the database. Jinja2 templating-engine was used as mentioned earlier for
passing data from the backend/database to the frontend.

### Data Analytics

Python & Jupyter Notebook were used as tools for building the machine
learning model. Several libraries were utilized such as: pandas for data
manipulation and analysis, scikit-learn for applying machine-learning
algorithms and evaluating them, matplotlib for plotting graphs, and
pickle for converting the machine learning model into a Python object
that can later be used in the Flask application. Refer to the
"Analytics" section for a more detailed discussion.

### Version Control

Git, GitHub, and GitHub Desktop were used for version control. They were
very effective in keeping our project in sync.

### Development Environment

Visual Studio Code & PyCharm were used as IDEs for this project. Some
members used VSCode for both the frontend and backend, while others used
PyCharm for the backend.

### Infrastructure

Amazon EC2 & Amazon RDS were the two technologies used. The former
(Ubuntu Linux machine) used to host our application. Our EC2 instance
runs the Flask application & scrapers constantly. The weather and
station scrapers were scheduled to run periodically using a tool called
Crontab to make API requests once every hour and every five minutes,
respectively.

![image](https://github.com/kcheaito/dbbikes/assets/31386972/8210e4af-b4a6-43ce-9639-c74982288c3b)

3.  ## FUNCTIONALITY

    1.  ### Application Performance

The application accomplishes all its requirements as minimum viable
product. The application successfully fulfills its main purpose of
predicting the future occupancy of stations and providing the best
possible route for the user. However, we reckon the application could be
quicker and more responsive, as discussed in the section below.

### Issues and Solutions

-   Problem 1: Scraping dynamic data from JCDeceaux every 5 minutes and
    inserting it into the database led to duplicate primary key errors.

Solution: We checked the JSON file and verified that the problem was
indeed that JCDeceaux does not update all station data every minute, so
a new \"scraping date\" parameter was added in the database as a primary
key and.

-   Problem 2: The scraper would stop running in the background after
    closing the EC2 terminal.

Solution: We used crontab to schedule scrapers to run periodically.

-   Problem 3: The web app was not responsive and did not scale well
    with changes in screen size.

Solution: This will be addressed in the future and is included in the
\"Future Work\" section.

-   Problem 4: The linear regression model was not accurate enough in
    predicting occupancy.

Solution: We implemented a random forest regression model instead to
improve the prediction score.

-   Problem 5: Google maps would occasionally fail to load, even with
    proper API key configuration.

Solution: We discovered that the JS scripts were being loaded in the
wrong order and moved all scripts to the header, with the loading of
Google maps API deferred until all DOM elements were loaded.

-   Problem 6: There was a slight delay in displaying charts and
    predictions.

Solution: We added a loader in the form of a moving bike to inform users
that their request is being processed.

### Scalability

The use of cloud infrastructure, such as EC2 and RDS, allows for easy
scalability based on demand. However, using Google Maps, JCDeceaux and
OpenWeather APIs could potentially cause performance issues when there
is a large number of concurrent users. This is a point that is discussed
in the "Future Works" section. The scalability of the application can
also be impacted by its architecture and code quality. If the code is
well-designed and optimized, the application can handle a larger number
of users and traffic without any performance issues. During the
development of this application, we did not prioritize optimizing the
code.

3.  # Design

    1.  ## Design Overview

We have tried to keep the design of our website as straightforward and
minimalist as possible. We sought to design a user-friendly platform
that users could utilise without becoming lost or frustrated. Because of
this, we opted to continue with a predominantly white colour scheme and
maintain a simple overall design.

The first area on our website is devoted to assisting visitors with
travel planning. We wanted to give individuals a necessary information
that would make it simple for them to plan their route and go to their
destination. By creating this service, we want to draw in and keep
people who primarily utilise bicycles for mobility.

The other page on our website is devoted to assisting users in making
travel plans. We intended to offer a tool that would make it simple for
individuals to plan their route and go to their destination. By creating
this function, we want to draw in and keep people who primarily use
bicycles for transportation.

## Planning Stage

Our team spent some time prioritising the items we wanted to include in
the website design before getting started. We understood the value of
developing a Minimum Viable Product (MVP) that would establish a strong
basis for our website\'s functioning while also enabling us to add more
features later

To do this, we mostly concentrated on finding and completing the
fundamental and significant aspects that our website required. This made
it possible for us to design a website that would satisfy user needs
while yet being straightforward and efficient.

After determining the essential fundamental aspects for our MVP, we
focused on building supplementary features that would improve the user
experience. We were able to make sure that our website would be
functional and effective right away while giving opportunity for
development and expansion in the future by placing the most important
components first.

This brainstorming process helped us to save time by avoiding the
inclusion of unnecessary features that could have complicated the design
or overwhelmed the user experience. Instead, we were able to focus on
the key features that would provide the most value to our users, while
still keeping things efficient and easy to use.

## Wire Frame

Just as every new home is carefully planned out in the form of a
blueprint, we felt that it was important to sketch out our ideas and
create a visual representation of our website design.

This procedure assisted us in putting all our imaginative concepts on
paper and ensuring that we were considering the opinions and suggestions
of every team member. We were able to communicate and refine our designs
by putting our concepts on paper before we had a distinct understanding
of how we wanted our website to appear.

The ability to adapt our design to the requirements of our website was
one of the main advantages of this method. We were able to develop a
website that was customised to the requirements of our users and that
accurately reflected our distinct vision and values because we took the
time to thoughtfully plan and improve our ideas.

![image](https://github.com/kcheaito/dbbikes/assets/31386972/2001731c-9507-4961-9024-4a6792c96d83)

![image](https://github.com/kcheaito/dbbikes/assets/31386972/4f6d7ddb-e19c-4f03-8b20-98ab55f0f0cc)

## Design Evolution 

Each day, our team of creative minds worked tirelessly to come up with
new ideas and improve our application\'s design. We put in a lot of
effort to make it look more professional, minimalist, and visually
appealing. Through countless discussions, we were able to refine and
enhance our designs until we arrived at the final stage. The evolution
of our design can be seen through several snapshots of its progression
from the initial stage to the final product. Our team\'s dedication and
creativity played a crucial role in ensuring that our application\'s
design was both functional and aesthetically pleasing.

![image](https://github.com/kcheaito/dbbikes/assets/31386972/9187b459-f430-47bc-bfbf-2b6cab10f081)

![image](https://github.com/kcheaito/dbbikes/assets/31386972/fddf1af9-87e3-49c0-bc06-938dac568135)

![image](https://github.com/kcheaito/dbbikes/assets/31386972/03f1f755-5ce2-4fe9-904a-1cc18c02cf0d)

## Application Flow

Since our website has been designed with simplicity and ease of use in
mind, we wanted to create a platform that was user-friendly and
straightforward, so that our visitors can easily access the information
they need without any hassle.

Our website consists of two main pages - the home page and the plan
page. The home page displays markers that indicate the location of
stations, with different colour codes that convey the availability of
bike stands and bikes according to the toggle selected. Users can simply
click on a marker to access more detailed information about the stands
and bikes available at that station, including hourly and weekly
availability charts.

The plan page allows users to select their source and destination, along
with the date and time of their travel. Upon clicking on the search
button, the website will display markers of the source and destination
along with the routes available, as well as information regarding
predicted availability of bike stands and bikes on that particular date
and time.

![image](https://github.com/kcheaito/dbbikes/assets/31386972/efca5ea5-8048-450b-8ea6-b58c1602dd38)

4.  # Data Analytics 

    1.  ## Machine learning model 

The ML model allowed us to make predictions about the availability of
bikes and stations based on input data. The model can be represented by
the following equation.

Bikes_prediction = f (station_ID, time of trave, weathe_conditionsr,
max_bikes_of_station)

After exploration, it was found that the model\'s accuracy is
sufficiently high. In order to make the project\'s model more
lightweight, we used the following approach for predicting available
stands.

Stands_prediction = max_stands_of_station -- Bikes_prediction

During data analysis, I discovered that the behavior patterns of each
station were highly distinct. As a result, we separated the data for
each station and developed individual models for each one.

In order to train the model, historical data needed to be collected. To
achieve this, we used two web scrapers: one for weather data and the
other for bike occupancy data, which was then stored in a database. This
data was utilized for training the model.

There were numerous ML models available to use for predictions, but our
primary goal was to develop the simplest model possible. Initially, we
trained a linear regression model, but it did not provide satisfactory
results. Consequently, we explored other models and determined that a
Random Forest Regressor was the best fit for our needs.

We chose to use the Random Forest Regressor model for several reasons:

a\) Our objective was to predict the number of available bikes and
slots, which is a regression task, and the random forest algorithm has
both classification and regression capabilities.

b\) The random forest algorithm is an ensemble algorithm, which
typically performs better than single-model algorithms.

c\) The random forest algorithm provides a reliable estimate of feature
importance, which allowed us to determine which features to include in
the model.

d\) Since linear regression algorithms performed poorly, we deduced that
our dataset was non-linear. The random forest algorithm is robust in
handling non-linear data and outliers.

e\) The training and prediction times of the random forest model were
fast, which was crucial for us, as we had more than 1,100,000 samples in
the training dataset. The random forest model was also able to be stored
in a file for future use, which was convenient for our needs.

## Data Preprocessing 

To process the data, I mainly followed these steps:

Step 1: Load historic data from data base

![image](https://github.com/kcheaito/dbbikes/assets/31386972/9e408e3d-735d-4bab-b118-a327c67427cf)

Step 2: Used hourly averages as the data points and performed a group-by
operation on each station for each time interval

![image](https://github.com/kcheaito/dbbikes/assets/31386972/592d58ae-0cfb-42a9-8b0d-e46f369aa2b5)

Step 3: Merged the weather data with the station\'s available bike data
using the merge operation.

![image](https://github.com/kcheaito/dbbikes/assets/31386972/75a5beeb-3e79-4501-85d5-e383bfcc6994)

Step 4: Check the correlation between each feature and the correlation
to the target feature.

![image](https://github.com/kcheaito/dbbikes/assets/31386972/4272c666-23cd-4fd8-bfa5-93fdaea933b8)

Step 5: I will not go into detail about data type conversion and
handling Nan values as they are common pre-processing steps in data
analysis.

## Model Training and Evaluation 

### 4.3.1 Identify three metrics for evaluating a model\'s performance.

First, we split the whole dataset into a training dataset (70%) and a
testing dataset (30%). Then, we trained the linear regression model with
the training dataset and tested it with the testing dataset. The
evaluation measures used in the testing process are

1.  Mean absolute error (MAE)

2.  Root mean squared error (RMSE)

3.  3\. R2

![image](https://github.com/kcheaito/dbbikes/assets/31386972/c32c7c28-bad2-4fbe-afa8-53bb8e117d9c)

### 4.3.2 Linear Regression

For the data exploration process, I attempted to perform linear
regression on the entire dataset as well as on each individual bike
station.

![image](https://github.com/kcheaito/dbbikes/assets/31386972/4ec4284a-c5ef-4de5-8abf-ffacdfedb87f)

The linear regression model on the entire dataset yielded an MAE of 7.42
and an RMSE of 9.04, both of which are significantly higher than the
expected values for both metrics. Additionally, the R2 value for the
linear regression model was 0.06, which falls short of our expectation
to be close to 1.

![image](https://github.com/kcheaito/dbbikes/assets/31386972/1865ad8a-eca4-4e3f-b698-2bda0ea74dab)

The results of performing linear regression on each individual bike
station\'s data were similarly poor, and in some cases even worse. As a
result, it can be concluded that the linear regression model did not
fulfill our requirements.

### 4.3.3 Random Forest Model

After comparison, it can be seen that the random forest model is more
suitable for predicting station data with an MAE of 3.57, RMSE of 4.97,
and an R2 of 0.7. Therefore, the RFM prediction has reached an
acceptable level of accuracy.

![image](https://github.com/kcheaito/dbbikes/assets/31386972/fa55bac3-cee5-4dbb-a3c0-f1d66a69b78b)

We established a prediction model for each station using a looping
approach. Because the behavior patterns of each station differ
significantly.

![image](https://github.com/kcheaito/dbbikes/assets/31386972/0d9f4cfb-78ee-4b29-b4cc-a87c939be439)

## Model Optimization

In the above analysis, we chose RFM as our prediction model. However, we
know that RFM prediction consumes a lot of resources. If the prediction
is performed in real-time in the program, it will make the users wait
for a long time. If the model is trained and placed in the project
without optimization, the unoptimized model may occupy a very large
space. Therefore, we must optimize the RFM model.

I chose three directions to optimize the RFM model:

### 4.4.1 Estimators

I created a method to evaluate the scores of models with different
estimators and plot the result. From the graph, it can be seen that
after reaching 10, the increase in model scores is not very
significant.\"

![image](https://github.com/kcheaito/dbbikes/assets/31386972/b0406699-9385-46e7-92c4-f23f411c4734)

### 4.4.2 Max_depth. 

Apply same method to find best max_depth.

![image](https://github.com/kcheaito/dbbikes/assets/31386972/c4848132-c374-46d0-85a3-80294820e74d)

### 4.4.3 Max_features.

![image](https://github.com/kcheaito/dbbikes/assets/31386972/a39c3667-746d-4e84-9ce7-b63d26fbc0e6)
Apply same method to find best max_features.

In summary, we significantly reduced the resources required by the model
while sacrificing only a small amount of accuracy, making it more
practical for deployment. The final parameters are as follows:



![image](https://github.com/kcheaito/dbbikes/assets/31386972/7137a110-eaeb-4ba0-947c-a42d9853ca0e)


2.  ## Model Deployment

    1.  ### Model Categories

In preparation for model deployment, I divided the input data required
by the model into two categories:

a\. Frontend data: weekday, hour, station number (from closet station
algorithm)

b\. Backend data: total bike stands, weather condition and other weather
features

For the frontend data, we obtain it from user input, so we need to
retrieve this data in the frontend interface. As for the backend data,
it should be stored in the backend through an API after the page is
loaded. Then, these two pieces of data can be combined and inputted into
the model for prediction.

### 4.5.2 Integrate model with frontend 

![image](https://github.com/kcheaito/dbbikes/assets/31386972/7d114179-d8d6-451b-a3fd-4c30132b38a8)

From the above figure, it can be seen that we obtained the data by
setting up an input form in the HTML on the frontend.

![image](https://github.com/kcheaito/dbbikes/assets/31386972/117a513e-a77c-44c5-88ef-98fd8ea1fe0e)

![image](https://github.com/kcheaito/dbbikes/assets/31386972/1d56bb69-cc24-4cbe-9d27-d0af18a30ac9)

This section is for obtaining the user\'s
origin and destination. Once the user inputs their locations, we use the
closest station algorithm to calculate the nearest station, which is an
important input parameter for the model.

This section is obtained through user input of the date and time, from
which the specific day of the week and hour are derived. As shown in the
figure, because the weather API provides data for 5-day weather
forecasts, our travel prediction also supports a time period of up to 5
days.

Summing up, we set up a way to obtain data from the front-end and have
used a well-designed interface to guide the user on how to input their
travel data.

### 4.5.3 Integrate model with backend

Regarding the backend data, on the one hand, we connect to the database
to retrieve the relevant data, mainly station static data such as
location, maximum number of bikes, etc. based on the calculated closet
station ID.

On the other hand, we also retrieve dynamic weather data from an API in
the backend, which includes the current weather condition and forecast
for the next 5 days. By combining the weather data with the user\'s
input of date and time, we can obtain the weather condition at the time
of the trip, which is another important input parameter for the
prediction model.

## Combine Model With Flask 

### 4.6.1 Choose the way of combination

As I mentioned earlier, there are two ways to deploy the model: one is
to train the model in real-time and provide feedback to the user. The
other is to store the trained model in a file and call it each time for
prediction.

Taking all factors into consideration, we chose the latter option, which
is to store the trained model in a .pkl file within the Flask project.
The main reason for doing this is to improve the response time for the
user.

### 4.6.2 Interface for prediction for bikes and stands

![image](https://github.com/kcheaito/dbbikes/assets/31386972/7fa8eb63-19a5-463a-aaf6-3705dc42c36f)

It is evident that the most significant interface for this model is to
predict the available number of bicycles and stands at stations for
users\' planned routes. We associate this information with the
corresponding departure and destination stations and present them to the
user in a concise manner.

### 4.6.3 Interface for plot charts in station markers

![image](https://github.com/kcheaito/dbbikes/assets/31386972/197d0f73-ade1-4685-b170-61e3a5a267a6)

For this model, we have provided another interface to display a stack
bar plot. It is mainly composed of two charts, one showing the
predictions for different time periods each day and the other showing
the predictions for different days of the week. These two charts provide
a better interactive interface for users, allowing them to easily obtain
dynamic information on available bikes and stands.
