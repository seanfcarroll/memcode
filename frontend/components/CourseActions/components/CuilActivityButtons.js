import { Loading } from '~/components/Loading';

import * as CourseUserIsLearningApi from '~/api/CourseUserIsLearning';
import { IdsOfProblemsToLearnAndReviewPerCourseActions } from '~/reducers/IdsOfProblemsToLearnAndReviewPerCourse';

@connect(
  (state) => ({
    speCourseUserIsLearning: state.components.CourseActions.speCourseUserIsLearning
  }),
  (dispatch) => ({
    seedSpeCourseUserIsLearning: (spe) => dispatch({
      type: 'SEED_SPE_COURSE_USER_IS_LEARNING',
      payload: spe
    }),
    IdsOfProblemsToLearnAndReviewPerCourseActions: {
      stopLearningCourse: (courseId) => IdsOfProblemsToLearnAndReviewPerCourseActions.stopLearningCourse(dispatch, courseId),
      apiSync: () => IdsOfProblemsToLearnAndReviewPerCourseActions.apiSync(dispatch)
    }
  })
)
class CuilActivityButtons extends React.Component {
  static propTypes = {
    courseId: PropTypes.number.isRequired,
    speCourseUserIsLearning: PropTypes.object.isRequired,
    seedSpeCourseUserIsLearning: PropTypes.func.isRequired,
    IdsOfProblemsToLearnAndReviewPerCourseActions: PropTypes.shape({
      stopLearningCourse: PropTypes.func.isRequired,
      apiSync: PropTypes.func.isRequired
    }).isRequired
  }

  apiStartLearning = () =>
    CourseUserIsLearningApi.create(
      (spe) => this.props.seedSpeCourseUserIsLearning(spe),
      this.props.courseId
    )
      .then(this.props.IdsOfProblemsToLearnAndReviewPerCourseActions.apiSync)

  apiStopLearning = () =>
    CourseUserIsLearningApi.stopLearning(
      (spe) => this.props.seedSpeCourseUserIsLearning(spe),
      this.props.speCourseUserIsLearning.payload.id
    )
      .then(() => {
        this.props.IdsOfProblemsToLearnAndReviewPerCourseActions.stopLearningCourse(this.props.courseId);
      })

  apiResumeLearning = () =>
    CourseUserIsLearningApi.resumeLearning(
      (spe) => this.props.seedSpeCourseUserIsLearning(spe),
      this.props.speCourseUserIsLearning.payload.id
    )
      .then(this.props.IdsOfProblemsToLearnAndReviewPerCourseActions.apiSync)

  renderStartLearningButton = () =>
    <div onClick={this.apiStartLearning}>
      <i className="fa fa-plus"/> TO LEARNED COURSES
    </div>

  renderStopLearningButton = () =>
    <div onClick={this.apiStopLearning}>
      STOP LEARNING
    </div>

  renderResumeLearningButton = () =>
    <div onClick={this.apiResumeLearning}>
      RESUME LEARNING
    </div>

  render = () =>
    <a className="add-to-learned">
      <Loading spe={this.props.speCourseUserIsLearning} requestIcon={<i className="fa fa-circle-o-notch fa-spin fa-2x fa-fw"/>}>{(cuil) => {
        if (cuil === null) {
          return this.renderStartLearningButton();
        } else if (cuil.active) {
          return this.renderStopLearningButton();
        } else if (!cuil.active) {
          return this.renderResumeLearningButton();
        }
      }}</Loading>
    </a>
}

export { CuilActivityButtons };
