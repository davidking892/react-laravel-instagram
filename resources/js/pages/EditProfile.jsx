import React, { Component } from "react";
import Dropzone from "react-dropzone";
import { Card } from "@material-ui/core";
import toastr from "toastr";
import debounce from "../debounce";
import { updateProfile } from "../service/DataService";
import { connect } from "react-redux";

class EditProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            profile: [],
            supported_mime: ["image/jpeg", "image/png"],
            title: "",
            description: "",
            url: ""
        };
    }

    componentDidMount() {
        const { title, description, url } = this.props.location.state.profile;

        if (this.props.location.state.profile) {
            this.setState({
                title,
                description,
                url
            });
        }
    }

    onDropRejected() {
        if (images.length) {
            toastr.error(
                "Please upload valid image files. Supported extension JPEG and PNG",
                "Invalid MIME type"
            );
        }
    }

    onDrop = file => {
        const profile = Object.assign(file[0], {
            preview: URL.createObjectURL(file[0])
        });

        this.setState({
            profile
        });
    };

    handleChange = e => {
        const { name, value } = e.target;

        this.supplyData(name, value);
    };

    supplyData = debounce((name, value) => {
        this.setState({
            [name]: value
        });
    }, 0);

    handleSubmit = e => {
        e.preventDefault();

        const { profile, title, description, url } = this.state;
        const oldImage = this.props.location.state.profile.image;
        let formData = new FormData();
        formData.append("image", profile);
        formData.append("title", title);
        formData.append("description", description);
        formData.append("url", url);
        formData.append("oldImage", oldImage);

        this.submit(formData);
    };

    submit(credentials) {
        this.props
            .dispatch(updateProfile(credentials))
            .then(res => {
                console.log(res);
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        const { title, description, url } = this.state;

        return (
            <>
                <div className="container">
                    <form
                        ref={el => {
                            this.profileForm = el;
                        }}
                    >
                        <div className="row">
                            <div className="col-8 offset-2">
                                <div className="row">
                                    <h1>Edit Profile</h1>
                                </div>
                                <div className="form-group row">
                                    <label className="col-md-4 col-form-label">
                                        Title
                                    </label>

                                    <input
                                        id="title"
                                        type="text"
                                        className="form-control"
                                        name="title"
                                        value={title}
                                        onChange={this.handleChange}
                                    />
                                </div>

                                <div className="form-group row">
                                    <label className="col-md-4 col-form-label">
                                        Description
                                    </label>

                                    <input
                                        id="description"
                                        type="text"
                                        className="form-control"
                                        name="description"
                                        value={description}
                                        onChange={this.handleChange}
                                    />
                                </div>

                                <div className="form-group row">
                                    <label className="col-md-4 col-form-label">
                                        URL
                                    </label>

                                    <input
                                        id="url"
                                        type="text"
                                        className="form-control"
                                        name="url"
                                        value={url}
                                        onChange={this.handleChange}
                                    />
                                </div>

                                <div className="row">
                                    <Card>
                                        <Dropzone
                                            accept={this.state.supported_mime}
                                            onDropRejected={this.onDropRejected}
                                            onDrop={this.onDrop.bind(this)}
                                        >
                                            {({
                                                getRootProps,
                                                getInputProps,
                                                isDragActive
                                            }) => (
                                                <div
                                                    className="p-5 "
                                                    {...getRootProps()}
                                                >
                                                    <input
                                                        {...getInputProps()}
                                                    />
                                                    {isDragActive
                                                        ? "Drop it like it's hot!"
                                                        : "Click me or drag a file to upload!"}
                                                </div>
                                            )}
                                        </Dropzone>
                                    </Card>
                                </div>

                                <div className="row pt-4">
                                    <button
                                        onClick={this.handleSubmit}
                                        className="btn btn-primary"
                                    >
                                        Save Profile
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(EditProfile);
