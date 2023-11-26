import React, { Component } from "react";
import "./CustomPlayer.scss";
import { IconDownloadLite, IconFullScreen, IconFullScreenActive, IconLoaderWhite } from "../../../../../assets/img";
import { utcToISOConvertTime } from "../../../../../helper";
import { IconCloseAlert, } from "../../../../../assets/images";
import BroadcasteVideoShare from "../../BroadcasteVideoShare";

const { IVSPlayer } = window;
const {
  create: createMediaPlayer,
  isPlayerSupported,
  PlayerEventType,
  PlayerState,
} = IVSPlayer;

const { ENDED, PLAYING, READY, BUFFERING } = PlayerState;
const { TEXT_METADATA_CUE, ERROR } = PlayerEventType;

export class PlaybackVideoHlsOld extends Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
    this.playerRef = React.createRef();

    this.state = {
      status: "Disconnected",
      isPlaying: false,
      currentChannel: 0,
      eleWidth: 0,
      eleHeight: 0,
      audiomute: false,
      videoDuration: 0,
      getVideoShare: false,
      videoState: '',
    };
  }
  componentWillUnmount() {
    if (!this.playerRef.current) return;
    this.playerRef.current.removeEventListener(
      PLAYING,
      this.onPlayerStateChange
    );
    this.playerRef.current.removeEventListener(ENDED, this.onPlayerStateChange);
    this.playerRef.current.removeEventListener(ERROR, this.onPlayerError);

    this.playerRef.current.pause();
    this.playerRef.current.delete();
    this.playerRef.current = null;
    this.videoRef.current?.removeAttribute("src"); // remove possible stale src
  }

  _handleClose = () => {
    this.setState({
      getVideoShare: false
    });
  };
  _handleAction = () => {
    this.setState({
      getVideoShare: false
    });
  };

  componentDidMount() {

    console.log(this.props.enableHeader, "staticControl");

    if (!isPlayerSupported) {
      console.warn("IVS Player is not supported!");
    }
    console.log(this.playerRef.current, "this.playerRef.current 1");

    this.playerRef.current = createMediaPlayer();
    console.log(this.playerRef.current, "this.playerRef.current 2");
    this.playerRef.current.attachHTMLVideoElement(this.videoRef.current);
    this.playerRef.current.load(this.props?.playbackUrl);
    this.playerRef.current.play();

    this.playerRef.current.addEventListener(READY, this.onPlayerStateChange);
    this.playerRef.current.addEventListener(PLAYING, this.onPlayerStateChange);
    this.playerRef.current.addEventListener(
      BUFFERING,
      this.onPlayerStateChange
    );
    this.playerRef.current.addEventListener(ENDED, this.onPlayerStateChange);
    this.playerRef.current.addEventListener(ERROR, this.onPlayerError);
    this.playerRef.current.addEventListener(
      TEXT_METADATA_CUE,
      this.onPlayerMetadata
    );

    // Select elements here
    const video = document.getElementById('video-player');
    const videoControls = document.getElementById('video-controls');
    const playButton = document.getElementById('play');
    const playbackIcons = document.querySelectorAll('.playback-icons use');
    const timeElapsed = document.getElementById('time-elapsed');
    const duration = document.getElementById('duration');
    const progressBar = document.getElementById('progress-bar');
    const seek = document.getElementById('seek');
    const seekTooltip = document.getElementById('seek-tooltip');
    const volumeIcons = document.querySelectorAll('.volume-button use');
    const volumeMute = document.querySelector('use[href="#volume-mute"]');
    const volumeLow = document.querySelector('use[href="#volume-low"]');
    const volumeHigh = document.querySelector('use[href="#volume-high"]');
    const playbackAnimation = document.getElementById('playback-animation');
    const fullscreenButton = document.getElementById('fullscreen-button');
    const videoContainer = document.getElementById('video-container');
    const pipButton = document.getElementById('pip-button');

    const videoWorks = !!document.createElement('video').canPlayType;
    if (videoWorks) {
      video.controls = false;
      videoControls.classList.remove('hidden');
    }

    // Add functions here

    // togglePlay toggles the playback state of the video.
    // If the video playback is paused or ended, the video is played
    // otherwise, the video is paused
    function togglePlay() {
      if (video.paused || video.ended) {
        video.play();
      } else {
        video.pause();
      }
    }

    // updatePlayButton updates the playback icon and tooltip
    // depending on the playback state
    function updatePlayButton() {
      playbackIcons.forEach((icon) => icon.classList.toggle('hidden'));

      if (video.paused) {
        playButton.setAttribute('data-title', 'Play');
      } else {
        playButton.setAttribute('data-title', "Pause");
      }
    }

    // formatTime takes a time length in seconds and returns the time in
    // minutes and seconds
    function formatTime(timeInSeconds) {
      const result = new Date(timeInSeconds * 1000).toISOString().slice(11, 8);

      return {
        minutes: result.slice(3, 2),
        seconds: result.slice(6, 2),
      };
    }

    // initializeVideo sets the video duration, and maximum value of the
    // progressBar
    function initializeVideo() {
      const videoDuration = Math.round(video.duration);
      seek.setAttribute('max', videoDuration);
      progressBar.setAttribute('max', videoDuration);
      const time = formatTime(videoDuration);
      duration.innerText = `${time.minutes}:${time.seconds}`;
      duration.setAttribute('datetime', `${time.minutes}m ${time.seconds}s`);
    }

    // updateTimeElapsed indicates how far through the video
    // the current playback is by updating the timeElapsed element
    function updateTimeElapsed() {
      const time = formatTime(Math.round(video.currentTime));
      timeElapsed.innerText = `${time.minutes}:${time.seconds}`;
      timeElapsed.setAttribute('datetime', `${time.minutes}m ${time.seconds}s`);
    }

    // updateProgress indicates how far through the video
    // the current playback is by updating the progress bar
    function updateProgress() {
      seek.value = video.currentTime;
      progressBar.value = Math.round(video.currentTime);
    }

    // updateSeekTooltip uses the position of the mouse on the progress bar to
    // roughly work out what point in the video the user will skip to if
    // the progress bar is clicked at that point
    function updateSeekTooltip(event) {
      const skipTo = Math.round(
        (event.offsetX / event.target.clientWidth) *
        parseInt(event.target.getAttribute('max'), 10)
      );
      seek.setAttribute('data-seek', skipTo);
      const t = formatTime(skipTo);
      seekTooltip.textContent = `${t.minutes}:${t.seconds}`;
      const rect = video.getBoundingClientRect();
      seekTooltip.style.left = `${event.pageX - rect.left}px`;
    }

    // skipAhead jumps to a different point in the video when the progress bar
    // is clicked
    function skipAhead(event) {
      const skipTo = event.target.dataset.seek
        ? event.target.dataset.seek
        : event.target.value;
      video.currentTime = skipTo;
      progressBar.value = skipTo;
      seek.value = skipTo;
    }

    // updateVolume updates the video's volume
    // and disables the muted state if active
    // function updateVolume() {
    //   if (video.muted) {
    //     video.muted = false;
    //   }

    function updateVolumeIcon() {
      volumeIcons.forEach((icon) => {
        icon.classList.add('hidden');
      });

      if (video.muted || video.volume === 0) {
        volumeMute.classList.remove('hidden');
      } else if (video.volume > 0 && video.volume <= 0.5) {
        volumeLow.classList.remove('hidden');
      } else {
        volumeHigh.classList.remove('hidden');
      }
    }

    // toggleMute mutes or unmutes the video when executed
    // When the video is unmuted, the volume is returned to the value
    // it was set to before the video was muted
    // function toggleMute() {
    //   video.muted = !video.muted;

    // animatePlayback displays an animation when
    // the video is played or paused
    function animatePlayback() {
      playbackAnimation.animate(
        [
          {
            opacity: 1,
            transform: 'scale(1)',
          },
          {
            opacity: 0,
            transform: 'scale(1.3)',
          },
        ],
        {
          duration: 500,
        }
      );
    }

    function controlHandler() {
      videoControls.style.opacity = 0;
      if (video?.paused) {
        video?.play();
        setTimeout(() => {
          video?.pause();
        }, 100);
      }
      setTimeout(() => {
        videoControls.style.opacity = 1;
      }, 500);
    }

    // toggleFullScreen toggles the full screen state of the video
    // If the browser is currently in fullscreen mode,
    // then it should exit and vice versa.
    function toggleFullScreen() {
      controlHandler();
      if (document.fullscreenElement) {
        document.exitFullscreen();
        videoControls.classList.add('static');
        videoControls.classList.remove('active_full_screen');
        videoControls.style.opacity = 0;
        setTimeout(() => {
          videoControls.style.opacity = 1;
        }, 100);
        fullscreenButton.setAttribute('data-title', 'Full screen');
      } else if (document.webkitFullscreenElement) {
        // Need this to support Safari
        document.webkitExitFullscreen();
        videoControls.classList.add('static');
        videoControls.classList.remove('active_full_screen');
        fullscreenButton.setAttribute('data-title', 'Full screen');

      } else if (videoContainer.webkitRequestFullscreen) {
        // Need this to support Safari
        videoContainer.webkitRequestFullscreen();
        videoControls.classList.remove('static');
        videoControls.classList.add('active_full_screen');
        fullscreenButton.setAttribute('data-title', 'Exit full screen');
      } else {
        videoContainer.requestFullscreen();
        videoControls.classList.remove('static');
        videoControls.classList.add('active_full_screen');
        fullscreenButton.setAttribute('data-title', 'Exit full screen');
      }
    }

    // updateFullscreenButton changes the icon of the full screen button
    // and tooltip to reflect the current full screen state of the video
    function updateFullscreenButton() {
      if (document.fullscreenElement) {
        fullscreenButton.setAttribute('data-title', 'Exit full screen');
      } else {
        fullscreenButton.setAttribute('data-title', 'Full screen');
      }
    }

    // togglePip toggles Picture-in-Picture mode on the video
    async function togglePip() {
      try {
        if (video !== document.pictureInPictureElement) {
          pipButton.disabled = true;
          await video.requestPictureInPicture();
        } else {
          await document.exitPictureInPicture();
        }
      } catch (error) {
        console.error(error);
      } finally {
        pipButton.disabled = false;
      }
    }

    // hideControls hides the video controls when not in use
    // if the video is paused, the controls must remain visible
    function hideControls() {
      if (video.paused) {
        return;
      }

      videoControls.classList.add('hide');
    }

    // showControls displays the video controls
    function showControls() {
      videoControls.classList.remove('hide');
    }

    // keyboardShortcuts executes the relevant functions for
    // each supported shortcut key

    // Add eventlisteners here
    playButton.addEventListener('click', togglePlay);
    video.addEventListener('play', updatePlayButton);
    video.addEventListener('pause', updatePlayButton);
    video.addEventListener('loadedmetadata', initializeVideo);
    video.addEventListener('timeupdate', updateTimeElapsed);
    video.addEventListener('timeupdate', updateProgress);
    video.addEventListener('volumechange', updateVolumeIcon);
    video.addEventListener('click', togglePlay);
    video.addEventListener('click', animatePlayback);
    video.addEventListener('mouseenter', showControls);
    video.addEventListener('mouseleave', hideControls);
    videoControls.addEventListener('mouseenter', showControls);
    videoControls.addEventListener('mouseleave', hideControls);
    seek.addEventListener('mousemove', updateSeekTooltip);
    seek.addEventListener('input', skipAhead);
    fullscreenButton.addEventListener('click', toggleFullScreen);
    videoContainer.addEventListener('fullscreenchange', updateFullscreenButton);
    pipButton.addEventListener('click', togglePip);
    document.addEventListener('DOMContentLoaded', () => {
      if (!('pictureInPictureEnabled' in document)) {
        pipButton.classList.add('hidden');
      }
    });
    const handlefindResizeWindow = () => {
      this.handleResizeByVideoSize();
    };
    const handleKey = (e) => {
      if (e.keyCode === 27) {
        videoControls.classList.remove('active_full_screen');
        fullscreenButton.setAttribute('data-title', 'Full screen');
      }
    };

    window.addEventListener('keyup', handleKey);
    window.addEventListener('resize', handlefindResizeWindow);
    this.handleResizeByVideoSize();
    return (() => {
      window.removeEventListener('resize', handlefindResizeWindow);
      window.removeEventListener('keyup', handleKey);
      videoContainer.removeEventListener('fullscreenchange', updateFullscreenButton);
    });
  }

  onPlayerMetadata = (e) => {
    const data = JSON.parse(e.text);
    console.log(data, "dataasdasd");
  };

  onPlayerError = (e) => {
    console.error(e);
  };

  onPlayerStateChange = () => {
    console.log(this.playerRef.current.getState(), "Player state isPlaying");
    this.setState({
      videoState: this.playerRef.current.getState()
    });
    if (this.playerRef.current.getState() === "Ended") {
      this.videoRef.current.pause();
      this.videoRef.current.currentTime = 0;
      setTimeout(() => {
        this.videoRef.current?.pause();
      }, 200);
    }
  };

  handleResizeByVideoSize = () => {
    const ratio = "16:9";
    const ratioWidth = ratio.split(":")[0];
    const ratioHeight = ratio.split(":")[1];
    const parentEle = document.getElementById("container-custom-vplayer");
    const parentEleTop = document.getElementById("video_parent_top");
    const parentEleWidth = parentEle.offsetWidth;
    const parentEleHeight = parentEle.offsetHeight - parentEleTop.offsetHeight - this.props.controlerHeight;
    const ratioCalculatedWidth = (ratioWidth * parentEleHeight) / ratioHeight;
    const ratioCalculatedHeight = (ratioHeight * parentEleWidth) / ratioWidth;

    if (
      parentEleWidth > ratioCalculatedWidth &&
      parentEleHeight > ratioCalculatedHeight
    ) {
      this.setState({
        eleWidth: ratioCalculatedWidth,
        eleHeight: ratioCalculatedHeight
      });
    } else if (
      parentEleWidth < ratioCalculatedWidth &&
      parentEleHeight > ratioCalculatedHeight
    ) {
      this.setState({
        eleWidth: (ratioWidth * ratioCalculatedHeight) / ratioHeight,
        eleHeight: ratioCalculatedHeight
      });
    } else if (
      parentEleWidth > ratioCalculatedWidth &&
      parentEleHeight < ratioCalculatedHeight
    ) {
      this.setState({
        eleWidth: (ratioWidth * parentEleHeight) / ratioHeight,
        eleHeight: parentEleHeight
      });
    }
  };

  handleMuteToggle = () => {
    const video = this.videoRef.current;

    if (video.muted) {
      video.muted = false;
      video.volume = 1;
    }
    else {
      video.muted = true;
      video.volume = 0;
    }
  }

  _handlePopup = () => {
    this.setState({
      getVideoShare: true
    });
  };

  render() {
    const fullscreenButton = document && document.getElementById('fullscreen-button');
    if (document.fullscreenElement !== null) {
      if (fullscreenButton !== null) {
        fullscreenButton.setAttribute('data-title', 'Exit full screen');
        const video = this?.videoRef?.current;
        setTimeout(() => {
          if (video?.paused) {
            video?.play();
            setTimeout(() => {
              video?.pause();
            }, 50);
          }
        }, 10);
      }
    }
    else {
      if (fullscreenButton) {
        fullscreenButton.setAttribute('data-title', 'Full screen');
        const video = this?.videoRef?.current;
        setTimeout(() => {
          if (video?.paused) {
            video?.play();
            setTimeout(() => {
              video?.pause();
            }, 50);
          }
        }, 10);
      }
    }

    const { title = "", createdAt = '' } = this.props.getvideoDetailsEle;
    const { eleWidth, eleHeight, videoDuration } = this.state;
    return (
      <>
        <div style={{ display: this.props.enableHeader === false ? "none" : "" }} id="video_parent_top" className='broadcasted_videos_head'>
          <div className='action_1'>
            <button title='Close' onClick={this.props._handleBack} className='action_back' type='button'><IconCloseAlert /></button>
          </div>
          <div style={{ width: `${Math.round(eleWidth)}px`, visibility: "hidden" }} className='action_2'>
            <div className='action_2_left'>
              <h2>{title}</h2>
              <span>{utcToISOConvertTime(createdAt)}</span>
            </div>
            <div className='action_2_right relative'>
              <div className='relative'>
                <button className='action_download' type='button'><span>Download</span><IconDownloadLite /></button>
              </div>
              <button onClick={this._handlePopup} className='' type='button'>Share</button>
            </div>
          </div>
        </div>
        <div className='video_parent_wraper'>
          <div
            className='broadcasted_videos_body'>
            <div
              id="big_video_wraper" className='broadcasted_video'>
              <div className="viewers_broadcast_video">
                <div id="container-custom-vplayer" className="container-custom-vplayer">
                  <div style={{ width: `${Math.round(eleWidth)}px`, height: `${Math.round(eleHeight)}px` }} className="video-container" id="video-container">
                    <div className="playback-animation" id="playback-animation">
                      <svg className="playback-icons">
                        <use className="hidden" href="#play-icon"></use>
                        <use href="#pause"></use>
                      </svg>
                    </div>
                    <video
                      style={{ borderRadius: `${this.props.staticControl === true ? "6px 6px 0px 0px" : "6px"}` }}
                      poster={this.props.getSelectedThumb || ""}
                      preload="metadata"
                      ref={this.videoRef}
                      id="video-player"
                      className="video"
                      playsInline
                    ></video>
                    <div style={{ borderRadius: `${this.props.staticControl === true ? "" : " 0px 0px 6px 6px"}` }}
                      className={` ${this.props.staticControl === true ? "static" : ""} video-controls hide hidden`} id="video-controls">
                      <div style={{ display: this.props.shareLiveUrl ? "none" : "" }} className="video-progress" >
                        <progress id="progress-bar" value="0" min="0"></progress>
                        <input className="seek" id="seek" min="0" type="range" step="1" />
                        <div style={{ visibility: "hidden" }} className="seek-tooltip" id="seek-tooltip">00:00</div>
                      </div>

                      <div className="bottom-controls">
                        <div className="left-controls">
                          <button className="left_ _before_none" style={{ display: this.state.videoState === BUFFERING ? "" : "none" }}>
                            <IconLoaderWhite fill="#fff" />
                          </button>

                          <button className="left" data-title="Play" id="play" style={{ display: this.state.videoState === BUFFERING ? "none" : "" }}>
                            <svg
                              className="playback-icons">
                              <use href="#play-icon"></use>
                              <use className="hidden" href="#pause"></use>
                            </svg>
                          </button>

                          <div className="volume-controls">
                            <button onClick={() => this.handleMuteToggle()} data-title="Mute/Unmute" className="volume-button" id="volume-button">
                              <svg>
                                <use className="hidden" href="#volume-mute"></use>
                                <use className="hidden" href="#volume-low"></use>
                                <use href="#volume-high"></use>
                              </svg>
                            </button>

                            <input style={{ display: "none" }} className="volume" id="volume" value="1"
                              data-mute="0.5" type="range" max="1" min="0" step="0.01" />
                          </div>
                          <div style={{ display: "none" }} className="time">
                            <time id="time-elapsed">00:00</time>
                            <span> / </span>
                            <time id="duration">{videoDuration}</time>
                          </div>
                        </div>

                        <div className="right-controls">
                          <button style={{ display: "none" }} data-title="PIP (p)" className="pip-button" id="pip-button">
                            <svg>
                              <use href="#pip"></use>
                            </svg>
                          </button>
                          <button data-title="Full screen" className="fullscreen-button" id="fullscreen-button">
                            <IconFullScreen className="minimize" /> <IconFullScreenActive className="maximize " />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <svg style={{ display: "none" }}>
                  <defs>
                    <symbol id="pause" viewBox="0 0 24 24">
                      <g id="vuesax_linear_pause" data-name="vuesax/linear/pause" transform="translate(-620 -384)">
                        <g id="pause">
                          <path id="Vector" d="M7.65,16.11V1.89C7.65.54,7.08,0,5.64,0H2.01C.57,0,0,.54,0,1.89V16.11C0,17.46.57,18,2.01,18H5.64C7.08,18,7.65,17.46,7.65,16.11Z"
                            transform="translate(623 387)" fill="#fff" />
                          <path id="Vector-2" data-name="Vector"
                            d="M7.65,16.11V1.89C7.65.54,7.08,0,5.64,0H2.01C.58,0,0,.54,0,1.89V16.11C0,17.46.57,18,2.01,18H5.64C7.08,18,7.65,17.46,7.65,16.11Z"
                            transform="translate(633.35 387)" fill="#fff" />
                          <path id="Vector-3" data-name="Vector" d="M0,0H24V24H0Z"
                            transform="translate(620 384)" fill="#fff" opacity="0" />
                        </g>
                      </g>
                    </symbol>

                    <symbol id="play-icon" viewBox="0 0 24 24">
                      <g id="play-2" data-name="play" transform="translate(-492 -318)">
                        <path id="Vector"
                          d="M0,8.523V4.963C0,.543,3.13-1.267,6.96.943l3.09,1.78L13.14,4.5c3.83,2.21,3.83,5.83,0,8.04l-3.09,1.78L6.96,16.1C3.13,18.313,0,16.5,0,12.083Z"
                          transform="translate(496 321.477)" fill="#fff" />
                        <path id="Vector-2" data-name="Vector"
                          d="M0,0H24V24H0Z" transform="translate(492 318)" fill="#fff" opacity="0" />
                      </g>
                    </symbol>

                    <symbol id="volume-high" viewBox="0 0 24 24">
                      <g id="volume-high-2" data-name="volume-high" transform="translate(-684 -188)">
                        <path id="Vector"
                          d="M.75,9.5A.76.76,0,0,1,.3,9.35.75.75,0,0,1,.15,8.3a5.94,5.94,0,0,0,0-7.1A.75.75,0,1,1,1.35.3a7.471,7.471,0,0,1,0,8.9A.739.739,0,0,1,.75,9.5Z"
                          transform="translate(701.25 195.25)" fill="#fff" />
                        <path id="Vector-2" data-name="Vector"
                          d="M.75,14.5a.76.76,0,0,1-.45-.15A.75.75,0,0,1,.15,13.3a10.14,10.14,0,0,0,0-12.1A.75.75,0,1,1,1.35.3a11.64,11.64,0,0,1,0,13.9A.726.726,0,0,1,.75,14.5Z"
                          transform="translate(703.08 192.75)" fill="#fff" />
                        <path id="Vector-3" data-name="Vector"
                          d="M12.77.372a3.911,3.911,0,0,0-4.01.45L5.84,2.652a1.3,1.3,0,0,1-.66.19H3.75A3.381,3.381,0,0,
                    0,0,6.592v4a3.381,3.381,0,0,0,3.75,3.75H5.18a1.3,1.3,0,0,1,.66.19l2.92,1.83a4.832,4.832,0,0,0,2.54.82,3,3,
                    0,0,0,1.47-.37,3.9,3.9,0,0,0,1.73-3.63V4A3.9,3.9,0,0,0,12.77.372Z"
                          transform="translate(685.25 191.408)" fill="#fff" />
                        <path id="Vector-4" data-name="Vector"
                          d="M0,0H24V24H0Z" transform="translate(684 188)" fill="none" opacity="0" />
                      </g>
                    </symbol>

                    <symbol id="volume-low" viewBox="0 0 24 24">
                      <path d="M5.016 9h3.984l5.016-5.016v16.031l-5.016-5.016h-3.984v-6zM18.516 12q0 2.766-2.531 4.031v-8.063q1.031 0.516 1.781 1.711t0.75 2.32z"></path>
                    </symbol>

                    <symbol id="volume-mute" viewBox="0 0 24 24">
                      <g id="vuesax_bold_volume-slash" data-name="vuesax/bold/volume-slash" transform="translate(-428 -188)">
                        <g id="volume-slash">
                          <path id="Vector" d="M.75,8.078a.76.76,0,0,1-.45-.15.75.75,0,0,1-.15-1.05,5.926,5.926,0,0,0,.72-5.
                    84A.748.748,0,1,1,2.25.458a7.456,7.456,0,0,1-.9,7.33A.758.758,0,0,1,.75,8.078Z"
                            transform="translate(445.25 196.672)" fill="#fff" />
                          <path id="Vector-2" data-name="Vector"
                            d="M.75,12.2a.76.76,0,0,1-.45-.15A.75.75,0,0,1,.15,11a10.129,10.129,0,0,0,1.23-9.96A.748.748,0,0,1
                     ,2.76.458,11.618,11.618,0,0,1,1.35,11.9.726.726,0,0,1,.75,12.2Z" transform="translate(447.08 195.052)"
                            fill="#fff" />
                          <path id="Vector-3" data-name="Vector"
                            d="M5.138.294A1,1,0,0,1,6.848,1v2.93a3.9,3.9,0,0,1-1.73,3.63,3,3,0,0,1-1.47.37,4.832,4.832,0,0,1-2.54-.
                     82l-.64-.4a1,1,0,0,1-.18-1.55Z" transform="translate(436.902 200.666)" fill="#fff" />
                          <path id="Vector-4" data-name="Vector"
                            d="M20.52.225a.773.773,0,0,0-1.09,0l-4.95,4.95a3.8,3.8,0,0,0-1.72-3.39,3.911,3.911,0,0,
                     0-4.01.45L5.84,4.055a1.3,1.3,0,0,1-.66.19H3.75A3.381,3.381,0,0,0,0,7.995v4a3.381,3.381,0,
                     0,0,3.75,3.75h.16L.97,18.685a.773.773,0,0,0,0,1.09.834.834,0,0,0,.55.22.758.758,0,0,0,
                     .54-.23L20.52,1.3A.743.743,0,0,0,20.52.225Z" transform="translate(429.25 190.005)" fill="#fff" />
                          <path id="Vector-5" data-name="Vector"
                            d="M0,0H24V24H0Z" transform="translate(428 188)" fill="none" opacity="0" />
                        </g>
                      </g>
                    </symbol>

                    <symbol id="fullscreen" viewBox="0 0 24 24">
                      <g id="Layer_2" data-name="Layer 2" transform="translate(-62 20)">
                        <path id="Path_93576" data-name="Path 93576" d="M22.914,26H17.343a.857.857,0,0,1,0-1.714h5.571a1.371,1.371,0,0,0,
                  1.371-1.371V17.343a.857.857,0,0,1,1.714,0v5.571A3.094,3.094,0,0,1,22.914,26Zm-11.4-.857a.857.857,0,0,
                  0-.857-.857H5.086a1.371,1.371,0,0,1-1.371-1.371V17.343a.857.857,0,0,0-1.714,0v5.571A3.094,
                  3.094,0,0,0,5.086,26h5.571A.857.857,0,0,0,11.514,25.143Zm-7.8-14.486V5.086A1.371,1.371,0,
                  0,1,5.086,3.714h5.571a.857.857,0,0,0,0-1.714H5.086A3.094,3.094,0,0,0,2,5.086v5.571a.857.857,0,
                  0,0,1.714,0Zm22.286,0V5.086A3.094,3.094,0,0,0,22.914,2H17.343a.857.857,0,0,0,0,1.714h5.571a1.371,1.371,
                  0,0,1,1.371,1.371v5.571a.857.857,0,0,0,1.714,0Z" transform="translate(60 -22)" fill="#fff" />
                      </g>
                    </symbol>

                    <symbol id="fullscreen-exit" viewBox="0 0 24 24">
                      <g id="Layer_2" data-name="Layer 2" transform="translate(-62 20)">
                        <path id="Path_93576" data-name="Path 93576" d="M22.914,26H17.343a.857.857,0,0,1,0-1.714h5.571a1.371,
                  1.371,0,0,0,1.371-1.371V17.343a.857.857,0,0,1,1.714,0v5.571A3.094,3.094,0,0,1,22.914,26Zm-11.4-.857a.857.857,0,
                  0,0-.857-.857H5.086a1.371,1.371,0,0,1-1.371-1.371V17.343a.857.857,0,0,0-1.714,0v5.571A3.094,3.094,0,
                  0,0,5.086,26h5.571A.857.857,0,0,0,11.514,25.143Zm-7.8-14.486V5.086A1.371,1.371,0,0,1,5.086,3.714h5.571a.857.
                  857,0,0,0,0-1.714H5.086A3.094,3.094,0,0,0,2,5.086v5.571a.857.857,0,0,0,1.714,0Zm22.286,0V5.086A3.094,3.094,0,
                  0,0,22.914,2H17.343a.857.857,0,0,0,0,1.714h5.571a1.371,1.371,0,0,1,1.371,1.371v5.571a.857.857,0,0,0,1.714,0Z" transform="translate(60 -22)" fill="#fff" />
                      </g>
                    </symbol>

                    <symbol id="pip" viewBox="0 0 24 24">
                      <path d="M21 19.031v-14.063h-18v14.063h18zM23.016 18.984q0 0.797-0.609 1.406t-1.406
                 0.609h-18q-0.797 0-1.406-0.609t-0.609-1.406v-14.016q0-0.797 0.609-1.383t1.406-0.586h18q0.797 0
                 1.406 0.586t0.609 1.383v14.016zM18.984 11.016v6h-7.969v-6h7.969z"></path>
                    </symbol>
                  </defs>
                </svg>
              </div >
            </div>
          </div>
        </div>
        {this.state.getVideoShare &&
          <BroadcasteVideoShare
            _handleAction={() => { this._handleAction(); }}
            _handleClose={() => { this._handleClose(); }}
          />
        }
      </>
    );
  }
}

export default PlaybackVideoHlsOld;
