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
        this.onChange = this.onChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
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

    onChange(event) {
        const eventName = event.target.name;
        const eventValue = event.target.value;
        this.setState({
            course: { ...this.state.course, [eventName]: eventName === "authorId" ? parseInt(eventValue, 10) : eventValue }
        });
        console.log(this.state);
    }

    handleSave(event) {
        alert("handle saved called");
        event.preventDefault();
        this.props.saveCourse(this.state.course);
    }




    render() {
        return (
            <>
                <h2>Manage Courses</h2>
                <CourseForm onSave={this.handleSave} course={this.state.course} authors={this.props.authors} onChange={this.onChange} errors={this.state.errors} />

            </>
        );
    }
}

ManageCoursesPage.propTypes = {
    course: PropTypes.object.isRequired,
    authors: PropTypes.array.isRequired,
    courses: PropTypes.array.isRequired,
    loadCourses: PropTypes.func.isRequired,
    loadAuthors: PropTypes.func.isRequired,
    saveCourse: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        course: newCourse,
        courses: state.courses,
        authors: state.authors
    };
}

const mapDispatchToProps = {
    lFoadCourses: courseActions.loadCourses,
    saveCourse: courseActions.saveCourse,
    loadAuthors: authorActions.loadAuthors
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ManageCoursesPage);
