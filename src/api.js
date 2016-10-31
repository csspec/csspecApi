export default class CacheStore {
    constructor(store) {
        this._fbstore = store;
    }

    getFeedbackTemplate(callback, errorCallback) {
        let template = this._fbstore.getItem(config.feedbackApi.templateLink);
        if (template === null) {
            makeAjaxRequest({
                url: config.feedbackApi.templateLink,
                success: template => {
                    this._fbstore.setItem(config.feedbackApi.templateLink,
                                JSON.stringify(template.questionList));
                    callback(template.questionList);
                },
                error: errorCallback
            });
        } else {
            callback(JSON.parse(template));
        }
    }

    getTeachersList(callback, errorCallback) {
        let teachersList = this._fbstore.getItem(config.identityApi.teachers);
        if (teachersList === null) {
            makeAjaxRequest({
                url: config.identityApi.teachers,
                success: list => {
                    this._fbstore.setItem(config.identityApi.teachers, JSON.stringify(list));

                    // expires after 3 minutes
                    this._fbstore.setTTL(config.identityApi.teachers, 1000 * 60 * 3);
                    this._fbstore.log(config.identityApi.teachers);
                    callback(list);
                },
                error: errorCallback
            })
        } else {
            callback(JSON.parse(teachersList));
        }
    }

    getCoursesTaught(url, callback, error) {
        this.getObject(url, callback, error);
    }

    getObject(url, callback, error) {
        let object = this._fbstore.getItem(url);

        if (object) {
            callback(JSON.parse(object));
            return;
        }

        makeAjaxRequest({
            url: url,
            success: object => {
                this._fbstore.setItem(url, JSON.stringify(object));
                this._fbstore.setTTL(url, 1000 * 3 * 60);
                this._fbstore.log(url);
                callback(object);
            },
            error: error
        })
    }

    getCourse(url, callback, error) {
        this.getObject(url, callback, error);
    }

    getTeacher(url, callback, error) {
        this.getObject(url, callback, error);
    }

    getUser(url, callback, error) {
        this.getObject(url, callback, error);
    }

    getCoursesFeedback(url, callback, error) {
        this.getObject(url, callback, error);
    }

    getCoursesFeedbackForTeacher(teacherId, callback, error) {
        this.getObject(config.feedbackApi.resultsApi + "/teachers/" + teacherId, callback, error);
    }

    getCourseByCourseId(courseId, callback, error) {
        this.getCourse(config.academicApi.course + '/' + courseId, callback, error);
    }

    getTeacherByTeacherId(teacherId, callback, error) {
        this.getTeacher(config.identityApi.teachers + '/' + teacherId, callback, error);
    }
}
