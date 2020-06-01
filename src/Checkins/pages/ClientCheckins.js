import React from 'react';
import CheckinList from '../components/CheckinList';



const DUMMY_CHECKINS = [
  {
    id: "ci1",
    name: "Dana Linn Bailey",
    date: "24/04/2020",
    weight: 136.2,
    imageUrl: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.girlswithmuscle.com%2Fimages%2Ffull%2F1217320.jpg&f=1&nofb=1",
    show_date: "01/06/2020",
    weeks_in:  6,
    bodyfat: 9.9,
    bf_loss: 1.6,
    total_loss: 8.3,
    week_loss: 2,
    client: "c2",
    creator: 'u1',
    notes: "Lowered carbs to 90per day except on refeed"

  },
  {
    id: 'ci2',
    name: "Dana Linn Bailey",
    date: "01/05/2020",
    weight: 135,
    imageUrl:"https://s-media-cache-ak0.pinimg.com/736x/d6/f0/cb/d6f0cb767b7faf274262bd6a774e41e1--chicas-fitness-fitness-girls.jpg",
    show_date: "01/06/2020",
    weeks_in: 7,
    bodyfat: 8.54,
    bf_loss: 1.36,
    total_loss: 9.5,
    week_loss: 1.2,
    client:'c2',
    creator: 'u1',
    notes: "Added extra 30 minutes of cardio twice a week"
  }
]

const Checkins = props => {

// const clientId = useParams().clientId;
// const loadedCheckins = DUMMY_CHECKINS.filter(checkin => checkin.creator === clientId);
return <CheckinList items={DUMMY_CHECKINS} />

};

export default Checkins;


