import React from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import { Button } from 'rbx';
import { terms, timeParts, hasConflict, getCourseTerm } from './time.js';

const firebaseConfig = {
  apiKey: "AIzaSyAc9ZNzRuG2XDeOrWvKEhBx7lKBFJn8ZOI",
  authDomain: "scheduler-b75ef.firebaseapp.com",
  databaseURL: "https://scheduler-b75ef.firebaseio.com",
  projectId: "scheduler-b75ef",
  storageBucket: "scheduler-b75ef.appspot.com",
  messagingSenderId: "494135580480",
  appId: "1:494135580480:web:4877e4442f3e8692c00ca5"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database().ref();

const getCourseNumber = course => (
  course.id.slice(1, 4)
)

const buttonColor = selected => (
  selected ? 'success' : null
)

const saveCourse = (course, meets) => {
  db.child('courses').child(course.id).update({meets})
    .catch(error => alert(error));
};

const moveCourse = course => {
  const meets = prompt('Enter new meeting data, in this format:', course.meets);
  if (!meets) return;
  const {days} = timeParts(meets);
  if (days) saveCourse(course, meets); 
  else moveCourse(course);
};

const Course = ({ course, state, user }) => (
    <Button color={ buttonColor(state.selected.includes(course)) }
      onClick={ () => state.toggle(course) }
      onDoubleClick={ user ? () => moveCourse(course) : null }
      disabled={ hasConflict(course, state.selected) }
      >
      { getCourseTerm(course) } CS { getCourseNumber(course) }: { course.title }
    </Button>
);

export { buttonColor, db };
export default Course;