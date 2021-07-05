import React, { Component } from "react";
import { Grid, Card } from "@material-ui/core";
import { uploadPost } from "../service/DataService";
import { connect } from "react-redux";
import Dropzone from "react-dropzone";
import toastr from "toastr";

class Post extends Component {
    constructor(props) {
        super(props);

        this.state = {
            caption: "",
            images: [],
            progress: "",
            uploading: false,
            supported_mime: ["image/jpeg", "image/png"]
        };
    }

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        this.setState({
            uploading: true
        });

        const { caption } = this.state;

        let images = this.state.images;

        let formData = new FormData();
        formData.append("caption", caption);
        formData.append("file", images[0]);

        this.submit(formData);
    };

    calculateProgress(total, uploaded) {
        let percentage = (uploaded / total) * 100;
        this.setState({
            progress: percentage,
            uploading: percentage !== 100
        });

        if (percentage === 100) {
            toastr.success("Images uploaded to gallery");
        }
    }

    submit(credentials) {
        let total_files = this.state.images.length,
            uploaded = 0;

        this.props
            .dispatch(uploadPost(credentials))
            .then(res => {
                if (res.status === 200) {
                    this.removeDroppedFile(this.state.images.preview);
                    this.calculateProgress(total_files, ++uploaded);
                }
            })
            .catch(err => {
                const errors = Object.values(err.errors);
                errors.join(" ");
                toastr.error(errors);
                const response = {
                    error: true,
                    message: errors
                };
                this.setState({ response });
            });
    }

    onDrop = files => {
        const preview = files.map(file =>
            Object.assign(file, {
                preview: URL.createObjectURL(file)
            })
        );

        this.setState(prev => ({
            images: [...prev.images, preview[0]]
        }));
    };

    onDropRejected() {
        if (images.length) {
            toastr.error(
                "Please upload valid image files. Supported extension JPEG and PNG",
                "Invalid MIME type"
            );
        }
    }

    removeDroppedFile(filePreview) {
        let { images } = this.state;

        images = images.filter(image => {
            return image.preview !== filePreview;
        });

        this.setState({ images });
    }

    render() {
        return (
            <Grid container className="justify-content-center my-5">
                <Grid item xs={6}>
                    <form>
                        <div className="row">
                            <div className="col-8 offset-2">
                                <div className="row">
                                    <h1>Add New Post</h1>
                                </div>
                                <div className="form-group row">
                                    <label className="col-md-4 col-form-label">
                                        Post Caption
                                    </label>

                                    <input
                                        id="caption"
                                        type="text"
                                        className="form-control"
                                        name="caption"
                                        onChange={this.handleChange}
                                    />
                                </div>

                                <div className="row">
                                    <label className="col-md-4 col-form-label">
                                        Post Image
                                    </label>

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
                                        Add New Post
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </Grid>
                <Grid className="mt-4" item xs={10}>
                    {this.state.images.length ? (
                        <>
                            {this.state.uploading && (
                                <div className="progress">
                                    <div
                                        className="progress-bar"
                                        role="progressbar"
                                        style={{ width: this.state.progress }}
                                        aria-valuenow={this.state.progress}
                                        aria-valuemin="0"
                                        aria-valuemax="100"
                                    />
                                </div>
                            )}
                            <div className="images">
                                {this.state.images.map((file, index) => (
                                    <div key={index} className="image">
                                        <span
                                            className="close"
                                            style={{ cursor: "pointer" }}
                                            onClick={() =>
                                                this.removeDroppedFile(
                                                    file.preview
                                                )
                                            }
                                        >
                                            X
                                        </span>
                                        <img
                                            className="w-50"
                                            src={file.preview}
                                            alt=""
                                        />
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="no-images my-3">
                            <h5 className="text-center">
                                Selected images will appear here
                            </h5>
                        </div>
                    )}
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(Post);
