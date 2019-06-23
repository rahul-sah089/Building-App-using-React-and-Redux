import React, { Component } from 'react';
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import CourseForm from "./CourseForm";
import { newCourse } from "../../../tools/mockData";



class ManageCoursesPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            course: newCourse,
            errors: ""
        };
    }
    componentDidMount() {
        const { courses, authors, loadCourses, loadAuthors } = this.props;

        if (courses.length === 0) {
            loadCourses().catch(error => {
                alert("Loading courses failed" + error);
            });
        }

        if (authors.length === 0) {
            loadAuthors().catch(error => {
                alert("Loading authors failed" + error);
            });
        }
    }
    render() {
        return (
            <>
                <h2>Manage Courses</h2>
                <CourseForm course={this.state.course} authors={this.props.authors} errors={this.state.errors} />

            </>
        );
    }
}

ManageCoursesPage.propTypes = {
    course: PropTypes.object.isRequired,
    authors: PropTypes.array.isRequired,
    courses: PropTypes.array.isRequired,
    loadCourses: PropTypes.object.isRequired,
    loadAuthors: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        course: newCourse,
        courses: state.courses,
        authors: state.authors
    };
}

const mapDispatchToProps = {
    loadCourses: courseActions.loadCourses,
    loadAuthors: authorActions.loadAuthors
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ManageCoursesPage);
