import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, Card } from "@material-ui/core";
import ReactGallery from "react-photo-gallery";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

class ShowPost extends Component {
    constructor() {
        super();

        this.state = {
            photoIndex: 0,
            isOpen: false
        };
    }

    openLightbox = (event, obj) => {
        this.setState({
            photoIndex: obj.index,
            isOpen: true
        });
    };

    render() {
        const { posts } = this.props;

        let photos = posts.map(item => {
            return {
                src: "/storage/" + item.image,
                width: 4,
                height: 4,
                id: item.id
            };
        });

        const getSrc = index => {
            return `storage/${posts[index].image}`;
        };

        const { photoIndex, isOpen } = this.state;
        return (
            <>
                {posts.length && (
                    <ReactGallery photos={photos} onClick={this.openLightbox} />
                )}

                {isOpen && (
                    <Lightbox
                        mainSrc={getSrc(photoIndex)}
                        nextSrc={getSrc((photoIndex + 1) % posts.length)}
                        prevSrc={getSrc(
                            (photoIndex + posts.length - 1) % posts.length
                        )}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                        onMovePrevRequest={() =>
                            this.setState({
                                photoIndex:
                                    (photoIndex + posts.length - 1) %
                                    posts.length
                            })
                        }
                        onMoveNextRequest={() =>
                            this.setState({
                                photoIndex: (photoIndex + 1) % posts.length
                            })
                        }
                    />
                )}
            </>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.Auth.isAuthenticated,
    posts: state.Profile.posts
});

export default connect(mapStateToProps)(ShowPost);
