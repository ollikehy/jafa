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

#### Up next:

- [ ] Adding workouts

#### In the distant future:

- [ ] AWS
- [ ] Styles
- [ ] Graphs for progress (BMI, bodyweight, weight training?)

### Different types of exercises

My reasoning behind exercises is that there are essentially three different types of exercises: weight exercises (squat), timed exercises (planking), timed + distance exercises (jogging). I decided not to include purely distance based exercises since they're mostly track and field related instead of personal exercising.

### Database schema

![Database schema](https://github.com/ollikehy/jafa/blob/master/documentation/dbschema.png)

### Architecture

The architecture for this project is a typical multitier-architecure with presentation- , logic- and data layers.

![Architectural schema](https://github.com/ollikehy/jafa/blob/master/documentation/architecture.png)
