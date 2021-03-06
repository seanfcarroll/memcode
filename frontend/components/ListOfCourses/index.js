import { Course } from './components/Course';

class ListOfCourses extends React.Component {
  static propTypes = {
    coursesData: PropTypes.array.isRequired,
  }

  renderLayoutDivs = () =>
    // eslint-disable-next-line react/no-array-index-key
    [...Array(10)].map((_, i) => <div key={i} className="layout-div"/>)

  render = () =>
    <section className="list-of-courses">
      {
        this.props.coursesData.map(({ course, courseUserIsLearning, amountOfProblems, amountOfProblemsToReview, amountOfProblemsToLearn, nextDueDateIn }) =>
          <Course
            key={course.id}
            course={course}
            courseUserIsLearning={courseUserIsLearning}
            amountOfProblems={amountOfProblems}
            amountOfProblemsToReview={amountOfProblemsToReview}
            amountOfProblemsToLearn={amountOfProblemsToLearn}
            nextDueDateIn={nextDueDateIn}
          />
        )
      }
      {this.renderLayoutDivs()}
    </section>
}

export { ListOfCourses };
