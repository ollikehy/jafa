## Documentation

### Requirements

This application is done mobile first since you're unlikely to carry a laptop/PC with you to a gym. It should be lightweight and fast while being easy to use. Navigation should be easy so that the application can be used efficiently without having to do any additional navigation than is necessary.

[User stories](https://github.com/ollikehy/jafa/blob/master/documentation/userstories.md)

### To do:

#### Done:

- [x] Database schemas with attributes
- [x] Registration
- [x] Adding values for the user
- [x] Adding exercises
- [x] Testing
- [x] Adding workouts
- [x] Graphs for progress (BMI, bodyweight, weight training?)
- [x] Hosting in AWS (frontend) and Heroku (backend)

#### Up next:

- [ ] Styles and finishing touches


### Different types of exercises

My reasoning behind exercises is that there are essentially three different types of exercises: weight exercises (squat), timed exercises (planking), timed + distance exercises (jogging). I decided not to include purely distance based exercises since they're mostly track and field related instead of personal exercising.

#### weightValue

The reason weightValue is used is to try and make sense of charting weighted exercises which consists of three different values: sets, repetitions and weights. Weight is valued more over repetitions and sets are weighted so that they make less of an impact due to them usually being similiar to each other. If an exercise has a large number of sets they usually have less repetitions or are done with less weight. At the end the sum is divided with 10 to normalize the values.

The weightValue is calculated as follows: 

WV = ((0.5 * sets) + (0.7 * repetitions) + (1.6 * weight))/10

### Database schema

![Database schema](https://github.com/ollikehy/jafa/blob/master/documentation/dbschema.png)

### Architecture

The architecture for this project is a typical multitier-architecure with presentation- , logic- and data layers.

#### Development architecture

![Development architecture](https://github.com/ollikehy/jafa/blob/master/documentation/development_architecture.png)

#### Production architecture

![Production architecture](https://github.com/ollikehy/jafa/blob/master/documentation/production_architecture.png)